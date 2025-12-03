import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../constants/apple_theme.dart';

// =============================================================================
// BOTTOM SHEET MODAL - Apple-style bottom sheet
// =============================================================================

/// Shows an Apple-style bottom sheet modal
/// Features: slide up animation, top rounded corners, drag handle,
/// glassmorphic background, backdrop blur, swipe to dismiss
Future<T?> showAppleBottomSheet<T>({
  required BuildContext context,
  required Widget child,
  bool isDismissible = true,
  bool enableDrag = true,
  double? height,
}) {
  return showModalBottomSheet<T>(
    context: context,
    isScrollControlled: true,
    isDismissible: isDismissible,
    enableDrag: enableDrag,
    backgroundColor: Colors.transparent,
    barrierColor: Colors.black.withOpacity(0.5),
    builder: (context) => AppleBottomSheet(
      child: child,
      height: height,
    ),
  );
}

/// Apple-style bottom sheet widget
class AppleBottomSheet extends StatefulWidget {
  final Widget child;
  final double? height;

  const AppleBottomSheet({
    super.key,
    required this.child,
    this.height,
  });

  @override
  State<AppleBottomSheet> createState() => _AppleBottomSheetState();
}

class _AppleBottomSheetState extends State<AppleBottomSheet>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _animation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: AppleTheme.durationSpring,
    );

    _animation = CurvedAnimation(
      parent: _controller,
      curve: Curves.elasticOut,
    );

    _controller.forward();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final screenHeight = MediaQuery.of(context).size.height;
    final sheetHeight = widget.height ?? screenHeight * 0.7;

    return AnimatedBuilder(
      animation: _animation,
      builder: (context, child) {
        return Container(
          height: sheetHeight * _animation.value,
          decoration: BoxDecoration(
            borderRadius: const BorderRadius.only(
              topLeft: Radius.circular(24),
              topRight: Radius.circular(24),
            ),
            boxShadow: AppleTheme.floatingShadows,
          ),
          child: ClipRRect(
            borderRadius: const BorderRadius.only(
              topLeft: Radius.circular(24),
              topRight: Radius.circular(24),
            ),
            child: BackdropFilter(
              filter: AppleTheme.strongBlur,
              child: Container(
                decoration: BoxDecoration(
                  color: AppleTheme.glassDark,
                  border: Border(
                    top: BorderSide(
                      color: AppleTheme.glassLightBorder,
                      width: 1,
                    ),
                    left: BorderSide(
                      color: AppleTheme.glassLightBorder,
                      width: 1,
                    ),
                    right: BorderSide(
                      color: AppleTheme.glassLightBorder,
                      width: 1,
                    ),
                  ),
                ),
                child: Column(
                  children: [
                    // Drag handle
                    _buildDragHandle(),

                    // Content
                    Expanded(
                      child: widget.child,
                    ),
                  ],
                ),
              ),
            ),
          ),
        );
      },
    );
  }

  Widget _buildDragHandle() {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 12),
      child: Center(
        child: Container(
          width: 40,
          height: 4,
          decoration: BoxDecoration(
            color: Colors.white.withOpacity(0.3),
            borderRadius: BorderRadius.circular(2),
          ),
        ),
      ),
    );
  }
}

// =============================================================================
// DIALOG MODAL - Apple-style alert dialog
// =============================================================================

/// Shows an Apple-style alert dialog
Future<T?> showAppleDialog<T>({
  required BuildContext context,
  String? title,
  String? message,
  List<AppleDialogAction>? actions,
  Widget? content,
}) {
  return showDialog<T>(
    context: context,
    barrierColor: Colors.black.withOpacity(0.5),
    builder: (context) => AppleDialog(
      title: title,
      message: message,
      actions: actions ?? [],
      content: content,
    ),
  );
}

/// Apple-style dialog
class AppleDialog extends StatefulWidget {
  final String? title;
  final String? message;
  final Widget? content;
  final List<AppleDialogAction> actions;

  const AppleDialog({
    super.key,
    this.title,
    this.message,
    this.content,
    this.actions = const [],
  });

  @override
  State<AppleDialog> createState() => _AppleDialogState();
}

