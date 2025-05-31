import React, { ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Box,
  Link,
  Toolbar,
  Typography,
  Button,
} from '@mui/material';
import Logo from '../assets/Logo.png';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box 
      component="div"
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: '100vh',
        width: '100%',
        margin: 0,
        padding: 0,
        overflow: 'hidden'
      }}
    >
      <AppBar 
        position="static" 
        sx={{ 
          width: '100%',
          margin: 0,
          padding: 0,
          boxShadow: 2
        }}
      >
        <Toolbar 
          sx={{ 
            width: '100%',
            minHeight: { xs: 56, sm: 64 },
            px: 2
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexGrow: 1 }}>
            <Link component={RouterLink} to="/" sx={{ display: 'flex', alignItems: 'center', gap: 1, textDecoration: 'none', color: 'inherit' }}>
              <img 
                src={Logo} 
                alt="Bet Stats Logo" 
                style={{ 
                  height: '32px',
                  width: 'auto'
                }} 
              />
              <Typography variant="h6" component="div">
                Bet Stats
              </Typography>
            </Link>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button color="inherit" component={RouterLink} to="/login">
              Login
            </Button>
            <Button color="inherit" component={RouterLink} to="/signup">
              Sign Up
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Box 
        component="main" 
        sx={{ 
          flex: '1 1 auto',
          width: '100%',
          margin: 0,
          padding: 0,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {children}
      </Box>
      <Box 
        component="footer" 
        sx={{ 
          width: '100%',
          py: 2,
          px: 2,
          backgroundColor: 'background.paper',
          borderTop: 1,
          borderColor: 'divider'
        }}
      >
        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} Bet Stats
        </Typography>
      </Box>
    </Box>
  );
};

export default Layout; 