import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Grid,
  Alert,
  CircularProgress,
  Typography,
  Divider
} from '@mui/material';
import { Save as SaveIcon, Business as BusinessIcon, Person as PersonIcon } from '@mui/icons-material';
import agencyService from '../services/agencyService';

export default function AgencyForm({ onSuccess, onError, agencyData = null }) {
  const [formData, setFormData] = useState({
    name: agencyData?.name || '',
    cnpj: agencyData?.cnpj || '',
    email: agencyData?.email || '',
    phone: agencyData?.phone || '',
    address: agencyData?.address || '',
    adminUsername: '',
    adminEmail: '',
    adminPassword: '',
    adminFullName: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const formatCNPJ = (value) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 14) {
      return numbers.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
    }
    return value;
  };

  const formatPhone = (value) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    }
    return value;
  };

  const handleCNPJChange = (e) => {
    const formatted = formatCNPJ(e.target.value);
    setFormData(prev => ({ ...prev, cnpj: formatted }));
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhone(e.target.value);
    setFormData(prev => ({ ...prev, phone: formatted }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (agencyData) {
        await agencyService.updateAgency(agencyData.id, formData);
      } else {
        await agencyService.createAgency(formData);
      }
      onSuccess && onSuccess(formData);
    } catch (err) {
      const errorMessage = err.message || 'Erro ao salvar agência';
      setError(errorMessage);
      onError && onError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <TextField
            required
            fullWidth
            name="name"
            label="Nome da Agência"
            value={formData.name}
            onChange={handleChange}
            disabled={loading}
            inputProps={{ maxLength: 100 }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            required
            fullWidth
            name="cnpj"
            label="CNPJ"
            value={formData.cnpj}
            onChange={handleCNPJChange}
            disabled={loading}
            placeholder="00.000.000/0000-00"
            inputProps={{ maxLength: 18 }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            name="email"
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            disabled={loading}
            inputProps={{ maxLength: 100 }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            name="phone"
            label="Telefone"
            value={formData.phone}
            onChange={handlePhoneChange}
            disabled={loading}
            placeholder="(00) 00000-0000"
            inputProps={{ maxLength: 15 }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="address"
            label="Endereço"
            value={formData.address}
            onChange={handleChange}
            disabled={loading}
            inputProps={{ maxLength: 200 }}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6" sx={{ mt: 2, mb: 1 }} color='text.primary'>
            Dados do Administrador da Agência
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            required
            fullWidth
            name="adminUsername"
            label="Nome de Usuário do Administrador"
            value={formData.adminUsername}
            onChange={handleChange}
            disabled={loading}
            inputProps={{ maxLength: 50 }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            fullWidth
            name="adminEmail"
            label="Email do Administrador"
            type="email"
            value={formData.adminEmail}
            onChange={handleChange}
            disabled={loading}
            inputProps={{ maxLength: 100 }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            fullWidth
            name="adminPassword"
            label="Senha do Administrador"
            type="password"
            value={formData.adminPassword}
            onChange={handleChange}
            disabled={loading}
            inputProps={{ minLength: 6 }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            fullWidth
            name="adminFullName"
            label="Nome Completo do Administrador"
            value={formData.adminFullName}
            onChange={handleChange}
            disabled={loading}
            inputProps={{ maxLength: 100 }}
          />
        </Grid>
      </Grid>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          type="submit"
          variant="contained"
          startIcon={loading ? <CircularProgress size={20} /> : <SaveIcon />}
          disabled={loading}
          size="large"
        >
          {loading ? 'Salvando...' : (agencyData ? 'Atualizar' : 'Criar Agência')}
        </Button>
      </Box>
    </Box>
  );
}
