import { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Divider,
  Button,
  Alert,
  CircularProgress,
  Chip
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  NotificationsActive as NotificationsActiveIcon,
  Delete as DeleteIcon,
  DoneAll as DoneAllIcon,
  Event as EventIcon,
  Info as InfoIcon,
  Warning as WarningIcon
} from '@mui/icons-material';
import notificationService from '../services/notificationService';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function NotificationCenter({ compact = false }) {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    loadNotifications();
    const interval = setInterval(loadNotifications, 300000);
    return () => clearInterval(interval);
  }, []);

  const loadNotifications = async () => {
    try {
      const data = await notificationService.getAllNotifications();
      setNotifications(data);
      const unread = data.filter(n => !n.read).length;
      setUnreadCount(unread);
    } catch (error) {
      console.error('Erro ao carregar notificações:', error);
      setNotifications([]);
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMarkAsRead = async (id) => {
    try {
      await notificationService.markAsRead(id);
      loadNotifications();
    } catch (error) {
      console.error('Erro ao marcar como lida:', error);
    }
  };

  const handleMarkAllAsRead = async () => {
    setLoading(true);
    try {
      await notificationService.markAllAsRead();
      loadNotifications();
    } catch (error) {
      console.error('Erro ao marcar todas como lidas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await notificationService.deleteNotification(id);
      loadNotifications();
    } catch (error) {
      console.error('Erro ao deletar notificação:', error);
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'TRIP_REMINDER':
        return <EventIcon color="primary" />;
      case 'WARNING':
        return <WarningIcon color="warning" />;
      case 'INFO':
        return <InfoIcon color="info" />;
      default:
        return <NotificationsIcon />;
    }
  };

  if (compact) {
    return (
      <>
        <IconButton color="inherit" onClick={handleClick}>
          <Badge badgeContent={unreadCount} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          PaperProps={{
            sx: { width: 360, maxHeight: 480 }
          }}
        >
          <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">Notificações</Typography>
            {unreadCount > 0 && (
              <Button
                size="small"
                startIcon={<DoneAllIcon />}
                onClick={handleMarkAllAsRead}
                disabled={loading}
              >
                Marcar todas
              </Button>
            )}
          </Box>
          <Divider />
          {notifications.length === 0 ? (
            <Box sx={{ p: 3, textAlign: 'center' }}>
              <Typography color="textSecondary">Nenhuma notificação</Typography>
            </Box>
          ) : (
            <List sx={{ p: 0 }}>
              {notifications.slice(0, 5).map((notification) => (
                <ListItem
                  key={notification.id}
                  sx={{
                    bgcolor: notification.read ? 'transparent' : 'action.hover',
                    '&:hover': { bgcolor: 'action.selected' }
                  }}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      size="small"
                      onClick={() => handleDelete(notification.id)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  }
                  onClick={() => !notification.read && handleMarkAsRead(notification.id)}
                >
                  <ListItemIcon>{getNotificationIcon(notification.type)}</ListItemIcon>
                  <ListItemText
                    primary={notification.message}
                    secondary={format(new Date(notification.createdAt), 'dd/MM/yyyy HH:mm', {
                      locale: ptBR
                    })}
                    primaryTypographyProps={{
                      fontWeight: notification.read ? 'normal' : 'bold'
                    }}
                  />
                </ListItem>
              ))}
            </List>
          )}
          {notifications.length > 5 && (
            <>
              <Divider />
              <Box sx={{ p: 1, textAlign: 'center' }}>
                <Button size="small" onClick={handleClose}>
                  Ver todas
                </Button>
              </Box>
            </>
          )}
        </Menu>
      </>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" color='primary.main'>Central de Notificações</Typography>
        {unreadCount > 0 && (
          <Button
            variant="contained"
            startIcon={<DoneAllIcon />}
            onClick={handleMarkAllAsRead}
            disabled={loading}
          >
            Marcar todas como lidas
          </Button>
        )}
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
      ) : notifications.length === 0 ? (
        <Alert severity="info">Você não tem notificações no momento.</Alert>
      ) : (
        <Paper elevation={3}>
          <List>
            {notifications.map((notification, index) => (
              <Box key={notification.id}>
                {index > 0 && <Divider />}
                <ListItem
                  sx={{
                    bgcolor: notification.read ? 'transparent' : 'action.hover',
                    py: 2
                  }}
                  secondaryAction={
                    <Box>
                      {!notification.read && (
                        <Button
                          size="small"
                          onClick={() => handleMarkAsRead(notification.id)}
                          sx={{ mr: 1 }}
                        >
                          Marcar como lida
                        </Button>
                      )}
                      <IconButton
                        edge="end"
                        onClick={() => handleDelete(notification.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  }
                >
                  <ListItemIcon>{getNotificationIcon(notification.type)}</ListItemIcon>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography
                          variant="body1"
                          fontWeight={notification.read ? 'normal' : 'bold'}
                        >
                          {notification.message}
                        </Typography>
                        {!notification.read && (
                          <Chip label="Nova" color="primary" size="small" />
                        )}
                      </Box>
                    }
                    secondary={
                      <Typography variant="caption" color="textSecondary">
                        {format(new Date(notification.createdAt), "dd/MM/yyyy 'às' HH:mm", {
                          locale: ptBR
                        })}
                      </Typography>
                    }
                  />
                </ListItem>
              </Box>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
}
