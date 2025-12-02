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
  CircularProgress
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
  isToday
} from 'date-fns';
import { ptBR } from 'date-fns/locale';
import packageService from '../../services/packageService';
import voucherService from '../../services/voucherService';

export default function PackageCalendar() {
  const [packages, setPackages] = useState([]);
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedDayPackages, setSelectedDayPackages] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const packageData = await packageService.getAllPackages();
      setPackages(packageData);
      const voucherData = await voucherService.getAllVouchers();
      setVouchers(voucherData);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      setPackages([]);
      setVouchers([]);
    } finally {
      setLoading(false);
    }
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const getPackagesForDay = (day) => {
    const dayPackages = [];
    vouchers.forEach(voucher => {
      voucher.voucherTrips?.forEach(voucherTrip => {
        if (voucherTrip.tripDate && isSameDay(new Date(voucherTrip.tripDate), day)) {
          const pkg = packages.find(p =>
            p.trips?.some(t => t.id === voucherTrip.trip?.id) ||
            voucher.packageId === p.id
          );
          if (pkg && !dayPackages.some(dp => dp.id === pkg.id)) {
            dayPackages.push(pkg);
          }
        }
      });
    });
    return dayPackages;
  };

  const handleDayClick = (event, day, packages) => {
    if (packages.length > 0) {
      setAnchorEl(event.currentTarget);
      setSelectedDayPackages(packages);
    }
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
    setSelectedDayPackages([]);
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
            const dayPackages = getPackagesForDay(day);
            const isCurrentMonth = isSameMonth(day, currentMonth);
            const isTodayDate = isToday(day);
            const row = Math.floor(index / 7);
            const col = index % 7;

            return (
              <Box
                key={index}
                onClick={(e) => handleDayClick(e, day, dayPackages)}
                sx={{
                  minHeight: 100,
                  borderRight: col < 6 ? '1px solid' : 'none',
                  borderBottom: row < Math.floor(days.length / 7) ? '1px solid' : 'none',
                  borderColor: 'divider',
                  p: 1,
                  cursor: dayPackages.length > 0 ? 'pointer' : 'default',
                  position: 'relative',
                  transition: 'background-color 0.2s',
                  '&:hover': dayPackages.length > 0 ? {
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

                {dayPackages.length > 0 && (
                  <Box sx={{ mt: 0.5 }}>
                    {dayPackages.slice(0, 2).map((pkg, idx) => (
                      <Box
                        key={idx}
                        sx={{
                          fontSize: '0.7rem',
                          mb: 0.5,
                          px: 0.5,
                          py: 0.25,
                          backgroundColor: 'primary.main',
                          color: 'primary.contrastText',
                          borderRadius: 0.5,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {pkg.name}
                      </Box>
                    ))}
                    {dayPackages.length > 2 && (
                      <Typography
                        variant="caption"
                        sx={{
                          fontSize: '0.7rem',
                          color: 'text.secondary'
                        }}
                      >
                        +{dayPackages.length - 2}
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
        <Typography variant="h4">Calendário de Pacotes</Typography>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        renderCalendar()
      )}

      {/* Popover para mostrar pacotes do dia */}
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
          <Typography variant="h6" gutterBottom>
            Pacotes
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <List dense>
            {selectedDayPackages.map((pkg, index) => (
              <Box key={index}>
                <ListItem sx={{ px: 0, alignItems: 'flex-start' }}>
                  <ListItemText
                    primary={
                      <Typography variant="body1" fontWeight="bold">
                        {pkg.name}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography variant="body2" color="text.secondary">
                          {pkg.description?.substring(0, 50) || 'Sem descrição'}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
                {index < selectedDayPackages.length - 1 && <Divider />}
              </Box>
            ))}
          </List>
        </Box>
      </Popover>
    </Box>
  );
}
