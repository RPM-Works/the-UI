import React, { useState } from 'react'
import './ProfileCard.css'

function ProfileCard({ name, handle, bio, avatar, followers, following, events }) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div
      className={`profile-card-container ${isFlipped ? 'flipped' : ''}`}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className="profile-card-inner">
        {/* Front */}
        <div className="profile-card profile-card-front">
          <div className="profile-card-header">
            <div className="profile-avatar">
              <img src={avatar} alt={name} />
              <div className="avatar-ring" />
            </div>
            <div className="profile-info">
              <h2 className="profile-name">{name}</h2>
              <span className="profile-handle">{handle}</span>
            </div>
            <div className="verified-badge">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
            </div>
          </div>
          <p className="profile-bio">{bio}</p>
          <div className="profile-stats">
            <div className="profile-stat">
              <span className="stat-number">{followers.toLocaleString()}</span>
              <span className="stat-label">Followers</span>
            </div>
            <div className="profile-stat">
              <span className="stat-number">{following.toLocaleString()}</span>
              <span className="stat-label">Following</span>
            </div>
            <div className="profile-stat">
              <span className="stat-number">{events}</span>
              <span className="stat-label">Events</span>
            </div>
          </div>
          <div className="flip-hint">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 1l4 4-4 4"/>
              <path d="M3 11V9a4 4 0 014-4h14"/>
              <path d="M7 23l-4-4 4-4"/>
              <path d="M21 13v2a4 4 0 01-4 4H3"/>
            </svg>
            <span>Tap to flip</span>
          </div>
        </div>

        {/* Back */}
        <div className="profile-card profile-card-back">
          <div className="qr-section">
            <div className="qr-code">
              <svg viewBox="0 0 100 100" fill="currentColor">
                {/* Simplified QR code pattern */}
                <rect x="10" y="10" width="25" height="25" rx="3"/>
                <rect x="65" y="10" width="25" height="25" rx="3"/>
                <rect x="10" y="65" width="25" height="25" rx="3"/>
                <rect x="15" y="15" width="8" height="8" fill="white"/>
                <rect x="70" y="15" width="8" height="8" fill="white"/>
                <rect x="15" y="70" width="8" height="8" fill="white"/>
                <rect x="40" y="10" width="5" height="5"/>
                <rect x="50" y="10" width="5" height="5"/>
                <rect x="40" y="20" width="5" height="5"/>
                <rect x="55" y="20" width="5" height="5"/>
                <rect x="40" y="40" width="20" height="20" rx="2"/>
                <rect x="47" y="47" width="6" height="6" fill="white"/>
                <rect x="10" y="40" width="5" height="5"/>
                <rect x="20" y="45" width="5" height="5"/>
                <rect x="10" y="50" width="5" height="5"/>
                <rect x="25" y="40" width="5" height="5"/>
                <rect x="70" y="40" width="5" height="5"/>
                <rect x="80" y="50" width="5" height="5"/>
                <rect x="85" y="40" width="5" height="5"/>
                <rect x="40" y="70" width="5" height="5"/>
                <rect x="50" y="75" width="5" height="5"/>
                <rect x="55" y="65" width="5" height="5"/>
                <rect x="70" y="70" width="5" height="5"/>
                <rect x="80" y="80" width="5" height="5"/>
                <rect x="65" y="85" width="5" height="5"/>
              </svg>
            </div>
            <p className="qr-label">Scan to connect</p>
          </div>
          <div className="back-info">
            <h3>{name}</h3>
            <span>{handle}</span>
          </div>
          <div className="flip-hint">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 1l4 4-4 4"/>
              <path d="M3 11V9a4 4 0 014-4h14"/>
              <path d="M7 23l-4-4 4-4"/>
              <path d="M21 13v2a4 4 0 01-4 4H3"/>
            </svg>
            <span>Tap to flip back</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileCard
