import React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box'; // Used for global styles
import { useStore } from 'store/StoreApp';

export default function Header({ isSignedIn, onSignIn, onSignOut }) {
  const navigate = useNavigate();
  const location = useLocation();
  const {count, increment, clear} = useStore();

  const handleLoginLogout = () => {
    if (isSignedIn) {
      onSignOut(); // Perform sign out operations
      
    } else {
      console.log('container: header - Current location:', location.pathname); // Optional: Log current location
      onSignIn(); 
    }
  };

  return (
    <React.Fragment>
      <Box sx={{
        '@global': {
          ul: {
            margin: 0,
            padding: 0,
            listStyle: 'none',
          },
          a: {
            textDecoration: 'none',
          },
        }
      }}>
        <AppBar
          position="static"
          color="default"
          elevation={0}
          sx={{
            borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
          }}
        >
          <Toolbar sx={{
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}>
            <Typography
              variant="h6"
              color="inherit"
              noWrap
              component={RouterLink}
              to="/"
            >
              App
            </Typography>
            <Button
              color="primary"
              variant="outlined"
              sx={{ my: 1, mx: 1.5 }}
              onClick={increment}
            >
              Counter: {count}
            </Button>
            <Button
              color="primary"
              variant="outlined"
              sx={{ my: 1, mx: 1.5 }}
              onClick={clear}
            >
             ClearCount
            </Button>
            <Button
              color="primary"
              variant="outlined"
              sx={{ my: 1, mx: 1.5 }}
              onClick={handleLoginLogout}
            >
              {isSignedIn ? 'Logout' : 'Login'}
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </React.Fragment>
  );
}
