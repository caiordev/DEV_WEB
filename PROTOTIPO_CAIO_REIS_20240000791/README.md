================================================================================
                    TRAVELFLOW - PROTÓTIPO ESTÁTICO
          Sistema de Gestão para Agências de Viagens
================================================================================

NOME: CAIO REIS BATISTA
MATRICULA: 20240000791

📖 ÍNDICE RÁPIDO
----------------
1. Descrição do Projeto
2. Estrutura de Arquivos
3. Páginas Implementadas
4. 🚀 GUIA RÁPIDO DE INÍCIO (COMECE AQUI!)
5. 🔐 Como Fazer Login (Credenciais de Teste)
6. 📝 Criar Nova Conta
7. 🎛️ Área Administrativa
8. 🔒 Sistema de Autenticação
9. 📋 Funcionalidades por Página
10. Como Visualizar o Protótipo
11. Recursos Implementados
12. 🔧 Troubleshooting
13. 💡 Dicas e Boas Práticas
14. 📊 Dados de Demonstração
15. Próximos Passos


⚡ INÍCIO RÁPIDO (TL;DR)
------------------------
1. Abra index.html no navegador
2. Clique em "Entrar" no menu
3. Use: admin@travelflow.com / admin123
4. Explore o dashboard e funcionalidades
5. Faça logout clicando no ícone 🚪

🔑 CREDENCIAIS DE TESTE:
   Admin: admin@travelflow.com / admin123
   User:  usuario@travelflow.com / user123
   Demo:  demo@demo.com / demo123


DESCRIÇÃO DO PROJETO
--------------------
TravelFlow é um sistema completo de gestão para agências de viagens que 
integra operações administrativas, atendimento ao cliente e marketing digital.

Este protótipo demonstra as principais interfaces do sistema utilizando 
HTML5 e CSS3 puro, sem frameworks CSS externos.

⚠️ IMPORTANTE: Este é um protótipo estático para demonstração. Todos os dados
são simulados e armazenados localmente no navegador (localStorage). Não há
conexão com banco de dados real.


ESTRUTURA DE ARQUIVOS
----------------------
projeto/
├── index.html                  # Landing page principal
├── login.html                  # Página de autenticação
├── cadastro.html               # Página de registro de usuário
├── dashboard.html              # Dashboard administrativo
├── pacotes.html                # Listagem de pacotes
├── pacote-form.html            # Formulário de criação/edição de pacote
├── pacote-detalhes.html        # Página de detalhes do pacote (landing page)
├── clientes.html               # Gerenciamento de clientes
├── reservas.html               # Gerenciamento de reservas
├── css/
│   ├── variables.css           # Variáveis CSS (cores, espaçamentos, etc)
│   ├── style.css               # Estilos globais e componentes
│   ├── landing.css             # Estilos específicos da landing page
│   ├── auth.css                # Estilos de login e cadastro
│   └── dashboard.css           # Estilos do painel administrativo
└── README.txt                  # Este arquivo


PÁGINAS IMPLEMENTADAS
----------------------

1. LANDING PAGE (index.html)
   - Hero section com call-to-action
   - Seção de recursos/funcionalidades
   - Grid de pacotes em destaque
   - Footer completo
   - Botões flutuantes (WhatsApp e Chatbot)
   - Menu responsivo

2. LOGIN (login.html)
   - Formulário de autenticação
   - Toggle para mostrar/ocultar senha
   - Opção "Lembrar-me"
   - Link para recuperação de senha
   - Opções de login social (simulado)
   - Link para página de cadastro

3. CADASTRO (cadastro.html)
   - Formulário completo de registro
   - Validação de campos
   - Confirmação de senha
   - Máscara de telefone
   - Aceite de termos de uso
   - Opções de cadastro social (simulado)

4. DASHBOARD (dashboard.html)
   - Sidebar de navegação
   - Cards de métricas (KPIs)
   - Gráfico de vendas (placeholder)
   - Lista de pacotes mais vendidos
   - Próximas viagens
   - Barra de busca
   - Notificações

5. PACOTES (pacotes.html)
   - Listagem em tabela
   - Filtros (status, destino, preço, ordenação)
   - Ações (visualizar, editar, excluir)
   - Paginação
   - Botão para criar novo pacote

6. FORMULÁRIO DE PACOTE (pacote-form.html)
   - Campos de informações básicas
   - Seção de preços
   - Área de inclusões
   - Upload de imagens com preview
   - Opções de salvar como rascunho ou publicar

