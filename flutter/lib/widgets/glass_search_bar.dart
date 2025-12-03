import 'package:flutter/material.dart';
import 'dart:ui';
import '../theme/app_theme.dart';

/// Pill-shaped search bar with glassmorphism effect
class GlassSearchBar extends StatefulWidget {
  final String placeholder;
  final Function(String)? onChanged;
  final Function(String)? onSubmitted;
  final TextEditingController? controller;
  final bool autofocus;

  const GlassSearchBar({
    Key? key,
    this.placeholder = 'Search...',
    this.onChanged,
    this.onSubmitted,
    this.controller,
    this.autofocus = false,
  }) : super(key: key);

  @override
  State<GlassSearchBar> createState() => _GlassSearchBarState();
}

class _GlassSearchBarState extends State<GlassSearchBar> {
  late TextEditingController _controller;
  bool _isFocused = false;

  @override
  void initState() {
    super.initState();
    _controller = widget.controller ?? TextEditingController();
  }

  @override
  void dispose() {
    if (widget.controller == null) {
      _controller.dispose();
    }
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Container(
      height: 44,
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(22),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.05),
            blurRadius: 10,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(22),
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: 10, sigmaY: 10),
          child: Container(
            decoration: BoxDecoration(
              color: isDark
                  ? Colors.white.withOpacity(0.1)
                  : Colors.white.withOpacity(0.5),
              border: Border.all(
                color: _isFocused
                    ? AppTheme.primaryBlue.withOpacity(0.5)
                    : Colors.white.withOpacity(0.2),
                width: _isFocused ? 2 : 1,
              ),
              borderRadius: BorderRadius.circular(22),
            ),
            child: Row(
              children: [
                // Search Icon
                Padding(
                  padding: const EdgeInsets.only(left: 16, right: 8),
                  child: Icon(
                    Icons.search,
                    color: _isFocused
                        ? AppTheme.primaryBlue
                        : (isDark ? Colors.white60 : Colors.black45),
                    size: 20,
                  ),
                ),

                // Text Input
                Expanded(
                  child: Focus(
                    onFocusChange: (hasFocus) {
                      setState(() => _isFocused = hasFocus);
                    },
                    child: TextField(
                      controller: _controller,
                      autofocus: widget.autofocus,
                      style: TextStyle(
                        color: isDark ? Colors.white : Colors.black87,
                        fontSize: 16,
                      ),
                      decoration: InputDecoration(
                        hintText: widget.placeholder,
                        hintStyle: TextStyle(
                          color: isDark ? Colors.white60 : Colors.black45,
                          fontSize: 16,
                        ),
                        border: InputBorder.none,
                        contentPadding: EdgeInsets.zero,
                      ),
                      onChanged: widget.onChanged,
                      onSubmitted: widget.onSubmitted,
                    ),
                  ),
                ),

                // Clear Button
                if (_controller.text.isNotEmpty)
                  GestureDetector(
                    onTap: () {
                      _controller.clear();
                      widget.onChanged?.call('');
                      setState(() {});
                    },
                    child: Padding(
                      padding: const EdgeInsets.only(right: 16, left: 8),
                      child: Icon(
                        Icons.cancel,
                        color: isDark ? Colors.white60 : Colors.black45,
                        size: 18,
                      ),
                    ),
                  ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
