import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Avatar,
  Chip,
  Button,
  Stack,
} from '@mui/material';
import {
  Flight,
  Hotel,
  DirectionsCar,
  AttachMoney,
  TrendingUp,
  CalendarMonth,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

function Dashboard() {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Viagens Realizadas',
      value: '12',
      icon: <Flight />,
      color: 'primary.main',
      trend: '+15%',
    },
    {
      title: 'Reservas Ativas',
      value: '3',
      icon: <Hotel />,
      color: 'secondary.main',
      trend: '+8%',
    },
    {
      title: 'Aluguel de Carros',
      value: '5',
      icon: <DirectionsCar />,
      color: 'success.main',
      trend: '+23%',
    },
    {
      title: 'Economia Total',
      value: 'R$ 2.450',
      icon: <AttachMoney />,
      color: 'warning.main',
      trend: '+12%',
    },
  ];

  const upcomingTrips = [
    {
      destination: 'Paris, França',
      date: '15 Dez 2024',
      status: 'Confirmado',
      type: 'Voo + Hotel',
    },
    {
      destination: 'Tokyo, Japão',
      date: '22 Jan 2025',
      status: 'Pendente',
      type: 'Voo',
    },
    {
      destination: 'Nova York, EUA',
      date: '10 Fev 2025',
      status: 'Confirmado',
      type: 'Completo',
    },
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Olá, {user?.fullName || user?.username}! 👋
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Aqui está um resumo das suas viagens
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                height: '100%',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4,
                },
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor: stat.color,
                      width: 48,
                      height: 48,
                      mr: 2,
                    }}
                  >
                    {stat.icon}
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      {stat.title}
                    </Typography>
                    <Typography variant="h5" fontWeight={700}>
                      {stat.value}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TrendingUp sx={{ fontSize: 16, color: 'success.main', mr: 0.5 }} />
                  <Typography variant="body2" color="success.main" fontWeight={600}>
                    {stat.trend}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                    vs mês anterior
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Upcoming Trips */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <CalendarMonth sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6" fontWeight={600}>
                  Próximas Viagens
                </Typography>
              </Box>

              <Stack spacing={2}>
                {upcomingTrips.map((trip, index) => (
                  <Card
                    key={index}
                    variant="outlined"
                    sx={{
                      p: 2,
                      transition: 'all 0.2s',
                      '&:hover': {
                        borderColor: 'primary.main',
                        bgcolor: 'action.hover',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: 2,
                      }}
                    >
                      <Box>
                        <Typography variant="h6" fontWeight={600}>
                          {trip.destination}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {trip.date} • {trip.type}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                        <Chip
                          label={trip.status}
                          color={trip.status === 'Confirmado' ? 'success' : 'warning'}
                          size="small"
                        />
                        <Button variant="outlined" size="small">
                          Ver Detalhes
                        </Button>
                      </Box>
                    </Box>
                  </Card>
                ))}
              </Stack>

              <Button
                fullWidth
                variant="outlined"
                sx={{ mt: 3 }}
                startIcon={<Flight />}
              >
                Planejar Nova Viagem
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Perfil
              </Typography>
              <Box sx={{ textAlign: 'center', py: 2 }}>
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    bgcolor: 'primary.main',
                    fontSize: '2rem',
                    mx: 'auto',
                    mb: 2,
                  }}
                >
                  {(user?.fullName || user?.username)?.charAt(0).toUpperCase()}
                </Avatar>
                <Typography variant="h6" fontWeight={600}>
                  {user?.fullName || user?.username}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  @{user?.username}
                </Typography>
                <Chip
                  label={user?.role || 'Usuário'}
                  color="primary"
                  size="small"
                  sx={{ mt: 2 }}
                />
              </Box>
              <Button fullWidth variant="outlined" sx={{ mt: 2 }}>
                Editar Perfil
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Dicas Rápidas
              </Typography>
              <Stack spacing={2}>
                <Box>
                  <Typography variant="body2" fontWeight={600}>
                    ✈️ Reserve com antecedência
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Economize até 40% em passagens
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" fontWeight={600}>
                    🏨 Programa de pontos
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Acumule pontos em cada reserva
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" fontWeight={600}>
                    🎫 Ofertas exclusivas
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Confira as promoções da semana
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;
