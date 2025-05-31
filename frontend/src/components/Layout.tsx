import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Container,
  IconButton
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import SideDrawer from './SideDrawer';
import Logo from '../assets/Logo.png';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%' }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
            <img src={Logo} alt="Logo" style={{ height: '40px', marginRight: '10px' }} />
            <Typography variant="h6" component="div">
              Bet Stats
            </Typography>
          </Link>
          
          <Box sx={{ flexGrow: 1 }} />
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Typography>Login</Typography>
            </Link>
            <Link to="/signup" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Typography>Sign Up</Typography>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>

      <SideDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <Container component="main" sx={{ flexGrow: 1, width: '100%', maxWidth: '100% !important', p: 3 }}>
        {children}
      </Container>
    </Box>
  );
};

export default Layout; 