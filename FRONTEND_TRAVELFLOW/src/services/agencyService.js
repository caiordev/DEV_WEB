import api from './api';

const agencyService = {
  /**
   * Obtém todas as agências (apenas para super admin)
   * @returns {Promise<Array>} Lista de agências
   */
  getAllAgencies: async () => {
    try {
      const response = await api.get('/agencies');
      return response.data || response;
    } catch (error) {
      console.error('Error fetching agencies:', error);
      throw error;
    }
  },

  /**
   * Obtém uma agência específica por ID
   * @param {number} id - ID da agência
   * @returns {Promise<Object>} Dados da agência
   */
  getAgencyById: async (id) => {
    try {
      const response = await api.get(`/agencies/${id}`);
      return response.data || response;
    } catch (error) {
      console.error('Error fetching agency:', error);
      throw error;
    }
  },

  /**
   * Cria uma nova agência
   * @param {Object} agencyData - Dados da agência
   * @returns {Promise<Object>} Agência criada
   */
  createAgency: async (agencyData) => {
    try {
      const response = await api.post('/agencies', agencyData);
      return response.data || response;
    } catch (error) {
      console.error('Error creating agency:', error);
      throw error;
    }
  },

  /**
   * Atualiza uma agência existente
   * @param {number} id - ID da agência
   * @param {Object} agencyData - Dados atualizados
   * @returns {Promise<Object>} Agência atualizada
   */
  updateAgency: async (id, agencyData) => {
    try {
      const response = await api.put(`/agencies/${id}`, agencyData);
      return response.data || response;
    } catch (error) {
      console.error('Error updating agency:', error);
      throw error;
    }
  },

  /**
   * Deleta uma agência
   * @param {number} id - ID da agência
   * @returns {Promise<Object>} Resposta da deleção
   */
  deleteAgency: async (id) => {
    try {
      const response = await api.delete(`/agencies/${id}`);
      return response.data || response;
    } catch (error) {
      console.error('Error deleting agency:', error);
      throw error;
    }
  },

  /**
   * Bloqueia ou desbloqueia uma agência
   * @param {number} id - ID da agência
   * @param {boolean} blocked - Status bloqueado/desbloqueado
   * @returns {Promise<Object>} Agência atualizada
   */
  toggleAgencyBlock: async (id, blocked) => {
    try {
      const response = await api.patch(`/agencies/${id}/block`, { blocked });
      return response.data || response;
    } catch (error) {
      console.error('Error toggling agency block:', error);
      throw error;
    }
  },

  /**
   * Obtém estatísticas de uma agência
   * @param {number} id - ID da agência
   * @returns {Promise<Object>} Estatísticas da agência
   */
  getAgencyStats: async (id) => {
    try {
      const response = await api.get(`/agencies/${id}/stats`);
      return response.data || response;
    } catch (error) {
      console.error('Error fetching agency stats:', error);
      throw error;
    }
  },
};

export default agencyService;
