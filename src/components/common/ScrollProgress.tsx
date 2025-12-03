'use client';

import React, { useState, useEffect } from 'react';
import { Box, LinearProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const theme = useTheme();

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setScrollProgress(scrollPercent);
    };

    window.addEventListener('scroll', updateScrollProgress);
    updateScrollProgress(); // Initial call

    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1100,
        height: 3,
      }}
    >
      <LinearProgress
        variant="determinate"
        value={scrollProgress}
        sx={{
          height: 3,
          bgcolor: 'transparent',
          '& .MuiLinearProgress-bar': {
            bgcolor: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            borderRadius: 0,
          },
        }}
      />
    </Box>
  );
}