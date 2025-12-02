# Burnout HTML Version - Quick Start Guide

## Overview

This is the HTML/CSS/JavaScript implementation of the Burnout car enthusiast social media app. It matches the Flutter version with the same design specifications and screen layouts.

## Files Structure

```
burnout-index.html          # Landing page with screen navigation
burnout-home.html           # Home feed with greeting and news
burnout-events.html         # Events page with table and groups
burnout-profile.html        # User profile with tabs
burnout-car-profile.html    # Car detail/profile page
burnout-routes.html         # Routes/map placeholder
burnout-news.html           # News feed
burnout-chat.html           # Chat/messages placeholder
burnout-add-post.html       # Add post placeholder
burnout-styles.css          # Shared styles and components
```

## Quick Start

### Option 1: Open Directly in Browser

1. Navigate to the project directory
2. Open `burnout-index.html` in your web browser
3. Click on any screen card to view that screen

### Option 2: Use Live Server (Recommended)

If using VS Code:

1. Install "Live Server" extension
2. Right-click on `burnout-index.html`
3. Select "Open with Live Server"
4. Your default browser will open at `http://localhost:5500`

### Option 3: Simple HTTP Server

Using Python:
```bash
# Navigate to the project directory
cd the-UI

# Python 3
python -m http.server 8000

# Then open: http://localhost:8000/burnout-index.html
```

Using Node.js:
```bash
# Install http-server globally
npm install -g http-server

# Run server
http-server

# Then open: http://localhost:8080/burnout-index.html
```

## Design Specifications

### Color Scheme

- **Primary Blue**: `#4169E1` (Royal Blue)
- **Electric Blue**: `#4D4DFF`
- **Background**: `#000000` (Pure Black)
- **Card Background**: `#0A0A0A`
- **Text White**: `#FFFFFF`
- **Text Gray**: `#B0B0B0`

### Typography

- **Font**: Inter (Google Fonts)
- **Display Large**: 32px, Bold
- **Display Medium**: 28px, Bold
- **Headline Large**: 24px, Bold, Blue
- **Body**: 14-16px
- **Small**: 12-13px

### Components

#### Cards
- Background: `#0A0A0A`
- Border: 2.5px solid blue
- Border Radius: 12px
- Shadow: Blue glow effect

#### Bottom Navigation
- Fixed at bottom
- 5 navigation items
- Active state: Blue color
- Inactive: Gray color

## Screens Overview

### 1. Home Feed (burnout-home.html)
- Profile circle
- Personalized greeting: "Hi, Chris"
- Question text: "Whens the next drive?"
- Search bar
- News cards
- Bottom navigation

**Features:**
- Smooth scroll
- Card click animations
- Responsive layout

### 2. Events (burnout-events.html)
- Tab navigation (For You / Events)
- Horizontal scrolling group circles
- Events table with 6 columns
- Sample event data

**Features:**
- Horizontal scroll (no scrollbar)
- Responsive table
- Group icons

### 3. Profile (burnout-profile.html)
- Profile header with circle
- Username display
- 3 tabs: Posts, Sparks?, Auto-Bits
- Tab switching functionality

**Features:**
- Interactive tabs
- Empty states
- JavaScript tab switching

### 4. Car Profile (burnout-car-profile.html)
- Profile picture
- Username and car model
- Modifications section
- Social accounts (Instagram)
- Blue placeholder box
- News card

**Features:**
- Detailed car info
- Social links
- Modification details

### 5. Routes (burnout-routes.html)
- Empty state with icon
- "Coming Soon" message
- Placeholder for map integration

### 6. News (burnout-news.html)
- Page title
- Multiple news cards
- News images and descriptions

### 7. Chat (burnout-chat.html)
- Empty state with icon
- Messages placeholder

### 8. Add Post (burnout-add-post.html)
- Empty state with icon
- Create post placeholder

### 9. Index/Landing (burnout-index.html)
- App logo and branding
- About section
- Tech stack badges
- Screen navigation grid
- Animated card entrance

## CSS Architecture

### CSS Variables (in burnout-styles.css)

```css
--primary-blue: #4169E1
--background-black: #000000
--card-background: #0A0A0A
--text-white: #FFFFFF
--spacing-lg: 16px
--radius-md: 12px
```

### Utility Classes

