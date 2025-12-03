import { createTheme, ThemeOptions } from '@mui/material/styles';

/**
 * Custom MUI Theme with Glassmorphic Design
 * 
 * Design System:
 * - Primary: Purple/Blue Gradient (#5A4CF3 - #8C7CFF)
 * - Modern glassmorphism effects
 * - Smooth transitions
 * - Professional spacing and typography
 */

const commonTheme: ThemeOptions = {
  typography: {
    fontFamily: '"Inter", "Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.2,
    },
    h2: {
      fontWeight: 700,
      fontSize: '2rem',
      lineHeight: 1.3,
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem',
      lineHeight: 1.4,
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.4,
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.5,
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: '10px 24px',
          fontSize: '1rem',
          transition: 'all 0.2s ease-out',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 16px rgba(90, 76, 243, 0.3)',
          },
        },
        contained: {
          boxShadow: '0 4px 12px rgba(90, 76, 243, 0.2)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          transition: 'all 0.3s ease-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 12px 28px rgba(0, 0, 0, 0.12)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 10,
            transition: 'all 0.2s ease-out',
            '&:hover': {
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
        },
      },
    },
  },
};

// Light Theme
export const lightTheme = createTheme({
  ...commonTheme,
  palette: {
    mode: 'light',
    primary: {
      main: '#5A4CF3',
      light: '#8C7CFF',
      dark: '#4338CA',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#8C7CFF',
      light: '#A79AFF',
      dark: '#6B5CE3',
      contrastText: '#ffffff',
    },
    background: {
      default: '#F9FAFB',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1F2937',
      secondary: '#6B7280',
    },
    divider: 'rgba(0, 0, 0, 0.08)',
    error: {
      main: '#EF4444',
    },
    success: {
      main: '#10B981',
    },
    warning: {
      main: '#F59E0B',
    },
    info: {
      main: '#3B82F6',
    },
  },
});

// Dark Theme with Glassmorphism
export const darkTheme = createTheme({
  ...commonTheme,
  palette: {
    mode: 'dark',
    primary: {
      main: '#8C7CFF',
      light: '#A79AFF',
      dark: '#6B5CE3',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#A79AFF',
      light: '#C4B5FF',
      dark: '#8C7CFF',
      contrastText: '#ffffff',
    },
    background: {
      default: '#0F172A',
      paper: 'rgba(30, 41, 59, 0.8)', // Glassmorphic effect
    },
    text: {
      primary: '#F1F5F9',
      secondary: '#94A3B8',
    },
    divider: 'rgba(255, 255, 255, 0.1)',
    error: {
      main: '#F87171',
    },
    success: {
      main: '#34D399',
    },
    warning: {
      main: '#FBBF24',
    },
    info: {
      main: '#60A5FA',
    },
  },
});
