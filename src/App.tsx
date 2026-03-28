import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import StageFilter from './components/StageFilter';
import SongList from './components/SongList';
import AddSongButton from './components/AddSongButton';
import AddSongModal from './components/AddSongModal';
import EditSongModal from './components/EditSongModal';
import StreamingModal from './components/StreamingModal';
import { ResonanceNote, ResonanceStage } from './types';
import { createSong, loadSongs, loadStages, updateSong } from './services/echoesApi';
import './App.css';

function App() {
  const [songs, setSongs] = useState<ResonanceNote[]>([]);
  const [stageDefinitions, setStageDefinitions] = useState<Omit<ResonanceStage, 'songs'>[]>([]);
  const [stages, setStages] = useState<ResonanceStage[]>([]);
  const [selectedStage, setSelectedStage] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isStreamingModalOpen, setIsStreamingModalOpen] = useState(false);
  const [selectedSong, setSelectedSong] = useState<ResonanceNote | null>(null);
  const [editingSong, setEditingSong] = useState<ResonanceNote | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [defs, list] = await Promise.all([loadStages(), loadSongs()]);
        if (cancelled) return;
        setStageDefinitions(defs);
        setSongs(list);
        setLoadError(null);
      } catch (e) {
        if (cancelled) return;
        setLoadError(e instanceof Error ? e.message : 'Failed to load data');
        setStageDefinitions([]);
        setSongs([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Attach songs to each stage for filter counts
  useEffect(() => {
    const updatedStages = stageDefinitions.map(stage => ({
      ...stage,
      songs: songs.filter(song => song.resonanceStage === stage.name)
    }));
    setStages(updatedStages);
  }, [songs, stageDefinitions]);

  const handleAddSong = async (songData: Omit<ResonanceNote, 'id' | 'createdAt'>) => {
    setSaveError(null);
    try {
      const created = await createSong(songData);
      setSongs(prev => [created, ...prev]);
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Could not save song';
      setSaveError(message);
      throw e;
    }
  };

  const handleEditClick = (song: ResonanceNote) => {
    setEditingSong(song);
    setIsEditModalOpen(true);
  };

  const handleUpdateSong = async (
    id: string,
    songData: Omit<ResonanceNote, 'id' | 'createdAt'>
  ) => {
    setSaveError(null);
    try {
      const updated = await updateSong(id, songData);
      setSongs(prev => prev.map(s => (s.id === id ? updated : s)));
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Could not update song';
      setSaveError(message);
      throw e;
    }
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
          {loading && (
            <p className="app-status" role="status">
              Loading resonance songs…
            </p>
          )}
          {loadError && !loading && (
            <p className="app-status app-status--error" role="alert">
              {loadError} — set <code>REACT_APP_SUPABASE_URL</code> and{' '}
              <code>REACT_APP_SUPABASE_ANON_KEY</code> in <code>.env.local</code> (see{' '}
              <code>.env.example</code>) and run the SQL in{' '}
              <code>supabase/migrations/20250328140000_echoes.sql</code> in the Supabase SQL
              Editor.
            </p>
          )}
          {saveError && (
            <p className="app-status app-status--error" role="alert">
              {saveError}
            </p>
          )}
          <StageFilter
            stages={stages}
            selectedStage={selectedStage}
            onStageSelect={handleStageSelect}
          />
          
          <SongList
            songs={songs}
            selectedStage={selectedStage}
            onListenClick={handleListenClick}
            onEditClick={handleEditClick}
          />
        </div>
      </main>
      
      <AddSongButton onClick={() => setIsAddModalOpen(true)} />
      
      <AddSongModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddSong={handleAddSong}
      />

      <EditSongModal
        isOpen={isEditModalOpen}
        song={editingSong}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingSong(null);
        }}
        onSave={handleUpdateSong}
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
