'use client';

import React, { useEffect } from 'react';
import { Box, Typography, Paper, Avatar, Chip, Button, Divider, Alert } from '@mui/material';
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

export default function UserDetailPage({ params }: any) {
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
        sx={{
          mb: 4,
          borderRadius: 3,
          px: 3,
          py: 1.5,
          fontWeight: 600,
          textTransform: 'none',
          boxShadow: '0 4px 12px rgba(99, 102, 241, 0.2)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 20px rgba(99, 102, 241, 0.3)',
          },
        }}
      >
        Back to Users
      </Button>

      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          fontWeight="800"
          gutterBottom
          sx={{
            background: 'linear-gradient(135deg, #6366F1 0%, #A855F7 50%, #EC4899 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 2,
          }}
        >
          👤 User Profile
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem' }}>
          Detailed information about {currentUser.firstName} {currentUser.lastName}
        </Typography>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 2fr' }, gap: 4 }}>
        {/* Left Column - Profile */}
        <Box>
          <Paper
            sx={{
              p: 4,
              textAlign: 'center',
              borderRadius: 4,
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(255, 255, 255, 0.95))',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 8px 32px rgba(99, 102, 241, 0.1)',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: 'linear-gradient(90deg, #6366F1, #A855F7, #EC4899)',
              },
            }}
          >
            <Avatar
              src={currentUser.image}
              alt={currentUser.firstName}
              sx={{
                width: 140,
                height: 140,
                mx: 'auto',
                mb: 3,
                border: '4px solid',
                borderColor: currentUser.gender === 'male' ? 'primary.main' : 'secondary.main',
                boxShadow: '0 8px 24px rgba(99, 102, 241, 0.3)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 12px 32px rgba(99, 102, 241, 0.4)',
                },
              }}
            />
            <Typography variant="h5" fontWeight="800" gutterBottom sx={{ color: 'text.primary' }}>
              {currentUser.firstName} {currentUser.lastName}
            </Typography>
            <Chip
              label={currentUser.gender}
              color={currentUser.gender === 'male' ? 'primary' : 'secondary'}
              sx={{
                mb: 3,
                textTransform: 'capitalize',
                fontWeight: 600,
                fontSize: '0.875rem',
                height: 32,
                borderRadius: 2,
              }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, mb: 2 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" fontWeight="bold" color="primary.main">
                  {currentUser.age}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Age
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" fontWeight="bold" color="secondary.main">
                  {currentUser.bloodGroup}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Blood Group
                </Typography>
              </Box>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
              User ID: {currentUser.id}
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
        </Box>

        {/* Right Column - Details */}
        <Box>
          <Paper
            sx={{
              p: 4,
              mb: 3,
              borderRadius: 4,
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(255, 255, 255, 0.95))',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 8px 32px rgba(6, 182, 212, 0.1)',
            }}
          >
            <Typography variant="h6" fontWeight="800" gutterBottom sx={{ color: 'primary.main', mb: 3 }}>
              📧 Contact Information
            </Typography>
            <Divider sx={{ mb: 3, borderColor: 'rgba(6, 182, 212, 0.2)' }} />
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 3 }}>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, p: 2, borderRadius: 2, bgcolor: 'rgba(99, 102, 241, 0.05)' }}>
                  <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: 'primary.main', color: 'white' }}>
                    <EmailIcon />
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary" fontWeight={600}>
                      Email Address
                    </Typography>
                    <Typography variant="body1" fontWeight={500}>{currentUser.email}</Typography>
                  </Box>
                </Box>
              </Box>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, p: 2, borderRadius: 2, bgcolor: 'rgba(6, 182, 212, 0.05)' }}>
                  <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: 'secondary.main', color: 'white' }}>
                    <PhoneIcon />
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary" fontWeight={600}>
                      Phone Number
                    </Typography>
                    <Typography variant="body1" fontWeight={500}>{currentUser.phone}</Typography>
                  </Box>
                </Box>
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
        </Box>
      </Box>
    </Box>
  );
}
