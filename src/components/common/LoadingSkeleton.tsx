'use client';

import React from 'react';
import { Box, Skeleton, Grid, Card, CardContent } from '@mui/material';

/**
 * Loading Skeleton Components
 * Professional loading states for different layouts
 */

// Table skeleton
export const TableSkeleton = React.memo(() => (
  <Box>
    {[...Array(5)].map((_, index) => (
      <Box
        key={index}
        sx={{
          display: 'flex',
          gap: 2,
          py: 2,
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Skeleton variant="circular" width={40} height={40} />
        <Box sx={{ flex: 1 }}>
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="text" width="40%" />
        </Box>
        <Skeleton variant="rectangular" width={80} height={32} />
      </Box>
    ))}
  </Box>
));

TableSkeleton.displayName = 'TableSkeleton';

// Grid skeleton
export const GridSkeleton = React.memo(({ count = 6 }: { count?: number }) => (
  <Grid container spacing={3}>
    {[...Array(count)].map((_, index) => (
      <Grid item xs={12} sm={6} md={4} key={index}>
        <Card>
          <Skeleton variant="rectangular" height={200} />
          <CardContent>
            <Skeleton variant="text" width="80%" />
            <Skeleton variant="text" width="60%" />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Skeleton variant="text" width="40%" />
              <Skeleton variant="text" width="30%" />
            </Box>
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
));

GridSkeleton.displayName = 'GridSkeleton';

// Detail page skeleton
export const DetailSkeleton = React.memo(() => (
  <Box>
    <Skeleton variant="text" width="40%" height={40} sx={{ mb: 2 }} />
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Skeleton variant="rectangular" height={400} />
      </Grid>
      <Grid item xs={12} md={6}>
        <Skeleton variant="text" width="80%" height={30} />
        <Skeleton variant="text" width="60%" sx={{ mb: 2 }} />
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="90%" />
        <Box sx={{ mt: 3 }}>
          <Skeleton variant="rectangular" width={120} height={40} />
        </Box>
      </Grid>
    </Grid>
  </Box>
));

DetailSkeleton.displayName = 'DetailSkeleton';
