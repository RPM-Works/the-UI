# Burnout Web Demo

A web-based demo of the Burnout app UI, featuring Apple-style glassmorphic design.

## Features

- **Glassmorphic UI** - Beautiful frosted glass effects throughout
- **Dark Mode** - Elegant dark theme design
- **Profile Card Flip** - 3D card flip animation with QR code
- **Event Cards** - Event listing with category tags
- **Create Post Modal** - Instagram-style post creation
- **Responsive Design** - Works on mobile and desktop

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool for fast development
- **CSS Variables** - Theming and design tokens
- **No dependencies** - Pure CSS animations, no animation libraries needed

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment on Render

This project is configured for easy deployment on [Render](https://render.com).

### Option 1: Blueprint (Recommended)
1. Fork this repository
2. Go to Render Dashboard
3. Click "New" → "Blueprint"
4. Connect your repository
5. Render will auto-detect `render.yaml` and deploy

### Option 2: Manual Setup
1. Create a new "Static Site" on Render
2. Connect your repository
3. Set build command: `cd web-demo && npm install && npm run build`
4. Set publish directory: `web-demo/dist`
5. Deploy!

## Project Structure

```
web-demo/
├── src/
│   ├── components/
│   │   ├── BottomNav.jsx/.css
│   │   ├── CreatePostModal.jsx/.css
│   │   ├── EventCard.jsx/.css
│   │   ├── GlassCard.jsx/.css
│   │   └── ProfileCard.jsx/.css
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
└── vite.config.js
```

## Design System

### Colors

```css
--primary-blue: #007AFF
--primary-purple: #AF52DE
--accent-green: #30D158
--accent-orange: #FF9F0A
--accent-red: #FF453A
```

### Glass Effects

```css
background: rgba(255, 255, 255, 0.08)
border: 1px solid rgba(255, 255, 255, 0.12)
backdrop-filter: blur(20px)
```

## License

MIT
