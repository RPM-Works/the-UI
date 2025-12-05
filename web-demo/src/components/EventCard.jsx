import React from 'react'
import './EventCard.css'

function EventCard({ title, location, date, time, attendees, category }) {
  const categoryColors = {
    Business: '#007AFF',
    Wellness: '#30D158',
    Food: '#FF9F0A',
    Art: '#AF52DE',
    Tech: '#5AC8FA',
    Music: '#FF453A',
  }

  return (
    <div className="event-card">
      <div className="event-date-badge">
        <span className="event-month">{date.split(' ')[0]}</span>
        <span className="event-day">{date.split(' ')[1]}</span>
      </div>
      <div className="event-content">
        <div className="event-header">
          <span
            className="event-category"
            style={{ background: categoryColors[category] || '#007AFF' }}
          >
            {category}
          </span>
          <span className="event-time">{time}</span>
        </div>
        <h3 className="event-title">{title}</h3>
        <div className="event-footer">
          <div className="event-location">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <span>{location}</span>
          </div>
          <div className="event-attendees">
            <div className="attendee-avatars">
              {[...Array(Math.min(3, Math.ceil(attendees / 30)))].map((_, i) => (
                <div
                  key={i}
                  className="attendee-avatar"
                  style={{
                    background: `hsl(${i * 120}, 70%, 60%)`,
                    zIndex: 3 - i,
                    marginLeft: i > 0 ? '-8px' : 0
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
              ))}
            </div>
            <span>{attendees} going</span>
          </div>
        </div>
      </div>
      <button className="event-action">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </button>
    </div>
  )
}

export default EventCard
