import { createTheme, ThemeOptions } from '@mui/material/styles';

/**
 * Custom MUI Theme - Modern Vibrant Design
 * 
 * Design System:
 * - Primary: Electric Purple (#6366F1 - #A855F7)
 * - Accent: Vibrant Cyan (#06B6D4 - #0891B2)
 * - Success: Neon Green (#10B981 - #059669)
 * - Modern neumorphic + glassmorphic blend
 * - Bold gradients and vibrant colors
 * - Smooth transitions and hover effects
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
          borderRadius: 12,
          padding: '12px 28px',
          fontSize: '1rem',
          transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '0',
            height: '0',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.3)',
            transform: 'translate(-50%, -50%)',
            transition: 'width 0.6s, height 0.6s',
          },
          '&:active::before': {
            width: '300px',
            height: '300px',
          },
          '&:hover': {
            transform: 'translateY(-3px) scale(1.02)',
            boxShadow: '0 20px 40px rgba(99, 102, 241, 0.4)',
          },
        },
        contained: {
          background: 'linear-gradient(135deg, #6366F1 0%, #A855F7 100%)',
          boxShadow: '0 8px 24px rgba(99, 102, 241, 0.3)',
          '&:hover': {
            background: 'linear-gradient(135deg, #4F46E5 0%, #9333EA 100%)',
          },
        },
        outlined: {
          borderWidth: '2px',
          borderColor: '#6366F1',
          color: '#6366F1',
          '&:hover': {
            background: 'rgba(99, 102, 241, 0.05)',
            borderColor: '#A855F7',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.85))',
          backdropFilter: 'blur(10px)',
          '&:hover': {
            transform: 'translateY(-8px) scale(1.01)',
            boxShadow: '0 25px 50px rgba(99, 102, 241, 0.2), 0 0px 1px rgba(6, 182, 212, 0.5)',
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
          borderRadius: 10,
          fontWeight: 600,
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.1))',
          border: '1.5px solid rgba(99, 102, 241, 0.3)',
          transition: 'all 0.2s ease',
          '&:hover': {
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(168, 85, 247, 0.2))',
            borderColor: 'rgba(99, 102, 241, 0.6)',
          },
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
      light: '#0891B2',
      dark: '#0E7490',
      contrastText: '#ffffff',
    },
    success: {
      main: '#10B981',
      light: '#059669',
      dark: '#047857',
    },
    warning: {
      main: '#F59E0B',
    },
    error: {
      main: '#EF4444',
    },
    background: {
      default: 'linear-gradient(135deg, #F5F3FF 0%, #F0F9FF 50%, #ECFDF5 100%)',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1F2937',
      secondary: '#6B7280',
    },
    divider: 'rgba(0, 0, 0, 0.08)',
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
      contrastText: '#1F2937',
    },
    success: {
      main: '#10B981',
    },
    warning: {
      main: '#F59E0B',
    },
    error: {
      main: '#EF4444',
    },
    background: {
      default: '#0F172A',
      paper: '#1E293B',
    },
    text: {
      primary: '#F1F5F9',
      secondary: '#CBD5E1',
    },
    divider: 'rgba(255, 255, 255, 0.1)',
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
