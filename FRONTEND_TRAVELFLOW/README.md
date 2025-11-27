# ✈️ TravelFlow - Plataforma de Viagens

Uma aplicação moderna de gerenciamento de viagens construída com React, Material UI e Vite.

![React](https://img.shields.io/badge/React-19.2.0-blue)
![Material UI](https://img.shields.io/badge/Material--UI-5.x-blue)
![Vite](https://img.shields.io/badge/Vite-7.x-purple)
![License](https://img.shields.io/badge/license-MIT-green)

## 🚀 Características

- ✅ **Autenticação de Usuários** - Sistema completo de login/logout
- 🎨 **Material UI** - Interface moderna e responsiva
- 🎯 **Tema Personalizado** - Paleta de cores customizada
- 🛣️ **React Router** - Navegação com rotas protegidas
- 📱 **Responsivo** - Funciona em todos os dispositivos
- ⚡ **Vite** - Build rápido e HMR
- 🔐 **Rotas Protegidas** - Controle de acesso por autenticação

## 📦 Tecnologias

- **React 19.2.0** - Biblioteca JavaScript para interfaces
- **Material UI 5.x** - Componentes React prontos
- **React Router 6.x** - Roteamento
- **Emotion** - CSS-in-JS
- **Vite 7.x** - Build tool
- **ESLint** - Linting

## 🏗️ Estrutura do Projeto

```
src/
├── components/       # Componentes reutilizáveis
│   ├── common/      # Componentes comuns
│   └── layout/      # Layouts (Header, MainLayout)
├── contexts/        # Context API (AuthContext)
├── pages/           # Páginas da aplicação
│   ├── Home/
│   ├── Login/
│   └── Dashboard/
├── routes/          # Configuração de rotas
├── assets/          # Arquivos estáticos
├── theme.js         # Tema Material UI
└── index.css        # Estilos globais
```

📖 **Documentação completa:** [ARQUITETURA.md](./ARQUITETURA.md)

## 🎨 Design System

O projeto utiliza um design system completo com:

- **Paleta de Cores** - Primary, Secondary, Success, Warning, Error, Info
- **Tipografia** - Sistema de tamanhos e pesos
- **Espaçamentos** - Sistema de 8px
- **Sombras** - 4 níveis de elevação
- **Border Radius** - Consistência em cantos arredondados

📖 **Guia de uso:** [MATERIAL_UI_SETUP.md](./MATERIAL_UI_SETUP.md)

## 🚀 Como Executar

### Pré-requisitos

- Node.js 18+ 
- npm ou yarn

### Instalação

```bash
# Clonar o repositório
git clone <url-do-repositorio>

# Entrar na pasta
cd FRONTEND_TRAVELFLOW

# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

### Build para Produção

```bash
# Criar build otimizado
npm run build

# Preview do build
npm run preview
```

## 🔐 Sistema de Autenticação

### Login Demo

Para testar a aplicação, use qualquer email e senha válidos:

```
Email: usuario@exemplo.com
Senha: qualquer_senha
```

### Funcionalidades

- ✅ Login com validação de campos
- ✅ Persistência de sessão (localStorage)
- ✅ Logout
- ✅ Rotas protegidas
- ✅ Redirecionamento automático

## 📄 Páginas

### 🏠 Home (`/`)
- Landing page pública
- Hero section
- Features da plataforma
- Call-to-action

### 🔐 Login (`/login`)
- Formulário de autenticação
- Validação de email
- Toggle de visibilidade de senha
- Link para recuperação de senha

### 📊 Dashboard (`/dashboard`)
- **Protegida** - Requer autenticação
- Estatísticas de viagens
- Próximas viagens
- Perfil do usuário
- Cards interativos

## 🎯 Rotas

| Rota | Tipo | Descrição |
|------|------|-----------|
| `/` | Pública | Home page |
| `/login` | Pública | Página de login |
| `/dashboard` | Protegida | Dashboard principal |
| `/profile` | Protegida | Perfil do usuário |

## 🛠️ Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build
npm run build

# Preview do build
npm run preview

# Lint
npm run lint
```

## 📚 Documentação Adicional

- [Arquitetura do Projeto](./ARQUITETURA.md)
- [Configuração do Material UI](./MATERIAL_UI_SETUP.md)

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT.

## 👨‍💻 Autor

Desenvolvido com ❤️ para aprendizado e demonstração de boas práticas em React.

---

**TravelFlow** - Sua jornada começa aqui ✈️
