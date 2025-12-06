import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import notificationService from '../../services/notificationService';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
  Divider,
  Tooltip,
  useTheme,
  useMediaQuery,
  Badge
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Flight as FlightIcon,
  ConfirmationNumber as VoucherIcon,
  CardGiftcard as PackageIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  ManageAccounts as ManageAccountsIcon,
  SupervisorAccount as SuperAdminIcon
} from '@mui/icons-material';

const drawerWidth = 240;
const drawerWidthCollapsed = 65;

function Sidebar() {
  const [open, setOpen] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { user } = useAuth();
  const isAdmin = user?.role === 'ADMIN';
  const isSuperAdmin = user?.role === 'ADMIN'; //'SUPERADMIN';

  useEffect(() => {
    loadUnreadCount();
    const interval = setInterval(loadUnreadCount, 120000);
    return () => clearInterval(interval);
  }, []);

  const loadUnreadCount = async () => {
    try {
      const data = await notificationService.getAllNotifications();
      const unread = data.filter(n => !n.read).length;
      setUnreadCount(unread);
    } catch (error) {
      console.error('Erro ao carregar contador de notificações:', error);
    }
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Destinos', icon: <FlightIcon />, path: '/trips' },
    { text: 'Vouchers', icon: <VoucherIcon />, path: '/vouchers' },
    { text: 'Pacotes', icon: <PackageIcon />, path: '/packages' },
    { text: 'Calendário de Pacotes', icon: <PackageIcon />, path: '/package-calendar' },
    { text: 'Clientes', icon: <PeopleIcon />, path: '/customers' },
    { text: 'Notificações', icon: <NotificationsIcon />, path: '/notifications' },
  ];

  if (isAdmin) {
    menuItems.push({
      text: 'Usuários',
      icon: <ManageAccountsIcon />,
      path: '/users'
    });
  }

  if (isSuperAdmin) {
    menuItems.push({
      text: 'Painel Admin',
      icon: <SuperAdminIcon />,
      path: '/admin-panel'
    });
  }

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      setOpen(false);
    }
  };

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header do Sidebar */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: open ? 'space-between' : 'center',
          p: 2,
          minHeight: 64,
        }}
      >
        {open && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FlightIcon color="primary" />
            <Box sx={{ fontWeight: 700, color: 'primary.main', fontSize: '1.1rem' }}>
              TravelFlow
            </Box>
          </Box>
        )}
        <IconButton onClick={handleDrawerToggle} size="small">
          {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </Box>

      <Divider />

      {/* Menu Items */}
      <List sx={{ flexGrow: 1, pt: 2 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <Tooltip
              key={item.text}
              title={!open ? item.text : ''}
              placement="right"
              arrow
            >
              <ListItem disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  onClick={() => handleNavigation(item.path)}
                  selected={isActive}
                  sx={{
                    mx: 1,
                    borderRadius: 2,
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                    '&.Mui-selected': {
                      bgcolor: 'primary.main',
                      color: 'primary.contrastText',
                      '&:hover': {
                        bgcolor: 'primary.dark',
                      },
                      '& .MuiListItemIcon-root': {
                        color: 'primary.contrastText',
                      },
                    },
                    '&:hover': {
                      bgcolor: isActive ? 'primary.dark' : 'action.hover',
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                      color: isActive ? 'inherit' : 'text.secondary',
                    }}
                  >
                    {item.path === '/notifications' && unreadCount > 0 ? (
                      <Badge badgeContent={unreadCount} color="error">
                        {item.icon}
                      </Badge>
                    ) : (
                      item.icon
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    sx={{
                      opacity: open ? 1 : 0,
                      '& .MuiListItemText-primary': {
                        fontWeight: isActive ? 600 : 400,
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </Tooltip>
          );
        })}
      </List>

      <Divider />

      {/* Footer */}
      <Box
        sx={{
          p: 2,
          textAlign: 'center',
          opacity: open ? 1 : 0,
          transition: 'opacity 0.3s',
        }}
      >
        {open && (
          <Box sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>
            2024 TravelFlow
          </Box>
        )}
      </Box>
    </Box>
  );

  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        width: open ? drawerWidth : drawerWidthCollapsed,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        '& .MuiDrawer-paper': {
          width: open ? drawerWidth : drawerWidthCollapsed,
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          overflowX: 'hidden',
          boxSizing: 'border-box',
          borderRight: '1px solid',
          borderColor: 'divider',
        },
      }}
    >
      {drawer}
    </Drawer>
  );
}

export default Sidebar;
