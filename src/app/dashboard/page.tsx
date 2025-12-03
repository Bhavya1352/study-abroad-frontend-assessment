'use client';

import React from 'react';
import { Box, Card, CardContent, Typography, Avatar, LinearProgress } from '@mui/material';
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
      percentage: 12,
      icon: <PeopleIcon sx={{ fontSize: 40 }} />,
      color: '#6366F1',
      gradientStart: 'rgba(99, 102, 241, 0.2)',
      gradientEnd: 'rgba(168, 85, 247, 0.2)',
      link: '/dashboard/users',
      trend: '+5% from last month',
    },
    {
      title: 'Total Products',
      value: '194',
      percentage: 68,
      icon: <ShoppingCartIcon sx={{ fontSize: 40 }} />,
      color: '#06B6D4',
      gradientStart: 'rgba(6, 182, 212, 0.2)',
      gradientEnd: 'rgba(16, 185, 129, 0.2)',
      link: '/dashboard/products',
      trend: '+8% from last month',
    },
    {
      title: 'Growth Rate',
      value: '+23%',
      percentage: 85,
      icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
      color: '#10B981',
      gradientStart: 'rgba(16, 185, 129, 0.2)',
      gradientEnd: 'rgba(6, 182, 212, 0.2)',
      link: '#',
      trend: 'Highest in 6 months',
    },
  ];

  return (
    <Box>
      <Box sx={{ mb: 8, textAlign: 'center' }}>
        <Typography
          variant="h3"
          fontWeight="800"
          gutterBottom
          sx={{
            background: 'linear-gradient(135deg, #6366F1 0%, #A855F7 50%, #EC4899 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 3,
          }}
        >
          Welcome back, {user?.firstName || 'Admin'}! 👋
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ fontSize: '1.2rem', maxWidth: 600, mx: 'auto', lineHeight: 1.6 }}
        >
          Here's your platform performance at a glance. Monitor key metrics and manage your data efficiently.
        </Typography>
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Box sx={{ width: 60, height: 4, bgcolor: 'primary.main', borderRadius: 2 }} />
          <Box sx={{ width: 30, height: 4, bgcolor: 'secondary.main', borderRadius: 2 }} />
          <Box sx={{ width: 15, height: 4, bgcolor: 'warning.main', borderRadius: 2 }} />
        </Box>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 3 }}>
        {metrics.map((metric) => (
          <Box key={metric.title}>
            <Card
              sx={{
                cursor: metric.link !== '#' ? 'pointer' : 'default',
                transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                background: `linear-gradient(135deg, ${metric.gradientStart}, ${metric.gradientEnd})`,
                backdropFilter: 'blur(10px)',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: '-50%',
                  right: '-50%',
                  width: '400px',
                  height: '400px',
                  borderRadius: '50%',
                  background: `radial-gradient(circle, ${metric.color}15, transparent)`,
                  zIndex: 0,
                },
                '&:hover': {
                  transform: metric.link !== '#' ? 'translateY(-12px) scale(1.02)' : 'none',
                  boxShadow: `0 30px 60px ${metric.color}30, 0 0 1px rgba(6, 182, 212, 0.5)`,
                },
              }}
              onClick={() => metric.link !== '#' && router.push(metric.link)}
            >
              <CardContent sx={{ position: 'relative', zIndex: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor: `${metric.color}20`,
                      color: metric.color,
                      width: 70,
                      height: 70,
                      fontSize: '2rem',
                      border: `2px solid ${metric.color}50`,
                    }}
                  >
                    {metric.icon}
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ fontSize: '0.9rem', fontWeight: 500 }}
                    >
                      {metric.title}
                    </Typography>
                    <Typography 
                      variant="h4" 
                      fontWeight="800"
                      sx={{ color: metric.color }}
                    >
                      {metric.value}
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ mb: 1.5 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="caption" color="text.secondary">
                      Performance
                    </Typography>
                    <Typography 
                      variant="caption" 
                      sx={{ color: metric.color, fontWeight: 700 }}
                    >
                      {metric.percentage}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={metric.percentage}
                    sx={{
                      borderRadius: 10,
                      height: 6,
                      backgroundColor: `${metric.color}20`,
                      '& .MuiLinearProgress-bar': {
                        borderRadius: 10,
                        background: `linear-gradient(90deg, ${metric.color}, #A855F7)`,
                      },
                    }}
                  />
                </Box>
                
                <Typography 
                  variant="caption" 
                  color="text.secondary"
                  sx={{ fontSize: '0.85rem', fontStyle: 'italic' }}
                >
                  {metric.trend}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>

      <Box sx={{ mt: 6 }}>
        <Card
          sx={{
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.1))',
            border: '1px solid rgba(99, 102, 241, 0.2)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <CardContent>
            <Typography 
              variant="h5" 
              fontWeight="800"
              sx={{
                background: 'linear-gradient(135deg, #6366F1, #A855F7)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2,
              }}
            >
              ✨ Quick Start Guide
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Navigate through the sidebar to manage users and products. Use the search and filter features to find what you need quickly.
            </Typography>
            <Box component="ul" sx={{ pl: 2, m: 0 }}>
              <Typography component="li" variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                👥 View and search users in the Users section
              </Typography>
              <Typography component="li" variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                🛍️ Browse products with category filters in the Products section
              </Typography>
              <Typography component="li" variant="body2" color="text.secondary">
                🌙 Toggle dark mode using the theme button in the navbar
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