7. DETALHES DO PACOTE (pacote-detalhes.html)
   - Hero com imagem principal
   - Galeria de fotos
   - Card de reserva (sticky)
   - Descrição detalhada
   - Itinerário dia a dia
   - Listas de inclusões e exclusões
   - Informações adicionais

8. CLIENTES (clientes.html)
   - Tabela de clientes cadastrados
   - Cards de estatísticas
   - Ações de visualizar, editar e excluir
   - Busca e filtros
   - Paginação

9. RESERVAS (reservas.html)
   - Listagem de reservas
   - Status (confirmada, pendente, cancelada, concluída)
   - Geração de vouchers
   - Filtros por status e período
   - Cards de métricas


RECURSOS IMPLEMENTADOS
-----------------------

✅ Design Responsivo
   - Breakpoints: 768px (tablet) e 480px (mobile)
   - Menu mobile com hamburger
   - Grid adaptativo
   - Sidebar retrátil no dashboard

✅ Estrutura Semântica HTML5
   - Tags apropriadas: <header>, <nav>, <main>, <section>, <article>, <footer>
   - Atributos ARIA para acessibilidade
   - Labels em todos os formulários
   - Alt text em elementos visuais

✅ Paleta de Cores Harmoniosa
   - Primária: #2563eb (azul)
   - Secundária: #0891b2 (ciano)
   - Sucesso: #10b981 (verde)
   - Aviso: #f59e0b (laranja)
   - Erro: #ef4444 (vermelho)

✅ Tipografia Clara
   - Font-family: System fonts (melhor performance)
   - Hierarquia visual bem definida
   - Tamanhos de 0.75rem a 2.25rem
   - Line-height apropriado para legibilidade

✅ Estados Interativos
   - :hover em todos os elementos clicáveis
   - :focus em inputs e botões
   - :active em botões
   - Transições suaves (150-300ms)

✅ Componentes Reutilizáveis
   - Botões (primary, secondary, outline, ghost)
   - Cards
   - Badges
   - Alerts
   - Formulários
   - Tabelas
   - Grid system (12 colunas)

✅ Acessibilidade Básica
   - Contraste adequado (WCAG 2.1)
   - Labels em formulários
   - Atributos aria-label
   - Navegação por teclado funcional
   - Foco visível


NAVEGAÇÃO ENTRE PÁGINAS
------------------------

FLUXO PÚBLICO:
index.html → login.html → dashboard.html
           → cadastro.html → dashboard.html
           → pacote-detalhes.html

FLUXO ADMINISTRATIVO:
dashboard.html → pacotes.html → pacote-form.html
              → clientes.html
              → reservas.html
              → calendário (em desenvolvimento)
              → mensagens (em desenvolvimento)
              → relatórios (em desenvolvimento)
              → configurações (em desenvolvimento)


🚀 GUIA RÁPIDO DE INÍCIO
-------------------------

Para testar o sistema completo em 5 minutos:

1️⃣ ABRA O PROJETO:
   - Abra index.html no navegador
   - Explore a landing page pública

2️⃣ FAÇA LOGIN:
   - Clique em "Entrar" no menu
   - Use: admin@travelflow.com / admin123
   - Clique em "Entrar"

3️⃣ EXPLORE O DASHBOARD:
   - Veja as métricas e gráficos
   - Navegue pelo menu lateral
   - Teste as notificações no topo

4️⃣ GERENCIE PACOTES:
   - Clique em "Pacotes" no menu lateral
   - Veja a listagem completa
   - Teste os filtros e busca
   - Clique em "Novo Pacote" para criar

5️⃣ VEJA CLIENTES E RESERVAS:
   - Acesse "Clientes" para ver cadastros
   - Acesse "Reservas" para gerenciar bookings
   - Teste as ações de cada página

6️⃣ FAÇA LOGOUT:
   - Clique no ícone de porta (🚪) no topo
   - Confirme para sair
   - Você voltará para a tela de login


📋 FUNCIONALIDADES POR PÁGINA
------------------------------

INDEX.HTML (Landing Page):
✅ Hero section com call-to-action
✅ Seção "Sobre Nós" com diferenciais
✅ Grid de pacotes em destaque
✅ Galeria de destinos com hover effects
✅ Depoimentos de clientes
✅ Seção de contato com estatísticas
✅ Footer completo com links
✅ Botões flutuantes (WhatsApp e Chatbot)
✅ Menu responsivo com hamburger
✅ Smooth scroll para navegação interna

