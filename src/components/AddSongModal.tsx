import React, { useState } from 'react';
import { ResonanceNote } from '../types';
import './AddSongModal.css';

interface AddSongModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSong: (song: Omit<ResonanceNote, 'id' | 'createdAt'>) => void;
}

const AddSongModal: React.FC<AddSongModalProps> = ({ isOpen, onClose, onAddSong }) => {
  const [formData, setFormData] = useState({
    songTitle: '',
    artist: '',
    resonance: 'High' as const,
    reflection: '',
    resonanceStage: 'Death' as const
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddSong(formData);
    setFormData({
      songTitle: '',
      artist: '',
      resonance: 'High',
      reflection: '',
      resonanceStage: 'Death'
    });
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Add New Resonance Song</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="song-form">
          <div className="form-group">
            <label htmlFor="songTitle">Song Title *</label>
            <input
              type="text"
              id="songTitle"
              name="songTitle"
              value={formData.songTitle}
              onChange={handleChange}
              required
              placeholder="Enter song title"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="artist">Artist *</label>
            <input
              type="text"
              id="artist"
              name="artist"
              value={formData.artist}
              onChange={handleChange}
              required
              placeholder="Enter artist name"
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="resonance">Resonance Level *</label>
              <select
                id="resonance"
                name="resonance"
                value={formData.resonance}
                onChange={handleChange}
                required
              >
                <option value="Very high">Very high</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="awakeningStage">Resonance Stage *</label>
              <select
                id="awakeningStage"
                name="awakeningStage"
                value={formData.resonanceStage}
                onChange={handleChange}
                required
              >
                <option value="Death">Death</option>
                <option value="Surrender">Surrender</option>
                <option value="Joy">Joy</option>
                <option value="Vision">Vision</option>
              </select>
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="reflection">Resonance Reflection *</label>
            <textarea
              id="reflection"
              name="reflection"
              value={formData.reflection}
              onChange={handleChange}
              required
              placeholder="What does this song awaken in you? What frequency does it carry?"
              rows={4}
            />
          </div>
          
          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Add Song
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSongModal;
