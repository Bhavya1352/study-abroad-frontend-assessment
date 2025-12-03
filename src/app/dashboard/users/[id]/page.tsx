'use client';

import React, { useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Avatar,
  Chip,
  Button,
  Divider,
  Alert,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import BusinessIcon from '@mui/icons-material/Business';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/userStore';
import { DetailSkeleton } from '@/components/common/LoadingSkeleton';

/**
 * User Detail Page
 * Displays complete user information
 */

interface UserDetailPageProps {
  params: { id: string };
}

export default function UserDetailPage({ params }: UserDetailPageProps) {
  const router = useRouter();
  const userId = parseInt(params.id);

  const currentUser = useUserStore((state) => state.currentUser);
  const isLoading = useUserStore((state) => state.isLoading);
  const error = useUserStore((state) => state.error);
  const fetchUserById = useUserStore((state) => state.fetchUserById);

  useEffect(() => {
    fetchUserById(userId);
  }, [userId, fetchUserById]);

  if (isLoading) {
    return (
      <Box>
        <DetailSkeleton />
      </Box>
    );
  }

  if (error) {
    return (
      <Box>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => router.push('/dashboard/users')}
        >
          Back to Users
        </Button>
      </Box>
    );
  }

  if (!currentUser) {
    return (
      <Box>
        <Alert severity="info">User not found</Alert>
      </Box>
    );
  }

  return (
    <Box>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => router.push('/dashboard/users')}
        sx={{ mb: 3 }}
      >
        Back to Users
      </Button>

      <Grid container spacing={3}>
        {/* Left Column - Profile */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Avatar
              src={currentUser.image}
              alt={currentUser.firstName}
              sx={{ width: 120, height: 120, mx: 'auto', mb: 2 }}
            />
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              {currentUser.firstName} {currentUser.lastName}
            </Typography>
            <Chip
              label={currentUser.gender}
              color={currentUser.gender === 'male' ? 'primary' : 'secondary'}
              sx={{ mb: 2, textTransform: 'capitalize' }}
            />
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Age: {currentUser.age} years
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Blood Group: {currentUser.bloodGroup}
            </Typography>
          </Paper>

          <Paper sx={{ p: 3, mt: 2 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Physical Info
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Height: {currentUser.height} cm
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Weight: {currentUser.weight} kg
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Eye Color: {currentUser.eyeColor}
            </Typography>
          </Paper>
        </Grid>

        {/* Right Column - Details */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 2 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Contact Information
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <EmailIcon color="primary" />
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Email
                </Typography>
                <Typography variant="body1">{currentUser.email}</Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <PhoneIcon color="primary" />
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Phone
                </Typography>
                <Typography variant="body1">{currentUser.phone}</Typography>
              </Box>
            </Box>
          </Paper>

          <Paper sx={{ p: 3, mb: 2 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Company Information
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <BusinessIcon color="primary" />
              <Box>
                <Typography variant="body1" fontWeight={600}>
                  {currentUser.company.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {currentUser.company.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Department: {currentUser.company.department}
                </Typography>
              </Box>
            </Box>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Address
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <LocationOnIcon color="primary" />
              <Box>
                <Typography variant="body1">
                  {currentUser.address.city}, {currentUser.address.state}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {currentUser.address.country}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
