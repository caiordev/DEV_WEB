# Material UI - Configuração do Projeto

## 📦 Pacotes Instalados

```bash
npm install @mui/material @emotion/react @emotion/styled
```

## 🎨 Tema Personalizado

O projeto utiliza um tema personalizado do Material UI localizado em `src/theme.js` com as seguintes cores:

### Paleta de Cores

- **Primary**: `#2563eb` (Azul)
- **Secondary**: `#0891b2` (Ciano)
- **Success**: `#10b981` (Verde)
- **Warning**: `#f59e0b` (Laranja)
- **Error**: `#ef4444` (Vermelho)
- **Info**: `#06b6d4` (Azul claro)

### Cores de Texto

- **Primary**: `#1f2937` (Cinza escuro)
- **Secondary**: `#6b7280` (Cinza médio)
- **Disabled**: `#9ca3af` (Cinza claro)

### Cores de Fundo

- **Default**: `#ffffff` (Branco)
- **Paper**: `#f9fafb` (Cinza muito claro)

## 📁 Estrutura de Arquivos

```
src/
├── theme.js              # Configuração do tema Material UI
├── index.css             # CSS global com variáveis CSS
├── main.jsx              # Ponto de entrada com ThemeProvider
├── App.jsx               # Componente principal
└── components/
    └── ThemeDemo.jsx     # Componente de demonstração
```

## 🚀 Como Usar

### 1. Importar Componentes do Material UI

```jsx
import { Button, Card, Typography } from '@mui/material';
```

### 2. Usar o Tema nas Props

```jsx
<Button variant="contained" color="primary">
  Clique aqui
</Button>
```

### 3. Usar CSS Variables

As variáveis CSS estão disponíveis globalmente:

```css
.meu-elemento {
  color: var(--primary-color);
  padding: var(--spacing-md);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
}
```

### 4. Usar o Sistema de Espaçamento

```jsx
<Box sx={{ p: 2, m: 3, mt: 4 }}>
  {/* p = padding, m = margin */}
  {/* Cada unidade = 8px (configurado no tema) */}
</Box>
```

## 📚 Variáveis CSS Disponíveis

### Cores
- `--primary-color`, `--primary-dark`, `--primary-light`
- `--secondary-color`, `--secondary-dark`
- `--success-color`, `--warning-color`, `--error-color`, `--info-color`
- `--text-primary`, `--text-secondary`, `--text-light`, `--text-white`
- `--bg-primary`, `--bg-secondary`, `--bg-tertiary`, `--bg-dark`
- `--border-color`, `--border-light`

### Sombras
- `--shadow-sm`, `--shadow-md`, `--shadow-lg`, `--shadow-xl`

### Espaçamentos
- `--spacing-xs` (0.25rem)
- `--spacing-sm` (0.5rem)
- `--spacing-md` (1rem)
- `--spacing-lg` (1.5rem)
- `--spacing-xl` (2rem)
- `--spacing-2xl` (3rem)
- `--spacing-3xl` (4rem)

### Tipografia
- `--font-size-xs` até `--font-size-4xl`
- `--font-weight-normal`, `--font-weight-medium`, `--font-weight-semibold`, `--font-weight-bold`
- `--line-height-tight`, `--line-height-normal`, `--line-height-relaxed`

### Border Radius
- `--radius-sm` até `--radius-2xl`, `--radius-full`

### Transições
- `--transition-fast` (150ms)
- `--transition-base` (200ms)
- `--transition-slow` (300ms)

### Larguras de Container
- `--container-sm` (640px)
- `--container-md` (768px)
- `--container-lg` (1024px)
- `--container-xl` (1280px)
- `--container-2xl` (1536px)

### Z-index
- `--z-dropdown` (1000)
- `--z-sticky` (1020)
- `--z-fixed` (1030)
- `--z-modal-backdrop` (1040)
- `--z-modal` (1050)
- `--z-popover` (1060)
- `--z-tooltip` (1070)

## 🎯 Exemplos de Uso

### Botões

```jsx
<Button variant="contained" color="primary">Primary</Button>
<Button variant="outlined" color="secondary">Secondary</Button>
<Button variant="text">Text Button</Button>
```

### Cards

```jsx
<Card>
  <CardContent>
    <Typography variant="h5">Título</Typography>
    <Typography variant="body2" color="text.secondary">
      Conteúdo do card
    </Typography>
  </CardContent>
  <CardActions>
    <Button size="small">Ação</Button>
  </CardActions>
</Card>
```

### Formulários

```jsx
<TextField
  label="Nome"
  variant="outlined"
  fullWidth
  placeholder="Digite seu nome"
/>
```

### Alertas

```jsx
<Alert severity="success">Operação realizada com sucesso!</Alert>
<Alert severity="error">Erro ao processar.</Alert>
<Alert severity="warning">Atenção!</Alert>
<Alert severity="info">Informação importante.</Alert>
```

### Grid Layout

```jsx
import { Grid2 as Grid } from '@mui/material';

<Grid container spacing={2}>
  <Grid size={{ xs: 12, md: 6 }}>
    <Card>Conteúdo 1</Card>
  </Grid>
  <Grid size={{ xs: 12, md: 6 }}>
    <Card>Conteúdo 2</Card>
  </Grid>
</Grid>
```

## 📖 Recursos

- [Material UI Documentation](https://mui.com/)
- [Material UI Components](https://mui.com/material-ui/all-components/)
- [Material UI Customization](https://mui.com/material-ui/customization/theming/)
- [Emotion Documentation](https://emotion.sh/docs/introduction)

## 🎨 Customização Adicional

Para customizar componentes específicos, edite o arquivo `src/theme.js` na seção `components`:

```javascript
components: {
  MuiButton: {
    styleOverrides: {
      root: {
        // Seus estilos aqui
      },
    },
  },
}
```
