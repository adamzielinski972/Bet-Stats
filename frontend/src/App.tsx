import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import Layout from './components/Layout';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Signup from './pages/Signup';
import './App.css';

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        'html, body': {
          margin: 0,
          padding: 0,
          width: '100%',
          maxWidth: '100%',
          overflowX: 'hidden'
        },
        '#root': {
          width: '100%',
          maxWidth: '100%',
          margin: 0,
          padding: 0,
          display: 'flex'
        }
      }
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          width: '100%',
          maxWidth: '100% !important',
          margin: 0,
          padding: 0
        }
      }
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          width: '100%',
          margin: 0,
          padding: '0 16px'
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          width: '100%',
          left: 0,
          right: 0
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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App; 