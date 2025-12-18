import { useMemo, useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  InputAdornment,
  TextField,
  Typography,
  Link,
} from '@mui/material';
import { Email } from '@mui/icons-material';
import { ApiError, authService } from '../../services/api';

function PasswordResetRequest() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(null);

  const expiresAtLabel = useMemo(() => {
    if (!success?.expiresAt) return null;
    try {
      return new Date(success.expiresAt).toLocaleString('pt-BR');
    } catch {
      return String(success.expiresAt);
    }
  }, [success?.expiresAt]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Informe o e-mail.');
      return;
    }

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) {
      setError('Informe um e-mail válido.');
      return;
    }

    setLoading(true);
    try {
      const data = await authService.requestPasswordReset(email);
      setSuccess(data);

      navigate('/password-reset/confirm', {
        replace: true,
        state: {
          token: data?.token || '',
        },
      });
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.status === 0 ? 'Não foi possível conectar ao servidor.' : err.message);
      } else {
        setError(err?.message || 'Erro ao solicitar recuperação de senha.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(14, 165, 233, 0.3) 0%, transparent 50%)',
        },
      }}
    >
      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1, px: { xs: 2, sm: 3 } }}>
        <Card
          elevation={0}
          sx={{
            borderRadius: 4,
            backdropFilter: 'blur(20px)',
            background: 'rgba(255, 255, 255, 0.95)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          }}
        >
          <CardContent sx={{ p: { xs: 3, sm: 5 } }}>
            <Typography
              variant="h5"
              fontWeight={700}
              textAlign="center"
              gutterBottom
              sx={{
                background: 'linear-gradient(135deg, #3b82f6 0%, #0ea5e9 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Recuperação de senha
            </Typography>

            <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mb: 3 }}>
              Informe seu e-mail para solicitar um token de reset (TTL de 30 minutos).
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            {success && (
              <Alert severity="success" sx={{ mb: 2 }}>
                Solicitação realizada.
                {expiresAtLabel ? ` (expira em: ${expiresAtLabel})` : ''}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="E-mail"
                name="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                margin="normal"
                autoComplete="email"
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email sx={{ color: '#3b82f6' }} />
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                sx={{
                  mt: 2,
                  py: 1.6,
                  fontWeight: 600,
                  textTransform: 'none',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #0ea5e9 100%)',
                }}
              >
                {loading ? 'Enviando...' : 'Solicitar reset'}
              </Button>

              <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Link component={RouterLink} to="/login" underline="hover" fontWeight={600}>
                  Voltar para o login
                </Link>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default PasswordResetRequest;
