import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
} from '@mui/material';
import {
  People as PeopleIcon,
  School as SchoolIcon,
  Quiz as QuizIcon,
  QuestionAnswer as QuestionIcon,
  Assignment as AssignmentIcon,
  Business as BusinessIcon,
  Book as BookIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StatCard = styled(Card)(({ theme }) => ({
  height: '100%',
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
  },
}));

const StatIcon = styled(Avatar)(({ theme }) => ({
  width: 56,
  height: 56,
  backgroundColor: '#d32f2f',
}));

const Dashboard: React.FC = () => {
  const stats = [
    {
      title: 'Total Students',
      value: '1,247',
      icon: <PeopleIcon />,
      color: '#d32f2f',
      progress: 75,
    },
    {
      title: 'Active Instructors',
      value: '89',
      icon: <SchoolIcon />,
      color: '#1976d2',
      progress: 60,
    },
    {
      title: 'Available Exams',
      value: '156',
      icon: <QuizIcon />,
      color: '#388e3c',
      progress: 85,
    },
    {
      title: 'Total Questions',
      value: '2,847',
      icon: <QuestionIcon />,
      color: '#f57c00',
      progress: 90,
    },
  ];

  const recentActivities = [
    {
      title: 'New exam created',
      description: 'JavaScript Fundamentals - Advanced Level',
      time: '2 hours ago',
      type: 'exam',
    },
    {
      title: 'Student completed exam',
      description: 'Ahmed Mohamed - React Basics',
      time: '3 hours ago',
      type: 'student',
    },
    {
      title: 'New instructor joined',
      description: 'Dr. Sarah Johnson - Web Development',
      time: '5 hours ago',
      type: 'instructor',
    },
    {
      title: 'Question bank updated',
      description: '50 new questions added to Database course',
      time: '1 day ago',
      type: 'question',
    },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'exam':
        return <QuizIcon sx={{ color: '#d32f2f' }} />;
      case 'student':
        return <PeopleIcon sx={{ color: '#1976d2' }} />;
      case 'instructor':
        return <SchoolIcon sx={{ color: '#388e3c' }} />;
      case 'question':
        return <QuestionIcon sx={{ color: '#f57c00' }} />;
      default:
        return <AssignmentIcon sx={{ color: '#666666' }} />;
    }
  };

  return (
    <Box className="fade-in">
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: '#333333' }}>
        Dashboard Overview
      </Typography>
      <Typography variant="body1" sx={{ color: '#666666', mb: 4 }}>
        Welcome to ITI Online Examination System - Final Project
      </Typography>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StatCard>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <StatIcon>{stat.icon}</StatIcon>
                  <Box sx={{ ml: 2, flexGrow: 1 }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: stat.color }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#666666' }}>
                      {stat.title}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ flexGrow: 1, mr: 1 }}>
                    <LinearProgress
                      variant="determinate"
                      value={stat.progress}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: '#f0f0f0',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: stat.color,
                          borderRadius: 4,
                        },
                      }}
                    />
                  </Box>
                  <Typography variant="body2" sx={{ color: '#666666', minWidth: 35 }}>
                    {stat.progress}%
                  </Typography>
                </Box>
              </CardContent>
            </StatCard>
          </Grid>
        ))}
      </Grid>

      {/* Quick Actions and Recent Activities */}
      <Grid container spacing={3}>
        {/* Quick Actions */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Quick Actions
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Chip
                  icon={<BusinessIcon />}
                  label="Manage Branches"
                  clickable
                  sx={{ justifyContent: 'flex-start', height: 40 }}
                />
                <Chip
                  icon={<SchoolIcon />}
                  label="Add Department"
                  clickable
                  sx={{ justifyContent: 'flex-start', height: 40 }}
                />
                <Chip
                  icon={<BookIcon />}
                  label="Create Course"
                  clickable
                  sx={{ justifyContent: 'flex-start', height: 40 }}
                />
                <Chip
                  icon={<QuizIcon />}
                  label="Schedule Exam"
                  clickable
                  sx={{ justifyContent: 'flex-start', height: 40 }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Activities */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Recent Activities
              </Typography>
              <List>
                {recentActivities.map((activity, index) => (
                  <React.Fragment key={index}>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'transparent' }}>
                          {getActivityIcon(activity.type)}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                            {activity.title}
                          </Typography>
                        }
                        secondary={
                          <React.Fragment>
                            <Typography variant="body2" sx={{ color: '#666666' }}>
                              {activity.description}
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#999999' }}>
                              {activity.time}
                            </Typography>
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                    {index < recentActivities.length - 1 && <Divider variant="inset" component="li" />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;

