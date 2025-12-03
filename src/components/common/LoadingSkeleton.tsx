'use client';

import React from 'react';
import { Box, Skeleton, Card, CardContent } from '@mui/material';

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
  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 3 }}>
    {[...Array(count)].map((_, index) => (
      <Box key={index}>
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
      </Box>
    ))}
  </Box>
));

GridSkeleton.displayName = 'GridSkeleton';

// Detail page skeleton
export const DetailSkeleton = React.memo(() => (
  <Box>
    <Skeleton variant="text" width="40%" height={40} sx={{ mb: 2 }} />
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
      <Box>
        <Skeleton variant="rectangular" height={400} />
      </Box>
      <Box>
        <Skeleton variant="text" width="80%" height={30} />
        <Skeleton variant="text" width="60%" sx={{ mb: 2 }} />
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="90%" />
        <Box sx={{ mt: 3 }}>
          <Skeleton variant="rectangular" width={120} height={40} />
        </Box>
      </Box>
    </Box>
  </Box>
));

DetailSkeleton.displayName = 'DetailSkeleton';
