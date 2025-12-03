'use client';

import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useUIStore } from '@/store/uiStore';

/**
 * Dark Mode Toggle Button
 * Toggles between light and dark theme
 */

const DarkModeToggle = React.memo(() => {
  const themeMode = useUIStore((state) => state.themeMode);
  const toggleTheme = useUIStore((state) => state.toggleTheme);

  return (
    <Tooltip title={`Switch to ${themeMode === 'dark' ? 'light' : 'dark'} mode`}>
      <IconButton onClick={toggleTheme} color="inherit">
        {themeMode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Tooltip>
  );
});

DarkModeToggle.displayName = 'DarkModeToggle';

export default DarkModeToggle;
