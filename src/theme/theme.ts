import { createTheme, ThemeOptions } from '@mui/material/styles';

/**
 * Custom MUI Theme - Ultra Modern Vibrant Design
 *
 * Design System:
 * - Primary: Electric Purple (#6366F1 - #A855F7 - #EC4899)
 * - Accent: Vibrant Cyan (#06B6D4 - #0891B2 - #22D3EE)
 * - Success: Neon Green (#10B981 - #059669 - #34D399)
 * - Warning: Golden Amber (#F59E0B - #F97316)
 * - Error: Crimson Red (#EF4444 - #DC2626)
 * - Ultra-modern glassmorphic + neumorphic blend
 * - Dynamic gradients with multiple color stops
 * - Advanced animations and micro-interactions
 * - Premium shadows and lighting effects
 */

const commonTheme: ThemeOptions = {
  typography: {
    fontFamily: '"Poppins", "Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 800,
      fontSize: '3rem',
      lineHeight: 1.1,
      background: 'linear-gradient(135deg, #6366F1 0%, #A855F7 50%, #EC4899 100%)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    h2: {
      fontWeight: 800,
      fontSize: '2.5rem',
      lineHeight: 1.2,
      background: 'linear-gradient(135deg, #6366F1 0%, #A855F7 100%)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    h3: {
      fontWeight: 700,
      fontSize: '2rem',
      lineHeight: 1.3,
    },
    h4: {
      fontWeight: 700,
      fontSize: '1.5rem',
      lineHeight: 1.4,
      letterSpacing: '-0.5px',
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
      letterSpacing: '0.5px',
    },
    button: {
      textTransform: 'none',
      fontWeight: 700,
      letterSpacing: '0.5px',
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          padding: '14px 32px',
          fontSize: '1rem',
          fontWeight: 700,
          transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
          position: 'relative',
          overflow: 'hidden',
          textTransform: 'none',
          letterSpacing: '0.5px',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '0',
            height: '0',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.4)',
            transform: 'translate(-50%, -50%)',
            transition: 'width 0.8s, height 0.8s',
            zIndex: 0,
          },
          '&:active::before': {
            width: '400px',
            height: '400px',
          },
          '&:hover': {
            transform: 'translateY(-4px) scale(1.03)',
            boxShadow: '0 25px 50px rgba(99, 102, 241, 0.5), 0 0 0 1px rgba(6, 182, 212, 0.3)',
          },
          '& > *': {
            position: 'relative',
            zIndex: 1,
          },
        },
        contained: {
          background: 'linear-gradient(135deg, #6366F1 0%, #A855F7 50%, #EC4899 100%)',
          boxShadow: '0 12px 32px rgba(99, 102, 241, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
          '&:hover': {
            background: 'linear-gradient(135deg, #4F46E5 0%, #9333EA 50%, #DB2777 100%)',
            boxShadow: '0 20px 60px rgba(99, 102, 241, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
          },
        },
        outlined: {
          borderWidth: '2.5px',
          borderColor: '#6366F1',
          color: '#6366F1',
          background: 'rgba(99, 102, 241, 0.05)',
          backdropFilter: 'blur(10px)',
          '&:hover': {
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.1))',
            borderColor: '#A855F7',
            boxShadow: '0 8px 24px rgba(99, 102, 241, 0.2)',
          },
        },
        text: {
          color: '#6366F1',
          '&:hover': {
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.1))',
            color: '#A855F7',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(255, 255, 255, 0.9))',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 8px 32px rgba(99, 102, 241, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: 'linear-gradient(90deg, #6366F1, #A855F7, #EC4899, #06B6D4)',
            opacity: 0,
            transition: 'opacity 0.3s ease',
          },
          '&:hover': {
            transform: 'translateY(-12px) scale(1.02)',
            boxShadow: '0 32px 64px rgba(99, 102, 241, 0.25), 0 0 0 1px rgba(6, 182, 212, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
            '&::before': {
              opacity: 1,
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          border: '1px solid rgba(255, 255, 255, 0.1)',
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.85))',
          backdropFilter: 'blur(10px)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            transition: 'all 0.3s ease-out',
            border: '2px solid rgba(99, 102, 241, 0.2)',
            background: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(10px)',
            '&:hover': {
              border: '2px solid #6366F1',
              boxShadow: '0 8px 24px rgba(99, 102, 241, 0.2)',
              background: 'rgba(255, 255, 255, 0.9)',
            },
            '&.Mui-focused': {
              border: '2px solid #A855F7',
              boxShadow: '0 0 0 4px rgba(168, 85, 247, 0.1)',
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          fontWeight: 700,
          fontSize: '0.875rem',
          height: 32,
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.12), rgba(168, 85, 247, 0.12))',
          border: '2px solid rgba(99, 102, 241, 0.25)',
          backdropFilter: 'blur(10px)',
          transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
          boxShadow: '0 2px 8px rgba(99, 102, 241, 0.1)',
          '&:hover': {
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.25), rgba(168, 85, 247, 0.25))',
            borderColor: 'rgba(99, 102, 241, 0.5)',
            transform: 'translateY(-2px) scale(1.05)',
            boxShadow: '0 8px 24px rgba(99, 102, 241, 0.2)',
          },
        },
        colorPrimary: {
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(168, 85, 247, 0.2))',
          borderColor: '#6366F1',
          color: '#6366F1',
        },
        colorSecondary: {
          background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(16, 185, 129, 0.2))',
          borderColor: '#06B6D4',
          color: '#06B6D4',
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          border: '3px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 4px 12px rgba(99, 102, 241, 0.15)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'scale(1.1)',
            boxShadow: '0 8px 24px rgba(99, 102, 241, 0.3)',
            borderColor: 'rgba(168, 85, 247, 0.5)',
          },
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          height: 8,
          backgroundColor: 'rgba(99, 102, 241, 0.1)',
        },
        bar: {
          borderRadius: 12,
          background: 'linear-gradient(90deg, #6366F1, #A855F7, #EC4899)',
          boxShadow: '0 0 10px rgba(99, 102, 241, 0.5)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.85))',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(99, 102, 241, 0.1)',
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          '& .MuiTableCell-head': {
            fontWeight: 700,
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.1))',
            borderColor: 'rgba(99, 102, 241, 0.2)',
            color: '#6366F1',
          },
          '& .MuiTableBody-root .MuiTableRow-root': {
            transition: 'all 0.2s ease',
            '&:hover': {
              background: 'linear-gradient(90deg, rgba(99, 102, 241, 0.05), rgba(6, 182, 212, 0.05))',
            },
          },
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
      main: '#6366F1',
      light: '#A855F7',
      dark: '#4F46E5',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#06B6D4',
      light: '#22D3EE',
      dark: '#0891B2',
      contrastText: '#ffffff',
    },
    success: {
      main: '#10B981',
      light: '#34D399',
      dark: '#059669',
    },
    warning: {
      main: '#F59E0B',
      light: '#FCD34D',
      dark: '#D97706',
    },
    error: {
      main: '#EF4444',
      light: '#F87171',
      dark: '#DC2626',
    },
    info: {
      main: '#3B82F6',
      light: '#60A5FA',
      dark: '#2563EB',
    },
    background: {
      default: 'linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%)',
      paper: 'rgba(255, 255, 255, 0.95)',
    },
    text: {
      primary: '#0F172A',
      secondary: '#475569',
    },
    divider: 'rgba(99, 102, 241, 0.1)',
  },
});

// Dark Theme
export const darkTheme = createTheme({
  ...commonTheme,
  palette: {
    mode: 'dark',
    primary: {
      main: '#A855F7',
      light: '#D8B4FE',
      dark: '#7C3AED',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#06B6D4',
      light: '#22D3EE',
      dark: '#0891B2',
      contrastText: '#0F172A',
    },
    success: {
      main: '#10B981',
      light: '#34D399',
      dark: '#059669',
    },
    warning: {
      main: '#F59E0B',
      light: '#FCD34D',
      dark: '#D97706',
    },
    error: {
      main: '#EF4444',
      light: '#F87171',
      dark: '#DC2626',
    },
    info: {
      main: '#3B82F6',
      light: '#60A5FA',
      dark: '#2563EB',
    },
    background: {
      default: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
      paper: 'rgba(30, 41, 59, 0.95)',
    },
    text: {
      primary: '#F8FAFC',
      secondary: '#CBD5E1',
    },
    divider: 'rgba(168, 85, 247, 0.2)',
  },
});
