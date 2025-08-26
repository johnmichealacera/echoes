import React, { useState, useEffect } from 'react';
import { ResonanceNote } from '../types';
import './StreamingModal.css';

interface StreamingModalProps {
  isOpen: boolean;
  onClose: () => void;
  song: ResonanceNote | null;
}

const StreamingModal: React.FC<StreamingModalProps> = ({ isOpen, onClose, song }) => {
  const [youtubeVideoId, setYoutubeVideoId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (song && isOpen) {
      searchYouTubeVideo();
    }
  }, [song, isOpen]);

  const searchYouTubeVideo = async () => {
    if (!song) return;
    
    setIsLoading(true);
    
    // Simulate finding a video - in a real app you'd use YouTube Data API
    setTimeout(() => {
      // For demo, we'll show the embed interface
      setYoutubeVideoId('search-ready');
      setIsLoading(false);
    }, 1000);
  };

  if (!isOpen || !song) return null;

  const searchQuery = `${song.songTitle} ${song.artist}`;
  const encodedQuery = encodeURIComponent(searchQuery);

  const streamingServices = [
    {
      name: 'Spotify',
      url: `https://open.spotify.com/search/${encodedQuery}`,
      icon: '🎵',
      color: '#1DB954',
      description: 'Stream on Spotify'
    },
    {
      name: 'Apple Music',
      url: `https://music.apple.com/search?term=${encodedQuery}`,
      icon: '🍎',
      color: '#FA243C',
      description: 'Listen on Apple Music'
    },
    {
      name: 'YouTube Music',
      url: `https://music.youtube.com/search?q=${encodedQuery}`,
      icon: '🎬',
      color: '#FF0000',
      description: 'Play on YouTube Music'
    },
    {
      name: 'YouTube',
      url: `https://www.youtube.com/results?search_query=${encodedQuery}`,
      icon: '▶️',
      color: '#FF0000',
      description: 'Search on YouTube'
    },
    {
      name: 'Amazon Music',
      url: `https://music.amazon.com/search/${encodedQuery}`,
      icon: '📦',
      color: '#FF9900',
      description: 'Stream on Amazon Music'
    },
    {
      name: 'Tidal',
      url: `https://tidal.com/search/${encodedQuery}`,
      icon: '🌊',
      color: '#000000',
      description: 'High quality on Tidal'
    }
  ];

  const handleServiceClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleYouTubeSearch = () => {
    const url = `https://www.youtube.com/results?search_query=${encodedQuery}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="streaming-modal-overlay" onClick={onClose}>
      <div className="streaming-modal-content" onClick={e => e.stopPropagation()}>
        <div className="streaming-modal-header">
          <h2 className="streaming-modal-title">Listen to "{song.songTitle}"</h2>
          <p className="streaming-modal-subtitle">by {song.artist}</p>
          <button className="streaming-close-btn" onClick={onClose}>×</button>
        </div>
        
        {/* Inline YouTube Player Section */}
        <div className="youtube-section">
          <div className="youtube-header">
            <h3 className="youtube-title">🎵 Listen Now</h3>
            <p className="youtube-description">
              Search and listen to "{song.songTitle}" by {song.artist} on YouTube
            </p>
          </div>
          
          <div className="youtube-player-container">
            {isLoading ? (
              <div className="youtube-loading">
                <div className="loading-spinner"></div>
                <p>Searching for music...</p>
              </div>
            ) : youtubeVideoId ? (
              <div className="youtube-embed-section">
                <div className="youtube-player-wrapper">
                  <div className="embedded-player">
                    {song.youtubeId ? (
                      <iframe
                        width="100%"
                        height="315"
                        src={`https://www.youtube.com/embed/${song.youtubeId}?autoplay=0&rel=0&showinfo=1`}
                        title={`${song.songTitle} by ${song.artist}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="youtube-iframe"
                      ></iframe>
                    ) : (
                      <div className="no-video-placeholder">
                        <div className="placeholder-icon">🎵</div>
                        <p>Video not available for embedding</p>
                        <button 
                          className="fallback-youtube-btn"
                          onClick={handleYouTubeSearch}
                        >
                          🔗 Open in YouTube
                        </button>
                      </div>
                    )}
                    <div className="player-info">
                      <p>🎵 Now playing: <strong>{song.songTitle}</strong> by <strong>{song.artist}</strong></p>
                      <p className="player-note">
                        {song.youtubeId 
                          ? song.reflection 
                          : "This song will open in YouTube for the best listening experience."
                        }
                      </p>
                    </div>
                  </div>
                </div>
                <div className="youtube-controls">
                  <button 
                    className="youtube-new-search-btn"
                    onClick={() => setYoutubeVideoId(null)}
                  >
                    🔄 Choose Different Song
                  </button>
                  <button 
                    className="youtube-external-btn"
                    onClick={handleYouTubeSearch}
                  >
                    🔗 Open in New Tab
                  </button>
                </div>
              </div>
            ) : (
              <div className="youtube-search-prompt">
                <div className="youtube-icon">▶️</div>
                <h4>Ready to Listen?</h4>
                <p>Click below to load the YouTube player and start listening on this page!</p>
                <button 
                  className="youtube-search-btn"
                  onClick={() => setYoutubeVideoId('search-ready')}
                >
                  🎵 Load YouTube Player
                </button>
              </div>
            )}
          </div>
        </div>
        
        <div className="streaming-divider">
          <span>Or choose another streaming service</span>
        </div>
        
        <div className="streaming-options">
          {streamingServices.map((service) => (
            <button
              key={service.name}
              className="streaming-service-btn"
              onClick={() => handleServiceClick(service.url)}
              style={{ '--service-color': service.color } as React.CSSProperties}
            >
              <div className="service-icon">{service.icon}</div>
              <div className="service-info">
                <span className="service-name">{service.name}</span>
                <span className="service-description">{service.description}</span>
              </div>
              <div className="service-arrow">→</div>
            </button>
          ))}
        </div>
        
        <div className="streaming-footer">
          <p className="streaming-note">
            💡 YouTube search opens in a new tab, but you can keep listening while exploring your transformation journey here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StreamingModal;
