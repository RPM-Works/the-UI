/**
 * Apple-style theme configuration with glassmorphism support
 */

export const AppTheme = {
  // Primary Colors
  colors: {
    primaryBlue: '#007AFF',
    primaryBlueDark: '#0051D5',

    // Background Colors
    darkBackground: '#000000',
    lightBackground: '#F5F5F5',

    // Secondary Colors
    secondaryPurple: '#7B68EE',
    errorRed: '#FF3B30',

    // Accent Colors
    accentGreen: '#34C759',
    accentOrange: '#FF9500',
    accentRed: '#FF3B30',

    // Glass Colors
    glassLight: 'rgba(255, 255, 255, 0.15)',
    glassDark: 'rgba(0, 0, 0, 0.3)',
    glassBorder: 'rgba(255, 255, 255, 0.3)',
  },

  // Gradients
  gradients: {
    primary: ['#007AFF', '#0051D5'],
    glass: ['rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.1)'],
    instagram: ['#f09433', '#e6683c', '#dc2743', '#cc2366', '#bc1888'],
  },

  // Shadows
  shadows: {
    multiLayer: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 15,
      elevation: 10,
    },
    card: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 5,
    },
    button: {
      shadowColor: '#007AFF',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.3,
      shadowRadius: 20,
      elevation: 8,
    },
    elevation: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.15,
      shadowRadius: 20,
      elevation: 12,
    },
  },

  // Border Radius
  borderRadius: {
    card: 20,
    button: 14,
    modal: 24,
    pill: 25,
    navBar: 30,
  },

  // Spacing
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
  },

  // Typography
  typography: {
    displayLarge: {
      fontSize: 32,
      fontWeight: '700',
      lineHeight: 40,
    },
    displayMedium: {
      fontSize: 24,
      fontWeight: '600',
      lineHeight: 32,
    },
    bodyLarge: {
      fontSize: 16,
      fontWeight: '400',
      lineHeight: 24,
    },
    bodyMedium: {
      fontSize: 14,
      fontWeight: '400',
      lineHeight: 20,
    },
    caption: {
      fontSize: 12,
      fontWeight: '400',
      lineHeight: 16,
    },
  },

  // Animation Timing
  animation: {
    fast: 150,
    normal: 300,
    slow: 600,
    flip: 800,
  },
};

export default AppTheme;
