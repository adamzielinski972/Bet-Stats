import React from 'react';
import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  ListItemButton,
  Divider,
  Box
} from '@mui/material';
import { 
  SportsSoccer as SoccerIcon,
  SportsBasketball as BasketballIcon,
  SportsBaseball as BaseballIcon,
  SportsFootball as FootballIcon,
  SportsHockey as HockeyIcon,
  Home as HomeIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface SideDrawerProps {
  open: boolean;
  onClose: () => void;
}

const leagues = [
  { name: 'Home', icon: <HomeIcon />, path: '/' },
  { name: 'Premier League', icon: <SoccerIcon />, path: '/premier-league' },
  { name: 'NBA', icon: <BasketballIcon />, path: '/nba' },
  { name: 'MLB', icon: <BaseballIcon />, path: '/mlb' },
  { name: 'NFL', icon: <FootballIcon />, path: '/nfl' },
  { name: 'NHL', icon: <HockeyIcon />, path: '/nhl' },
];

const SideDrawer: React.FC<SideDrawerProps> = ({ open, onClose }) => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 240,
          backgroundColor: 'background.paper',
        },
      }}
    >
      <Box sx={{ pt: 2 }}>
        <List>
          {leagues.map((league) => (
            <ListItem key={league.name} disablePadding>
              <ListItemButton onClick={() => handleNavigation(league.path)}>
                <ListItemIcon sx={{ color: 'primary.main' }}>
                  {league.icon}
                </ListItemIcon>
                <ListItemText primary={league.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider sx={{ my: 2 }} />
      </Box>
    </Drawer>
  );
};

export default SideDrawer; 