LOGIN.HTML:
✅ Formulário de autenticação
✅ Validação de e-mail em tempo real
✅ Toggle para mostrar/ocultar senha
✅ Checkbox "Lembrar-me"
✅ Link de recuperação de senha funcional
✅ Botões de login social (simulado)
✅ Link para página de cadastro
✅ Feedback visual de erro/sucesso
✅ Animação de loading ao submeter
✅ Dica de credenciais em caso de erro

CADASTRO.HTML:
✅ Formulário completo de registro
✅ Validação de todos os campos
✅ Máscara automática de telefone brasileiro
✅ Indicador de força da senha
✅ Confirmação de senha com validação
✅ Checkbox de aceite de termos
✅ Validação em tempo real
✅ Feedback visual de erros
✅ Cadastro social (simulado)
✅ Redirecionamento automático após sucesso

DASHBOARD.HTML:
✅ Verificação de autenticação
✅ Sidebar de navegação responsiva
✅ Cards de métricas (KPIs) animados
✅ Gráfico de vendas com Canvas
✅ Lista de pacotes mais vendidos
✅ Próximas viagens agendadas
✅ Barra de busca funcional
✅ Notificações e mensagens
✅ Botão de logout
✅ Informações do usuário logado
✅ Menu mobile com overlay
✅ Exportação de relatórios (simulado)

PACOTES.HTML:
✅ Listagem em tabela responsiva
✅ Filtros por status, destino e preço
✅ Ordenação customizável
✅ Busca por nome/destino
✅ Ações: visualizar, editar, excluir
✅ Paginação funcional
✅ Botão para criar novo pacote
✅ Badges de status coloridos
✅ Confirmação antes de excluir

PACOTE-FORM.HTML:
✅ Formulário de criação/edição
✅ Campos de informações básicas
✅ Seção de preços e descontos
✅ Área de inclusões/exclusões
✅ Upload de imagens com preview
✅ Editor de itinerário
✅ Validação de campos obrigatórios
✅ Salvar como rascunho ou publicar
✅ Feedback de sucesso/erro

PACOTE-DETALHES.HTML:
✅ Hero com imagem principal
✅ Galeria de fotos
✅ Card de reserva (sticky)
✅ Descrição detalhada do pacote
✅ Itinerário dia a dia
✅ Listas de inclusões e exclusões
✅ Informações adicionais
✅ Botão de reserva
✅ Compartilhamento social (simulado)

CLIENTES.HTML:
✅ Tabela de clientes cadastrados
✅ Cards de estatísticas
✅ Busca por nome/email
✅ Filtros diversos
✅ Ações: visualizar, editar, excluir
✅ Paginação
✅ Exportação de dados (simulado)
✅ Histórico de viagens por cliente

RESERVAS.HTML:
✅ Listagem de reservas
✅ Badges de status coloridos
✅ Filtros por status e período
✅ Busca por cliente/pacote
✅ Geração de vouchers (simulado)
✅ Cards de métricas
✅ Ações de gerenciamento
✅ Confirmação/cancelamento de reservas


COMO VISUALIZAR O PROTÓTIPO
----------------------------

OPÇÃO 1 - Abrir diretamente no navegador:
1. Navegue até a pasta do projeto
2. Clique duas vezes em "index.html"
3. O navegador abrirá a landing page
4. Navegue pelos links para explorar as outras páginas

OPÇÃO 2 - Servidor local (recomendado):
1. Instale a extensão "Live Server" no VS Code
2. Clique com botão direito em "index.html"
3. Selecione "Open with Live Server"
4. O projeto abrirá em http://localhost:5500

OPÇÃO 3 - Python SimpleHTTPServer:
1. Abra o terminal na pasta do projeto
2. Execute: python3 -m http.server 8000
3. Acesse: http://localhost:8000


COMO USAR O SISTEMA
--------------------

🏠 PÁGINA INICIAL (index.html)
-------------------------------
A landing page é pública e não requer autenticação. Aqui você pode:
- Explorar os pacotes em destaque
- Conhecer a empresa e seus diferenciais
- Ver galeria de destinos
- Ler depoimentos de clientes
- Clicar em "Entrar" no menu para acessar o sistema administrativo


