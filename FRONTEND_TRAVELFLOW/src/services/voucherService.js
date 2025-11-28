import api from './api';

const voucherService = {
  /**
   * Obtém todos os vouchers
   * @returns {Promise<Array>} Lista de vouchers
   */
  getAllVouchers: async () => {
    try {
      const response = await api.get('/vouchers');
      return response.data || response;
    } catch (error) {
      console.error('Error fetching vouchers:', error);
      throw error;
    }
  },

  /**
   * Obtém um voucher por ID
   * @param {number} id - ID do voucher
   * @returns {Promise<Object>} Dados do voucher
   */
  getVoucherById: async (id) => {
    try {
      const response = await api.get(`/vouchers/${id}`);
      return response.data || response;
    } catch (error) {
      console.error('Error fetching voucher:', error);
      throw error;
    }
  },

  /**
   * Cria um novo voucher
   * @param {Object} voucherData - Dados do voucher
   * @returns {Promise<Object>} Voucher criado
   */
  createVoucher: async (voucherData) => {
    try {
      const response = await api.post('/vouchers', voucherData);
      return response.data || response;
    } catch (error) {
      console.error('Error creating voucher:', error);
      throw error;
    }
  },

  /**
   * Atualiza um voucher existente
   * @param {number} id - ID do voucher
   * @param {Object} voucherData - Dados atualizados
   * @returns {Promise<Object>} Voucher atualizado
   */
  updateVoucher: async (id, voucherData) => {
    try {
      const response = await api.put(`/vouchers/${id}`, voucherData);
      return response.data || response;
    } catch (error) {
      console.error('Error updating voucher:', error);
      throw error;
    }
  },

  /**
   * Deleta um voucher
   * @param {number} id - ID do voucher
   * @returns {Promise<Object>} Resposta da deleção
   */
  deleteVoucher: async (id) => {
    try {
      const response = await api.delete(`/vouchers/${id}`);
      return response.data || response;
    } catch (error) {
      console.error('Error deleting voucher:', error);
      throw error;
    }
  },
};

export default voucherService;
