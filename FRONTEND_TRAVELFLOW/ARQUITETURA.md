# 🏗️ Arquitetura do Projeto TravelFlow

## 📁 Estrutura de Pastas

```
src/
├── components/           # Componentes reutilizáveis
│   ├── common/          # Componentes comuns (ProtectedRoute, etc)
│   ├── layout/          # Componentes de layout (Header, Footer, etc)
│   └── ThemeDemo.jsx    # Componente de demonstração do tema
│
├── contexts/            # Contextos React (Context API)
│   └── AuthContext.jsx  # Contexto de autenticação
│
├── pages/               # Páginas da aplicação
│   ├── Home/
│   │   └── Home.jsx
│   ├── Login/
│   │   └── Login.jsx
│   └── Dashboard/
│       └── Dashboard.jsx
│
├── routes/              # Configuração de rotas
│   └── index.jsx
│
├── assets/              # Arquivos estáticos (imagens, ícones, etc)
│
├── App.jsx              # Componente raiz
├── main.jsx             # Ponto de entrada
├── theme.js             # Configuração do tema Material UI
└── index.css            # Estilos globais e variáveis CSS
```

## 🎯 Padrões e Convenções

### 1. Organização por Feature

Cada feature/página tem sua própria pasta dentro de `pages/`:
- Facilita manutenção
- Código mais organizado
- Fácil de escalar

### 2. Componentes Reutilizáveis

**`components/common/`** - Componentes genéricos usados em várias partes:
- `ProtectedRoute.jsx` - Proteção de rotas autenticadas

**`components/layout/`** - Componentes de estrutura:
- `Header.jsx` - Cabeçalho da aplicação
- `MainLayout.jsx` - Layout principal com Header e Outlet

### 3. Context API para Estado Global

**`contexts/AuthContext.jsx`**
- Gerencia autenticação do usuário
- Fornece hooks: `useAuth()`
- Persiste dados no localStorage

### 4. Roteamento

**`routes/index.jsx`**
- Centraliza todas as rotas
- Rotas públicas e protegidas
- Redirecionamentos automáticos

## 🔐 Sistema de Autenticação

### AuthContext

```jsx
const { user, login, logout, isAuthenticated, loading } = useAuth();
```

**Funcionalidades:**
- `user` - Dados do usuário logado
- `login(email, password)` - Função de login
- `logout()` - Função de logout
- `isAuthenticated` - Boolean indicando se está autenticado
- `loading` - Estado de carregamento

### ProtectedRoute

Componente que protege rotas que requerem autenticação:

```jsx
<Route
  element={
    <ProtectedRoute>
      <MainLayout />
    </ProtectedRoute>
  }
>
  <Route path="/dashboard" element={<Dashboard />} />
</Route>
```

## 🎨 Sistema de Temas

### Material UI Theme (`theme.js`)

Tema customizado com:
- Paleta de cores personalizada
- Tipografia configurada
- Componentes estilizados
- Sombras e espaçamentos

### CSS Variables (`index.css`)

Variáveis CSS globais para uso direto:
```css
color: var(--primary-color);
padding: var(--spacing-md);
border-radius: var(--radius-lg);
```

## 📄 Páginas

### Home (`pages/Home/Home.jsx`)
- Landing page pública
- Hero section
- Features
- Call-to-action

### Login (`pages/Login/Login.jsx`)
- Formulário de login
- Validação de campos
- Integração com AuthContext
- Design moderno e responsivo

### Dashboard (`pages/Dashboard/Dashboard.jsx`)
- Página protegida (requer autenticação)
- Estatísticas do usuário
- Próximas viagens
- Perfil do usuário

## 🛣️ Rotas

### Rotas Públicas
- `/` - Home
- `/login` - Login (redireciona para /dashboard se autenticado)

### Rotas Protegidas
- `/dashboard` - Dashboard principal
- `/profile` - Perfil do usuário

