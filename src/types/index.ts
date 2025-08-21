export interface ResonanceNote {
  id: string;
  songTitle: string;
  artist: string;
  resonance: 'Very high' | 'High' | 'Medium' | 'Low';
  reflection: string;
  awakeningStage: 'Death' | 'Surrender' | 'Joy' | 'Vision';
  createdAt: string;
  youtubeId?: string; // Optional YouTube video ID for embedding
}

export interface AwakeningStage {
  id: string;
  name: string;
  description: string;
  color: string;
  songs: ResonanceNote[];
}
