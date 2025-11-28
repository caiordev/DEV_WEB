import api from './api';

const customerService = {
  getAllCustomers: async () => {
    try {
      const response = await api.get('/customers');
      return response.data || response;
    } catch (error) {
      console.error('Error fetching customers:', error);
      throw error;
    }
  },

  getCustomerByCpf: async (cpf) => {
    try {
      const response = await api.get(`/customers/cpf/${cpf}`);
      return response.data || response;
    } catch (error) {
      console.error('Error fetching customer:', error);
      throw error;
    }
  },

  getCustomerById: async (id) => {
    try {
      const response = await api.get(`/customers/${id}`);
      return response.data || response;
    } catch (error) {
      console.error('Error fetching customer:', error);
      throw error;
    }
  },

  createCustomer: async (customerData) => {
    try {
      const response = await api.post('/customers', customerData);
      return response.data || response;
    } catch (error) {
      console.error('Error creating customer:', error);
      throw error;
    }
  },

  updateCustomer: async (id, customerData) => {
    try {
      const response = await api.put(`/customers/${id}`, customerData);
      return response.data || response;
    } catch (error) {
      console.error('Error updating customer:', error);
      throw error;
    }
  },

  deleteCustomer: async (id) => {
    try {
      const response = await api.delete(`/customers/${id}`);
      return response.data || response;
    } catch (error) {
      console.error('Error deleting customer:', error);
      throw error;
    }
  },
};

export default customerService;
