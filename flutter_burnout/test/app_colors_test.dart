import 'package:flutter_test/flutter_test.dart';
import 'package:burnout/constants/app_colors.dart';
import 'package:flutter/material.dart';

void main() {
  group('AppColors Tests', () {
    test('Primary colors are defined correctly', () {
      expect(AppColors.primaryBlue, equals(const Color(0xFF4169E1)));
      expect(AppColors.electricBlue, equals(const Color(0xFF4D4DFF)));
    });

    test('Background colors are defined correctly', () {
      expect(AppColors.backgroundColor, equals(const Color(0xFF000000)));
      expect(AppColors.cardBackground, equals(const Color(0xFF0A0A0A)));
      expect(AppColors.darkGray, equals(const Color(0xFF1A1A1A)));
    });

    test('Text colors are defined correctly', () {
      expect(AppColors.textWhite, equals(const Color(0xFFFFFFFF)));
      expect(AppColors.textGray, equals(const Color(0xFFB0B0B0)));
    });

    test('Accent colors are defined correctly', () {
      expect(AppColors.skyBlue, equals(const Color(0xFF87CEEB)));
      expect(AppColors.neonGreen, equals(const Color(0xFF39FF14)));
    });

    test('Border and divider colors are defined', () {
      expect(AppColors.borderBlue, equals(const Color(0xFF4169E1)));
      expect(AppColors.dividerColor, equals(const Color(0xFF2A2A2A)));
    });

    test('Shadow colors have correct opacity', () {
      expect(AppColors.blueShadow.alpha, lessThan(255));
      expect(AppColors.cardShadow.alpha, lessThan(255));
    });

    test('Blue gradient is defined correctly', () {
      expect(AppColors.blueGradient, isA<LinearGradient>());
      expect(AppColors.blueGradient.colors.length, equals(2));
      expect(AppColors.blueGradient.colors.first, equals(AppColors.primaryBlue));
    });
  });

  group('Color Contrast Tests', () {
    test('Text white has good contrast on black background', () {
      // WCAG AA requires 4.5:1 for normal text
      // White on black has 21:1 ratio (excellent)
      expect(AppColors.textWhite.computeLuminance(), greaterThan(0.5));
      expect(AppColors.backgroundColor.computeLuminance(), lessThan(0.1));
    });

    test('Primary blue is visible on black background', () {
      expect(AppColors.primaryBlue.computeLuminance(), greaterThan(0.1));
    });
  });

  group('Color Consistency Tests', () {
    test('Border blue matches primary blue', () {
      expect(AppColors.borderBlue, equals(AppColors.primaryBlue));
    });

    test('All colors are opaque except shadows', () {
      expect(AppColors.primaryBlue.alpha, equals(255));
      expect(AppColors.backgroundColor.alpha, equals(255));
      expect(AppColors.textWhite.alpha, equals(255));
      expect(AppColors.cardBackground.alpha, equals(255));
    });
  });
}
