import 'package:flutter/material.dart';
import '../constants/apple_theme.dart';
import '../widgets/apple_content_card.dart';
import '../widgets/apple_glass_widgets.dart';
import '../widgets/apple_buttons.dart';

/// Events screen with event cards
class EventsScreen extends StatefulWidget {
  const EventsScreen({super.key});

  @override
  State<EventsScreen> createState() => _EventsScreenState();
}

class _EventsScreenState extends State<EventsScreen> {
  String _selectedFilter = 'All';

  final List<Map<String, dynamic>> _events = [
    {
      'title': 'Sunset Canyon Run',
      'location': 'Angeles Crest Highway',
      'date': 'Dec 7, 2024',
      'time': '7:00 AM',
      'attendees': 47,
      'maxAttendees': 50,
      'type': 'Drive',
      'description': 'Classic canyon run through Angeles Crest. Meet at the Newcombs Ranch parking lot. All skill levels welcome!',
    },
    {
      'title': 'Track Day - Buttonwillow',
      'location': 'Buttonwillow Raceway',
      'date': 'Dec 10, 2024',
      'time': '8:00 AM',
      'attendees': 32,
      'maxAttendees': 40,
      'type': 'Track',
      'description': 'Full track day with timed sessions. Tech inspection required. Helmets mandatory (Snell 2015 or newer).',
    },
    {
      'title': 'Cars & Coffee - Irvine',
      'location': 'Irvine Spectrum',
      'date': 'Dec 14, 2024',
      'time': '8:00 AM',
      'attendees': 234,
      'maxAttendees': null,
      'type': 'Show',
      'description': 'Monthly C&C meet. All cars welcome - exotics, JDM, muscle, euro. Free coffee and good vibes!',
    },
    {
      'title': 'Dyno Day & BBQ',
      'location': 'SoCal Speed Shop',
      'date': 'Dec 15, 2024',
      'time': '10:00 AM',
      'attendees': 28,
      'maxAttendees': 35,
      'type': 'Dyno',
      'description': 'Dyno pulls \$75/run. BBQ lunch included. Door prizes and giveaways. Bring your built ride!',
    },
    {
      'title': 'Night Photoshoot Meet',
      'location': 'Downtown LA Arts District',
      'date': 'Dec 16, 2024',
      'time': '8:00 PM',
      'attendees': 19,
      'maxAttendees': 25,
      'type': 'Photo',
      'description': 'Professional photographer on site. Light painting, long exposures, creative shots. Bring your cleanest build!',
    },
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      body: SafeArea(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const SizedBox(height: 20),

            // Header
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: Text(
                'Events',
                style: TextStyle(
                  fontSize: 34,
                  fontWeight: FontWeight.bold,
                  color: AppleTheme.appleBlue,
                ),
              ),
            ),

            const SizedBox(height: 24),

            // Filter pills
            SizedBox(
              height: 40,
              child: ListView(
                scrollDirection: Axis.horizontal,
                padding: const EdgeInsets.symmetric(horizontal: 16),
                children: [
                  _buildFilterPill('All'),
                  const SizedBox(width: 8),
                  _buildFilterPill('Drive'),
                  const SizedBox(width: 8),
                  _buildFilterPill('Track'),
                  const SizedBox(width: 8),
                  _buildFilterPill('Show'),
                  const SizedBox(width: 8),
                  _buildFilterPill('Dyno'),
                ],
              ),
            ),

            const SizedBox(height: 24),

            // Events list
            Expanded(
              child: ListView.builder(
                padding: const EdgeInsets.only(bottom: 100, left: 16, right: 16),
                itemCount: _events.length,
                itemBuilder: (context, index) {
                  final event = _events[index];
                  return Padding(
                    padding: const EdgeInsets.only(bottom: 16),
                    child: AppleContentCard(
                      title: event['title'],
                      subtitle: '${event['location']} • ${event['date']}',
                      description: event['description'],
                      gradient: LinearGradient(
                        colors: _getEventGradient(event['type']),
                      ),
                      tags: [
                        event['type'],
                        event['time'],
                        event['maxAttendees'] != null
                            ? '${event['attendees']}/${event['maxAttendees']}'
                            : '${event['attendees']} going',
                      ],
                      onTap: () {
                        // Handle event tap
                      },
                    ),
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildFilterPill(String label) {
    final isSelected = _selectedFilter == label;
    return ApplePillButton(
      label: label,
      isSelected: isSelected,
      onPressed: () {
        setState(() {
          _selectedFilter = label;
        });
      },
    );
  }

  List<Color> _getEventGradient(String type) {
    switch (type) {
      case 'Drive':
        return [
          AppleTheme.appleBlue.withOpacity(0.4),
          AppleTheme.appleGreen.withOpacity(0.4),
        ];
      case 'Track':
        return [
          AppleTheme.appleRed.withOpacity(0.4),
          AppleTheme.appleOrange.withOpacity(0.4),
        ];
      case 'Show':
        return [
          AppleTheme.appleOrange.withOpacity(0.4),
          AppleTheme.applePurple.withOpacity(0.4),
        ];
      case 'Dyno':
        return [
          AppleTheme.applePurple.withOpacity(0.4),
          AppleTheme.appleRed.withOpacity(0.4),
        ];
      case 'Photo':
        return [
          AppleTheme.appleGreen.withOpacity(0.4),
          AppleTheme.appleBlue.withOpacity(0.4),
        ];
      default:
        return [
          AppleTheme.appleBlue.withOpacity(0.4),
          AppleTheme.applePurple.withOpacity(0.4),
        ];
    }
  }
}
