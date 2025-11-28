import api from './api';

const packageService = {
  getAllPackages: async () => {
    try {
      const response = await api.get('/packages');
      return response.data || response;
    } catch (error) {
      console.error('Error fetching packages:', error);
      throw error;
    }
  },

  getPackageById: async (id) => {
    try {
      const response = await api.get(`/packages/${id}`);
      return response.data || response;
    } catch (error) {
      console.error('Error fetching package:', error);
      throw error;
    }
  },

  createPackage: async (packageData) => {
    try {
      const response = await api.post('/packages', packageData);
      return response.data || response;
    } catch (error) {
      console.error('Error creating package:', error);
      throw error;
    }
  },

  updatePackage: async (id, packageData) => {
    try {
      const response = await api.put(`/packages/${id}`, packageData);
      return response.data || response;
    } catch (error) {
      console.error('Error updating package:', error);
      throw error;
    }
  },

  deletePackage: async (id) => {
    try {
      const response = await api.delete(`/packages/${id}`);
      return response.data || response;
    } catch (error) {
      console.error('Error deleting package:', error);
      throw error;
    }
  },
};

export default packageService;
