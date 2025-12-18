import { useCallback, useEffect, useState } from 'react';
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
  Tooltip,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  TextField
} from '@mui/material';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  AdminPanelSettings as AdminIcon,
  AccessTime as TimeIcon,
  Edit as EditIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { authService, ApiError } from '../../services/api';

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

function InfoItem({ label, value, icon, valueNode }) {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        {icon}
        {label}
      </Typography>
      {valueNode || (
        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          {value}
        </Typography>
      )}
    </Box>
  );
}

function ProfileContent({ userProfile, onEdit }) {
  return (
    <Grid container spacing={3}>
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

      <Grid item xs={12} md={8}>
        <Paper elevation={2} sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, flexGrow: 1, color: 'text.primary' }}>
              Informações do Perfil
            </Typography>
            <Tooltip title="Editar perfil">
              <IconButton color="primary" sx={{ ml: 1 }} onClick={onEdit}>
                <EditIcon />
              </IconButton>
            </Tooltip>
          </Box>

          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <InfoItem label="Nome Completo" value={userProfile.fullName} />
            </Grid>

            <Grid item xs={12} sm={6}>
              <InfoItem label="Nome de Usuário" value={userProfile.username} />
            </Grid>

            <Grid item xs={12} sm={6}>
              <InfoItem
                label="E-mail"
                value={userProfile.email}
                icon={<EmailIcon sx={{ mr: 1, verticalAlign: 'middle', fontSize: '1rem' }} />}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <InfoItem
                label="Função"
                value={getRoleLabel(userProfile.role)}
                icon={<AdminIcon sx={{ mr: 1, verticalAlign: 'middle', fontSize: '1rem' }} />}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <InfoItem
                label="Último Login"
                value={formatDate(userProfile.lastLogin)}
                icon={<TimeIcon sx={{ mr: 1, verticalAlign: 'middle', fontSize: '1rem' }} />}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <InfoItem
                label="Status da Conta"
                valueNode={(
                  <Chip
                    label={userProfile.active ? 'Ativa' : 'Inativa'}
                    color={userProfile.active ? 'success' : 'error'}
                    size="small"
                  />
                )}
              />
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
  );
}

export default function Profile({ open, onClose }) {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [editForm, setEditForm] = useState({ fullName: '', email: '' });
  const [editSaving, setEditSaving] = useState(false);
  const [editError, setEditError] = useState(null);

  const isModal = typeof open === 'boolean';

  const loadUserProfile = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    if (!isModal || open) {
      loadUserProfile();
    }
  }, [isModal, open, loadUserProfile]);

  const handleClose = useCallback(() => {
    onClose?.();
  }, [onClose]);

  const handleOpenEdit = useCallback(() => {
    if (!userProfile) return;
    setEditError(null);
    setEditForm({
      fullName: userProfile.fullName || '',
      email: userProfile.email || ''
    });
    setEditOpen(true);
  }, [userProfile]);

  const handleCloseEdit = useCallback(() => {
    if (editSaving) return;
    setEditOpen(false);
  }, [editSaving]);

  const handleSaveEdit = useCallback(async () => {
    try {
      setEditSaving(true);
      setEditError(null);

      const payload = {
        fullName: editForm.fullName?.trim(),
        email: editForm.email?.trim()
      };

      if (!payload.fullName) {
        setEditError('Informe o nome completo.');
        return;
      }

      const updated = await authService.updateProfile(payload);
      setUserProfile(updated);

      const currentUserStr = localStorage.getItem('user');
      if (currentUserStr) {
        try {
          const currentUser = JSON.parse(currentUserStr);
          localStorage.setItem(
            'user',
            JSON.stringify({
              ...currentUser,
              fullName: updated?.fullName ?? currentUser.fullName,
              username: updated?.username ?? currentUser.username
            })
          );
        } catch {
          // ignore
        }
      }

      setEditOpen(false);
      await loadUserProfile();
    } catch (error) {
      console.error('Error updating profile:', error);
      let errorMessage = 'Erro ao atualizar perfil';

      if (error instanceof ApiError) {
        if (error.status === 401) {
          errorMessage = 'Sessão expirada. Faça login novamente.';
        } else if (error.status === 403) {
          errorMessage = 'Acesso negado para editar o perfil.';
        } else {
          errorMessage = error.message || errorMessage;
        }
      }

      setEditError(errorMessage);
    } finally {
      setEditSaving(false);
    }
  }, [editForm.email, editForm.fullName, loadUserProfile]);

  const body = loading ? (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: isModal ? 240 : '400px'
      }}
    >
      <CircularProgress />
    </Box>
  ) : error ? (
    <Box sx={{ mt: isModal ? 0 : 3 }}>
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
        <Button variant="contained" onClick={loadUserProfile}>
          Tentar novamente
        </Button>
      </Box>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ textAlign: 'center', mt: 2 }}
      >
        Tente recarregar a página ou faça login novamente.
      </Typography>
    </Box>
  ) : !userProfile ? (
    <Box sx={{ mt: isModal ? 0 : 3 }}>
      <Alert severity="info" sx={{ mb: 2 }}>
        Não foi possível carregar os dados do perfil.
      </Alert>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Button variant="contained" onClick={loadUserProfile}>
          Tentar novamente
        </Button>
      </Box>
    </Box>
  ) : (
    <>
      <ProfileContent userProfile={userProfile} onEdit={handleOpenEdit} />
      <Dialog open={editOpen} onClose={handleCloseEdit} fullWidth maxWidth="sm">
        <DialogTitle sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ flexGrow: 1, fontWeight: 600 }}>Editar Perfil</Box>
          <IconButton onClick={handleCloseEdit} size="small" aria-label="Fechar" disabled={editSaving}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {editError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {editError}
            </Alert>
          )}

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nome completo"
                value={editForm.fullName}
                onChange={(e) => setEditForm((prev) => ({ ...prev, fullName: e.target.value }))}
                disabled={editSaving}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="E-mail"
                type="email"
                value={editForm.email}
                onChange={(e) => setEditForm((prev) => ({ ...prev, email: e.target.value }))}
                disabled={editSaving}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit} disabled={editSaving}>
            Cancelar
          </Button>
          <Button variant="contained" onClick={handleSaveEdit} disabled={editSaving}>
            {editSaving ? 'Salvando...' : 'Salvar'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );

  if (isModal) {
    return (
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ flexGrow: 1, fontWeight: 700, color: 'primary.main' }}>Meu Perfil</Box>
          <IconButton onClick={handleClose} size="small" aria-label="Fechar">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {body}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700, color: 'primary.main' }}>
        Meu Perfil
      </Typography>

      {body}
    </Box>
  );
}
