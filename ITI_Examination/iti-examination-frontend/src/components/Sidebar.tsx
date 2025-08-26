import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Typography,
  Chip,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Business as BusinessIcon,
  School as SchoolIcon,
  People as PeopleIcon,
  Book as BookIcon,
  Quiz as QuizIcon,
  QuestionAnswer as QuestionIcon,
  Assignment as AssignmentIcon,
} from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const drawerWidth = 280;

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
    backgroundColor: '#1a1a1a',
    color: '#ffffff',
    borderRight: '2px solid #d32f2f',
  },
}));

const MenuItem = styled(ListItemButton)(({ theme }) => ({
  margin: '4px 8px',
  borderRadius: '8px',
  '&:hover': {
    backgroundColor: 'rgba(211, 47, 47, 0.1)',
  },
  '&.Mui-selected': {
    backgroundColor: '#d32f2f',
    color: '#ffffff',
    '&:hover': {
      backgroundColor: '#b71c1c',
    },
  },
}));

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { text: 'Branches', icon: <BusinessIcon />, path: '/branches' },
  { text: 'Departments', icon: <SchoolIcon />, path: '/departments' },
  { text: 'Instructors', icon: <PeopleIcon />, path: '/instructors' },
  { text: 'Courses', icon: <BookIcon />, path: '/courses' },
  { text: 'Students', icon: <PeopleIcon />, path: '/students' },
  { text: 'Exams', icon: <QuizIcon />, path: '/exams' },
  { text: 'Questions', icon: <QuestionIcon />, path: '/questions' },
];

const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <StyledDrawer variant="permanent">
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <AssignmentIcon sx={{ color: '#d32f2f', fontSize: '2rem' }} />
          <Box>
            <Typography variant="h6" sx={{ color: '#d32f2f', fontWeight: 700 }}>
              ITI System
            </Typography>
            <Chip
              label="Online Examination"
              size="small"
              sx={{
                backgroundColor: '#d32f2f',
                color: '#ffffff',
                fontSize: '0.7rem',
                height: '20px',
              }}
            />
          </Box>
        </Box>
      </Box>

      <Divider sx={{ borderColor: '#333333' }} />

      <List sx={{ pt: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <MenuItem
              selected={location.pathname === item.path}
              onClick={() => navigate(item.path)}
            >
              <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{
                  '& .MuiListItemText-primary': {
                    fontWeight: location.pathname === item.path ? 600 : 400,
                  },
                }}
              />
            </MenuItem>
          </ListItem>
        ))}
      </List>

      <Box sx={{ mt: 'auto', p: 2 }}>
        <Divider sx={{ borderColor: '#333333', mb: 2 }} />
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="caption" sx={{ color: '#888888' }}>
            ITI Final Project
          </Typography>
          <Typography variant="caption" display="block" sx={{ color: '#666666' }}>
            Online Examination System
          </Typography>
        </Box>
      </Box>
    </StyledDrawer>
  );
};

export default Sidebar;

