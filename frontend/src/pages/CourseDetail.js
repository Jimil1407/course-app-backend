import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Card,
  CardMedia,
  CardContent,
  Button,
  Grid,
  Chip,
  CircularProgress,
  Alert,
  Divider,
  Paper,
} from '@mui/material';
import { Star, PlayCircle, ShoppingCart } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    fetchCourse();
  }, [id]);

  const fetchCourse = async () => {
    try {
      const response = await axios.get('http://localhost:3000/course/preview');
      const courseData = response.data.courses.find(c => c._id === id);
      if (courseData) {
        setCourse(courseData);
      } else {
        setError('Course not found');
      }
      setLoading(false);
    } catch (error) {
      setError('Failed to load course');
      setLoading(false);
    }
  };

  const handlePurchase = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    setPurchasing(true);
    setError(null);
    setSuccess(null);

    try {
      const token = localStorage.getItem('userToken');
      const response = await axios.post(
        'http://localhost:3000/course/purchase',
        { courseId: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess('Course purchased successfully!');
      setTimeout(() => {
        navigate('/my-courses');
      }, 2000);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to purchase course');
    } finally {
      setPurchasing(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error && !course) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!course) {
    return null;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {success}
        </Alert>
      )}

      <Grid container spacing={4}>
        {/* Course Image and Basic Info */}
        <Grid item xs={12} md={8}>
          <Card elevation={2}>
            <CardMedia
              component="img"
              height="400"
              image={course.imageUrl || 'https://via.placeholder.com/800x400?text=Course+Image'}
              alt={course.title}
              sx={{ objectFit: 'cover' }}
            />
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
                {course.title}
              </Typography>
              
              <Box display="flex" alignItems="center" gap={2} sx={{ mb: 2 }}>
                <Chip
                  icon={<Star />}
                  label="4.5 (120 reviews)"
                  color="warning"
                  size="small"
                />
                <Typography variant="body2" color="text.secondary">
                  Created by Instructor
                </Typography>
              </Box>

              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                {course.description}
              </Typography>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" gutterBottom>
                What you'll learn
              </Typography>
              <Box component="ul" sx={{ pl: 2 }}>
                <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                  Master the fundamentals of this subject
                </Typography>
                <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                  Build practical projects and applications
                </Typography>
                <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                  Learn from real-world examples and case studies
                </Typography>
                <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                  Get lifetime access to course materials
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Purchase Card */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, position: 'sticky', top: 20 }}>
            <Typography variant="h4" color="primary" sx={{ fontWeight: 600, mb: 2 }}>
              ${course.price}
            </Typography>

            <Button
              variant="contained"
              size="large"
              fullWidth
              startIcon={purchasing ? <CircularProgress size={20} /> : <ShoppingCart />}
              onClick={handlePurchase}
              disabled={purchasing}
              sx={{ mb: 2, py: 1.5 }}
            >
              {purchasing ? 'Processing...' : 'Purchase Course'}
            </Button>

            <Button
              variant="outlined"
              size="large"
              fullWidth
              startIcon={<PlayCircle />}
              sx={{ py: 1.5 }}
            >
              Preview Course
            </Button>

            <Box sx={{ mt: 3 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                This course includes:
              </Typography>
              <Box component="ul" sx={{ pl: 2, m: 0 }}>
                <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>
                  Lifetime access
                </Typography>
                <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>
                  Certificate of completion
                </Typography>
                <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>
                  Downloadable resources
                </Typography>
                <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>
                  Mobile and TV access
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CourseDetail;