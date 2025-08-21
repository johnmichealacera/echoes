import { ResonanceNote, AwakeningStage } from '../types';

export const initialSongs: ResonanceNote[] = [
  {
    id: '1',
    songTitle: 'Bohemian Rhapsody',
    artist: 'Queen',
    resonance: 'Very high',
    reflection: 'Listening to the higher self and killing of ego. Loneliness, setbacks, and the full spectrum of the awakening journey.',
    awakeningStage: 'Death',
    createdAt: new Date().toISOString(),
    youtubeId: 'fJ9rUzIMcZQ' // Queen - Bohemian Rhapsody (Official Video)
  },
  {
    id: '2',
    songTitle: 'Dust in the Wind',
    artist: 'Kansas',
    resonance: 'Very high',
    reflection: 'We are all just nothing — but that realization is liberating.',
    awakeningStage: 'Death',
    createdAt: new Date().toISOString(),
    youtubeId: 'tH2w6Oxx0kQ' // Kansas - Dust in the Wind (Official Audio)
  },
  {
    id: '3',
    songTitle: 'Pompeii',
    artist: 'Bastille',
    resonance: 'High',
    reflection: 'Life is short; ego clouds our time span. Awakening means noticing before it\'s too late.',
    awakeningStage: 'Death',
    createdAt: new Date().toISOString(),
    youtubeId: 'F90Cw4l-8NY' // Bastille - Pompeii (Official Music Video)
  },
  {
    id: '4',
    songTitle: 'Let It Be',
    artist: 'The Beatles',
    resonance: 'High',
    reflection: 'Surrender. Let everything unfold. Trust the frequency of awakening.',
    awakeningStage: 'Surrender',
    createdAt: new Date().toISOString(),
    youtubeId: 'QDYfEBY9NM4' // The Beatles - Let It Be (Official Audio)
  },
  {
    id: '5',
    songTitle: 'Don\'t Stop Me Now',
    artist: 'Queen',
    resonance: 'Very high',
    reflection: 'Pure higher-self awakening. Overflowing vibration. Irresistible joy.',
    awakeningStage: 'Joy',
    createdAt: new Date().toISOString(),
    youtubeId: 'HgzGwKwLmgM' // Queen - Don't Stop Me Now (Official Video)
  },
  {
    id: '6',
    songTitle: 'Imagine',
    artist: 'John Lennon',
    resonance: 'High',
    reflection: 'A vision of humanity awake together — not just me, but all of us.',
    awakeningStage: 'Vision',
    createdAt: new Date().toISOString(),
    youtubeId: 'YkgkThdzX-8' // John Lennon - Imagine (Official Video)
  },
  {
    id: '7',
    songTitle: 'I Don\'t Want to Miss a Thing',
    artist: 'Aerosmith',
    resonance: 'High',
    reflection: 'High resonance and vibration — the pure love that awakens us to presence in every moment.',
    awakeningStage: 'Joy',
    createdAt: new Date().toISOString(),
    youtubeId: 'JkK8g6FMEXE' // Aerosmith - I Don't Want to Miss a Thing (Official Music Video)
  },
  {
    id: '8',
    songTitle: 'Desiderata',
    artist: 'Les Crane (English Version)',
    resonance: 'High',
    reflection: 'Pure bliss with high resonance — the wisdom of accepting what is and finding peace in the cosmic order.',
    awakeningStage: 'Surrender',
    createdAt: new Date().toISOString(),
    youtubeId: 'sTn7O7l3LBY' // Les Crane - Desiderata (Official Audio)
  },
  {
    id: '9',
    songTitle: 'Remember',
    artist: 'Hans Zimmer',
    resonance: 'Medium',
    reflection: 'Emotionally moving — contemplating and remembering our higher self through the depths of cinematic awakening.',
    awakeningStage: 'Vision',
    createdAt: new Date().toISOString(),
    youtubeId: 'RxabLA7UQ9k' // Hans Zimmer - Remember (from The Lion King)
  },
  {
    id: '10',
    songTitle: 'Creep',
    artist: 'Radiohead',
    resonance: 'High',
    reflection: 'Our ego wanting us to be noticed, but we purely dissolve it for pure love and awakening.',
    awakeningStage: 'Death',
    createdAt: new Date().toISOString(),
    youtubeId: 'XFkzRNyygfk' // Radiohead - Creep (Official Music Video)
  },
  {
    id: '11',
    songTitle: 'Guiding Light',
    artist: 'Ghost',
    resonance: 'High',
    reflection: 'Modern awakening on a lonely road — liberating in knowing what we are doing is purely nothing, yet everything.',
    awakeningStage: 'Vision',
    createdAt: new Date().toISOString(),
    youtubeId: 'SnTL7KLTECI' // Ghost - Guiding Light (Official Audio)
  },
  {
    id: '12',
    songTitle: 'The Sound of Silence',
    artist: 'Simon and Garfunkel',
    resonance: 'Very high',
    reflection: 'The loneliness of awakening and being the observer and watcher in this world. Sending message to the world to start their awakening journey.',
    awakeningStage: 'Vision',
    createdAt: new Date().toISOString(),
    youtubeId: 'u9Dg-g7t2l4' // Simon and Garfunkel - The Sound of Silence (embed-friendly version)
  }
];

export const awakeningStages: AwakeningStage[] = [
  {
    id: 'death',
    name: 'Death',
    description: 'The death of ego, the realization of impermanence',
    color: '#dc2626',
    songs: initialSongs.filter(song => song.awakeningStage === 'Death')
  },
  {
    id: 'surrender',
    name: 'Surrender',
    description: 'Letting go, trusting the process, accepting what is',
    color: '#7c3aed',
    songs: initialSongs.filter(song => song.awakeningStage === 'Surrender')
  },
  {
    id: 'joy',
    name: 'Joy',
    description: 'Pure higher-self awakening, overflowing vibration',
    color: '#059669',
    songs: initialSongs.filter(song => song.awakeningStage === 'Joy')
  },
  {
    id: 'vision',
    name: 'Vision',
    description: 'Seeing the collective awakening, humanity together',
    color: '#0891b2',
    songs: initialSongs.filter(song => song.awakeningStage === 'Vision')
  }
];
