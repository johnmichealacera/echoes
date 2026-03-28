-- Allow anonymous updates on resonance_songs (same openness as insert).
-- Run in Supabase SQL Editor if you already applied the initial migration.

DROP POLICY IF EXISTS "Allow public update songs" ON resonance_songs;

CREATE POLICY "Allow public update songs" ON resonance_songs
  FOR UPDATE
  USING (true)
  WITH CHECK (true);
