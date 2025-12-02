# Models Directory

This directory is reserved for data models used throughout the app.

## Recommended Data Models

When you're ready to add backend integration, create these models:

### user_model.dart
```dart
class User {
  final String id;
  final String username;
  final String? profileImageUrl;
  final String? bio;
  final List<String> carIds;

  User({
    required this.id,
    required this.username,
    this.profileImageUrl,
    this.bio,
    this.carIds = const [],
  });

  factory User.fromJson(Map<String, dynamic> json) {
    // Parse from API response
  }

  Map<String, dynamic> toJson() {
    // Convert to JSON for API
  }
}
```

### car_model.dart
```dart
class Car {
  final String id;
  final String make;
  final String model;
  final int year;
  final String? imageUrl;
  final List<String> modifications;
  final String ownerId;

  Car({
    required this.id,
    required this.make,
    required this.model,
    required this.year,
    this.imageUrl,
    this.modifications = const [],
    required this.ownerId,
  });
}
```

### post_model.dart
```dart
class Post {
  final String id;
  final String userId;
  final String? carId;
  final String content;
  final List<String> imageUrls;
  final int likes;
  final int comments;
  final DateTime createdAt;

  Post({
    required this.id,
    required this.userId,
    this.carId,
    required this.content,
    this.imageUrls = const [],
    this.likes = 0,
    this.comments = 0,
    required this.createdAt,
  });
}
```

### event_model.dart
```dart
class Event {
  final String id;
  final String groupId;
  final String name;
  final String description;
  final String location;
  final DateTime date;
  final double cost;
  final int attendeeLimit;
  final List<String> attendees;

  Event({
    required this.id,
    required this.groupId,
    required this.name,
    required this.description,
    required this.location,
    required this.date,
    this.cost = 0.0,
    required this.attendeeLimit,
    this.attendees = const [],
  });
}
```

### news_model.dart
```dart
class NewsArticle {
  final String id;
  final String title;
  final String description;
  final String? imageUrl;
  final String? articleUrl;
  final DateTime publishedAt;
  final String source;

  NewsArticle({
    required this.id,
    required this.title,
    required this.description,
    this.imageUrl,
    this.articleUrl,
    required this.publishedAt,
    required this.source,
  });
}
```

## JSON Serialization

Consider using one of these packages:
- `json_serializable` - Code generation
- `freezed` - Immutable models with code generation
- Manual serialization (simpler for small apps)

## State Management

When implementing these models, pair them with:
- **Provider** - Simple and recommended
- **Riverpod** - Type-safe and modern
- **Bloc** - For complex business logic
