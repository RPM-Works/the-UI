import React, { useState } from 'react'
import './App.css'
import GlassCard from './components/GlassCard'
import ProfileCard from './components/ProfileCard'
import BottomNav from './components/BottomNav'
import EventCard from './components/EventCard'
import CreatePostModal from './components/CreatePostModal'

function App() {
  const [activeTab, setActiveTab] = useState('home')
  const [showModal, setShowModal] = useState(false)

  return (
    <div className="app">
      {/* Background gradient orbs */}
      <div className="bg-orb bg-orb-1"></div>
      <div className="bg-orb bg-orb-2"></div>
      <div className="bg-orb bg-orb-3"></div>

      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <div className="logo-icon">B</div>
            <span className="logo-text">Burnout</span>
          </div>
          <div className="header-badge">Demo</div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {activeTab === 'home' && <HomeScreen onCreatePost={() => setShowModal(true)} />}
        {activeTab === 'events' && <EventsScreen />}
        {activeTab === 'profile' && <ProfileScreen />}
        {activeTab === 'search' && <SearchScreen />}
        {activeTab === 'settings' && <SettingsScreen />}
      </main>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Create Post Modal */}
      {showModal && <CreatePostModal onClose={() => setShowModal(false)} />}
    </div>
  )
}

function HomeScreen({ onCreatePost }) {
  return (
    <div className="screen home-screen">
      <div className="screen-header">
        <h1 className="screen-title">Welcome Back</h1>
        <p className="screen-subtitle">Discover what's happening around you</p>
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/>
          <path d="M21 21l-4.35-4.35"/>
        </svg>
        <input type="text" placeholder="Search events, people, places..." />
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <button className="action-btn primary" onClick={onCreatePost}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          Create Post
        </button>
        <button className="action-btn glass">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          Events
        </button>
      </div>

      {/* Featured Section */}
      <section className="section">
        <h2 className="section-title">Featured Events</h2>
        <div className="cards-scroll">
          <GlassCard
            title="Summer Music Festival"
            subtitle="Golden Gate Park"
            tag="Music"
            tagColor="#FF453A"
            image="https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400"
          />
          <GlassCard
            title="Tech Meetup SF"
            subtitle="Moscone Center"
            tag="Tech"
            tagColor="#007AFF"
            image="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400"
          />
          <GlassCard
            title="Art Gallery Opening"
            subtitle="SFMOMA"
            tag="Art"
            tagColor="#AF52DE"
            image="https://images.unsplash.com/photo-1531243269054-5ebf6f34081e?w=400"
          />
        </div>
      </section>

      {/* Stats Cards */}
      <section className="section">
        <h2 className="section-title">Your Activity</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #007AFF, #5856D6)' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 6v6l4 2"/>
              </svg>
            </div>
            <div className="stat-info">
              <span className="stat-value">12</span>
              <span className="stat-label">Events Attended</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #30D158, #34C759)' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 00-3-3.87"/>
                <path d="M16 3.13a4 4 0 010 7.75"/>
              </svg>
            </div>
            <div className="stat-info">
              <span className="stat-value">284</span>
              <span className="stat-label">Connections</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #FF9F0A, #FF6B00)' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
            </div>
            <div className="stat-info">
              <span className="stat-value">4.9</span>
              <span className="stat-label">Rating</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function EventsScreen() {
  const [filter, setFilter] = useState('all')

  const events = [
    { id: 1, title: 'Startup Pitch Night', location: 'The Battery SF', date: 'Dec 15', time: '7:00 PM', attendees: 89, category: 'Business' },
    { id: 2, title: 'Yoga in the Park', location: 'Dolores Park', date: 'Dec 16', time: '9:00 AM', attendees: 45, category: 'Wellness' },
    { id: 3, title: 'Food Truck Friday', location: 'SoMa StrEat Food', date: 'Dec 17', time: '5:00 PM', attendees: 234, category: 'Food' },
    { id: 4, title: 'Photography Walk', location: 'Embarcadero', date: 'Dec 18', time: '3:00 PM', attendees: 28, category: 'Art' },
  ]

  return (
    <div className="screen events-screen">
      <div className="screen-header">
        <h1 className="screen-title">Events</h1>
        <p className="screen-subtitle">Find your next adventure</p>
      </div>

      {/* Filter Pills */}
      <div className="filter-pills">
        {['all', 'today', 'this week', 'nearby'].map(f => (
          <button
            key={f}
            className={`filter-pill ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Events List */}
      <div className="events-list">
        {events.map(event => (
          <EventCard key={event.id} {...event} />
        ))}
      </div>
    </div>
  )
}

function ProfileScreen() {
  return (
    <div className="screen profile-screen">
      <div className="screen-header">
        <h1 className="screen-title">Profile</h1>
        <p className="screen-subtitle">Tap the card to flip</p>
      </div>

      <ProfileCard
        name="Alex Rivera"
        handle="@alexrivera"
        bio="Product designer & adventure seeker. Making beautiful things happen."
        avatar="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200"
        followers={1284}
        following={892}
        events={47}
      />

      {/* Achievements */}
      <section className="section">
        <h2 className="section-title">Achievements</h2>
        <div className="achievements-grid">
          <div className="achievement">
            <div className="achievement-icon gold">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
            </div>
            <span>Top Rated</span>
          </div>
          <div className="achievement">
            <div className="achievement-icon purple">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
            <span>Verified</span>
          </div>
          <div className="achievement">
            <div className="achievement-icon blue">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="8" r="7"/>
                <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
              </svg>
            </div>
            <span>Event Pro</span>
          </div>
          <div className="achievement">
            <div className="achievement-icon green">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 00-3-3.87"/>
                <path d="M16 3.13a4 4 0 010 7.75"/>
              </svg>
            </div>
            <span>Networker</span>
          </div>
        </div>
      </section>
    </div>
  )
}

function SearchScreen() {
  return (
    <div className="screen search-screen">
      <div className="screen-header">
        <h1 className="screen-title">Discover</h1>
        <p className="screen-subtitle">Explore trending topics</p>
      </div>

      <div className="search-bar large">
        <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/>
          <path d="M21 21l-4.35-4.35"/>
        </svg>
        <input type="text" placeholder="Search anything..." />
      </div>

      {/* Trending Topics */}
      <section className="section">
        <h2 className="section-title">Trending</h2>
        <div className="trending-list">
          {['#TechEvents', '#FoodieLife', '#ArtSF', '#StartupWeek', '#WellnessJourney'].map((tag, i) => (
            <div key={tag} className="trending-item">
              <span className="trending-rank">{i + 1}</span>
              <div className="trending-info">
                <span className="trending-tag">{tag}</span>
                <span className="trending-count">{Math.floor(Math.random() * 10 + 1)}k posts</span>
              </div>
              <div className="trending-spark">
                <svg viewBox="0 0 40 20">
                  <polyline
                    points="0,15 8,12 16,8 24,14 32,6 40,10"
                    fill="none"
                    stroke="#30D158"
                    strokeWidth="2"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

function SettingsScreen() {
  return (
    <div className="screen settings-screen">
      <div className="screen-header">
        <h1 className="screen-title">Settings</h1>
        <p className="screen-subtitle">Customize your experience</p>
      </div>

      <div className="settings-list">
        <div className="settings-group">
          <h3 className="settings-group-title">Account</h3>
          <SettingsItem icon="user" label="Edit Profile" />
          <SettingsItem icon="bell" label="Notifications" badge="3" />
          <SettingsItem icon="lock" label="Privacy & Security" />
        </div>
        <div className="settings-group">
          <h3 className="settings-group-title">Preferences</h3>
          <SettingsItem icon="moon" label="Dark Mode" toggle defaultChecked />
          <SettingsItem icon="globe" label="Language" value="English" />
          <SettingsItem icon="map-pin" label="Location" value="San Francisco" />
        </div>
        <div className="settings-group">
          <h3 className="settings-group-title">About</h3>
          <SettingsItem icon="info" label="Version" value="1.0.0 Demo" />
          <SettingsItem icon="heart" label="Made with love" value="by Burnout Team" />
        </div>
      </div>
    </div>
  )
}

function SettingsItem({ icon, label, value, badge, toggle, defaultChecked }) {
  const [isOn, setIsOn] = useState(defaultChecked || false)

  const icons = {
    user: <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>,
    bell: <><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></>,
    lock: <><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></>,
    moon: <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>,
    globe: <><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></>,
    'map-pin': <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></>,
    info: <><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></>,
    heart: <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>,
  }

  return (
    <div className="settings-item">
      <div className="settings-item-left">
        <div className="settings-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {icons[icon]}
          </svg>
        </div>
        <span className="settings-label">{label}</span>
      </div>
      <div className="settings-item-right">
        {badge && <span className="settings-badge">{badge}</span>}
        {value && <span className="settings-value">{value}</span>}
        {toggle && (
          <button className={`toggle ${isOn ? 'on' : ''}`} onClick={() => setIsOn(!isOn)}>
            <div className="toggle-thumb" />
          </button>
        )}
        {!toggle && !value && !badge && (
          <svg className="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        )}
      </div>
    </div>
  )
}

export default App
