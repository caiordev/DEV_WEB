import { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  CardContent,
  Grid,
  Chip,
  IconButton,
  Divider,
  Alert,
  CircularProgress,
  Stack,
  Autocomplete
} from '@mui/material';
import {
  Search as SearchIcon,
  Visibility as VisibilityIcon,
  PictureAsPdf as PdfIcon,
  Edit as EditIcon,
  Cancel as CancelIcon,
  WhatsApp as WhatsAppIcon
} from '@mui/icons-material';
import customerService from '../../services/customerService';
import voucherService from '../../services/voucherService';
import exportService from '../../services/exportService';
//import whatsappService from '../../services/whatsappService';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';


export default function CustomerVoucherHistory() {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [openCancelDialog, setOpenCancelDialog] = useState(false);
  const [voucherToCancel, setVoucherToCancel] = useState(null);
  const [openWhatsAppDialog, setOpenWhatsAppDialog] = useState(false);
  const [whatsAppMessage, setWhatsAppMessage] = useState('');
  const [selectedVoucherForWhatsApp, setSelectedVoucherForWhatsApp] = useState(null);
  const [stats, setStats] = useState({
    totalVouchers: 0,
    totalSpent: 0,
    totalDestinations: 0
  });


  useEffect(() => {
    loadCustomers();
  }, []);


  const loadCustomers = async () => {
    try {
      const data = await customerService.getAllCustomers();
      setCustomers(data);
    } catch (error) {
      console.error('Erro ao carregar clientes:', error);
    }
  };


  const handleCustomerSelect = async (event, customer) => {
    setSelectedCustomer(customer);
    if (customer) {
      await loadCustomerVouchers(customer.cpf);
    } else {
      setVouchers([]);
      setStats({ totalVouchers: 0, totalSpent: 0, totalDestinations: 0 });
    }
  };


  const loadCustomerVouchers = async (cpf) => {
    setLoading(true);
    try {
      const allVouchers = await voucherService.getAllVouchers();
      const customerVouchers = allVouchers.filter(v => v.customer.cpf === cpf);
      setVouchers(customerVouchers);
      
      const totalSpent = customerVouchers.reduce((sum, v) => sum + v.totalValue, 0);
      const totalDestinations = customerVouchers.reduce((sum, v) => sum + v.voucherTrips.length, 0);
      
      setStats({
        totalVouchers: customerVouchers.length,
        totalSpent,
        totalDestinations
      });
    } catch (error) {
      console.error('Erro ao carregar vouchers:', error);
    } finally {
      setLoading(false);
    }
  };


  const handleViewDetails = (voucher) => {
    setSelectedVoucher(voucher);
    setOpenDetailDialog(true);
  };


  const handleCloseDetailDialog = () => {
    setOpenDetailDialog(false);
    setSelectedVoucher(null);
  };


  const handleCancelVoucher = (voucher) => {
    setVoucherToCancel(voucher);
    setOpenCancelDialog(true);
  };


  const confirmCancelVoucher = async () => {
    if (!voucherToCancel) return;
    
    setLoading(true);
    try {
      await voucherService.deleteVoucher(voucherToCancel.id);
      setOpenCancelDialog(false);
      setVoucherToCancel(null);
      
      if (selectedCustomer) {
        await loadCustomerVouchers(selectedCustomer.cpf);
      }
    } catch (error) {
      console.error('Erro ao cancelar voucher:', error);
      alert('Erro ao cancelar voucher: ' + error.message);
    } finally {
      setLoading(false);
    }
  };


  const handleExportPDF = () => {
    if (selectedCustomer && vouchers.length > 0) {
      exportService.exportCustomerHistoryToPDF(selectedCustomer, vouchers);
    }
  };


  const handleSendWhatsApp = (voucher) => {
    setSelectedVoucherForWhatsApp(voucher);
    setWhatsAppMessage(`Olá ${voucher.customer.name}! Aqui está o seu voucher ${voucher.voucherNumber} com valor total de R$ ${voucher.totalValue.toFixed(2)}. Obrigado por escolher a TravelFlow!`);
    setOpenWhatsAppDialog(true);
  };


  const handleSendWhatsAppMessage = async () => {
    if (!selectedVoucherForWhatsApp || !whatsAppMessage.trim()) return;

    setLoading(true);
    try {
      const response = await fetch('http://localhost:3001/api/whatsapp/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          phoneNumber: selectedVoucherForWhatsApp.customer.phone,
          message: whatsAppMessage.trim()
        })
      });

      if (!response.ok) {
        throw new Error('Erro na resposta do servidor');
      }

      const data = await response.json();
      alert('Mensagem enviada via WhatsApp com sucesso!');
      setOpenWhatsAppDialog(false);
      setWhatsAppMessage('');
      setSelectedVoucherForWhatsApp(null);
    } catch (error) {
      console.error('Erro ao enviar WhatsApp:', error);
      alert('Erro ao enviar mensagem via WhatsApp');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseWhatsAppDialog = () => {
    setOpenWhatsAppDialog(false);
    setWhatsAppMessage('');
    setSelectedVoucherForWhatsApp(null);
  };


  const getStatusColor = (status) => {
    switch (status) {
      case 'ATIVO':
      case 'Ativo':
        return 'success';
      case 'CANCELADO':
      case 'Cancelado':
        return 'error';
      case 'UTILIZADO':
      case 'Utilizado':
        return 'info';
      default:
        return 'default';
    }
  };


  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom color='primary.main'>
        Histórico de Vouchers por Cliente
      </Typography>


      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom color='text.primary'>
          Buscar Cliente
        </Typography>
        
        <Autocomplete
          options={customers}
          getOptionLabel={(option) => `${option.name} - CPF: ${option.cpf}`}
          value={selectedCustomer}
          onChange={handleCustomerSelect}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Selecione um cliente"
              placeholder="Digite o nome ou CPF"
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <>
                    <SearchIcon sx={{ mr: 1, color: 'action.active' }} />
                    {params.InputProps.startAdornment}
                  </>
                ),
              }}
            />
          )}
          fullWidth
        />
      </Paper>


      {selectedCustomer && (
        <>
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} md={4}>
              <Card sx={{ bgcolor: 'primary.light', color: 'white' }}>
                <CardContent>
                  <Typography variant="h6">Total de Vouchers</Typography>
                  <Typography variant="h3">{stats.totalVouchers}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ bgcolor: 'success.light', color: 'white' }}>
                <CardContent>
                  <Typography variant="h6">Total Gasto</Typography>
                  <Typography variant="h3">R$ {stats.totalSpent.toFixed(2)}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ bgcolor: 'info.light', color: 'white' }}>
                <CardContent>
                  <Typography variant="h6">Total de Destinos</Typography>
                  <Typography variant="h3">{stats.totalDestinations}</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>


          <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              startIcon={<PdfIcon />}
              onClick={handleExportPDF}
              disabled={vouchers.length === 0}
            >
              Exportar PDF
            </Button>
          </Box>


          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom color='text.primary'>
              Vouchers do Cliente
            </Typography>


            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                <CircularProgress />
              </Box>
            ) : vouchers.length === 0 ? (
              <Alert severity="info">Nenhum voucher encontrado para este cliente.</Alert>
            ) : (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Número</TableCell>
                      <TableCell>Data</TableCell>
                      <TableCell>Destinos</TableCell>
                      <TableCell align="right">Valor</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell align="center">Ações</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {vouchers.map((voucher) => (
                      <TableRow key={voucher.id}>
                        <TableCell>{voucher.voucherNumber}</TableCell>
                        <TableCell>
                          {format(new Date(voucher.saleDate), 'dd/MM/yyyy', { locale: ptBR })}
                        </TableCell>
                        <TableCell>
                          <Stack direction="row" spacing={1} flexWrap="wrap">
                            {voucher.voucherTrips.map((vt) => (
                              <Chip
                                key={vt.id}
                                label={vt.trip.destination}
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
                        <TableCell>
                          <Chip
                            label={voucher.status || 'Ativo'}
                            color={getStatusColor(voucher.status)}
                            size="small"
                          />
                        </TableCell>
                        <TableCell align="center">
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() => handleViewDetails(voucher)}
                            title="Ver detalhes"
                          >
                            <VisibilityIcon />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="success"
                            onClick={() => handleSendWhatsApp(voucher)}
                            title="Enviar via WhatsApp"
                          >
                            <WhatsAppIcon />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleCancelVoucher(voucher)}
                            title="Cancelar voucher"
                            disabled={voucher.status === 'CANCELADO' || voucher.status === 'Cancelado'}
                          >
                            <CancelIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Paper>
        </>
      )}


      <Dialog
        open={openDetailDialog}
        onClose={handleCloseDetailDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle color='text.primary'>Detalhes do Voucher</DialogTitle>
        <DialogContent>
          {selectedVoucher && (
            <Box>
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Número do Voucher
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {selectedVoucher.voucherNumber}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Data da Venda
                  </Typography>
                  <Typography variant="body1">
                    {format(new Date(selectedVoucher.saleDate), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Cliente
                  </Typography>
                  <Typography variant="body1">{selectedVoucher.customer.name}</Typography>
                  <Typography variant="caption">CPF: {selectedVoucher.customer.cpf}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Contato
                  </Typography>
                  <Typography variant="body1">{selectedVoucher.customer.phone}</Typography>
                  {selectedVoucher.customer.email && (
                    <Typography variant="caption">{selectedVoucher.customer.email}</Typography>
                  )}
                </Grid>
              </Grid>


              <Divider sx={{ my: 2 }} />


              <Typography variant="h6" gutterBottom color='text.primary'>
                Destinos
              </Typography>


              {selectedVoucher.voucherTrips.map((voucherTrip, index) => (
                <Card key={voucherTrip.id} sx={{ mb: 2 }}>
                  <CardContent>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom color='text.primary'>
                      {index + 1}. {voucherTrip.trip.destination}
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="textSecondary">
                          Localização
                        </Typography>
                        <Typography variant="body1">{voucherTrip.trip.location}</Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="textSecondary">
                          Data da Viagem
                        </Typography>
                        <Typography variant="body1">
                          {voucherTrip.tripDate
                            ? format(new Date(voucherTrip.tripDate), 'dd/MM/yyyy', { locale: ptBR })
                            : 'Não especificada'}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="textSecondary">
                          Passageiros
                        </Typography>
                        <Typography variant="body1">{voucherTrip.passengerCount}</Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="textSecondary">
                          Valor
                        </Typography>
                        <Typography variant="body1" fontWeight="bold">
                          R$ {(voucherTrip.trip.pricePerPerson * voucherTrip.passengerCount).toFixed(2)}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              ))}


              <Divider sx={{ my: 2 }} />


              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" color='text.primary'>Valor Total</Typography>
                <Typography variant="h5" color="primary" fontWeight="bold">
                  R$ {selectedVoucher.totalValue.toFixed(2)}
                </Typography>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetailDialog}>Fechar</Button>
        </DialogActions>
      </Dialog>


      <Dialog open={openCancelDialog} onClose={() => setOpenCancelDialog(false)}>
        <DialogTitle>Confirmar Cancelamento</DialogTitle>
        <DialogContent>
          <Typography>
            Tem certeza que deseja cancelar o voucher <strong>{voucherToCancel?.voucherNumber}</strong>?
          </Typography>
          <Alert severity="warning" sx={{ mt: 2 }}>
            Esta ação não pode ser desfeita!
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCancelDialog(false)}>Cancelar</Button>
          <Button
            onClick={confirmCancelVoucher}
            color="error"
            variant="contained"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Confirmar Cancelamento'}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog 
        open={openWhatsAppDialog} 
        onClose={handleCloseWhatsAppDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <WhatsAppIcon sx={{ color: 'success.main' }} />
          <Typography variant="h6" color='text.primary'>
            Enviar Mensagem via WhatsApp
          </Typography>
        </DialogTitle>
        <DialogContent>
          {selectedVoucherForWhatsApp && (
            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Cliente: <strong>{selectedVoucherForWhatsApp.customer.name}</strong> - 
                Telefone: <strong>{selectedVoucherForWhatsApp.customer.phone}</strong>
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Voucher: <strong>{selectedVoucherForWhatsApp.voucherNumber}</strong>
              </Typography>
              
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Mensagem para o cliente"
                placeholder="Digite a mensagem que será enviada via WhatsApp..."
                value={whatsAppMessage}
                onChange={(e) => setWhatsAppMessage(e.target.value)}
                helperText="Você pode personalizar a mensagem ou usar a sugerida"
                sx={{ mt: 2 }}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseWhatsAppDialog} disabled={loading}>
            Cancelar
          </Button>
          <Button
            onClick={handleSendWhatsAppMessage}
            variant="contained"
            color="success"
            disabled={loading || !whatsAppMessage.trim()}
            startIcon={loading ? <CircularProgress size={20} /> : <WhatsAppIcon />}
          >
            {loading ? 'Enviando...' : 'Enviar WhatsApp'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
