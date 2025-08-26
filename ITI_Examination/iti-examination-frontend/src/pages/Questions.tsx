import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { QuestionAnswer as QuestionIcon } from '@mui/icons-material';

const Questions: React.FC = () => {
  return (
    <Box className="fade-in">
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: '#333333' }}>
        Questions Management
      </Typography>
      <Typography variant="body1" sx={{ color: '#666666', mb: 4 }}>
        Create and manage exam questions and answers
      </Typography>
      
      <Card>
        <CardContent sx={{ textAlign: 'center', py: 8 }}>
          <QuestionIcon sx={{ fontSize: 64, color: '#d32f2f', mb: 2 }} />
          <Typography variant="h6" sx={{ color: '#666666' }}>
            Questions Management Coming Soon
          </Typography>
          <Typography variant="body2" sx={{ color: '#999999' }}>
            This page will include question bank management
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Questions;
