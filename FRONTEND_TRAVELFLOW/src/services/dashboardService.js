import api from './api';

const dashboardService = {
  /**
   * Obtém estatísticas do dashboard
   * @returns {Promise<Object>} Estatísticas gerais
   */
  getDashboardStats: async () => {
    try {
      const response = await api.get('/dashboard/stats');
      return response.data || response;
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      // Retornar valores padrão em caso de erro
      return {
        totalVouchers: 0,
        totalRevenue: 0,
        uniqueCustomers: 0,
        totalTrips: 0
      };
    }
  },

  /**
   * Obtém os destinos mais vendidos
   * @param {number} limit - Número de destinos a retornar
   * @returns {Promise<Array>} Lista de destinos mais vendidos
   */
  getTopDestinations: async (limit = 5) => {
    try {
      const response = await api.get(`/dashboard/top-destinations?limit=${limit}`);
      return response.data || response;
    } catch (error) {
      console.error('Error fetching top destinations:', error);
      return [];
    }
  },

  /**
   * Obtém dados de vendas por período
   * @param {string} startDate - Data inicial (YYYY-MM-DD)
   * @param {string} endDate - Data final (YYYY-MM-DD)
   * @returns {Promise<Object>} Dados de vendas
   */
  getSalesByPeriod: async (startDate, endDate) => {
    try {
      const response = await api.get(`/dashboard/sales?startDate=${startDate}&endDate=${endDate}`);
      return response.data || response;
    } catch (error) {
      console.error('Error fetching sales by period:', error);
      return { sales: [], total: 0 };
    }
  },

  /**
   * Obtém receita mensal
   * @returns {Promise<Array>} Receita por mês
   */
  getMonthlyRevenue: async () => {
    try {
      const response = await api.get('/dashboard/monthly-revenue');
      return response.data || response;
    } catch (error) {
      console.error('Error fetching monthly revenue:', error);
      return [];
    }
  },
};

export default dashboardService;
