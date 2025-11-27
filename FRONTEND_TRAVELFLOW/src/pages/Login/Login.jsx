import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  InputAdornment,
  IconButton,
  Link,
  Container,
} from '@mui/material';
import { Visibility, VisibilityOff, Email, Lock, Flight } from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validações
    if (!formData.username || !formData.password) {
      setError('Por favor, preencha todos os campos');
      setLoading(false);
      return;
    }

    if (formData.username.length < 3) {
      setError('O nome de usuário deve ter pelo menos 3 caracteres');
      setLoading(false);
      return;
    }

    const result = await login(formData.username, formData.password);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error || 'Erro ao fazer login');
    }

    setLoading(false);
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
          background: 'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(14, 165, 233, 0.3) 0%, transparent 50%)',
          animation: 'pulse 15s ease-in-out infinite',
        },
        '@keyframes pulse': {
          '0%, 100%': {
            opacity: 1,
          },
          '50%': {
            opacity: 0.8,
          },
        },
      }}
    >
      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
        <Box
          sx={{
            textAlign: 'center',
            mb: 4,
            animation: 'fadeInDown 0.8s ease-out',
            '@keyframes fadeInDown': {
              from: {
                opacity: 0,
                transform: 'translateY(-20px)',
              },
              to: {
                opacity: 1,
                transform: 'translateY(0)',
              },
            },
          }}
        >
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 80,
              height: 80,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #3b82f6 0%, #0ea5e9 100%)',
              boxShadow: '0 10px 40px rgba(59, 130, 246, 0.4)',
              mb: 2,
            }}
          >
            <Flight sx={{ fontSize: 40, color: 'white' }} />
          </Box>
          <Typography
            variant="h3"
            fontWeight={800}
            sx={{
              color: 'white',
              textShadow: '0 2px 20px rgba(0,0,0,0.2)',
              mb: 1,
            }}
          >
            TravelFlow
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'rgba(255, 255, 255, 0.9)',
              fontSize: '1.1rem',
            }}
          >
            Sua jornada começa aqui ✈️
          </Typography>
        </Box>

        <Card
          elevation={0}
          sx={{
            borderRadius: 4,
            overflow: 'hidden',
            backdropFilter: 'blur(20px)',
            background: 'rgba(255, 255, 255, 0.95)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            animation: 'fadeInUp 0.8s ease-out',
            '@keyframes fadeInUp': {
              from: {
                opacity: 0,
                transform: 'translateY(20px)',
              },
              to: {
                opacity: 1,
                transform: 'translateY(0)',
              },
            },
          }}
        >

          <CardContent sx={{ p: 5 }}>
            <Typography
              variant="h4"
              fontWeight={700}
              gutterBottom
              textAlign="center"
              sx={{
                background: 'linear-gradient(135deg, #3b82f6 0%, #0ea5e9 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 1,
              }}
            >
              Bem-vindo!
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              textAlign="center"
              sx={{ mb: 4 }}
            >
              Entre com suas credenciais para continuar
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Usuário"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                margin="normal"
                autoComplete="username"
                autoFocus
                placeholder="Digite seu nome de usuário"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email color="action" />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                label="Senha"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                margin="normal"
                autoComplete="current-password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Box sx={{ textAlign: 'right', mt: 1 }}>
                <Link
                  href="#"
                  variant="body2"
                  underline="hover"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Funcionalidade em desenvolvimento');
                  }}
                >
                  Esqueceu a senha?
                </Link>
              </Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                sx={{
                  mt: 4,
                  mb: 2,
                  py: 1.8,
                  fontWeight: 600,
                  textTransform: 'none',
                  fontSize: '1.1rem',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #0ea5e9 100%)',
                  boxShadow: '0 4px 20px rgba(59, 130, 246, 0.4)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #2563eb 0%, #0284c7 100%)',
                    boxShadow: '0 6px 25px rgba(59, 130, 246, 0.5)',
                    transform: 'translateY(-2px)',
                  },
                  '&:disabled': {
                    background: 'linear-gradient(135deg, #94a3b8 0%, #cbd5e1 100%)',
                  },
                }}
              >
                {loading ? 'Entrando...' : 'Entrar'}
              </Button>

              <Box sx={{ textAlign: 'center', mt: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  Esqueceu sua senha?{' '}
                  <Link
                    href="#"
                    underline="hover"
                    fontWeight={600}
                    sx={{
                      background: 'linear-gradient(135deg, #3b82f6 0%, #0ea5e9 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      alert('Funcionalidade em desenvolvimento');
                    }}
                  >
                    Recuperar
                  </Link>
                </Typography>
              </Box>
            </form>
          </CardContent>
        </Card>

        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography
            variant="body2"
            sx={{
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: '0.9rem',
            }}
          >
            © 2024 TravelFlow. Todos os direitos reservados.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Login;
