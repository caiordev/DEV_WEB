const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

let globalLogoutCallback = null;

export const setGlobalLogoutCallback = (callback) => {
  globalLogoutCallback = callback;
};

async function fetchApi(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      let errorMessage = 'Erro na requisição';
      let errorData = null;

      try {
        errorData = await response.json();
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch {
        errorMessage = response.statusText || errorMessage;
      }

      if ((response.status === 401 || response.status === 403) && globalLogoutCallback) {
        console.warn('Token inválido ou expirado. Redirecionando para login...');
        globalLogoutCallback();
      }

      throw new ApiError(errorMessage, response.status, errorData);
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return null;
    }

    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    
    throw new ApiError(
      error.message || 'Erro de conexão com o servidor',
      0,
      null
    );
  }
}

export const authService = {
  /**
   * Realiza login do usuário
   * @param {string} username - Nome de usuário
   * @param {string} password - Senha
   * @returns {Promise<Object>} Dados do usuário autenticado
   */
  async login(username, password) {
    const data = await fetchApi('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });

    if (data.token) {
      localStorage.setItem('token', data.token);
    }

    return {
      token: data.token,
      username: data.username,
      fullName: data.fullName,
      role: data.role,
    };
  },

  /**
   * Realiza logout do usuário
   */
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  /**
   * Verifica se o usuário está autenticado
   * @returns {boolean}
   */
  isAuthenticated() {
    return !!localStorage.getItem('token');
  },

  /**
   * Obtém o token armazenado
   * @returns {string|null}
   */
  getToken() {
    return localStorage.getItem('token');
  },

  /**
   * Obtém os dados completos do usuário logado
   * @returns {Promise<Object>} Dados completos do usuário
   */
  async getProfile() {
    const data = await fetchApi('/auth/me', {
      method: 'GET',
    });

    return data;
  },

  async updateProfile(profileData) {
    const data = await fetchApi('/auth/me', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });

    return data;
  },

  /**
   * Obtém o usuário atual do localStorage
   * @returns {Object|null} Dados do usuário ou null
   */
  getUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  /**
   * Cria um novo usuário (apenas para admin)
   * @param {Object} userData - Dados do novo usuário
   * @returns {Promise<Object>} Usuário criado
   */
  async createUser(userData) {
    const data = await fetchApi('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });

    return data;
  },

  /**
   * Obtém todos os usuários da agência (apenas para admin)
   * @returns {Promise<Array>} Lista de usuários
   */
  async getAgencyUsers() {
    const data = await fetchApi('/auth/users', {
      method: 'GET',
    });

    return data;
  },

  /**
   * Verifica se o usuário atual é super admin
   * @returns {boolean} True se for super admin
   */
  isSuperAdmin() {
    const user = this.getUser();
    return user?.role === 'SUPERADMIN';
  },

  /**
   * Obtém todas as agências (apenas para super admin)
   * @returns {Promise<Array>} Lista de agências
   */
  async getAllAgencies() {
    const data = await fetchApi('/auth/agencies', {
      method: 'GET',
    });

    return data;
  },

  async requestPasswordReset(email) {
    const data = await fetchApi('/auth/password-reset/request', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });

    return data;
  },

  async confirmPasswordReset(token, newPassword) {
    const data = await fetchApi('/auth/password-reset/confirm', {
      method: 'POST',
      body: JSON.stringify({ token, newPassword }),
    });

    return data;
  },
};

const api = {
  get: (endpoint, options = {}) => fetchApi(endpoint, { ...options, method: 'GET' }),
  post: (endpoint, data, options = {}) => fetchApi(endpoint, { 
    ...options, 
    method: 'POST',
    body: JSON.stringify(data)
  }),
  put: (endpoint, data, options = {}) => fetchApi(endpoint, { 
    ...options, 
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  delete: (endpoint, options = {}) => fetchApi(endpoint, { ...options, method: 'DELETE' }),
  patch: (endpoint, data, options = {}) => fetchApi(endpoint, { 
    ...options, 
    method: 'PATCH',
    body: JSON.stringify(data)
  }),
};

export default api;
export { fetchApi };
