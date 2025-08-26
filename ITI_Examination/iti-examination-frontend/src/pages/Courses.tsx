import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { Book as BookIcon } from '@mui/icons-material';

const Courses: React.FC = () => {
  return (
    <Box className="fade-in">
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: '#333333' }}>
        Courses Management
      </Typography>
      <Typography variant="body1" sx={{ color: '#666666', mb: 4 }}>
        Manage academic courses and their content
      </Typography>
      
      <Card>
        <CardContent sx={{ textAlign: 'center', py: 8 }}>
          <BookIcon sx={{ fontSize: 64, color: '#d32f2f', mb: 2 }} />
          <Typography variant="h6" sx={{ color: '#666666' }}>
            Courses Management Coming Soon
          </Typography>
          <Typography variant="body2" sx={{ color: '#999999' }}>
            This page will include CRUD operations for courses
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Courses;
