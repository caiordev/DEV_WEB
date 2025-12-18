import { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress
} from '@mui/material';
import {
  Add as AddIcon,
  Business as BusinessIcon,
  Person as PersonIcon,
  AdminPanelSettings as AdminIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Block as BlockIcon,
  SupervisorAccount as SuperAdminIcon
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import agencyService from '../../services/agencyService';
import userService from '../../services/userService';
import AgencyForm from '../../components/AgencyForm';

export default function AdminPanel() {
  const [agencies, setAgencies] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showAgencyForm, setShowAgencyForm] = useState(false);
  const [editingAgency, setEditingAgency] = useState(null);
  const [loadingAgencies, setLoadingAgencies] = useState(false);

  const { user: currentUser } = useAuth();
  const navigate = useNavigate();
  const isSuperAdmin = currentUser?.role === 'ADMIN'; //'SUPERADMIN';

  useEffect(() => {
    checkSuperAdmin();
  }, []);

  const checkSuperAdmin = async () => {
    if (!isSuperAdmin) {
      setError('Você não tem permissão para acessar esta página');
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
      return;
    }

    loadAllAgencies();
    loadUsers();
  };

  const loadAllAgencies = async () => {
    try {
      setLoadingAgencies(true);
      const agenciesData = await agencyService.getAllAgencies();
      setAgencies(agenciesData);
    } catch (error) {
      console.error('Erro ao carregar agências:', error);
      setError('Erro ao carregar agências: ' + error.message);
    } finally {
      setLoadingAgencies(false);
    }
  };

  const loadUsers = async () => {
    try {
      setLoading(true);
      const usersData = await userService.getAllUsers();
      setUsers(usersData);
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAgencyCreated = () => {
    setSuccess('Agência criada com sucesso!');
    setShowAgencyForm(false);
    setEditingAgency(null);
    loadAllAgencies();
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleCloseAgencyForm = () => {
    setShowAgencyForm(false);
    setEditingAgency(null);
    setError('');
  };

  const handleEditAgency = (agency) => {
    setEditingAgency(agency);
    setShowAgencyForm(true);
  };

  const handleBlockAgency = async (agencyId) => {
    if (window.confirm('Tem certeza que deseja bloquear esta agência?')) {
      try {
        await agencyService.toggleAgencyBlock(agencyId, true);
        setSuccess('Agência bloqueada com sucesso!');
        loadAllAgencies();
        setTimeout(() => setSuccess(''), 3000);
      } catch (error) {
        setError('Erro ao bloquear agência: ' + error.message);
        setTimeout(() => setError(''), 5000);
      }
    }
  };

  const handleDeleteAgency = async (agencyId) => {
    if (window.confirm('Tem certeza que deseja excluir esta agência? Esta ação não pode ser desfeita!')) {
      try {
        await agencyService.deleteAgency(agencyId);
        setSuccess('Agência excluída com sucesso!');
        loadAllAgencies();
        setTimeout(() => setSuccess(''), 3000);
      } catch (error) {
        setError('Erro ao excluir agência: ' + error.message);
        setTimeout(() => setError(''), 5000);
      }
    }
  };

  const formatCnpj = (cnpj) => {
    if (!cnpj) return '';
    const numbers = cnpj.replace(/\D/g, '');
    return numbers.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
  };

  if (!isSuperAdmin) {
    return (
      <Box>
        <Alert severity="error">
          Acesso negado. Apenas Super Administradores podem acessar esta página.
        </Alert>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ display: 'flex', alignItems: 'center', gap: 1, fontWeight: 700, color: 'primary.main' }}>
          <SuperAdminIcon sx={{ fontSize: 36 }} />
          Painel Administrativo
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setShowAgencyForm(true)}
          size="large"
          sx={{ boxShadow: 3 }}
        >
          Nova Agência
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess('')}>
          {success}
        </Alert>
      )}

      <Alert severity="info" sx={{ mb: 3 }} icon={<SuperAdminIcon />}>
        Você está logado como Super Administrador. Este painel permite gerenciar todas as agências do sistema.
      </Alert>

      <Grid container spacing={3}>
        {/* Estatísticas Gerais */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <BusinessIcon color="primary" sx={{ fontSize: 48 }} />
                <Box>
                  <Typography variant="h6" color="text.secondary">Agências</Typography>
                  <Typography variant="h3" color="primary" sx={{ fontWeight: 700 }}>
                    {agencies.length}
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Total de agências cadastradas no sistema
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <PersonIcon color="primary" sx={{ fontSize: 48 }} />
                <Box>
                  <Typography variant="h6" color="text.secondary">Usuários</Typography>
                  <Typography variant="h3" color="primary" sx={{ fontWeight: 700 }}>
                    {users.length}
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Total de usuários no sistema
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Lista de Agências */}
        <Grid item xs={12}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h5" color='text.primary' sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1, fontWeight: 600 }}>
                <BusinessIcon />
                Todas as Agências
              </Typography>

              {loadingAgencies ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                  <CircularProgress />
                </Box>
              ) : agencies.length === 0 ? (
                <Alert severity="info">Nenhuma agência encontrada</Alert>
              ) : (
                <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600 }}>ID</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Nome</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>CNPJ</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Telefone</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 600 }}>Ações</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {agencies.map((agency) => (
                        <TableRow 
                          key={agency.id}
                          sx={{ '&:hover': { bgcolor: 'action.hover' } }}
                        >
                          <TableCell>{agency.id}</TableCell>
                          <TableCell sx={{ fontWeight: 500 }}>{agency.name}</TableCell>
                          <TableCell>{formatCnpj(agency.cnpj)}</TableCell>
                          <TableCell>{agency.email}</TableCell>
                          <TableCell>{agency.phone}</TableCell>
                          <TableCell align="center">
                            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                              <Tooltip title="Editar agência">
                                <IconButton 
                                  size="small" 
                                  color="primary" 
                                  onClick={() => handleEditAgency(agency)}
                                >
                                  <EditIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Bloquear agência">
                                <IconButton 
                                  size="small" 
                                  color="warning" 
                                  onClick={() => handleBlockAgency(agency.id)}
                                >
                                  <BlockIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Excluir agência">
                                <IconButton 
                                  size="small" 
                                  color="error" 
                                  onClick={() => handleDeleteAgency(agency.id)}
                                >
                                  <DeleteIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Ações Administrativas 
        <Grid item xs={12}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1, fontWeight: 600 }}>
                <AdminIcon />
                Ações Administrativas
              </Typography>

              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={() => setShowAgencyForm(true)}
                  size="large"
                >
                  Cadastrar Nova Agência
                </Button>

                <Button
                  variant="outlined"
                  startIcon={<PersonIcon />}
                  color="secondary"
                  size="large"
                  onClick={() => navigate('/users')}
                >
                  Gerenciar Usuários
                </Button>

                <Button
                  variant="outlined"
                  color="info"
                  size="large"
                  onClick={() => navigate('/dashboard')}
                >
                  Relatórios Globais
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        */}
      </Grid>

      {/* Dialog para criar/editar agência */}
      <Dialog
        open={showAgencyForm}
        onClose={handleCloseAgencyForm}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ bgcolor: 'primary.main', color: 'white' }}>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <BusinessIcon />
            {editingAgency ? 'Editar Agência' : 'Cadastrar Nova Agência'}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <AgencyForm
            onSuccess={handleAgencyCreated}
            onError={setError}
            agencyData={editingAgency}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleCloseAgencyForm} color="inherit">
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
