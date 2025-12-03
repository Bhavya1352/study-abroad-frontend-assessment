'use client';

import React from 'react';
import { Box } from '@mui/material';
import Sidebar from '@/components/common/Sidebar';
import Navbar from '@/components/common/Navbar';
import { useAuthGuard } from '@/hooks/useAuthGuard';

/**
 * Dashboard Layout
 * Protected layout with sidebar and navbar
 */

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  useAuthGuard();

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        
        <Box
          component="main"
          sx={{
            flex: 1,
            p: { xs: 2, sm: 3, md: 4 },
            bgcolor: 'background.default',
            overflow: 'auto',
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
