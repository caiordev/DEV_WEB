import api from './api';

const tripService = {
  getAllTrips: async () => {
    try {
      const response = await api.get('/trips');
      return response; // Retorna o array diretamente
    } catch (error) {
      console.error('Error fetching trips:', error);
      throw error;
    }
  },

  getTripById: async (id) => {
    try {
      const response = await api.get(`/trips/${id}`);
      return response; // Retorna o objeto diretamente
    } catch (error) {
      console.error('Error fetching trip:', error);
      throw error;
    }
  },

  createTrip: async (tripData) => {
    try {
      const response = await api.post('/trips', tripData);
      return response; // Retorna o objeto criado
    } catch (error) {
      console.error('Error creating trip:', error);
      throw error;
    }
  },

  updateTrip: async (id, tripData) => {
    try {
      const response = await api.put(`/trips/${id}`, tripData);
      return response; // Retorna o objeto atualizado
    } catch (error) {
      console.error('Error updating trip:', error);
      throw error;
    }
  },
  
  deleteTrip: async (id) => {
    try {
      const response = await api.delete(`/trips/${id}`);
      return response; // Retorna o resultado da exclusão
    } catch (error) {
      console.error('Error deleting trip:', error);
      throw error;
    }
  },
};

export default tripService;
