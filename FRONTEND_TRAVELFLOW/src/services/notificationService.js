import api from './api';

const notificationService = {
  /**
   * Obtém todas as notificações
   * @returns {Promise<Array>} Lista de notificações
   */
  getAllNotifications: async () => {
    try {
      const response = await api.get('/notifications');
      return response.data || response;
    } catch (error) {
      console.error('Error fetching notifications:', error);
      return [];
    }
  },

  /**
   * Obtém notificações não lidas
   * @returns {Promise<Array>} Lista de notificações não lidas
   */
  getUnreadNotifications: async () => {
    try {
      const response = await api.get('/notifications/unread');
      return response.data || response;
    } catch (error) {
      console.error('Error fetching unread notifications:', error);
      return [];
    }
  },

  /**
   * Marca uma notificação como lida
   * @param {number} id - ID da notificação
   * @returns {Promise<Object>} Notificação atualizada
   */
  markAsRead: async (id) => {
    try {
      const response = await api.patch(`/notifications/${id}/read`);
      return response.data || response;
    } catch (error) {
      console.error('Error marking notification as read:', error);
      throw error;
    }
  },

  /**
   * Marca todas as notificações como lidas
   * @returns {Promise<Object>} Resposta da operação
   */
  markAllAsRead: async () => {
    try {
      const response = await api.patch('/notifications/read-all');
      return response.data || response;
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      throw error;
    }
  },

  /**
   * Cria uma nova notificação
   * @param {Object} notificationData - Dados da notificação
   * @returns {Promise<Object>} Notificação criada
   */
  createNotification: async (notificationData) => {
    try {
      const response = await api.post('/notifications', notificationData);
      return response.data || response;
    } catch (error) {
      console.error('Error creating notification:', error);
      throw error;
    }
  },

  /**
   * Deleta uma notificação
   * @param {number} id - ID da notificação
   * @returns {Promise<Object>} Resposta da deleção
   */
  deleteNotification: async (id) => {
    try {
      const response = await api.delete(`/notifications/${id}`);
      return response.data || response;
    } catch (error) {
      console.error('Error deleting notification:', error);
      throw error;
    }
  },
};

export default notificationService;