🔐 COMO FAZER LOGIN
--------------------

1. ACESSAR A PÁGINA DE LOGIN:
   - Na landing page, clique no botão "Entrar" no menu superior
   - Ou acesse diretamente: login.html

2. CREDENCIAIS DE TESTE DISPONÍVEIS:

   👨‍💼 ADMINISTRADOR:
   E-mail: admin@travelflow.com
   Senha: admin123
   
   👤 USUÁRIO PADRÃO:
   E-mail: usuario@travelflow.com
   Senha: user123
   
   🎯 DEMONSTRAÇÃO:
   E-mail: demo@demo.com
   Senha: demo123

3. PROCESSO DE LOGIN:
   - Digite o e-mail e senha
   - (Opcional) Marque "Lembrar-me" para manter a sessão
   - Clique em "Entrar"
   - Aguarde a validação (simulação de 1.5 segundos)
   - Você será redirecionado para o Dashboard

4. RECUPERAÇÃO DE SENHA:
   - Clique em "Esqueceu a senha?"
   - Digite seu e-mail no campo acima
   - Clique novamente em "Esqueceu a senha?"
   - Uma mensagem simulará o envio do link de recuperação

5. LOGIN SOCIAL (SIMULADO):
   - Botões de Google e Facebook estão disponíveis
   - Ao clicar, uma mensagem informa que está em desenvolvimento
   - Em produção, redirecionaria para OAuth


📝 CRIAR NOVA CONTA
-------------------

1. ACESSAR PÁGINA DE CADASTRO:
   - Na página de login, clique em "Criar conta gratuitamente"
   - Ou acesse diretamente: cadastro.html

2. PREENCHER O FORMULÁRIO:
   - Nome Completo (mínimo 3 caracteres)
   - E-mail (formato válido)
   - Nome da Agência (mínimo 3 caracteres)
   - Telefone (formato: (11) 99999-9999 - com máscara automática)
   - Senha (mínimo 8 caracteres)
   - Confirmar Senha (deve ser igual à senha)
   - Aceitar Termos de Uso e Política de Privacidade

3. VALIDAÇÕES AUTOMÁTICAS:
   - E-mail: verifica formato válido
   - Telefone: aplica máscara brasileira automaticamente
   - Senha: mostra indicador de força (fraca/média/forte)
   - Confirmação: valida se as senhas coincidem

4. APÓS CADASTRO:
   - Conta é criada automaticamente
   - Dados são salvos no localStorage
   - Redirecionamento automático para o Dashboard
   - Usuário já estará logado


🎛️ ÁREA ADMINISTRATIVA (DASHBOARD)
-----------------------------------

Após o login, você terá acesso ao painel administrativo completo:

📊 DASHBOARD (dashboard.html):
   - Visão geral com métricas (KPIs)
   - Gráfico de vendas dos últimos 6 meses
   - Pacotes mais vendidos
   - Próximas viagens agendadas
   - Estatísticas animadas

📦 PACOTES (pacotes.html):
   - Listagem completa de pacotes
   - Filtros por status, destino e preço
   - Ordenação customizável
   - Ações: visualizar, editar, excluir
   - Criar novo pacote (pacote-form.html)
   - Paginação

👥 CLIENTES (clientes.html):
   - Lista de clientes cadastrados
   - Cards com estatísticas
   - Busca e filtros
   - Ações de gerenciamento
   - Exportação de dados

🎫 RESERVAS (reservas.html):
   - Gerenciamento de reservas
   - Status: confirmada, pendente, cancelada, concluída
   - Geração de vouchers (simulado)
   - Filtros por período e status
   - Métricas de reservas

📅 CALENDÁRIO (em desenvolvimento):
   - Visualização de viagens agendadas
   - Disponibilidade de pacotes

💬 MENSAGENS (em desenvolvimento):
   - Comunicação com clientes
   - Notificações

📈 RELATÓRIOS (em desenvolvimento):
   - Relatórios de vendas
   - Análises financeiras
   - Exportação em PDF/Excel

⚙️ CONFIGURAÇÕES (em desenvolvimento):
   - Perfil do usuário
   - Configurações da agência
   - Preferências do sistema


🔒 SISTEMA DE AUTENTICAÇÃO
---------------------------

COMO FUNCIONA:
- Ao fazer login, os dados do usuário são salvos no localStorage
- O Dashboard verifica se há usuário logado ao carregar
- Se não houver usuário, redireciona para login.html
- Dados salvos: email, nome, role (função), horário de login