- `.headline-large` - Large blue headings
- `.body-medium` - Standard body text
- `.text-blue` - Blue text color
- `.text-gray` - Gray text color
- `.mb-lg` - Margin bottom large
- `.mt-xl` - Margin top extra large

### Component Classes

- `.card` - Standard card with blue border
- `.profile-circle` - Circular profile image
- `.group-circle` - Group icon circles
- `.search-bar` - White search input
- `.bottom-nav` - Fixed bottom navigation
- `.tabs` - Tab navigation
- `.events-table` - Events data table

## Responsive Design

### Breakpoints

- **Mobile**: < 768px
  - Full width layout
  - Stacked cards
  - Simplified tables

- **Desktop**: > 768px
  - Max width 600px
  - Centered content
  - Original layout

### Mobile-First Approach

All styles are mobile-first, with desktop enhancements added via media queries.

## Icons

Using **Font Awesome 6.5.1** (CDN):

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
```

**Icons Used:**
- `fa-home` - Home
- `fa-car` - Routes
- `fa-plus-circle` - Add Post
- `fa-newspaper` - News
- `fa-comment-dots` - Chat
- `fa-users` - Groups
- `fa-calendar-alt` - Events
- `fa-user` - Profile

## JavaScript Features

### Home Page (burnout-home.html)
```javascript
- Smooth scroll behavior
- Card click animations
- Scale effect on tap
```

### Profile Page (burnout-profile.html)
```javascript
- Tab switching function
- Show/hide tab content
- Active state management
```

### Index Page (burnout-index.html)
```javascript
- Animated card entrance
- Staggered animation delays
- Fade and slide effects
```

## Customization

### Change Colors

Edit `burnout-styles.css`:

```css
:root {
    --primary-blue: #YOUR_COLOR;
    --background-black: #YOUR_COLOR;
    /* ... */
}
```

### Add New Screens

1. Copy existing HTML file
2. Update content
3. Keep same structure and navigation
4. Add link in `burnout-index.html`

### Modify Components

Edit classes in `burnout-styles.css`:
- `.card` - Card styling
- `.bottom-nav` - Navigation bar
- `.profile-circle` - Profile images

## Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Optimization

### Already Implemented:
- CSS variables for consistency
- Minimal JavaScript
- CDN for fonts and icons
- Efficient selectors
- Hardware-accelerated transforms

### Recommended:
- Add image lazy loading
- Minify CSS for production
- Use service worker for offline support
- Optimize images (WebP format)

## Future Enhancements

### Functionality to Add:
- [ ] Real backend integration
- [ ] Authentication system
- [ ] Image upload
- [ ] Real-time chat
- [ ] Map integration (Google Maps)
- [ ] Progressive Web App (PWA)
- [ ] Offline support
- [ ] Push notifications

### UI Improvements:
- [ ] Loading states
- [ ] Error handling
- [ ] Toast notifications
- [ ] Modal dialogs
- [ ] Swipe gestures
- [ ] Pull-to-refresh

## Testing

### Manual Testing Checklist:

- [ ] All navigation links work
- [ ] Bottom nav highlights correct item
- [ ] Tabs switch properly (Profile page)
- [ ] Cards have hover effects
- [ ] Responsive on mobile (< 768px)
- [ ] Responsive on desktop (> 768px)
- [ ] All icons load
- [ ] Font loads (Inter)
- [ ] Smooth scrolling works
- [ ] Animations play on load

### Cross-Browser Testing:

Test in:
- Chrome DevTools (mobile view)
- Firefox Responsive Design Mode
- Safari (if on macOS)
- Real mobile device

## Deployment

### GitHub Pages:

1. Push code to GitHub repository
2. Go to Settings > Pages
3. Select branch and `/root` folder
4. Save and wait for deployment
5. Access at `https://username.github.io/repo-name/burnout-index.html`

### Netlify:

1. Drag and drop folder to Netlify
2. Or connect GitHub repo
3. Set build settings (none needed for static site)
4. Deploy

### Vercel:

1. Import GitHub repository
2. No build configuration needed
3. Deploy

## Support

For issues or questions:
1. Check browser console for errors
2. Verify all files are in same directory
3. Ensure internet connection (for CDN resources)
4. Try different browser

## License

[Add your license here]

---

**Built with HTML, CSS, and JavaScript** 💙 **for Car Enthusiasts** 🏎️
