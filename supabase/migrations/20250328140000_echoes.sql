-- Echoes: resonance stages + songs (run once in Supabase SQL Editor or via CLI).
-- Re-seeding songs: DELETE FROM resonance_songs; then re-run the INSERT block below.

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS resonance_stages (
  id text PRIMARY KEY,
  name text NOT NULL,
  description text NOT NULL,
  color text NOT NULL,
  sort_order int NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS resonance_songs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  song_title text NOT NULL,
  artist text NOT NULL,
  resonance text NOT NULL,
  reflection text NOT NULL,
  youtube_id text,
  created_at timestamptz NOT NULL DEFAULT now(),
  stage_id text NOT NULL REFERENCES resonance_stages (id) ON DELETE RESTRICT
);

CREATE INDEX IF NOT EXISTS resonance_songs_stage_id_idx ON resonance_songs (stage_id);
CREATE INDEX IF NOT EXISTS resonance_songs_created_at_idx ON resonance_songs (created_at DESC);

ALTER TABLE resonance_stages ENABLE ROW LEVEL SECURITY;
ALTER TABLE resonance_songs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read stages" ON resonance_stages;
DROP POLICY IF EXISTS "Allow public read songs" ON resonance_songs;
DROP POLICY IF EXISTS "Allow public insert songs" ON resonance_songs;
DROP POLICY IF EXISTS "Allow public update songs" ON resonance_songs;

CREATE POLICY "Allow public read stages" ON resonance_stages FOR SELECT USING (true);
CREATE POLICY "Allow public read songs" ON resonance_songs FOR SELECT USING (true);
CREATE POLICY "Allow public insert songs" ON resonance_songs FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update songs" ON resonance_songs
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

INSERT INTO resonance_stages (id, name, description, color, sort_order)
VALUES
  ('death', 'Death', 'The dissolution of old patterns, the realization of impermanence', '#dc2626', 0),
  ('surrender', 'Surrender', 'Letting go, trusting the process, accepting what is', '#7c3aed', 1),
  ('joy', 'Joy', 'Pure essence flowing, overflowing vibration', '#059669', 2),
  ('vision', 'Vision', 'Seeing the collective potential, humanity together', '#0891b2', 3)
ON CONFLICT (id) DO NOTHING;

