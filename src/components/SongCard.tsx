import React from 'react';
import { ResonanceNote } from '../types';
import './SongCard.css';

interface SongCardProps {
  song: ResonanceNote;
  onListenClick: (song: ResonanceNote) => void;
  onEditClick: (song: ResonanceNote) => void;
}

const SongCard: React.FC<SongCardProps> = ({ song, onListenClick, onEditClick }) => {
  const getResonanceColor = (resonance: string) => {
    switch (resonance) {
      case 'Very high':
        return '#10b981';
      case 'High':
        return '#3b82f6';
      case 'Medium':
        return '#f59e0b';
      case 'Low':
        return '#6b7280';
      default:
        return '#6b7280';
    }
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'Death':
        return '#dc2626';
      case 'Surrender':
        return '#7c3aed';
      case 'Joy':
        return '#059669';
      case 'Vision':
        return '#0891b2';
      default:
        return '#6b7280';
    }
  };

  return (
    <div className="song-card">
      <div className="song-header">
        <div className="song-info">
          <h3 className="song-title">{song.songTitle}</h3>
          <p className="song-artist">{song.artist}</p>
        </div>
        <div className="song-badges">
          <span 
            className="resonance-badge"
            style={{ backgroundColor: getResonanceColor(song.resonance) }}
          >
            {song.resonance}
          </span>
          <span 
            className="stage-badge"
            style={{ backgroundColor: getStageColor(song.resonanceStage) }}
          >
            {song.resonanceStage}
          </span>
        </div>
      </div>
      
      <div className="song-reflection">
        <p>{song.reflection}</p>
      </div>
      
      <div className="song-footer">
        <div className="song-date">
          Added {new Date(song.createdAt).toLocaleDateString()}
        </div>
        <div className="song-actions">
          <button
            type="button"
            className="action-btn edit-btn"
            onClick={e => {
              e.stopPropagation();
              onEditClick(song);
            }}
          >
            Edit
          </button>
          <button
            type="button"
            className="action-btn play-btn"
            onClick={e => {
              e.stopPropagation();
              onListenClick(song);
            }}
          >
            <span className="play-icon">▶</span>
            Listen
          </button>
        </div>
      </div>
    </div>
  );
};

export default SongCard;
