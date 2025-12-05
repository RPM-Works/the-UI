import React from 'react'
import './GlassCard.css'

function GlassCard({ title, subtitle, tag, tagColor, image }) {
  return (
    <div className="glass-card">
      <div className="glass-card-image">
        <img src={image} alt={title} />
        <div className="glass-card-overlay" />
      </div>
      <div className="glass-card-content">
        {tag && (
          <span className="glass-card-tag" style={{ background: tagColor }}>
            {tag}
          </span>
        )}
        <h3 className="glass-card-title">{title}</h3>
        <p className="glass-card-subtitle">{subtitle}</p>
      </div>
    </div>
  )
}

export default GlassCard
