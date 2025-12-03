import 'package:flutter/material.dart';
import '../constants/apple_theme.dart';
import '../widgets/apple_content_card.dart';
import '../widgets/apple_glass_widgets.dart';

/// Chat/Messages screen with conversation list
class ChatScreen extends StatefulWidget {
  const ChatScreen({super.key});

  @override
  State<ChatScreen> createState() => _ChatScreenState();
}

class _ChatScreenState extends State<ChatScreen> {
  final TextEditingController _searchController = TextEditingController();

  final List<Map<String, dynamic>> _conversations = [
    {
      'name': 'Weekend Warriors',
      'lastMessage': 'Marcus: See you guys Saturday! 🏁',
      'time': '2m ago',
      'unread': 3,
      'isGroup': true,
      'members': 12,
      'avatar': '👥',
    },
    {
      'name': 'Sarah Rodriguez',
      'lastMessage': 'That dyno run was insane! 📈',
      'time': '15m ago',
      'unread': 1,
      'isGroup': false,
      'avatar': '🏎️',
    },
    {
      'name': 'Track Day Crew',
      'lastMessage': 'Alex: Buttonwillow confirmed for Dec 10',
      'time': '1h ago',
      'unread': 0,
      'isGroup': true,
      'members': 8,
      'avatar': '🏁',
    },
    {
      'name': 'SoCal Tuners',
      'lastMessage': 'Jake: Anyone know a good alignment shop?',
      'time': '2h ago',
      'unread': 5,
      'isGroup': true,
      'members': 47,
      'avatar': '🔧',
    },
    {
      'name': 'Mike Torres',
      'lastMessage': 'Thanks for the E85 tips man!',
      'time': '3h ago',
      'unread': 0,
      'isGroup': false,
      'avatar': '⛽',
    },
    {
      'name': 'GTR Owners',
      'lastMessage': 'Tom: New exhaust sounds amazing 🔊',
      'time': '5h ago',
      'unread': 0,
      'isGroup': true,
      'members': 23,
      'avatar': '🚗',
    },
  ];

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

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
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    'Messages',
                    style: TextStyle(
                      fontSize: 34,
                      fontWeight: FontWeight.bold,
                      color: AppleTheme.appleBlue,
                    ),
                  ),
                  Container(
                    width: 44,
                    height: 44,
                    decoration: BoxDecoration(
                      color: AppleTheme.glassLight,
                      borderRadius: BorderRadius.circular(22),
                    ),
                    child: Icon(
                      Icons.edit,
                      color: AppleTheme.appleBlue,
                      size: 20,
                    ),
                  ),
                ],
              ),
            ),

            const SizedBox(height: 24),

            // Search bar
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: AppleSearchBar(
                controller: _searchController,
                placeholder: 'Search conversations...',
                onChanged: (value) {
                  // Handle search
                },
                onClear: () {
                  _searchController.clear();
                },
              ),
            ),

            const SizedBox(height: 24),

            // Conversations list
            Expanded(
              child: ListView.builder(
                padding: const EdgeInsets.only(bottom: 100, left: 16, right: 16),
                itemCount: _conversations.length,
                itemBuilder: (context, index) {
                  final conv = _conversations[index];
                  return Padding(
                    padding: const EdgeInsets.only(bottom: 12),
                    child: AppleCompactCard(
                      leading: _buildAvatar(conv),
                      title: conv['name'],
                      subtitle: conv['lastMessage'],
                      trailing: _buildTrailing(conv),
                      onTap: () {
                        // Handle conversation tap
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

  Widget _buildAvatar(Map<String, dynamic> conv) {
    return Stack(
      children: [
        Container(
          width: 60,
          height: 60,
          decoration: BoxDecoration(
            color: AppleTheme.appleBlue.withOpacity(0.2),
            borderRadius: BorderRadius.circular(30),
            border: Border.all(
              color: AppleTheme.appleBlue.withOpacity(0.3),
              width: 2,
            ),
          ),
          child: Center(
            child: Text(
              conv['avatar'],
              style: const TextStyle(fontSize: 32),
            ),
          ),
        ),
        if (conv['unread'] > 0)
          Positioned(
            top: 0,
            right: 0,
            child: Container(
              padding: const EdgeInsets.all(6),
              decoration: BoxDecoration(
                color: AppleTheme.appleRed,
                shape: BoxShape.circle,
                border: Border.all(
                  color: Colors.black,
                  width: 2,
                ),
              ),
              child: Text(
                conv['unread'].toString(),
                style: const TextStyle(
                  color: Colors.white,
                  fontSize: 12,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
          ),
      ],
    );
  }

  Widget _buildTrailing(Map<String, dynamic> conv) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.end,
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Text(
          conv['time'],
          style: TextStyle(
            fontSize: 13,
            color: Colors.white.withOpacity(0.6),
          ),
        ),
        if (conv['isGroup']) ...[
          const SizedBox(height: 4),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
            decoration: BoxDecoration(
              color: Colors.white.withOpacity(0.1),
              borderRadius: BorderRadius.circular(8),
            ),
            child: Text(
              '${conv['members']} members',
              style: const TextStyle(
                fontSize: 11,
                color: Colors.white60,
              ),
            ),
          ),
        ],
      ],
    );
  }
}
