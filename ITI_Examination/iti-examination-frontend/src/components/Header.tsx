import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Badge,
  Chip,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  AccountCircle,
  School as SchoolIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#ffffff',
  color: '#333333',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  borderBottom: '2px solid #d32f2f',
}));

const ITILogo = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  '& .iti-text': {
    fontWeight: 700,
    fontSize: '1.5rem',
    color: '#d32f2f',
  },
  '& .system-text': {
    fontWeight: 500,
    fontSize: '1rem',
    color: '#666666',
  },
}));

const Header: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [notificationAnchor, setNotificationAnchor] = React.useState<null | HTMLElement>(null);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setNotificationAnchor(null);
  };

  return (
    <StyledAppBar position="static">
      <Toolbar>
        <ITILogo>
          <SchoolIcon sx={{ color: '#d32f2f', fontSize: '2rem' }} />
          <Box>
            <Typography className="iti-text">ITI</Typography>
            <Typography className="system-text">Examination System</Typography>
          </Box>
        </ITILogo>

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Chip
            label="Final Project"
            color="primary"
            size="small"
            sx={{ fontWeight: 600 }}
          />
          
          <IconButton
            color="inherit"
            onClick={handleNotificationMenuOpen}
            sx={{ position: 'relative' }}
          >
            <Badge badgeContent={3} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <Menu
            anchorEl={notificationAnchor}
            open={Boolean(notificationAnchor)}
            onClose={handleMenuClose}
            PaperProps={{
              sx: {
                mt: 1,
                minWidth: 300,
                maxHeight: 400,
              },
            }}
          >
            <MenuItem onClick={handleMenuClose}>
              <Typography variant="body2">New exam scheduled for tomorrow</Typography>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <Typography variant="body2">5 students completed the quiz</Typography>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <Typography variant="body2">System maintenance scheduled</Typography>
            </MenuItem>
          </Menu>

          <IconButton
            color="inherit"
            onClick={handleProfileMenuOpen}
            sx={{ ml: 1 }}
          >
            <Avatar sx={{ width: 32, height: 32, bgcolor: '#d32f2f' }}>
              <AccountCircle />
            </Avatar>
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{
              sx: {
                mt: 1,
                minWidth: 200,
              },
            }}
          >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
            <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;

