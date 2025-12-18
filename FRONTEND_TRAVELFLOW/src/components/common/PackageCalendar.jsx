import { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  IconButton,
  Popover,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert
} from '@mui/material';
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon
} from '@mui/icons-material';
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
  isToday,
  parse
} from 'date-fns';
import { ptBR } from 'date-fns/locale';
import voucherService from '../../services/voucherService';

export default function PackageCalendar() {
  const [packages, setPackages] = useState([]);
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedDayEvents, setSelectedDayEvents] = useState([]);
  const [filterType, setFilterType] = useState('viagens');
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const voucherData = await voucherService.getAllVouchers();
      setVouchers(voucherData);
      checkUpcomingTrips(voucherData);
    } catch (error) {
      console.error('Error loading data:', error);
      setVouchers([]);
    } finally {
      setLoading(false);
    }
  };

  const checkUpcomingTrips = (voucherData) => {
    const now = new Date();
    const fortyEightHoursLater = new Date(now.getTime() + 48 * 60 * 60 * 1000);
    const upcomingTrips = [];

    voucherData.forEach(voucher => {
      voucher.voucherTrips?.forEach(trip => {
        if (trip.tripDate) {
          const tripDate = new Date(trip.tripDate + 'T00:00:00');
          if (tripDate >= now && tripDate <= fortyEightHoursLater) {
            upcomingTrips.push({
              voucherNumber: voucher.voucherNumber,
              destination: trip.trip?.destination || 'N/A',
              tripDate: trip.tripDate,
              customerName: voucher.customer?.name || 'N/A'
            });
          }
        }
      });
    });

    if (upcomingTrips.length > 0) {
      setNotification({
        message: `Atenção: ${upcomingTrips.length} viagem(ns) em menos de 48 horas!`,
        severity: 'warning',
        details: upcomingTrips
      });
    } else {
      setNotification(null);
    }
  };

  function nextMonth() {
    setCurrentMonth(addMonths(currentMonth, 1));
  }

  function prevMonth() {
    setCurrentMonth(subMonths(currentMonth, 1));
  }

  const getEventsForDay = (day) => {
    const events = [];
    if (filterType === 'vendas') {
      vouchers.forEach(voucher => {
        if (voucher.saleDate && isSameDay(new Date(voucher.saleDate), day)) {
          events.push({ type: 'sale', voucher });
        }
      });
    } else {
      vouchers.forEach(voucher => {
        voucher.voucherTrips?.forEach(trip => {
          if (trip.tripDate && isSameDay(new Date(trip.tripDate + 'T00:00:00'), day)) {
            events.push({ type: 'trip', voucher, trip });
          }
        });
      });
    }
    return events;
  };

  const handleDayClick = (event, day, events) => {
    if (events.length > 0) {
      setAnchorEl(event.currentTarget);
      setSelectedDayEvents(events);
    }
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
    setSelectedDayEvents([]);
  };

  const renderCalendarDays = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { locale: ptBR });
    const endDate = endOfWeek(monthEnd, { locale: ptBR });

    const days = [];
    let day = startDate;

    while (day <= endDate) {
      days.push(day);
      day = addDays(day, 1);
    }

    return days;
  };

  const renderCalendar = () => {
    const days = renderCalendarDays();
    const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

    return (
      <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
        {/* Cabeçalho do calendário */}
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 2,
          borderBottom: '1px solid',
          borderColor: 'divider'
        }}>
          <IconButton onClick={prevMonth} size="small">
            <ChevronLeftIcon />
          </IconButton>
          <Typography variant="h6">
            {format(currentMonth, 'MMMM yyyy', { locale: ptBR })}
          </Typography>
          <IconButton onClick={nextMonth} size="small">
            <ChevronRightIcon />
          </IconButton>
        </Box>

        {/* Dias da semana */}
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          borderBottom: '1px solid',
          borderColor: 'divider'
        }}>
          {weekDays.map((weekDay, index) => (
            <Box
              key={weekDay}
              sx={{
                textAlign: 'center',
                fontSize: '0.875rem',
                fontWeight: 500,
                color: 'text.secondary',
                py: 1.5,
                borderRight: index < 6 ? '1px solid' : 'none',
                borderColor: 'divider'
              }}
            >
              {weekDay}
            </Box>
          ))}
        </Box>

        {/* Dias do mês */}
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)'
        }}>
          {days.map((day, index) => {
            const dayEvents = getEventsForDay(day);
            const isCurrentMonth = isSameMonth(day, currentMonth);
            const isTodayDate = isToday(day);
            const row = Math.floor(index / 7);
            const col = index % 7;

            return (
              <Box
                key={index}
                onClick={(e) => handleDayClick(e, day, dayEvents)}
                sx={{
                  minHeight: 100,
                  borderRight: col < 6 ? '1px solid' : 'none',
                  borderBottom: row < Math.floor(days.length / 7) ? '1px solid' : 'none',
                  borderColor: 'divider',
                  p: 1,
                  cursor: dayEvents.length > 0 ? 'pointer' : 'default',
                  position: 'relative',
                  transition: 'all 0.2s',
                  backgroundColor: 'transparent',
                  outline: isTodayDate ? '2px solid' : 'none',
                  outlineColor: isTodayDate ? 'primary.main' : undefined,
                  borderRadius: isTodayDate ? 1 : 0,
                  '&:hover': dayEvents.length > 0 ? {
                    backgroundColor: 'action.hover'
                  } : {}
                }}
              >
                <Typography
                  variant="body2"
                  fontWeight={isTodayDate ? 'bold' : 'normal'}
                  color={isCurrentMonth ? 'text.primary' : 'text.disabled'}
                  sx={{ mb: 0.5 }}
                >
                  {format(day, 'd')}
                </Typography>

                {dayEvents.length > 0 && (
                  <Box sx={{ mt: 0.5 }}>
                    {dayEvents.slice(0, 2).map((event, idx) => (
                      <Box
                        key={idx}
                        sx={{
                          fontSize: '0.6rem',
                          mb: 0.5,
                          px: 0.5,
                          py: 0.25,
                          backgroundColor: 'primary.main',
                          color: 'primary.contrastText',
                          borderRadius: 0.5,
                          lineHeight: 1.2,
                          maxHeight: '3rem',
                          overflow: 'hidden'
                        }}
                      >
                        {event.type === 'sale' ? (
                          <>
                            <Box sx={{ fontWeight: 'bold' }}>Venda {event.voucher.voucherNumber}</Box>
                            <Box>Cliente: {event.voucher.customer?.name || 'N/A'}</Box>
                            <Box>Valor: R$ {event.voucher.totalValue?.toFixed(2) || '0.00'}</Box>
                            <Box>Destinos: {event.voucher.voucherTrips?.length || 0}</Box>
                          </>
                        ) : (
                          <>
                            <Box sx={{ fontWeight: 'bold' }}>Viagem {event.trip.trip?.destination || 'N/A'}</Box>
                            <Box>Voucher: {event.voucher.voucherNumber}</Box>
                            <Box>Cliente: {event.voucher.customer?.name || 'N/A'}</Box>
                            <Box>Data: {event.trip.tripDate}</Box>
                            <Box>Passageiros: {event.trip.passengerCount}</Box>
                          </>
                        )}
                      </Box>
                    ))}
                    {dayEvents.length > 2 && (
                      <Typography
                        variant="caption"
                        sx={{
                          fontSize: '0.7rem',
                          color: 'text.secondary'
                        }}
                      >
                        +{dayEvents.length - 2}
                      </Typography>
                    )}
                  </Box>
                )}
              </Box>
            );
          })}
        </Box>
      </Box>
    );
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" color='primary.main'>Calendário</Typography>
      </Box>

      <Box sx={{ mb: 2 }}>
        <FormControl size="small">
          <InputLabel>Filtro</InputLabel>
          <Select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            label="Filtro"
          >
            <MenuItem value="vendas">Vendas</MenuItem>
            <MenuItem value="viagens">Viagens</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        renderCalendar()
      )}

      {notification && (
        <Snackbar
          open={Boolean(notification)}
          autoHideDuration={10000}
          onClose={() => setNotification(null)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert 
            onClose={() => setNotification(null)} 
            severity={notification.severity} 
            sx={{ width: '100%' }}
          >
            {notification.message}
            {notification.details && (
              <Box sx={{ mt: 1 }}>
                {notification.details.map((trip, idx) => (
                  <Typography key={idx} variant="body2">
                    Voucher {trip.voucherNumber} - {trip.destination} ({trip.customerName}) - {new Date(trip.tripDate).toLocaleString('pt-BR')}
                  </Typography>
                ))}
              </Box>
            )}
          </Alert>
        </Snackbar>
      )}

      {/* Popover para mostrar vouchers do dia */}
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Box sx={{ p: 2, minWidth: 320, maxWidth: 400 }}>
          <Typography variant="h6" gutterBottom color='text.primary'>
            {filterType === 'vendas' ? 'Vendas' : 'Viagens'}
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <List dense>
            {selectedDayEvents.map((event, index) => (
              <Box key={index}>
                <ListItem sx={{ px: 0, alignItems: 'flex-start' }}>
                  <ListItemText
                    primary={
                      <Typography variant="body1" fontWeight="bold">
                        {event.type === 'sale' ? `Venda ${event.voucher.voucherNumber}` : `Viagem ${event.trip.trip?.destination || 'N/A'}`}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography variant="body2" color="text.secondary">
                          Cliente: {event.voucher.customer?.name || 'N/A'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Valor: R$ {event.voucher.totalValue?.toFixed(2) || '0.00'}
                        </Typography>
                        {event.type === 'trip' && (
                          <>
                            <Typography variant="body2" color="text.secondary">
                              Data: {event.trip.tripDate}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Passageiros: {event.trip.passengerCount}
                            </Typography>
                          </>
                        )}
                        <Typography variant="body2" color="text.secondary">
                          Destinos: {event.voucher.voucherTrips?.length || 0}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
                {index < selectedDayEvents.length - 1 && <Divider />}
              </Box>
            ))}
          </List>
        </Box>
      </Popover>
    </Box>
  );
}
