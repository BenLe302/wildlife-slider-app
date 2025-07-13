export const theme = {
  colors: {
    primary: {
      main: '#FF6B35',
      light: '#FF8A65',
      dark: '#E64A19',
      contrast: '#FFFFFF',
    },
    secondary: {
      main: '#2E7D32',
      light: '#4CAF50',
      dark: '#1B5E20',
      contrast: '#FFFFFF',
    },
    accent: {
      main: '#FFC107',
      light: '#FFD54F',
      dark: '#FF8F00',
      contrast: '#000000',
    },
    error: {
      main: '#f44336',
      light: '#ffcdd2',
      dark: '#d32f2f',
      contrast: '#ffffff'
    },
    danger: {
      main: '#dc3545',
      light: '#f8d7da',
      dark: '#c82333',
      contrast: '#ffffff'
    },
    background: {
      primary: '#121212',
      secondary: '#1E1E1E',
      tertiary: '#2D2D2D',
      paper: '#1E1E1E',
      overlay: 'rgba(0, 0, 0, 0.8)',
      hover: '#2D2D2D',
      glass: 'rgba(18, 18, 18, 0.8)',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B0B0B0',
      tertiary: '#808080',
      disabled: '#505050',
      muted: '#999999',
    },
    border: {
      light: '#333333',
      medium: '#555555',
      dark: '#777777',
    },
    status: {
      success: '#4CAF50',
      warning: '#FF9800',
      error: '#F44336',
      info: '#2196F3',
    },
    conservation: {
      leastConcern: '#4CAF50',
      nearThreatened: '#8BC34A',
      vulnerable: '#FFC107',
      endangered: '#FF9800',
      criticallyEndangered: '#F44336',
      extinctInWild: '#9C27B0',
      extinct: '#424242',
    },
    gradient: {
      primary: 'linear-gradient(135deg, #FF6B35 0%, #E64A19 100%)',
      secondary: 'linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%)',
      accent: 'linear-gradient(135deg, #FFC107 0%, #FF8F00 100%)',
      dark: 'linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 100%)',
      overlay: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%)',
    }
  },
  typography: {
    fontFamily: {
      primary: "'Inter', 'Segoe UI', 'Roboto', sans-serif",
      secondary: "'Poppins', 'Helvetica Neue', sans-serif",
      heading: "'Poppins', 'Helvetica Neue', sans-serif",
      body: "'Inter', 'Segoe UI', 'Roboto', sans-serif",
      mono: "'Fira Code', 'Monaco', 'Consolas', monospace",
    },
    fontSize: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      md: '1rem',       // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      xxl: '1.5rem',    // 24px
      xxxl: '2rem',     // 32px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem', // 36px
      '5xl': '3rem',    // 48px
      '6xl': '3.75rem', // 60px
      '7xl': '4.5rem',  // 72px
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
    letterSpacing: {
      tight: '-0.025em',
      normal: '0',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    },
  },
  spacing: {
    xs: '0.25rem',   // 4px
    sm: '0.5rem',    // 8px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
    xxl: '3rem',     // 48px
    '2xl': '3rem',   // 48px
    '3xl': '4rem',   // 64px
    '4xl': '6rem',   // 96px
    '5xl': '8rem',   // 128px
  },
  borderRadius: {
    none: '0',
    sm: '0.25rem',   // 4px
    md: '0.5rem',    // 8px
    lg: '0.75rem',   // 12px
    xl: '1rem',      // 16px
    '2xl': '1.5rem', // 24px
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    glow: '0 0 20px rgba(255, 107, 53, 0.3)',
  },
  breakpoints: {
    xs: '320px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
    mobile: '(max-width: 767px)',
    tablet: '(max-width: 1023px)',
    desktop: '(min-width: 1024px)',
  },
  zIndex: {
    hide: -1,
    auto: 'auto',
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    skipLink: 1600,
    toast: 1700,
    tooltip: 1800,
    navigation: 1000,
  },
  transitions: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
    },
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
  },
  animation: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      normal: 300,
      fast: 150,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
  },
  components: {
    button: {
      height: {
        sm: '32px',
        md: '40px',
        lg: '48px',
      },
      padding: {
        sm: '8px 16px',
        md: '12px 24px',
        lg: '16px 32px',
      },
    },
    input: {
      height: {
        sm: '32px',
        md: '40px',
        lg: '48px',
      },
    },
    card: {
      padding: {
        sm: '16px',
        md: '24px',
        lg: '32px',
      },
    },
  },
};

export type Theme = typeof theme;

// Helper functions pour utiliser le thème
export const getConservationColor = (status: string): string => {
  const statusMap: Record<string, string> = {
    'Least Concern': theme.colors.conservation.leastConcern,
    'Near Threatened': theme.colors.conservation.nearThreatened,
    'Vulnerable': theme.colors.conservation.vulnerable,
    'Endangered': theme.colors.conservation.endangered,
    'Critically Endangered': theme.colors.conservation.criticallyEndangered,
    'Extinct in the Wild': theme.colors.conservation.extinctInWild,
    'Extinct': theme.colors.conservation.extinct,
  };
  return statusMap[status] || theme.colors.conservation.leastConcern;
};

export const mediaQueries = {
  xs: `@media (min-width: ${theme.breakpoints.xs})`,
  sm: `@media (min-width: ${theme.breakpoints.sm})`,
  md: `@media (min-width: ${theme.breakpoints.md})`,
  lg: `@media (min-width: ${theme.breakpoints.lg})`,
  xl: `@media (min-width: ${theme.breakpoints.xl})`,
  '2xl': `@media (min-width: ${theme.breakpoints['2xl']})`,
};