### Redirecionamentos
- Usuário não autenticado → `/login`
- Usuário autenticado em `/login` → `/dashboard`
- Rota não encontrada → `/`

## 🔄 Fluxo de Autenticação

```
1. Usuário acessa /login
2. Preenche email e senha
3. Clica em "Entrar"
4. AuthContext.login() é chamado
5. Dados são validados
6. Se válido:
   - User é salvo no state e localStorage
   - Redireciona para /dashboard
7. Se inválido:
   - Exibe mensagem de erro
```

## 🎨 Componentes Material UI Utilizados

### Layout & Structure
- `Container` - Container responsivo
- `Box` - Container flexível
- `Grid2` - Sistema de grid
- `Stack` - Layout em pilha

### Navigation
- `AppBar` - Barra de navegação
- `Toolbar` - Toolbar do AppBar
- `Menu` - Menu dropdown

### Data Display
- `Card` - Cards de conteúdo
- `Typography` - Textos estilizados
- `Avatar` - Avatares
- `Chip` - Tags/chips

### Inputs
- `TextField` - Campos de texto
- `Button` - Botões
- `IconButton` - Botões com ícones

### Feedback
- `Alert` - Alertas
- `CircularProgress` - Loading spinner

### Icons
- `@mui/icons-material` - Biblioteca de ícones

## 🚀 Como Adicionar Novas Features

### 1. Nova Página

```bash
# Criar pasta da página
src/pages/NovaPage/
  └── NovaPage.jsx
```

```jsx
// NovaPage.jsx
import { Container, Typography } from '@mui/material';

function NovaPage() {
  return (
    <Container>
      <Typography variant="h4">Nova Página</Typography>
    </Container>
  );
}

export default NovaPage;
```

### 2. Adicionar Rota

```jsx
// routes/index.jsx
import NovaPage from '../pages/NovaPage/NovaPage';

// Adicionar dentro de <Routes>
<Route path="/nova-page" element={<NovaPage />} />
```

### 3. Novo Contexto

```bash
# Criar arquivo de contexto
src/contexts/NovoContext.jsx
```

```jsx
import { createContext, useContext, useState } from 'react';

const NovoContext = createContext(null);

export const useNovo = () => {
  const context = useContext(NovoContext);
  if (!context) {
    throw new Error('useNovo deve ser usado dentro de NovoProvider');
  }
  return context;
};

export const NovoProvider = ({ children }) => {
  const [state, setState] = useState(null);

  const value = {
    state,
    setState,
  };

  return <NovoContext.Provider value={value}>{children}</NovoContext.Provider>;
};
```

### 4. Novo Componente Comum

```bash
# Criar componente
src/components/common/NovoComponente.jsx
```

```jsx
import { Box } from '@mui/material';

function NovoComponente({ children }) {
  return <Box>{children}</Box>;
}

export default NovoComponente;
```

## 📦 Dependências Principais

```json
{
  "react": "^19.2.0",
  "react-dom": "^19.2.0",
  "react-router-dom": "^6.x",
  "@mui/material": "^5.x",
  "@mui/icons-material": "^5.x",
  "@emotion/react": "^11.x",
  "@emotion/styled": "^11.x"
}
```

## 🎯 Próximos Passos

1. **Integração com API Backend**
   - Criar serviço de API
   - Implementar chamadas reais
   - Gerenciamento de tokens

2. **Validação de Formulários**
   - Adicionar biblioteca como Formik ou React Hook Form
   - Validação com Yup ou Zod

3. **Estado Global Avançado**
   - Considerar Redux Toolkit ou Zustand
   - Para estados mais complexos

4. **Testes**
   - Jest + React Testing Library
   - Testes unitários e de integração

5. **Performance**
   - Code splitting
   - Lazy loading de rotas
   - Otimização de imagens

## 📚 Recursos

- [React Documentation](https://react.dev/)
- [React Router](https://reactrouter.com/)
- [Material UI](https://mui.com/)
- [Vite](https://vitejs.dev/)
