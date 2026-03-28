/**
 * One-off helper: prints resonance_songs INSERT VALUES for the Supabase migration.
 * Run: node scripts/generate-echoes-migration.mjs
 */
const songs = [
  ["Bohemian Rhapsody", "Queen", "Very high", "Listening to that voice beyond the noise. Loneliness, setbacks, and the full spectrum of transformation.", "fJ9rUzIMcZQ", "2025-08-21T12:00:00.000Z", "death"],
  ["Dust in the Wind", "Kansas", "Very high", "We are all just nothing — but that realization is liberating.", "tH2w6Oxx0kQ", "2025-08-21T12:00:00.000Z", "death"],
  ["Pompeii", "Bastille", "High", "Life is short; ego clouds our time span. Noticing before it's too late.", "8nfhHBJQXOY", "2025-08-21T12:00:00.000Z", "death"],
  ["Let It Be", "The Beatles", "High", "Surrender. Let everything unfold. Trust the rhythm of life.", "QDYfEBY9NM4", "2025-08-21T12:00:00.000Z", "surrender"],
  ["Don't Stop Me Now", "Queen", "Very high", "Pure essence flowing through. Overflowing vibration. Irresistible joy.", "HgzGwKwLmgM", "2025-08-21T12:00:00.000Z", "joy"],
  ["Imagine", "John Lennon", "High", "A vision of humanity united — not just me, but all of us.", "YkgkThdzX-8", "2025-08-21T12:00:00.000Z", "vision"],
  ["I Don't Want to Miss a Thing", "Aerosmith", "High", "High resonance and vibration — the pure love that brings presence to every moment.", "JkK8g6FMEXE", "2025-08-21T12:00:00.000Z", "joy"],
  ["Desiderata", "Les Crane (English Version)", "High", "Pure bliss with high resonance — the wisdom of accepting what is and finding peace in the cosmic order.", "-eDsJNsG58M", "2025-08-21T12:00:00.000Z", "surrender"],
  ["Remember", "Hans Zimmer", "Medium", "Emotionally moving — contemplating and remembering our essence through the depths of cinematic storytelling.", "RakhywpkY-k", "2025-08-21T12:00:00.000Z", "vision"],
  ["Creep", "Radiohead", "High", "Our ego wanting us to be noticed, but we purely dissolve it for pure love and understanding.", "XFkzRNyygfk", "2025-08-21T12:00:00.000Z", "death"],
  ["Guiding Light", "Ghost", "Low", "The ego talking and feeling empty as if walking in a path that leads to nowhere. Gives caution that when we embody the ego, life seems to have no meaning.", "rv7jSq1Qkhs", "2025-08-25T12:00:00.000Z", "vision"],
  ["The Sound of Silence", "Simon and Garfunkel", "Very high", "The loneliness of being the observer and watcher in this world. Sending message to the world to start their journey of awareness.", "NAEppFUWLfc", "2025-08-21T12:00:00.000Z", "vision"],
  ["Radioactive", "Imagine Dragons", "Very high", "Feelings of truly being present at the moment, the total dissolution of old patterns, and knowing we are still walking in the system but with a renewed hunger and vision.", "ktvTqknDobU", "2025-08-24T12:00:00.000Z", "vision"],
  ["Hall of Fame", "The Script", "Very high", "Breaking community stigma, transformation does not need permission, following your inner voice. No more chains, no more limitations.", "mk48xRzuNvA", "2025-08-24T12:00:00.000Z", "vision"],
  ["Counting Stars", "OneRepublic", "Very high", "Following inner truth, seeing the patterns and systems as clear as sky, fighting with the ego.", "hT_nvWreIhg", "2025-08-24T12:00:00.000Z", "death"],
  ["Can't Stop the Feeling!", "Justin Timberlake", "High", "When the vibration and frequency turns on like in deep work and resonance with high vibration things the feeling is pure joy and bliss. Freedom of expression and pure creativity in motion.", "ru0K8uYEZWw", "2024-08-24T12:00:00.000Z", "joy"],
  ["Best Day of My Life", "American Authors", "High", "Fully realizing transformation. Loving the feeling and enjoying every moment. Anagram on do not wake the ego up.", "Y66j_BUCBMY", "2025-08-24T12:00:00.000Z", "joy"],
  ["Wake Me Up", "Avicii", "Medium", "Started to realize, the society does not know anything. Starting to hear the words of the inner self. Still listening, seeds are starting to grow.", "IcrbM1l_BoI", "2025-08-24T12:00:00.000Z", "vision"],
  ["Titanium", "Sia", "High", "Full embrace of transformation. Society ego reflections does not chip in the inner truth. At a stage where it is fully aware of the truth inside.", "JRfuAukYTKg", "2025-08-24T12:00:00.000Z", "surrender"],
  ["Crazy", "Gnarls Barkley", "High", "The true perception in the eyes of transformation", "gFtjckFWRZM", "2025-10-26T12:00:00.000Z", "vision"],
  ["Mad World", "Tears for Fears / Gary Jules", "High", "Shadow integration and work, told through storytelling", "etSbOs3aUqI", "2025-10-26T12:00:00.000Z", "death"],
  ["Eternity", "Alex Warren", "Very high", "Fully meeting your transformation and remembering which feels like ancient wisdom", "jXqf3uqLkkU", "2025-10-26T12:00:00.000Z", "joy"],
  ["Bring Me to Life", "Evanescence", "Very high", "At the edge of transformation, only move is to acknowledge and not suppress", "3YxaaGgTQYM", "2025-10-26T12:00:00.000Z", "death"],
  ["The Sign", "Ace of Base", "Medium", "Seeing the signs everywhere", "iqu132vTl5Y", "2025-10-26T12:00:00.000Z", "vision"],
  ["Unstoppable", "Sia", "Very high", "Fully embracing the transformation, knowing you are invincible, whole and worthy", "YaEG2aWJnZ8", "2025-10-26T12:00:00.000Z", "joy"],
  ["I'm Still Here", "Sia", "High", "Shadow integration, ego and the I am", "Jrgbjk45lFA", "2025-10-26T12:00:00.000Z", "death"],
  ["The Greatest", "Sia", "Very high", "Fully embracing the transformation, knowing you are invincible, whole and worthy", "GKSRyLdjsPA", "2025-10-26T12:00:00.000Z", "joy"],
  ["Birds", "Imagine Dragons", "High", "Seeing through the matrix and still flying through your wings", "vOXZkm9p_zY", "2025-10-26T12:00:00.000Z", "vision"],
];

function dollar(rowIdx, field, s) {
  const t = `r${rowIdx}_${field}`;
  if (s.includes("$")) throw new Error("Unexpected $ in string");
  return `$${t}$${s}$${t}$`;
}

const lines = songs.map((row, i) => {
  const [songTitle, artist, resonance, reflection, youtubeId, createdAt, stageId] = row;
  return `  (${dollar(i, "t", songTitle)}, ${dollar(i, "a", artist)}, ${dollar(
    i,
    "v",
    resonance
  )}, ${dollar(i, "x", reflection)}, ${dollar(i, "y", youtubeId)}, ${dollar(
    i,
    "c",
    createdAt
  )}::timestamptz, ${dollar(i, "s", stageId)})`;
});
console.log(lines.join(",\n"));
