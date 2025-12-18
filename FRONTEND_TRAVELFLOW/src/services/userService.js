import api from './api';

const userService = {
  /**
   * Obtém todos os usuários da agência
   * @returns {Promise<Array>} Lista de usuários
   */
  getAllUsers: async () => {
    try {
      const response = await api.get('/auth/users');
      return response.data || response;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  /**
   * Obtém um usuário específico por ID
   * @param {number} id - ID do usuário
   * @returns {Promise<Object>} Dados do usuário
   */
  getUserById: async (id) => {
    try {
      const response = await api.get(`/users/${id}`);
      return response.data || response;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  },

  /**
   * Cria um novo usuário
   * @param {Object} userData - Dados do usuário
   * @returns {Promise<Object>} Usuário criado
   */
  createUser: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data || response;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  /**
   * Atualiza um usuário existente
   * @param {number} id - ID do usuário
   * @param {Object} userData - Dados atualizados
   * @returns {Promise<Object>} Usuário atualizado
   */
  updateUser: async (id, userData) => {
    try {
      const response = await api.put(`/users/${id}`, userData);
      return response.data || response;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },

  /**
   * Deleta um usuário
   * @param {number} id - ID do usuário
   * @returns {Promise<Object>} Resposta da deleção
   */
  deleteUser: async (id) => {
    try {
      const response = await api.delete(`/users/${id}`);
      return response.data || response;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  },

  /**
   * Ativa ou desativa um usuário
   * @param {number} id - ID do usuário
   * @param {boolean} active - Status ativo/inativo
   * @returns {Promise<Object>} Usuário atualizado
   */
  toggleUserStatus: async (id, active) => {
    try {
      const response = await api.patch(`/users/${id}/status`, { active });
      return response.data || response;
    } catch (error) {
      console.error('Error toggling user status:', error);
      throw error;
    }
  },
};

export default userService;
