import React, { useState } from 'react'
import './CreatePostModal.css'

function CreatePostModal({ onClose }) {
  const [caption, setCaption] = useState('')
  const [location, setLocation] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(null)

  const categories = ['Food', 'Travel', 'Music', 'Tech', 'Art', 'Sports']

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <button className="modal-close" onClick={onClose}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
          <h2 className="modal-title">New Post</h2>
          <button className="modal-submit">
            Post
          </button>
        </div>

        {/* Image Upload Area */}
        <div className="upload-area">
          <div className="upload-placeholder">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
            <span>Tap to add photo</span>
          </div>
        </div>

        {/* Caption Input */}
        <div className="input-section">
          <textarea
            className="caption-input"
            placeholder="Write a caption..."
            value={caption}
            onChange={e => setCaption(e.target.value)}
            rows={3}
          />
        </div>

        {/* Location Input */}
        <div className="input-row">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          <input
            type="text"
            placeholder="Add location"
            value={location}
            onChange={e => setLocation(e.target.value)}
          />
        </div>

        {/* Categories */}
        <div className="categories-section">
          <label className="section-label">Category</label>
          <div className="category-chips">
            {categories.map(cat => (
              <button
                key={cat}
                className={`category-chip ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="modal-actions">
          <button className="action-option">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/>
              <circle cx="12" cy="13" r="4"/>
            </svg>
            Camera
          </button>
          <button className="action-option">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
            Gallery
          </button>
          <button className="action-option">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="23 7 16 12 23 17 23 7"/>
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
            </svg>
            Video
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreatePostModal
