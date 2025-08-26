import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { School as SchoolIcon } from '@mui/icons-material';

const Departments: React.FC = () => {
  return (
    <Box className="fade-in">
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: '#333333' }}>
        Departments Management
      </Typography>
      <Typography variant="body1" sx={{ color: '#666666', mb: 4 }}>
        Manage academic departments and their courses
      </Typography>
      
      <Card>
        <CardContent sx={{ textAlign: 'center', py: 8 }}>
          <SchoolIcon sx={{ fontSize: 64, color: '#d32f2f', mb: 2 }} />
          <Typography variant="h6" sx={{ color: '#666666' }}>
            Departments Management Coming Soon
          </Typography>
          <Typography variant="body2" sx={{ color: '#999999' }}>
            This page will include CRUD operations for departments
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Departments;
