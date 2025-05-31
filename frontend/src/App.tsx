import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import Layout from './components/Layout';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PremierLeague from './pages/leagues/PremierLeague';
import NBA from './pages/leagues/NBA';
import MLB from './pages/leagues/MLB';
import NFL from './pages/leagues/NFL';
import NHL from './pages/leagues/NHL';
import './App.css';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
      light: '#e3f2fd',
      dark: '#42a5f5',
    },
    secondary: {
      main: '#f48fb1',
      light: '#f8bbd0',
      dark: '#c2185b',
    },
    background: {
      default: '#1a1a1a',
      paper: '#2d2d2d',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
    error: {
      main: '#f44336',
      light: '#e57373',
      dark: '#d32f2f',
    },
    success: {
      main: '#4caf50',
      light: '#81c784',
      dark: '#388e3c',
    },
    divider: 'rgba(255, 255, 255, 0.12)',
  },
  typography: {
    fontFamily: '"Montserrat", sans-serif',
    h1: {
      fontWeight: 600,
    },
    h2: {
      fontWeight: 600,
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
      fontWeight: 500,
    },
    button: {
      fontWeight: 500,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        'html, body': {
          margin: 0,
          padding: 0,
          width: '100%',
          maxWidth: '100%',
          overflowX: 'hidden',
          backgroundColor: '#1a1a1a',
        },
        '#root': {
          width: '100%',
          maxWidth: '100%',
          margin: 0,
          padding: 0,
          display: 'flex',
        }
      }
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          width: '100%',
          maxWidth: '100% !important',
          margin: 0,
          padding: 0,
        }
      }
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          width: '100%',
          margin: 0,
          padding: '0 16px',
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          width: '100%',
          left: 0,
          right: 0,
          backgroundColor: '#242424',
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        }
      }
    },
    MuiTextField: {
      defaultProps: {
        variant: 'filled',
      },
      styleOverrides: {
        root: {
          '& .MuiFilledInput-root': {
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
            },
            '&.Mui-focused': {
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
            }
          }
        }
      }
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/premier-league" element={<PremierLeague />} />
            <Route path="/nba" element={<NBA />} />
            <Route path="/mlb" element={<MLB />} />
            <Route path="/nfl" element={<NFL />} />
            <Route path="/nhl" element={<NHL />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App; 