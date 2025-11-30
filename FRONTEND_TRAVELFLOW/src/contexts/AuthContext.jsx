import { createContext, useContext, useState, useEffect } from 'react';
import { authService, ApiError, setGlobalLogoutCallback } from '../services/api';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    setUser(null);
    authService.logout();
    window.location.href = '/login';
  };

  useEffect(() => {
    setGlobalLogoutCallback(logout);

    const savedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const data = await authService.login(username, password);
      
      const userData = {
        username: data.username,
        fullName: data.fullName,
        role: data.role,
        token: data.token,
      };
      
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      
      return { success: true, data: userData };
    } catch (error) {
      console.error('Erro no login:', error);
      
      let errorMessage = 'Erro ao fazer login';
      
      if (error instanceof ApiError) {
        if (error.status === 401) {
          errorMessage = 'Usuário ou senha inválidos';
        } else if (error.status === 403) {
          errorMessage = 'Acesso negado';
        } else if (error.status === 0) {
          errorMessage = 'Não foi possível conectar ao servidor';
        } else {
          errorMessage = error.message;
        }
      } else {
        errorMessage = error.message || errorMessage;
      }
      
      return { success: false, error: errorMessage };
    }
  };

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