class _AppleDialogState extends State<AppleDialog>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _scaleAnimation;
  late Animation<double> _opacityAnimation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: AppleTheme.durationMedium,
    );

    _scaleAnimation = Tween<double>(begin: 0.8, end: 1.0).animate(
      CurvedAnimation(
        parent: _controller,
        curve: Curves.elasticOut,
      ),
    );

    _opacityAnimation = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(
        parent: _controller,
        curve: Curves.easeInOut,
      ),
    );

    _controller.forward();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _controller,
      builder: (context, child) {
        return FadeTransition(
          opacity: _opacityAnimation,
          child: ScaleTransition(
            scale: _scaleAnimation,
            child: Dialog(
              backgroundColor: Colors.transparent,
              elevation: 0,
              child: Container(
                constraints: const BoxConstraints(maxWidth: 320),
                decoration: BoxDecoration(
                  borderRadius: AppleTheme.radiusXLarge,
                  boxShadow: AppleTheme.floatingShadows,
                ),
                child: ClipRRect(
                  borderRadius: AppleTheme.radiusXLarge,
                  child: BackdropFilter(
                    filter: AppleTheme.strongBlur,
                    child: Container(
                      decoration: BoxDecoration(
                        color: AppleTheme.glassDark,
                        border: Border.all(
                          color: AppleTheme.glassLightBorder,
                          width: 1,
                        ),
                        borderRadius: AppleTheme.radiusXLarge,
                      ),
                      child: Column(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          // Title and message
                          Padding(
                            padding: const EdgeInsets.all(AppleTheme.spacing20),
                            child: Column(
                              children: [
                                if (widget.title != null) ...[
                                  Text(
                                    widget.title!,
                                    style: AppleTheme.headline.copyWith(
                                      color: Colors.white,
                                      fontWeight: FontWeight.bold,
                                    ),
                                    textAlign: TextAlign.center,
                                  ),
                                  const SizedBox(height: AppleTheme.spacing8),
                                ],
                                if (widget.message != null)
                                  Text(
                                    widget.message!,
                                    style: AppleTheme.callout.copyWith(
                                      color: Colors.white.withOpacity(0.8),
                                    ),
                                    textAlign: TextAlign.center,
                                  ),
                                if (widget.content != null) ...[
                                  const SizedBox(height: AppleTheme.spacing16),
                                  widget.content!,
                                ],
                              ],
                            ),
                          ),

                          // Divider
                          Container(
                            height: 1,
                            color: Colors.white.withOpacity(0.1),
                          ),

                          // Actions
                          if (widget.actions.isNotEmpty)
                            _buildActions(),
                        ],
                      ),
                    ),
                  ),
                ),
              ),
            ),
          ),
        );
      },
    );
  }

  Widget _buildActions() {
    if (widget.actions.length == 1) {
      return _buildActionButton(widget.actions.first, isLast: true);
    }

    return Column(
      children: [
        for (int i = 0; i < widget.actions.length; i++) ...[
          _buildActionButton(
            widget.actions[i],
            isLast: i == widget.actions.length - 1,
          ),
          if (i < widget.actions.length - 1)
            Container(
              height: 1,
              color: Colors.white.withOpacity(0.1),
            ),
        ],
      ],
    );
  }

  Widget _buildActionButton(AppleDialogAction action, {bool isLast = false}) {
    return GestureDetector(
      onTap: () {
        HapticFeedback.selectionClick();
        Navigator.of(context).pop(action.value);
        action.onPressed?.call();
      },
      child: Container(
        width: double.infinity,
        padding: const EdgeInsets.symmetric(vertical: 16),
        child: Text(
          action.label,
          style: AppleTheme.callout.copyWith(
            color: action.isDestructive
                ? AppleTheme.appleRed
                : action.isDefault
                    ? AppleTheme.appleBlue
                    : Colors.white,
            fontWeight: action.isDefault ? FontWeight.w600 : FontWeight.w400,
          ),
          textAlign: TextAlign.center,
        ),
      ),
    );
  }
}

/// Dialog action configuration
class AppleDialogAction {
  final String label;
  final VoidCallback? onPressed;
  final bool isDefault;
  final bool isDestructive;
  final dynamic value;

  const AppleDialogAction({
    required this.label,
    this.onPressed,
    this.isDefault = false,
    this.isDestructive = false,
    this.value,
  });
}

// =============================================================================
// LOADING MODAL - Apple-style loading indicator
// =============================================================================

/// Shows an Apple-style loading modal
void showAppleLoading(BuildContext context, {String? message}) {
  showDialog(
    context: context,
    barrierDismissible: false,
    barrierColor: Colors.black.withOpacity(0.5),
    builder: (context) => AppleLoadingModal(message: message),
  );
}

/// Apple-style loading modal
class AppleLoadingModal extends StatelessWidget {
  final String? message;

  const AppleLoadingModal({
    super.key,
    this.message,
  });

  @override
  Widget build(BuildContext context) {
    return Dialog(
      backgroundColor: Colors.transparent,
      elevation: 0,
      child: Container(
        padding: const EdgeInsets.all(AppleTheme.spacing24),
        decoration: BoxDecoration(
          borderRadius: AppleTheme.radiusXLarge,
          boxShadow: AppleTheme.floatingShadows,
        ),
        child: ClipRRect(
          borderRadius: AppleTheme.radiusXLarge,
          child: BackdropFilter(
            filter: AppleTheme.strongBlur,
            child: Container(
              decoration: BoxDecoration(
                color: AppleTheme.glassDark,
                border: Border.all(
                  color: AppleTheme.glassLightBorder,
                  width: 1,
                ),
                borderRadius: AppleTheme.radiusXLarge,
              ),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  const CircularProgressIndicator(
                    valueColor: AlwaysStoppedAnimation<Color>(
                      AppleTheme.appleBlue,
                    ),
                  ),
                  if (message != null) ...[
                    const SizedBox(height: AppleTheme.spacing16),
                    Text(
                      message!,
                      style: AppleTheme.callout.copyWith(
                        color: Colors.white,
                      ),
                      textAlign: TextAlign.center,
                    ),
                  ],
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
