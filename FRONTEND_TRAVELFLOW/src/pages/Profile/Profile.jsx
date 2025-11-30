import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Avatar,
  Chip,
  Divider,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  AdminPanelSettings as AdminIcon,
  AccessTime as TimeIcon,
  Edit as EditIcon
} from '@mui/icons-material';
import { authService, ApiError } from '../../services/api';

export default function Profile() {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const profileData = await authService.getProfile();
      setUserProfile(profileData);
    } catch (error) {
      console.error('Error loading user profile:', error);
      let errorMessage = 'Erro ao carregar perfil do usuário';

      if (error instanceof ApiError) {
        if (error.status === 401) {
          errorMessage = 'Sessão expirada. Faça login novamente.';
        } else if (error.status === 403) {
          errorMessage = 'Acesso negado ao perfil.';
        } else {
          errorMessage = error.message || errorMessage;
        }
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Nunca';
    const date = new Date(dateString);
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'ADMIN':
        return 'error';
      case 'MANAGER':
        return 'warning';
      case 'USER':
        return 'primary';
      default:
        return 'default';
    }
  };

  const getRoleLabel = (role) => {
    switch (role) {
      case 'ADMIN':
        return 'Administrador';
      case 'MANAGER':
        return 'Gerente';
      case 'USER':
        return 'Usuário';
      default:
        return role;
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '400px'
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ mt: 3 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: 'center', mt: 2 }}
        >
          Tente recarregar a página ou faça login novamente.
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700, color: 'primary.main' }}>
        Meu Perfil
      </Typography>

      {userProfile && (
        <Grid container spacing={3}>
          {/* Informações Principais */}
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ textAlign: 'center', pt: 3 }}>
                <Avatar
                  sx={{
                    width: 120,
                    height: 120,
                    mx: 'auto',
                    mb: 2,
                    bgcolor: 'primary.main',
                    fontSize: '3rem'
                  }}
                >
                  {userProfile.fullName?.charAt(0)?.toUpperCase() || <PersonIcon />}
                </Avatar>

                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                  {userProfile.fullName}
                </Typography>

                <Typography variant="body1" color="text.secondary" gutterBottom>
                  @{userProfile.username}
                </Typography>

                <Box sx={{ mt: 2, mb: 2 }}>
                  <Chip
                    icon={<AdminIcon />}
                    label={getRoleLabel(userProfile.role)}
                    color={getRoleColor(userProfile.role)}
                    variant="filled"
                    sx={{ fontWeight: 600 }}
                  />
                </Box>

                <Box sx={{ mt: 2 }}>
                  <Chip
                    icon={<TimeIcon />}
                    label={userProfile.active ? 'Ativo' : 'Inativo'}
                    color={userProfile.active ? 'success' : 'error'}
                    variant="outlined"
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Detalhes do Perfil */}
          <Grid item xs={12} md={8}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, flexGrow: 1 }}>
                  Informações do Perfil
                </Typography>
                <Tooltip title="Editar perfil">
                  <IconButton color="primary" sx={{ ml: 1 }}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              </Box>

              <Divider sx={{ mb: 3 }} />

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Nome Completo
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {userProfile.fullName}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Nome de Usuário
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {userProfile.username}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      <EmailIcon sx={{ mr: 1, verticalAlign: 'middle', fontSize: '1rem' }} />
                      E-mail
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {userProfile.email}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      <AdminIcon sx={{ mr: 1, verticalAlign: 'middle', fontSize: '1rem' }} />
                      Função
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {getRoleLabel(userProfile.role)}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      <TimeIcon sx={{ mr: 1, verticalAlign: 'middle', fontSize: '1rem' }} />
                      Último Login
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {formatDate(userProfile.lastLogin)}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Status da Conta
                    </Typography>
                    <Chip
                      label={userProfile.active ? 'Ativa' : 'Inativa'}
                      color={userProfile.active ? 'success' : 'error'}
                      size="small"
                    />
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Datas Importantes
                  </Typography>

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">
                        Conta criada em: {formatDate(userProfile.createdAt)}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">
                        Última atualização: {formatDate(userProfile.updatedAt)}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}
