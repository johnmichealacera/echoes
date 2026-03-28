import React, { useEffect, useState } from 'react';
import { ResonanceNote } from '../types';
import './AddSongModal.css';

interface EditSongModalProps {
  isOpen: boolean;
  song: ResonanceNote | null;
  onClose: () => void;
  onSave: (
    id: string,
    data: Omit<ResonanceNote, 'id' | 'createdAt'>
  ) => void | Promise<void>;
}

const EditSongModal: React.FC<EditSongModalProps> = ({ isOpen, song, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    songTitle: '',
    artist: '',
    resonance: 'High' as ResonanceNote['resonance'],
    reflection: '',
    resonanceStage: 'Death' as ResonanceNote['resonanceStage'],
    youtubeId: '',
  });

  useEffect(() => {
    if (!isOpen || !song) return;
    setFormData({
      songTitle: song.songTitle,
      artist: song.artist,
      resonance: song.resonance,
      reflection: song.reflection,
      resonanceStage: song.resonanceStage,
      youtubeId: song.youtubeId ?? '',
    });
    // Only re-run when opening or switching songs — not when parent passes a new object for the same row (would wipe edits).
    // eslint-disable-next-line react-hooks/exhaustive-deps -- `song` omitted on purpose (see comment above).
  }, [isOpen, song?.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!song) return;
    const youtubeId = formData.youtubeId.trim();
    try {
      await onSave(song.id, {
        songTitle: formData.songTitle,
        artist: formData.artist,
        resonance: formData.resonance,
        reflection: formData.reflection,
        resonanceStage: formData.resonanceStage,
        ...(youtubeId ? { youtubeId } : {}),
      });
      onClose();
    } catch {
      /* Parent sets error message; keep modal open */
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  if (!isOpen || !song) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Edit Resonance Song</h2>
          <button type="button" className="close-btn" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="song-form">
          <div className="form-group">
            <label htmlFor="edit-songTitle">Song Title *</label>
            <input
              type="text"
              id="edit-songTitle"
              name="songTitle"
              value={formData.songTitle}
              onChange={handleChange}
              required
              placeholder="Enter song title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="edit-artist">Artist *</label>
            <input
              type="text"
              id="edit-artist"
              name="artist"
              value={formData.artist}
              onChange={handleChange}
              required
              placeholder="Enter artist name"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="edit-resonance">Resonance Level *</label>
              <select
                id="edit-resonance"
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
              <label htmlFor="edit-resonanceStage">Resonance Stage *</label>
              <select
                id="edit-resonanceStage"
                name="resonanceStage"
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
            <label htmlFor="edit-reflection">Resonance Reflection *</label>
            <textarea
              id="edit-reflection"
              name="reflection"
              value={formData.reflection}
              onChange={handleChange}
              required
              placeholder="What does this song awaken in you? What frequency does it carry?"
              rows={4}
            />
          </div>

          <div className="form-group">
            <label htmlFor="edit-youtubeId">YouTube video ID (optional)</label>
            <input
              type="text"
              id="edit-youtubeId"
              name="youtubeId"
              value={formData.youtubeId}
              onChange={handleChange}
              placeholder="e.g. fJ9rUzIMcZQ"
            />
          </div>

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSongModal;
