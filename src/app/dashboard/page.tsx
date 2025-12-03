'use client';

import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

/**
 * Dashboard Home Page
 * Overview with metric cards
 */

export default function DashboardPage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  const metrics = [
    {
      title: 'Total Users',
      value: '208',
      icon: <PeopleIcon sx={{ fontSize: 40 }} />,
      color: '#5A4CF3',
      bgColor: 'rgba(90, 76, 243, 0.1)',
      link: '/dashboard/users',
    },
    {
      title: 'Total Products',
      value: '194',
      icon: <ShoppingCartIcon sx={{ fontSize: 40 }} />,
      color: '#8C7CFF',
      bgColor: 'rgba(140, 124, 255, 0.1)',
      link: '/dashboard/products',
    },
    {
      title: 'Growth',
      value: '+23%',
      icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
      color: '#10B981',
      bgColor: 'rgba(16, 185, 129, 0.1)',
      link: '#',
    },
  ];

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Welcome back, {user?.firstName || 'Admin'}! 👋
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Here's what's happening with your admin panel today.
      </Typography>

      <Grid container spacing={3}>
        {metrics.map((metric) => (
          <Grid item xs={12} sm={6} md={4} key={metric.title}>
            <Card
              sx={{
                cursor: metric.link !== '#' ? 'pointer' : 'default',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: metric.link !== '#' ? 'translateY(-4px)' : 'none',
                  boxShadow: metric.link !== '#' ? 6 : 1,
                },
              }}
              onClick={() => metric.link !== '#' && router.push(metric.link)}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor: metric.bgColor,
                      color: metric.color,
                      width: 64,
                      height: 64,
                    }}
                  >
                    {metric.icon}
                  </Avatar>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      {metric.title}
                    </Typography>
                    <Typography variant="h4" fontWeight="bold">
                      {metric.value}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Card>
          <CardContent>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Quick Start Guide
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Navigate through the sidebar to manage users and products. Use the search and filter features to find what you need quickly.
            </Typography>
            <Box component="ul" sx={{ pl: 2, m: 0 }}>
              <Typography component="li" variant="body2" color="text.secondary">
                View and search users in the Users section
              </Typography>
              <Typography component="li" variant="body2" color="text.secondary">
                Browse products with category filters in the Products section
              </Typography>
              <Typography component="li" variant="body2" color="text.secondary">
                Toggle dark mode using the theme button in the navbar
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