FAZER LOGOUT:
- No Dashboard, clique no ícone de porta (🚪) no canto superior direito
- Confirme a ação
- Você será redirecionado para a página de login
- Dados do localStorage serão removidos

SEGURANÇA (PROTÓTIPO):
⚠️ ATENÇÃO: Este é um protótipo educacional!
- Senhas NÃO são criptografadas
- Dados ficam visíveis no localStorage do navegador
- NÃO use dados reais ou senhas pessoais
- Em produção, seria necessário:
  * Backend com API REST
  * Autenticação JWT ou OAuth
  * Criptografia de senhas (bcrypt)
  * HTTPS obrigatório
  * Proteção contra CSRF/XSS


FUNCIONALIDADES JAVASCRIPT
---------------------------

✅ Menu mobile toggle
✅ Smooth scroll para âncoras
✅ Toggle de senha (mostrar/ocultar)
✅ Validação de formulários
✅ Máscara de telefone
✅ Preview de imagens no upload
✅ Confirmação de exclusão
✅ Sidebar toggle (dashboard mobile)
✅ Alerts e notificações (simulados)


TECNOLOGIAS UTILIZADAS
-----------------------
- HTML5 (estrutura semântica)
- CSS3 (variáveis, flexbox, grid, transitions)
- JavaScript Vanilla (interatividade)
- Emojis Unicode (ícones)


DIFERENCIAIS DO PROTÓTIPO
--------------------------

1. CSS PURO - Sem frameworks externos
   - Demonstra domínio de CSS nativo
   - Melhor performance (menos código)
   - Maior controle sobre estilos

2. DESIGN SYSTEM COMPLETO
   - Variáveis CSS centralizadas
   - Componentes reutilizáveis
   - Consistência visual em todas as páginas

3. RESPONSIVIDADE REAL
   - Não apenas "mobile-friendly"
   - Layouts otimizados para cada breakpoint
   - Menu e sidebar adaptáveis

4. INTERATIVIDADE
   - JavaScript funcional em todas as páginas
   - Validações de formulário
   - Feedback visual ao usuário

5. ACESSIBILIDADE
   - Estrutura semântica
   - Atributos ARIA
   - Navegação por teclado
   - Contraste adequado



🔧 TROUBLESHOOTING (SOLUÇÃO DE PROBLEMAS)
------------------------------------------

❌ PROBLEMA: Não consigo fazer login
✅ SOLUÇÃO:
   - Verifique se está usando uma das credenciais de teste corretas
   - Certifique-se de que o e-mail está no formato correto
   - A senha deve ter no mínimo 6 caracteres
   - Tente limpar o cache do navegador (Ctrl+Shift+Del)
   - Abra o Console do navegador (F12) para ver erros

❌ PROBLEMA: Fui redirecionado para login ao acessar o dashboard
✅ SOLUÇÃO:
   - Isso é normal! O sistema verifica autenticação
   - Faça login novamente com as credenciais de teste
   - Se o problema persistir, limpe o localStorage:
     * Abra o Console (F12)
     * Digite: localStorage.clear()
     * Pressione Enter e tente novamente

❌ PROBLEMA: Dados não estão sendo salvos
✅ SOLUÇÃO:
   - Este é um protótipo estático, dados são salvos apenas no localStorage
   - Ao limpar cache/cookies, os dados são perdidos
   - Não feche o navegador em modo anônimo/privado
   - Verifique se o localStorage está habilitado no navegador

❌ PROBLEMA: Gráficos não aparecem no dashboard
✅ SOLUÇÃO:
   - Aguarde alguns segundos após carregar a página
   - Atualize a página (F5)
   - Verifique se JavaScript está habilitado
   - Teste em outro navegador (Chrome, Firefox, Edge)

❌ PROBLEMA: Layout quebrado ou estilos não carregam
✅ SOLUÇÃO:
   - Verifique se todos os arquivos CSS estão na pasta /css/
   - Use um servidor local (Live Server) em vez de abrir direto
   - Limpe o cache do navegador
   - Verifique o caminho dos arquivos CSS no HTML

❌ PROBLEMA: Menu mobile não abre
✅ SOLUÇÃO:
   - Verifique se JavaScript está habilitado
   - Teste em tela menor que 768px de largura
   - Abra o Console (F12) para ver erros
   - Atualize a página


