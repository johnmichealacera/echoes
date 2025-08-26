import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import StageFilter from './components/StageFilter';
import SongList from './components/SongList';
import AddSongButton from './components/AddSongButton';
import AddSongModal from './components/AddSongModal';
import StreamingModal from './components/StreamingModal';
import { ResonanceNote, ResonanceStage } from './types';
import { initialSongs, resonanceStages } from './data/songs';
import './App.css';

function App() {
  const [songs, setSongs] = useState<ResonanceNote[]>(initialSongs);
  const [stages, setStages] = useState<ResonanceStage[]>(resonanceStages);
  const [selectedStage, setSelectedStage] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isStreamingModalOpen, setIsStreamingModalOpen] = useState(false);
  const [selectedSong, setSelectedSong] = useState<ResonanceNote | null>(null);

  // Update stages when songs change
  useEffect(() => {
    const updatedStages = resonanceStages.map(stage => ({
      ...stage,
      songs: songs.filter(song => song.resonanceStage === stage.name)
    }));
    setStages(updatedStages);
  }, [songs]);

  const handleAddSong = (songData: Omit<ResonanceNote, 'id' | 'createdAt'>) => {
    const newSong: ResonanceNote = {
      ...songData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setSongs(prev => [newSong, ...prev]);
  };

  const handleStageSelect = (stageId: string | null) => {
    setSelectedStage(stageId);
  };

  const handleListenClick = (song: ResonanceNote) => {
    setSelectedSong(song);
    setIsStreamingModalOpen(true);
  };

  const closeStreamingModal = () => {
    setIsStreamingModalOpen(false);
    setSelectedSong(null);
  };

  return (
    <div className="App">
      <Header />
      
      <main className="main-content">
        <div className="container">
          <StageFilter
            stages={stages}
            selectedStage={selectedStage}
            onStageSelect={handleStageSelect}
          />
          
          <SongList
            songs={songs}
            selectedStage={selectedStage}
            onListenClick={handleListenClick}
          />
        </div>
      </main>
      
      <AddSongButton onClick={() => setIsAddModalOpen(true)} />
      
      <AddSongModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddSong={handleAddSong}
      />
      
      <StreamingModal
        isOpen={isStreamingModalOpen}
        onClose={closeStreamingModal}
        song={selectedSong}
      />
    </div>
  );
}

export default App;