INSERT INTO resonance_songs (song_title, artist, resonance, reflection, youtube_id, created_at, stage_id)
VALUES
  ($r0_t$Bohemian Rhapsody$r0_t$, $r0_a$Queen$r0_a$, $r0_v$Very high$r0_v$, $r0_x$Listening to that voice beyond the noise. Loneliness, setbacks, and the full spectrum of transformation.$r0_x$, $r0_y$fJ9rUzIMcZQ$r0_y$, $r0_c$2025-08-21T12:00:00.000Z$r0_c$::timestamptz, $r0_s$death$r0_s$),
  ($r1_t$Dust in the Wind$r1_t$, $r1_a$Kansas$r1_a$, $r1_v$Very high$r1_v$, $r1_x$We are all just nothing — but that realization is liberating.$r1_x$, $r1_y$tH2w6Oxx0kQ$r1_y$, $r1_c$2025-08-21T12:00:00.000Z$r1_c$::timestamptz, $r1_s$death$r1_s$),
  ($r2_t$Pompeii$r2_t$, $r2_a$Bastille$r2_a$, $r2_v$High$r2_v$, $r2_x$Life is short; ego clouds our time span. Noticing before it's too late.$r2_x$, $r2_y$8nfhHBJQXOY$r2_y$, $r2_c$2025-08-21T12:00:00.000Z$r2_c$::timestamptz, $r2_s$death$r2_s$),
  ($r3_t$Let It Be$r3_t$, $r3_a$The Beatles$r3_a$, $r3_v$High$r3_v$, $r3_x$Surrender. Let everything unfold. Trust the rhythm of life.$r3_x$, $r3_y$QDYfEBY9NM4$r3_y$, $r3_c$2025-08-21T12:00:00.000Z$r3_c$::timestamptz, $r3_s$surrender$r3_s$),
  ($r4_t$Don't Stop Me Now$r4_t$, $r4_a$Queen$r4_a$, $r4_v$Very high$r4_v$, $r4_x$Pure essence flowing through. Overflowing vibration. Irresistible joy.$r4_x$, $r4_y$HgzGwKwLmgM$r4_y$, $r4_c$2025-08-21T12:00:00.000Z$r4_c$::timestamptz, $r4_s$joy$r4_s$),
  ($r5_t$Imagine$r5_t$, $r5_a$John Lennon$r5_a$, $r5_v$High$r5_v$, $r5_x$A vision of humanity united — not just me, but all of us.$r5_x$, $r5_y$YkgkThdzX-8$r5_y$, $r5_c$2025-08-21T12:00:00.000Z$r5_c$::timestamptz, $r5_s$vision$r5_s$),
  ($r6_t$I Don't Want to Miss a Thing$r6_t$, $r6_a$Aerosmith$r6_a$, $r6_v$High$r6_v$, $r6_x$High resonance and vibration — the pure love that brings presence to every moment.$r6_x$, $r6_y$JkK8g6FMEXE$r6_y$, $r6_c$2025-08-21T12:00:00.000Z$r6_c$::timestamptz, $r6_s$joy$r6_s$),
  ($r7_t$Desiderata$r7_t$, $r7_a$Les Crane (English Version)$r7_a$, $r7_v$High$r7_v$, $r7_x$Pure bliss with high resonance — the wisdom of accepting what is and finding peace in the cosmic order.$r7_x$, $r7_y$-eDsJNsG58M$r7_y$, $r7_c$2025-08-21T12:00:00.000Z$r7_c$::timestamptz, $r7_s$surrender$r7_s$),
  ($r8_t$Remember$r8_t$, $r8_a$Hans Zimmer$r8_a$, $r8_v$Medium$r8_v$, $r8_x$Emotionally moving — contemplating and remembering our essence through the depths of cinematic storytelling.$r8_x$, $r8_y$RakhywpkY-k$r8_y$, $r8_c$2025-08-21T12:00:00.000Z$r8_c$::timestamptz, $r8_s$vision$r8_s$),
  ($r9_t$Creep$r9_t$, $r9_a$Radiohead$r9_a$, $r9_v$High$r9_v$, $r9_x$Our ego wanting us to be noticed, but we purely dissolve it for pure love and understanding.$r9_x$, $r9_y$XFkzRNyygfk$r9_y$, $r9_c$2025-08-21T12:00:00.000Z$r9_c$::timestamptz, $r9_s$death$r9_s$),
  ($r10_t$Guiding Light$r10_t$, $r10_a$Ghost$r10_a$, $r10_v$Low$r10_v$, $r10_x$The ego talking and feeling empty as if walking in a path that leads to nowhere. Gives caution that when we embody the ego, life seems to have no meaning.$r10_x$, $r10_y$rv7jSq1Qkhs$r10_y$, $r10_c$2025-08-25T12:00:00.000Z$r10_c$::timestamptz, $r10_s$vision$r10_s$),
  ($r11_t$The Sound of Silence$r11_t$, $r11_a$Simon and Garfunkel$r11_a$, $r11_v$Very high$r11_v$, $r11_x$The loneliness of being the observer and watcher in this world. Sending message to the world to start their journey of awareness.$r11_x$, $r11_y$NAEppFUWLfc$r11_y$, $r11_c$2025-08-21T12:00:00.000Z$r11_c$::timestamptz, $r11_s$vision$r11_s$),
  ($r12_t$Radioactive$r12_t$, $r12_a$Imagine Dragons$r12_a$, $r12_v$Very high$r12_v$, $r12_x$Feelings of truly being present at the moment, the total dissolution of old patterns, and knowing we are still walking in the system but with a renewed hunger and vision.$r12_x$, $r12_y$ktvTqknDobU$r12_y$, $r12_c$2025-08-24T12:00:00.000Z$r12_c$::timestamptz, $r12_s$vision$r12_s$),
  ($r13_t$Hall of Fame$r13_t$, $r13_a$The Script$r13_a$, $r13_v$Very high$r13_v$, $r13_x$Breaking community stigma, transformation does not need permission, following your inner voice. No more chains, no more limitations.$r13_x$, $r13_y$mk48xRzuNvA$r13_y$, $r13_c$2025-08-24T12:00:00.000Z$r13_c$::timestamptz, $r13_s$vision$r13_s$),
  ($r14_t$Counting Stars$r14_t$, $r14_a$OneRepublic$r14_a$, $r14_v$Very high$r14_v$, $r14_x$Following inner truth, seeing the patterns and systems as clear as sky, fighting with the ego.$r14_x$, $r14_y$hT_nvWreIhg$r14_y$, $r14_c$2025-08-24T12:00:00.000Z$r14_c$::timestamptz, $r14_s$death$r14_s$),
  ($r15_t$Can't Stop the Feeling!$r15_t$, $r15_a$Justin Timberlake$r15_a$, $r15_v$High$r15_v$, $r15_x$When the vibration and frequency turns on like in deep work and resonance with high vibration things the feeling is pure joy and bliss. Freedom of expression and pure creativity in motion.$r15_x$, $r15_y$ru0K8uYEZWw$r15_y$, $r15_c$2024-08-24T12:00:00.000Z$r15_c$::timestamptz, $r15_s$joy$r15_s$),
  ($r16_t$Best Day of My Life$r16_t$, $r16_a$American Authors$r16_a$, $r16_v$High$r16_v$, $r16_x$Fully realizing transformation. Loving the feeling and enjoying every moment. Anagram on do not wake the ego up.$r16_x$, $r16_y$Y66j_BUCBMY$r16_y$, $r16_c$2025-08-24T12:00:00.000Z$r16_c$::timestamptz, $r16_s$joy$r16_s$),
  ($r17_t$Wake Me Up$r17_t$, $r17_a$Avicii$r17_a$, $r17_v$Medium$r17_v$, $r17_x$Started to realize, the society does not know anything. Starting to hear the words of the inner self. Still listening, seeds are starting to grow.$r17_x$, $r17_y$IcrbM1l_BoI$r17_y$, $r17_c$2025-08-24T12:00:00.000Z$r17_c$::timestamptz, $r17_s$vision$r17_s$),
  ($r18_t$Titanium$r18_t$, $r18_a$Sia$r18_a$, $r18_v$High$r18_v$, $r18_x$Full embrace of transformation. Society ego reflections does not chip in the inner truth. At a stage where it is fully aware of the truth inside.$r18_x$, $r18_y$JRfuAukYTKg$r18_y$, $r18_c$2025-08-24T12:00:00.000Z$r18_c$::timestamptz, $r18_s$surrender$r18_s$),
  ($r19_t$Crazy$r19_t$, $r19_a$Gnarls Barkley$r19_a$, $r19_v$High$r19_v$, $r19_x$The true perception in the eyes of transformation$r19_x$, $r19_y$gFtjckFWRZM$r19_y$, $r19_c$2025-10-26T12:00:00.000Z$r19_c$::timestamptz, $r19_s$vision$r19_s$),
  ($r20_t$Mad World$r20_t$, $r20_a$Tears for Fears / Gary Jules$r20_a$, $r20_v$High$r20_v$, $r20_x$Shadow integration and work, told through storytelling$r20_x$, $r20_y$etSbOs3aUqI$r20_y$, $r20_c$2025-10-26T12:00:00.000Z$r20_c$::timestamptz, $r20_s$death$r20_s$),
  ($r21_t$Eternity$r21_t$, $r21_a$Alex Warren$r21_a$, $r21_v$Very high$r21_v$, $r21_x$Fully meeting your transformation and remembering which feels like ancient wisdom$r21_x$, $r21_y$jXqf3uqLkkU$r21_y$, $r21_c$2025-10-26T12:00:00.000Z$r21_c$::timestamptz, $r21_s$joy$r21_s$),
  ($r22_t$Bring Me to Life$r22_t$, $r22_a$Evanescence$r22_a$, $r22_v$Very high$r22_v$, $r22_x$At the edge of transformation, only move is to acknowledge and not suppress$r22_x$, $r22_y$3YxaaGgTQYM$r22_y$, $r22_c$2025-10-26T12:00:00.000Z$r22_c$::timestamptz, $r22_s$death$r22_s$),
  ($r23_t$The Sign$r23_t$, $r23_a$Ace of Base$r23_a$, $r23_v$Medium$r23_v$, $r23_x$Seeing the signs everywhere$r23_x$, $r23_y$iqu132vTl5Y$r23_y$, $r23_c$2025-10-26T12:00:00.000Z$r23_c$::timestamptz, $r23_s$vision$r23_s$),
  ($r24_t$Unstoppable$r24_t$, $r24_a$Sia$r24_a$, $r24_v$Very high$r24_v$, $r24_x$Fully embracing the transformation, knowing you are invincible, whole and worthy$r24_x$, $r24_y$YaEG2aWJnZ8$r24_y$, $r24_c$2025-10-26T12:00:00.000Z$r24_c$::timestamptz, $r24_s$joy$r24_s$),
  ($r25_t$I'm Still Here$r25_t$, $r25_a$Sia$r25_a$, $r25_v$High$r25_v$, $r25_x$Shadow integration, ego and the I am$r25_x$, $r25_y$Jrgbjk45lFA$r25_y$, $r25_c$2025-10-26T12:00:00.000Z$r25_c$::timestamptz, $r25_s$death$r25_s$),
  ($r26_t$The Greatest$r26_t$, $r26_a$Sia$r26_a$, $r26_v$Very high$r26_v$, $r26_x$Fully embracing the transformation, knowing you are invincible, whole and worthy$r26_x$, $r26_y$GKSRyLdjsPA$r26_y$, $r26_c$2025-10-26T12:00:00.000Z$r26_c$::timestamptz, $r26_s$joy$r26_s$),
  ($r27_t$Birds$r27_t$, $r27_a$Imagine Dragons$r27_a$, $r27_v$High$r27_v$, $r27_x$Seeing through the matrix and still flying through your wings$r27_x$, $r27_y$vOXZkm9p_zY$r27_y$, $r27_c$2025-10-26T12:00:00.000Z$r27_c$::timestamptz, $r27_s$vision$r27_s$);