💡 DICAS E BOAS PRÁTICAS
-------------------------

1. TESTANDO O SISTEMA:
   - Use diferentes credenciais para ver comportamentos distintos
   - Teste em diferentes tamanhos de tela (responsividade)
   - Abra o Console (F12) para ver logs e erros
   - Use o modo de dispositivo móvel do navegador (Ctrl+Shift+M)

2. DESENVOLVENDO EM CIMA DO PROTÓTIPO:
   - Mantenha a estrutura de pastas organizada
   - Use as variáveis CSS em variables.css para consistência
   - Siga os padrões de nomenclatura existentes
   - Documente mudanças significativas

3. APRESENTANDO O PROJETO:
   - Comece pela landing page (index.html)
   - Demonstre o fluxo de login completo
   - Mostre as principais funcionalidades do dashboard
   - Explique que é um protótipo educacional
   - Destaque os recursos implementados (responsividade, validações, etc.)

4. INSPECIONANDO O CÓDIGO:
   - Use o DevTools do navegador (F12)
   - Veja a aba "Application" para verificar localStorage
   - Use a aba "Network" para entender requisições (mesmo que simuladas)
   - Inspecione elementos para ver estrutura HTML e CSS

5. PERFORMANCE:
   - O protótipo é leve e rápido (sem frameworks pesados)
   - Imagens são emojis (sem carregamento de arquivos)
   - CSS puro é mais performático que frameworks
   - JavaScript vanilla é mais rápido que bibliotecas


📊 DADOS DE DEMONSTRAÇÃO
-------------------------

O sistema vem com dados pré-populados para demonstração:

PACOTES:
- Praias de Maragogi (R$ 2.499)
- Paris e Londres (R$ 12.990)
- Machu Picchu (R$ 5.799)
- Caribe All Inclusive (R$ 8.500)
- Nova York Completo (R$ 9.200)

CLIENTES (simulados):
- Maria Santos
- Carlos Oliveira
- Ana Paula
- Roberto Silva
- Fernanda Costa

RESERVAS (simuladas):
- Status: confirmada, pendente, cancelada, concluída
- Próximas viagens nos próximos 30 dias

MÉTRICAS DO DASHBOARD:
- 24 pacotes ativos
- 48 reservas do mês
- R$ 127k de receita estimada
- 18 novos clientes


🎓 RECURSOS EDUCACIONAIS
-------------------------

Este protótipo é ideal para aprender:

✅ HTML5 Semântico:
   - Estrutura de páginas modernas
   - Tags apropriadas (header, nav, main, section, article, footer)
   - Atributos de acessibilidade (aria-label, role)
   - Formulários completos com validação

✅ CSS3 Avançado:
   - Variáveis CSS (custom properties)
   - Flexbox e Grid Layout
   - Responsividade com media queries
   - Animações e transições
   - Design system completo

✅ JavaScript Vanilla:
   - Manipulação do DOM
   - Event listeners
   - Validação de formulários
   - LocalStorage API
   - Canvas API (gráficos)
   - Funções assíncronas (setTimeout)

✅ UX/UI Design:
   - Hierarquia visual
   - Feedback ao usuário
   - Estados interativos (hover, focus, active)
   - Paleta de cores harmoniosa
   - Tipografia clara e legível


OBSERVAÇÕES IMPORTANTES
------------------------

1. Este é um PROTÓTIPO ESTÁTICO para demonstração de interface
2. Dados são simulados (não há backend real)
3. Ações como "salvar", "excluir" apenas mostram alerts
4. Em produção, todas as funcionalidades seriam conectadas a uma API
5. Senhas e dados sensíveis devem ser tratados com segurança real
6. NÃO use este código em produção sem implementar segurança adequada
7. Este projeto é para fins educacionais e de demonstração



📝 NOTAS DE VERSÃO
------------------
VERSÃO 1.0 (Outubro 2025):
✅ Landing page completa
✅ Sistema de login e cadastro
✅ Dashboard com métricas
✅ Gerenciamento de pacotes
✅ Gerenciamento de clientes
✅ Gerenciamento de reservas
✅ Design responsivo
✅ Validações de formulário
✅ Autenticação com localStorage
✅ Gráficos com Canvas


================================================================================
                         FIM DO DOCUMENTO README
           Obrigado por usar o TravelFlow! Boa viagem! 
================================================================================
