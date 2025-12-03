import 'dart:ui';
import 'package:flutter/material.dart';

/// Apple-style 3D UI theme configuration for Burnout app
/// Features glassmorphism, multi-layer shadows, and depth effects
class AppleTheme {
  // ============================================================================
  // COLORS - Apple-inspired color palette
  // ============================================================================

  /// Primary Apple Blue (#007AFF)
  static const Color appleBlue = Color(0xFF007AFF);
  static const Color appleBlueLight = Color(0xFF5AC8FA);
  static const Color appleBlueDark = Color(0xFF0051D5);

  /// Accent Colors (iOS style)
  static const Color appleGreen = Color(0xFF34C759);
  static const Color appleOrange = Color(0xFFFF9500);
  static const Color appleRed = Color(0xFFFF3B30);
  static const Color applePurple = Color(0xFFAF52DE);
  static const Color appleYellow = Color(0xFFFFCC00);

  /// Glass Colors - Semi-transparent backgrounds
  static Color glassLight = Colors.white.withOpacity(0.15);
  static Color glassLightBorder = Colors.white.withOpacity(0.2);
  static Color glassDark = Colors.black.withOpacity(0.3);
  static Color glassDarkBorder = Colors.black.withOpacity(0.2);

  /// Glass with stronger opacity for active states
  static Color glassLightActive = Colors.white.withOpacity(0.25);
  static Color glassDarkActive = Colors.black.withOpacity(0.5);

  // ============================================================================
  // GRADIENTS - Apple-style gradient effects
  // ============================================================================

  /// Primary button gradient (Apple Blue)
  static const LinearGradient primaryGradient = LinearGradient(
    colors: [appleBlue, appleBlueDark],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );

  /// Glow gradient for active states
  static LinearGradient glowGradient = LinearGradient(
    colors: [
      appleBlue.withOpacity(0.5),
      appleBlue.withOpacity(0.0),
    ],
    begin: Alignment.center,
    end: Alignment.bottomRight,
  );

  /// Glass gradient for glassmorphic elements
  static LinearGradient glassGradient = LinearGradient(
    colors: [
      Colors.white.withOpacity(0.2),
      Colors.white.withOpacity(0.05),
    ],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );

  // ============================================================================
  // SHADOWS - Multi-layer shadows for depth
  // ============================================================================

  /// Multi-layer shadow for elevated cards
  static List<BoxShadow> get cardShadows => [
    BoxShadow(
      color: Colors.black.withOpacity(0.1),
      offset: const Offset(0, 2),
      blurRadius: 4,
      spreadRadius: 0,
    ),
    BoxShadow(
      color: Colors.black.withOpacity(0.08),
      offset: const Offset(0, 8),
      blurRadius: 16,
      spreadRadius: 0,
    ),
  ];

  /// Floating element shadow (for bottom nav, modals)
  static List<BoxShadow> get floatingShadows => [
    BoxShadow(
      color: Colors.black.withOpacity(0.15),
      offset: const Offset(0, 10),
      blurRadius: 20,
      spreadRadius: 0,
    ),
    BoxShadow(
      color: Colors.black.withOpacity(0.1),
      offset: const Offset(0, 4),
      blurRadius: 8,
      spreadRadius: 0,
    ),
  ];

  /// Button shadow with glow effect
  static List<BoxShadow> get buttonShadows => [
    BoxShadow(
      color: appleBlue.withOpacity(0.3),
      offset: const Offset(0, 8),
      blurRadius: 20,
      spreadRadius: 0,
    ),
  ];

  /// Inner glow for buttons and active states
  static List<BoxShadow> get innerGlow => [
    BoxShadow(
      color: Colors.white.withOpacity(0.3),
      offset: const Offset(0, 1),
      blurRadius: 2,
      spreadRadius: 0,
      blurStyle: BlurStyle.inner,
    ),
  ];

  /// Neumorphic style shadow (light from top-left)
  static List<BoxShadow> get neumorphicShadows => [
    BoxShadow(
      color: Colors.white.withOpacity(0.5),
      offset: const Offset(-4, -4),
      blurRadius: 15,
      spreadRadius: 1,
    ),
    BoxShadow(
      color: Colors.black.withOpacity(0.2),
      offset: const Offset(4, 4),
      blurRadius: 15,
      spreadRadius: 1,
    ),
  ];

  // ============================================================================
  // BLUR - Backdrop filter blur configurations
  // ============================================================================

  /// Standard blur for glassmorphic elements
  static ImageFilter get standardBlur => ImageFilter.blur(sigmaX: 10, sigmaY: 10);

  /// Strong blur for focused/modal backgrounds
  static ImageFilter get strongBlur => ImageFilter.blur(sigmaX: 20, sigmaY: 20);

  /// Light blur for subtle effects
  static ImageFilter get lightBlur => ImageFilter.blur(sigmaX: 5, sigmaY: 5);

  // ============================================================================
  // BORDER RADIUS - Apple-style rounded corners
  // ============================================================================

  static const BorderRadius radiusSmall = BorderRadius.all(Radius.circular(8));
  static const BorderRadius radiusMedium = BorderRadius.all(Radius.circular(12));
  static const BorderRadius radiusLarge = BorderRadius.all(Radius.circular(16));
  static const BorderRadius radiusXLarge = BorderRadius.all(Radius.circular(20));
  static const BorderRadius radiusXXLarge = BorderRadius.all(Radius.circular(24));
  static const BorderRadius radiusPill = BorderRadius.all(Radius.circular(30));

