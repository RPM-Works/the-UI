import 'package:flutter/material.dart';

/// Color scheme for Burnout app matching the design specs
class AppColors {
  // Primary Colors
  static const Color primaryBlue = Color(0xFF4169E1); // Royal Blue
  static const Color electricBlue = Color(0xFF4D4DFF);

  // Background Colors
  static const Color backgroundColor = Color(0xFF000000); // Pure Black
  static const Color cardBackground = Color(0xFF0A0A0A); // Almost Black
  static const Color darkGray = Color(0xFF1A1A1A);

  // Text Colors
  static const Color textWhite = Color(0xFFFFFFFF);
  static const Color textGray = Color(0xFFB0B0B0);

  // Accent Colors
  static const Color skyBlue = Color(0xFF87CEEB);
  static const Color neonGreen = Color(0xFF39FF14);

  // Border and Divider
  static const Color borderBlue = Color(0xFF4169E1);
  static const Color dividerColor = Color(0xFF2A2A2A);

  // Gradients
  static const LinearGradient blueGradient = LinearGradient(
    colors: [primaryBlue, electricBlue],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );

  // Shadow
  static Color blueShadow = primaryBlue.withOpacity(0.5);
  static Color cardShadow = primaryBlue.withOpacity(0.3);
}
