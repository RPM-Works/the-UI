import 'package:flutter/material.dart';
import '../constants/app_colors.dart';
import '../widgets/group_circle.dart';

/// Events screen with group circles and event table
class EventsScreen extends StatelessWidget {
  const EventsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.backgroundColor,
      body: SafeArea(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const SizedBox(height: 20),

            // Tab navigation
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text(
                  'For You',
                  style: Theme.of(context).textTheme.headlineLarge?.copyWith(
                        fontSize: 28,
                        color: AppColors.textWhite,
                      ),
                ),
                const SizedBox(width: 40),
                Text(
                  'Events',
                  style: Theme.of(context).textTheme.headlineLarge?.copyWith(
                        fontSize: 28,
                        fontWeight: FontWeight.bold,
                      ),
                ),
              ],
            ),

            const SizedBox(height: 24),

            // Group circles
            SizedBox(
              height: 150,
              child: ListView(
                scrollDirection: Axis.horizontal,
                padding: const EdgeInsets.symmetric(horizontal: 16),
                children: const [
                  GroupCircle(
                    label: 'PNW Oil Leak Club',
                    // You can add a BMW logo image here
                    icon: Icons.directions_car,
                  ),
                  SizedBox(width: 16),
                  GroupCircle(
                    icon: Icons.group,
                  ),
                  SizedBox(width: 16),
                  GroupCircle(
                    icon: Icons.group,
                  ),
                  SizedBox(width: 16),
                  GroupCircle(
                    icon: Icons.group,
                  ),
                ],
              ),
            ),

            const SizedBox(height: 32),

            // Events table
            Expanded(
              child: SingleChildScrollView(
                padding: const EdgeInsets.symmetric(horizontal: 16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Events',
                      style: Theme.of(context).textTheme.headlineLarge,
                    ),
                    const SizedBox(height: 16),
                    _buildEventsTable(context),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildEventsTable(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        border: Border.all(
          color: AppColors.primaryBlue,
          width: 2,
        ),
      ),
      child: Column(
        children: [
          // Header row
          Container(
            color: AppColors.primaryBlue,
            child: Row(
              children: [
                _buildTableCell(context, 'Day', flex: 1, isHeader: true),
                _buildTableCell(context, 'Group', flex: 2, isHeader: true),
                _buildTableCell(context, 'Description', flex: 2, isHeader: true),
                _buildTableCell(context, 'Location', flex: 2, isHeader: true),
                _buildTableCell(context, 'Cost', flex: 1, isHeader: true),
                _buildTableCell(context, 'Attendee Limit', flex: 1, isHeader: true),
              ],
            ),
          ),

          // Data row
          Container(
            color: AppColors.backgroundColor,
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                _buildTableCell(context, '2/31/26', flex: 1),
                _buildTableCell(context, 'Pnw Oil Leak Club', flex: 2),
                _buildTableCell(context, 'Group meet and drive', flex: 2),
                _buildTableCell(context, '1234 ur moms', flex: 2),
                _buildTableCell(context, '\$5.00', flex: 1),
                _buildTableCell(context, '25', flex: 1),
              ],
            ),
          ),

          // Empty rows for design
          ...List.generate(
            7,
            (index) => Container(
              height: 50,
              decoration: BoxDecoration(
                border: Border(
                  top: BorderSide(
                    color: AppColors.primaryBlue,
                    width: 1,
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildTableCell(
    BuildContext context,
    String text, {
    required int flex,
    bool isHeader = false,
  }) {
    return Expanded(
      flex: flex,
      child: Container(
        padding: const EdgeInsets.all(8),
        decoration: BoxDecoration(
          border: Border(
            right: BorderSide(
              color: AppColors.primaryBlue,
              width: 1,
            ),
          ),
        ),
        child: Text(
          text,
          style: isHeader
              ? Theme.of(context).textTheme.titleSmall?.copyWith(
                    color: AppColors.textWhite,
                    fontWeight: FontWeight.bold,
                  )
              : Theme.of(context).textTheme.bodySmall?.copyWith(
                    color: AppColors.textWhite,
                  ),
        ),
      ),
    );
  }
}
