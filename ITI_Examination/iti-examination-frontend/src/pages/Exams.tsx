import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { Quiz as QuizIcon } from '@mui/icons-material';

const Exams: React.FC = () => {
  return (
    <Box className="fade-in">
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: '#333333' }}>
        Exams Management
      </Typography>
      <Typography variant="body1" sx={{ color: '#666666', mb: 4 }}>
        Create and manage online examinations
      </Typography>
      
      <Card>
        <CardContent sx={{ textAlign: 'center', py: 8 }}>
          <QuizIcon sx={{ fontSize: 64, color: '#d32f2f', mb: 2 }} />
          <Typography variant="h6" sx={{ color: '#666666' }}>
            Exams Management Coming Soon
          </Typography>
          <Typography variant="body2" sx={{ color: '#999999' }}>
            This page will include exam creation and scheduling
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Exams;
