import { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const ThemeContext = createContext();

export const useThemeMode = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeMode deve ser usado dentro de um ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem('themeMode');
    return savedMode || 'light';
  });

  useEffect(() => {
    localStorage.setItem('themeMode', mode);
  }, [mode]);

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'light'
            ? {
                primary: {
                  main: '#1976d2',
                  light: '#42a5f5',
                  dark: '#1565c0',
                  contrastText: '#fff',
                },
                secondary: {
                  main: '#9c27b0',
                  light: '#ba68c8',
                  dark: '#7b1fa2',
                  contrastText: '#fff',
                },
                background: {
                  default: '#f5f5f5',
                  paper: '#ffffff',
                },
                text: {
                  primary: '#212121',
                  secondary: '#757575',
                },
                success: {
                  main: '#4caf50',
                  light: '#81c784',
                  dark: '#388e3c',
                },
                error: {
                  main: '#f44336',
                  light: '#e57373',
                  dark: '#d32f2f',
                },
                warning: {
                  main: '#ff9800',
                  light: '#ffb74d',
                  dark: '#f57c00',
                },
                info: {
                  main: '#2196f3',
                  light: '#64b5f6',
                  dark: '#1976d2',
                },
              }
            : {
                primary: {
                  main: '#90caf9',
                  light: '#e3f2fd',
                  dark: '#42a5f5',
                  contrastText: '#000',
                },
                secondary: {
                  main: '#ce93d8',
                  light: '#f3e5f5',
                  dark: '#ab47bc',
                  contrastText: '#000',
                },
                background: {
                  default: '#121212',
                  paper: '#1e1e1e',
                },
                text: {
                  primary: '#ffffff',
                  secondary: '#b0b0b0',
                },
                success: {
                  main: '#66bb6a',
                  light: '#81c784',
                  dark: '#388e3c',
                },
                error: {
                  main: '#f44336',
                  light: '#e57373',
                  dark: '#d32f2f',
                },
                warning: {
                  main: '#ffa726',
                  light: '#ffb74d',
                  dark: '#f57c00',
                },
                info: {
                  main: '#29b6f6',
                  light: '#4fc3f7',
                  dark: '#0288d1',
                },
              }),
        },
        typography: {
          fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
          ].join(','),
          h1: {
            fontWeight: 700,
          },
          h2: {
            fontWeight: 700,
          },
          h3: {
            fontWeight: 600,
          },
          h4: {
            fontWeight: 600,
          },
          h5: {
            fontWeight: 600,
          },
          h6: {
            fontWeight: 600,
          },
        },
        shape: {
          borderRadius: 8,
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: 'none',
                fontWeight: 600,
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                boxShadow: mode === 'light' 
                  ? '0 2px 8px rgba(0,0,0,0.1)' 
                  : '0 2px 8px rgba(0,0,0,0.3)',
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                backgroundImage: 'none',
              },
            },
          },
        },
      }),
    [mode]
  );

  const value = {
    mode,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
