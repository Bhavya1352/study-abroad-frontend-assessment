'use client';

import React, { useState } from 'react';
import { Box, Paper, Typography, Container, Button, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SmoothScroll from './SmoothScroll';

interface ScrollSnapSection {
  id: string;
  title: string;
  color: string;
  icon?: string;
}

interface ScrollableContainerProps {
  sections?: ScrollSnapSection[];
  enableSnap?: boolean;
  children?: React.ReactNode;
  stickySections?: boolean;
}

export default function ScrollableContainer({
  sections = [],
  enableSnap = true,
  children,
  stickySections = false,
}: ScrollableContainerProps) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        scrollBehavior: 'smooth',
        '&::-webkit-scrollbar': {
          width: 10,
          height: 10,
        },
        '&::-webkit-scrollbar-track': {
          background: 'transparent',
        },
        '&::-webkit-scrollbar-thumb': {
          background: theme.palette.primary.main,
          borderRadius: 5,
          '&:hover': {
            background: theme.palette.primary.dark,
          },
        },
      }}
    >
      {sections.length > 0 && <SmoothScroll sections={sections} />}
      
      {children}
    </Box>
  );
}