  // ============================================================================
  // ANIMATION CURVES - Apple-style spring and ease curves
  // ============================================================================

  /// Standard ease for smooth transitions
  static const Curve easeInOutCubic = Curves.easeInOutCubic;

  /// Elastic bounce for playful animations
  static const Curve elasticOut = Curves.elasticOut;

  /// Fast out, slow in for natural motion
  static const Curve fastOutSlowIn = Curves.fastOutSlowIn;

  /// Spring curve for physics-based animations
  static const Curve spring = Curves.easeOutBack;

  // ============================================================================
  // ANIMATION DURATIONS
  // ============================================================================

  static const Duration durationFast = Duration(milliseconds: 150);
  static const Duration durationMedium = Duration(milliseconds: 300);
  static const Duration durationSlow = Duration(milliseconds: 500);
  static const Duration durationSpring = Duration(milliseconds: 600);

  // ============================================================================
  // SPACING & SIZING - Consistent spacing system
  // ============================================================================

  static const double spacing4 = 4.0;
  static const double spacing8 = 8.0;
  static const double spacing12 = 12.0;
  static const double spacing16 = 16.0;
  static const double spacing20 = 20.0;
  static const double spacing24 = 24.0;
  static const double spacing32 = 32.0;

  /// Minimum touch target size (44x44pt per Apple HIG)
  static const double minTouchTarget = 44.0;

  /// Standard button height
  static const double buttonHeight = 50.0;

  /// Bottom navigation bar height
  static const double navBarHeight = 90.0;

  // ============================================================================
  // DECORATION BUILDERS - Reusable decoration patterns
  // ============================================================================

  /// Glassmorphic container decoration
  static BoxDecoration glassDecoration({
    BorderRadius? borderRadius,
    Color? backgroundColor,
    Color? borderColor,
    List<BoxShadow>? shadows,
  }) {
    return BoxDecoration(
      borderRadius: borderRadius ?? radiusLarge,
      color: backgroundColor ?? glassLight,
      border: Border.all(
        color: borderColor ?? glassLightBorder,
        width: 1,
      ),
      boxShadow: shadows ?? floatingShadows,
    );
  }

  /// Primary button decoration with gradient
  static BoxDecoration primaryButtonDecoration({
    BorderRadius? borderRadius,
    bool isPressed = false,
  }) {
    return BoxDecoration(
      borderRadius: borderRadius ?? radiusMedium,
      gradient: primaryGradient,
      boxShadow: isPressed ? [] : buttonShadows,
    );
  }

  /// Card decoration with multi-layer shadows
  static BoxDecoration cardDecoration({
    BorderRadius? borderRadius,
    Color? backgroundColor,
    Color? borderColor,
    bool hasGlass = false,
  }) {
    return BoxDecoration(
      borderRadius: borderRadius ?? radiusLarge,
      color: backgroundColor ?? (hasGlass ? glassLight : Colors.white),
      border: borderColor != null
          ? Border.all(color: borderColor, width: 1)
          : null,
      boxShadow: cardShadows,
    );
  }

  // ============================================================================
  // TEXT STYLES - Apple San Francisco inspired
  // ============================================================================

  /// Large title (iOS style)
  static const TextStyle largeTitle = TextStyle(
    fontSize: 34,
    fontWeight: FontWeight.bold,
    letterSpacing: 0.374,
  );

  /// Title 1
  static const TextStyle title1 = TextStyle(
    fontSize: 28,
    fontWeight: FontWeight.w600,
    letterSpacing: 0.364,
  );

  /// Title 2
  static const TextStyle title2 = TextStyle(
    fontSize: 22,
    fontWeight: FontWeight.w600,
    letterSpacing: 0.352,
  );

  /// Title 3
  static const TextStyle title3 = TextStyle(
    fontSize: 20,
    fontWeight: FontWeight.w600,
    letterSpacing: 0.38,
  );

  /// Headline
  static const TextStyle headline = TextStyle(
    fontSize: 17,
    fontWeight: FontWeight.w600,
    letterSpacing: -0.408,
  );

  /// Body text
  static const TextStyle body = TextStyle(
    fontSize: 17,
    fontWeight: FontWeight.w400,
    letterSpacing: -0.408,
  );

  /// Callout
  static const TextStyle callout = TextStyle(
    fontSize: 16,
    fontWeight: FontWeight.w400,
    letterSpacing: -0.32,
  );

  /// Subheadline
  static const TextStyle subheadline = TextStyle(
    fontSize: 15,
    fontWeight: FontWeight.w400,
    letterSpacing: -0.24,
  );

  /// Footnote
  static const TextStyle footnote = TextStyle(
    fontSize: 13,
    fontWeight: FontWeight.w400,
    letterSpacing: -0.078,
  );

  /// Caption 1
  static const TextStyle caption1 = TextStyle(
    fontSize: 12,
    fontWeight: FontWeight.w400,
    letterSpacing: 0,
  );

  /// Caption 2
  static const TextStyle caption2 = TextStyle(
    fontSize: 11,
    fontWeight: FontWeight.w400,
    letterSpacing: 0.066,
  );
}
