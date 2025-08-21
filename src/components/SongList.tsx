import React from 'react';
import { ResonanceNote } from '../types';
import SongCard from './SongCard';
import './SongList.css';

interface SongListProps {
  songs: ResonanceNote[];
  selectedStage: string | null;
  onListenClick: (song: ResonanceNote) => void;
}

const SongList: React.FC<SongListProps> = ({ songs, selectedStage, onListenClick }) => {
  const filteredSongs = selectedStage 
    ? songs.filter(song => song.awakeningStage.toLowerCase() === selectedStage)
    : songs;

  if (filteredSongs.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">🎵</div>
        <h3 className="empty-title">No songs found</h3>
        <p className="empty-description">
          {selectedStage 
            ? `No songs found for the ${selectedStage} stage.` 
            : 'No songs available at the moment.'
          }
        </p>
      </div>
    );
  }

  return (
    <div className="song-list">
      <div className="list-header">
        <h2 className="list-title">
          {selectedStage ? `${selectedStage.charAt(0).toUpperCase() + selectedStage.slice(1)} Stage` : 'All Resonance Songs'}
        </h2>
        <span className="song-count">{filteredSongs.length} song{filteredSongs.length !== 1 ? 's' : ''}</span>
      </div>
      
      <div className="songs-grid">
        {filteredSongs.map((song) => (
          <SongCard
            key={song.id}
            song={song}
            onListenClick={onListenClick}
          />
        ))}
      </div>
    </div>
  );
};

export default SongList;
