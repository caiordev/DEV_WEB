import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  TextField,
  Chip,
  Stack,
  Alert,
  Container,
  Grid,
} from '@mui/material';

function ThemeDemo() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack spacing={4}>
        {/* Header */}
        <Box textAlign="center">
          <Typography variant="h2" gutterBottom color="primary">
            TravelFlow
          </Typography>
          <Typography variant="h5" color="text.secondary" gutterBottom>
            Material UI com Tema Personalizado
          </Typography>
        </Box>

        {/* Color Palette */}
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Paleta de Cores
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Button variant="contained" color="primary" fullWidth>
                  Primary
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Button variant="contained" color="secondary" fullWidth>
                  Secondary
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Button variant="contained" color="success" fullWidth>
                  Success
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Button variant="contained" color="error" fullWidth>
                  Error
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Button variant="contained" color="warning" fullWidth>
                  Warning
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Button variant="contained" color="info" fullWidth>
                  Info
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Button Variants */}
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Variações de Botões
            </Typography>
            <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
              <Button variant="contained">Contained</Button>
              <Button variant="outlined">Outlined</Button>
              <Button variant="text">Text</Button>
              <Button variant="contained" disabled>
                Disabled
              </Button>
            </Stack>
          </CardContent>
        </Card>

        {/* Alerts */}
        <Stack spacing={2}>
          <Alert severity="success">
            Operação realizada com sucesso!
          </Alert>
          <Alert severity="info">
            Informação importante para o usuário.
          </Alert>
          <Alert severity="warning">
            Atenção: verifique os dados antes de continuar.
          </Alert>
          <Alert severity="error">
            Erro ao processar a solicitação.
          </Alert>
        </Stack>

        {/* Form Example */}
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Formulário de Exemplo
            </Typography>
            <Stack spacing={3}>
              <TextField
                label="Nome"
                variant="outlined"
                fullWidth
                placeholder="Digite seu nome"
              />
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                type="email"
                placeholder="seu@email.com"
              />
              <TextField
                label="Mensagem"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                placeholder="Digite sua mensagem"
              />
            </Stack>
          </CardContent>
          <CardActions>
            <Button variant="contained" color="primary">
              Enviar
            </Button>
            <Button variant="outlined">
              Cancelar
            </Button>
          </CardActions>
        </Card>

        {/* Chips */}
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Tags e Chips
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              <Chip label="React" color="primary" />
              <Chip label="Material UI" color="secondary" />
              <Chip label="Vite" color="success" />
              <Chip label="JavaScript" color="info" />
              <Chip label="CSS" color="warning" />
              <Chip label="Deletável" color="error" onDelete={() => {}} />
            </Stack>
          </CardContent>
        </Card>

        {/* Typography */}
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Tipografia
            </Typography>
            <Stack spacing={2}>
              <Typography variant="h1">Heading 1</Typography>
              <Typography variant="h2">Heading 2</Typography>
              <Typography variant="h3">Heading 3</Typography>
              <Typography variant="h4">Heading 4</Typography>
              <Typography variant="h5">Heading 5</Typography>
              <Typography variant="h6">Heading 6</Typography>
              <Typography variant="body1">
                Body 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Body 2: Texto secundário com cor mais suave.
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Container>
  );
}

export default ThemeDemo;
