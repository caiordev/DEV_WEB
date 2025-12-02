import { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Divider,
  IconButton,
  Stack,
  Button,
  CircularProgress,
  TablePagination,
  Badge,
  Menu,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Avatar
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  AttachMoney as MoneyIcon,
  DirectionsBus as BusIcon,
  Person as PersonIcon,
  CalendarMonth as CalendarIcon,
  FileDownload as DownloadIcon,
  PictureAsPdf as PdfIcon,
  TableChart as ExcelIcon,
  Notifications as NotificationsIcon,
  TrendingUp as TrendingUpIcon,
  Place as PlaceIcon
} from '@mui/icons-material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

import voucherService from '../../services/voucherService.js';
import dashboardService from '../../services/dashboardService.js';
import exportService from '../../services/exportService.js';
import notificationService from '../../services/notificationService.js';


export default function Dashboard() {
  const [soldTrips, setSoldTrips] = useState([]);
  const [filteredTrips, setFilteredTrips] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    startDate: null,
    endDate: null,
    destination: ''
  });
  const [destinations, setDestinations] = useState([]);
  const [stats, setStats] = useState({
    totalSales: 0,
    totalRevenue: 0,
    totalCustomers: 0,
    totalDestinations: 0
  });
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [topDestinations, setTopDestinations] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notificationAnchor, setNotificationAnchor] = useState(null);


  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  useEffect(() => {
    loadVouchers();
    loadDashboardStats();
    loadTopDestinations();
    loadNotifications();
  }, []);

  const loadVouchers = async () => {
    setLoading(true);
    try {
      const vouchersData = await voucherService.getAllVouchers();
      setSoldTrips(vouchersData);
      setFilteredTrips(vouchersData);

      const uniqueDestinations = new Set();
      vouchersData.forEach(voucher => {
        voucher.voucherTrips.forEach(voucherTrip => {
          uniqueDestinations.add(voucherTrip.trip.destination);
        });
      });
      setDestinations(Array.from(uniqueDestinations));
    } catch (error) {
      console.error('Error loading vouchers:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadDashboardStats = async () => {
    try {
      const statsData = await dashboardService.getDashboardStats();
      setStats({
        totalSales: statsData.totalVouchers || 0,
        totalRevenue: statsData.totalRevenue || 0,
        totalCustomers: statsData.uniqueCustomers || 0,
        totalDestinations: destinations.length
      });
    } catch (error) {
      console.error('Error loading dashboard stats:', error);
    }
  };


  const loadTopDestinations = async () => {
    try {
      const topDest = await dashboardService.getTopDestinations(5);
      setTopDestinations(topDest);
    } catch (error) {
      console.error('Error loading top destinations:', error);
      calculateTopDestinationsFromLocal();
    }
  };


  const calculateTopDestinationsFromLocal = () => {
    const destinationCount = {};
    soldTrips.forEach(voucher => {
      voucher.voucherTrips.forEach(voucherTrip => {
        const dest = voucherTrip.trip.destination;
        destinationCount[dest] = (destinationCount[dest] || 0) + 1;
      });
    });


    const topDest = Object.entries(destinationCount)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);

    setTopDestinations(topDest);
  };


  useEffect(() => {
    if (soldTrips.length > 0 && topDestinations.length === 0) {
      calculateTopDestinationsFromLocal();
    }
  }, [soldTrips]);


  const loadNotifications = async () => {
    try {
      const notifs = await notificationService.getUnreadNotifications();
      setNotifications(notifs);
      setUnreadCount(notifs.length);
    } catch (error) {
      console.error('Error loading notifications:', error);
    }
  };


  const handleNotificationClick = (event) => {
    setNotificationAnchor(event.currentTarget);
  };


  const handleNotificationClose = () => {
    setNotificationAnchor(null);
  };


  const handleMarkAsRead = async (id) => {
    try {
      await notificationService.markAsRead(id);
      loadNotifications();
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };


  const handleMarkAllAsRead = async () => {
    try {
      await notificationService.markAllAsRead();
      loadNotifications();
      handleNotificationClose();
    } catch (error) {
      console.error('Error marking all as read:', error);
    }
  };


  const calculateStats = (vouchers) => {
    const uniqueCustomers = new Set();
    const uniqueDestinations = new Set();
    let totalRevenue = 0;

    vouchers.forEach(voucher => {
      uniqueCustomers.add(voucher.customer.cpf);
      voucher.voucherTrips.forEach(voucherTrip => {
        uniqueDestinations.add(voucherTrip.trip.destination);
      });
      totalRevenue += voucher.totalValue;
    });

    setStats({
      totalSales: vouchers.length,
      totalRevenue,
      totalCustomers: uniqueCustomers.size,
      totalDestinations: uniqueDestinations.size
    });
  };


  useEffect(() => {
    let result = [...soldTrips];

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(voucher =>
        voucher.customer.name.toLowerCase().includes(searchLower) ||
        voucher.customer.cpf.includes(filters.search) ||
        voucher.voucherNumber.includes(filters.search)
      );
    }

    if (filters.startDate) {
      result = result.filter(voucher =>
        new Date(voucher.saleDate) >= new Date(filters.startDate)
      );
    }

    if (filters.endDate) {
      result = result.filter(voucher =>
        new Date(voucher.saleDate) <= new Date(filters.endDate)
      );
    }

    if (filters.destination) {
      result = result.filter(voucher =>
        voucher.voucherTrips.some(voucherTrip => voucherTrip.trip.destination === filters.destination)
      );
    }

    setFilteredTrips(result);
    calculateStats(result);
  }, [filters, soldTrips]);


  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };


  const handleClearFilters = () => {
    setFilters({
      search: '',
      startDate: null,
      endDate: null,
      destination: ''
    });
    setPage(0);
  };


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };


  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const handleExportExcel = () => {
    exportService.exportDashboardToExcel(filteredTrips, stats);
  };


  const handleExportPDF = () => {
    exportService.exportDashboardToPDF(filteredTrips, stats);
  };


  const formatDate = (dateString) => {
    try {
      return dayjs(dateString).format('DD/MM/YYYY');
    } catch (error) {
      return 'Data inválida';
    }
  };


  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          Dashboard de Vendas
        </Typography>
        <Stack direction="row" spacing={1}>
          <IconButton
            color="primary"
            onClick={handleNotificationClick}
            sx={{
              bgcolor: 'background.paper',
              boxShadow: 1,
              '&:hover': { bgcolor: 'action.hover' }
            }}
          >
            <Badge badgeContent={unreadCount} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Button
            variant="outlined"
            startIcon={<ExcelIcon />}
            onClick={handleExportExcel}
            disabled={filteredTrips.length === 0}
          >
            Exportar Excel
          </Button>
          <Button
            variant="outlined"
            startIcon={<PdfIcon />}
            onClick={handleExportPDF}
            disabled={filteredTrips.length === 0}
          >
            Exportar PDF
          </Button>
        </Stack>
      </Box>


      {/* Notification Menu */}
      <Menu
        anchorEl={notificationAnchor}
        open={Boolean(notificationAnchor)}
        onClose={handleNotificationClose}
        PaperProps={{
          sx: { width: 360, maxHeight: 400 }
        }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="h6">Notificações</Typography>
          {unreadCount > 0 && (
            <Button size="small" onClick={handleMarkAllAsRead}>
              Marcar todas como lidas
            </Button>
          )}
        </Box>
        <List sx={{ p: 0 }}>
          {notifications.length === 0 ? (
            <ListItem>
              <ListItemText
                primary="Nenhuma notificação"
                secondary="Você está em dia!"
              />
            </ListItem>
          ) : (
            notifications.map((notif) => (
              <ListItemButton
                key={notif.id}
                onClick={() => handleMarkAsRead(notif.id)}
                sx={{ borderBottom: 1, borderColor: 'divider' }}
              >
                <ListItemText
                  primary={notif.title || notif.message}
                  secondary={notif.createdAt ? dayjs(notif.createdAt).format('DD/MM/YYYY HH:mm') : ''}
                  primaryTypographyProps={{ fontWeight: 'medium' }}
                />
              </ListItemButton>
            ))
          )}
        </List>
      </Menu>

      {/* Cards de estatísticas */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', bgcolor: 'primary.light' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" color="white">Vendas</Typography>
                <BusIcon sx={{ color: 'white', fontSize: 40 }} />
              </Box>
              <Typography variant="h3" color="white">{stats.totalSales}</Typography>
              <Typography variant="body2" color="white">Total de vouchers emitidos</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', bgcolor: 'success.light' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" color="white">Receita</Typography>
                <MoneyIcon sx={{ color: 'white', fontSize: 40 }} />
              </Box>
              <Typography variant="h3" color="white">R$ {stats.totalRevenue.toFixed(2)}</Typography>
              <Typography variant="body2" color="white">Valor total das vendas</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', bgcolor: 'info.light' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" color="white">Clientes</Typography>
                <PersonIcon sx={{ color: 'white', fontSize: 40 }} />
              </Box>
              <Typography variant="h3" color="white">{stats.totalCustomers}</Typography>
              <Typography variant="body2" color="white">Clientes únicos</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', bgcolor: 'warning.light' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" color="white">Destinos</Typography>
                <CalendarIcon sx={{ color: 'white', fontSize: 40 }} />
              </Box>
              <Typography variant="h3" color="white">{stats.totalDestinations}</Typography>
              <Typography variant="body2" color="white">Destinos vendidos</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>


      {/* Top Destinations Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <TrendingUpIcon sx={{ mr: 1, color: 'primary.main', fontSize: 28 }} />
              <Typography variant="h5" fontWeight="bold">
                Destinos Mais Vendidos
              </Typography>
            </Box>
            {topDestinations.length > 0 ? (
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={topDestinations} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="name"
                    angle={-45}
                    textAnchor="end"
                    height={100}
                    style={{ fontSize: '14px' }}
                  />
                  <YAxis style={{ fontSize: '14px' }} />
                  <Tooltip
                    contentStyle={{ fontSize: '14px' }}
                    cursor={{ fill: 'rgba(136, 132, 216, 0.1)' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '14px' }} />
                  <Bar dataKey="value" fill="#8884d8" name="Vendas" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 350 }}>
                <Typography color="textSecondary" variant="h6">Nenhum dado disponível</Typography>
              </Box>
            )}
          </Paper>
        </Grid>


        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <PlaceIcon sx={{ mr: 1, color: 'primary.main', fontSize: 28 }} />
              <Typography variant="h5" fontWeight="bold">
                Distribuição de Destinos
              </Typography>
            </Box>
            {topDestinations.length > 0 ? (
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={topDestinations}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {topDestinations.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ fontSize: '14px' }} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 350 }}>
                <Typography color="textSecondary" variant="h6">Nenhum dado disponível</Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* Filtros */}
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Filtros
        </Typography>

        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Buscar por cliente ou voucher"
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              InputProps={{
                endAdornment: <SearchIcon position="end" />
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
              <DatePicker
                label="Data inicial"
                value={filters.startDate}
                onChange={(date) => setFilters(prev => ({ ...prev, startDate: date }))}
                slotProps={{ textField: { fullWidth: true } }}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
              <DatePicker
                label="Data final"
                value={filters.endDate}
                onChange={(date) => setFilters(prev => ({ ...prev, endDate: date }))}
                slotProps={{ textField: { fullWidth: true } }}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth>
              <InputLabel>Destino</InputLabel>
              <Select
                name="destination"
                value={filters.destination}
                onChange={handleFilterChange}
                label="Destino"
              >
                <MenuItem value="">Todos</MenuItem>
                {destinations.map((destination) => (
                  <MenuItem key={destination} value={destination}>
                    {destination}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={1}>
            <Button
              variant="outlined"
              fullWidth
              onClick={handleClearFilters}
            >
              Limpar
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Tabela de vendas */}
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Vendas Realizadas
        </Typography>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Voucher</TableCell>
                    <TableCell>Data</TableCell>
                    <TableCell>Cliente</TableCell>
                    <TableCell>Destinos</TableCell>
                    <TableCell align="right">Valor</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredTrips.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} align="center">
                        Nenhuma venda encontrada
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredTrips
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((voucher) => (
                        <TableRow key={voucher.id}>
                          <TableCell>{voucher.voucherNumber}</TableCell>
                          <TableCell>{formatDate(voucher.saleDate)}</TableCell>
                          <TableCell>
                            <Typography variant="body2">{voucher.customer.name}</Typography>
                            <Typography variant="caption" color="textSecondary">
                              CPF: {voucher.customer.cpf}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Stack direction="row" spacing={1} flexWrap="wrap">
                              {voucher.voucherTrips.map((voucherTrip) => (
                                <Chip
                                  key={voucherTrip.id}
                                  label={voucherTrip.trip.destination}
                                  size="small"
                                  sx={{ my: 0.5 }}
                                />
                              ))}
                            </Stack>
                          </TableCell>
                          <TableCell align="right">
                            <Typography fontWeight="bold">
                              R$ {voucher.totalValue.toFixed(2)}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 50]}
              component="div"
              count={filteredTrips.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage="Linhas por página:"
              labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
            />
          </>
        )}
      </Paper>
    </Box>
  );
}
