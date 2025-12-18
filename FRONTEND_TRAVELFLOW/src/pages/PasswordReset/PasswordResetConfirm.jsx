import { useMemo, useState } from 'react';
import { Link as RouterLink, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Link,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { ApiError, authService } from '../../services/api';

function PasswordResetConfirm() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const initialToken = useMemo(() => {
    const stateToken = location?.state?.token;
    if (typeof stateToken === 'string' && stateToken.trim()) return stateToken;

    const queryToken = searchParams.get('token');
    return queryToken || '';
  }, [location?.state, searchParams]);

  const [token, setToken] = useState(initialToken);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const shouldShowTokenField = !initialToken;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!token) {
      setError('Informe o token.');
      return;
    }

    if (!newPassword || newPassword.length < 6) {
      setError('A nova senha deve ter pelo menos 6 caracteres.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('As senhas não conferem.');
      return;
    }

    setLoading(true);
    try {
      await authService.confirmPasswordReset(token, newPassword);
      setSuccess(true);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.status === 0 ? 'Não foi possível conectar ao servidor.' : err.message);
      } else {
        setError(err?.message || 'Erro ao confirmar recuperação de senha.');
      }
    } finally {
      setLoading(false);
    }
  };

  const backToLogin = () => {
    navigate('/login');
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
              Confirmar reset
            </Typography>

            <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mb: 3 }}>
              {shouldShowTokenField
                ? 'Informe o token recebido e defina uma nova senha.'
                : 'Defina uma nova senha.'}
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            {success && (
              <Alert severity="success" sx={{ mb: 2 }}>
                Senha atualizada com sucesso.
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              {shouldShowTokenField && (
                <TextField
                  fullWidth
                  label="Token"
                  name="token"
                  type="text"
                  value={token}
                  onChange={(e) => {
                    setToken(e.target.value);
                    setError('');
                  }}
                  margin="normal"
                  required
                />
              )}

              <TextField
                fullWidth
                label="Nova senha"
                name="newPassword"
                type={showPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  setError('');
                }}
                margin="normal"
                autoComplete="new-password"
                required
                inputProps={{ minLength: 6 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword((v) => !v)}
                        edge="end"
                        aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                label="Confirmar nova senha"
                name="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setError('');
                }}
                margin="normal"
                autoComplete="new-password"
                required
                inputProps={{ minLength: 6 }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading || success}
                sx={{
                  mt: 2,
                  py: 1.6,
                  fontWeight: 600,
                  textTransform: 'none',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #0ea5e9 100%)',
                }}
              >
                {loading ? 'Confirmando...' : 'Confirmar reset'}
              </Button>

              <Button
                type="button"
                fullWidth
                variant="outlined"
                size="large"
                onClick={backToLogin}
                sx={{ mt: 2, py: 1.6, fontWeight: 600, textTransform: 'none' }}
              >
                Voltar para o login
              </Button>

              <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Link component={RouterLink} to="/password-reset" underline="hover" fontWeight={600}>
                  Solicitar novo token
                </Link>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default PasswordResetConfirm;
