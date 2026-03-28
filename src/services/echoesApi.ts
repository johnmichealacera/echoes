import { ResonanceNote, ResonanceStage } from '../types';
import { getSupabase } from '../lib/supabaseClient';

export type StageDefinition = Omit<ResonanceStage, 'songs'>;

const STAGE_NAME_TO_ID: Record<ResonanceNote['resonanceStage'], string> = {
  Death: 'death',
  Surrender: 'surrender',
  Joy: 'joy',
  Vision: 'vision',
};

const STAGE_ID_TO_NAME: Record<string, ResonanceNote['resonanceStage']> = {
  death: 'Death',
  surrender: 'Surrender',
  joy: 'Joy',
  vision: 'Vision',
};

type SongRow = {
  id: string;
  song_title: string;
  artist: string;
  resonance: string;
  reflection: string;
  youtube_id: string | null;
  created_at: string;
  stage_id: string;
};

function rowToNote(row: SongRow): ResonanceNote {
  const stageName = STAGE_ID_TO_NAME[row.stage_id];
  if (!stageName) {
    throw new Error(`Unknown stage_id: ${row.stage_id}`);
  }
  return {
    id: row.id,
    songTitle: row.song_title,
    artist: row.artist,
    resonance: row.resonance as ResonanceNote['resonance'],
    reflection: row.reflection,
    resonanceStage: stageName,
    createdAt: row.created_at,
    ...(row.youtube_id ? { youtubeId: row.youtube_id } : {}),
  };
}

function supabaseErrorMessage(err: { message: string; details?: string; hint?: string }): string {
  return [err.message, err.details, err.hint].filter(Boolean).join(' — ');
}

export async function loadStages(): Promise<StageDefinition[]> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('resonance_stages')
    .select('id, name, description, color')
    .order('sort_order', { ascending: true });

  if (error) throw new Error(supabaseErrorMessage(error));
  return (data ?? []) as StageDefinition[];
}

export async function loadSongs(): Promise<ResonanceNote[]> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('resonance_songs')
    .select(
      'id, song_title, artist, resonance, reflection, youtube_id, created_at, stage_id'
    )
    .order('created_at', { ascending: false });

  if (error) throw new Error(supabaseErrorMessage(error));
  return (data as SongRow[] | null)?.map(rowToNote) ?? [];
}

export async function createSong(
  payload: Omit<ResonanceNote, 'id' | 'createdAt'>
): Promise<ResonanceNote> {
  const supabase = getSupabase();
  const stageId = STAGE_NAME_TO_ID[payload.resonanceStage];

  const { data, error } = await supabase
    .from('resonance_songs')
    .insert({
      song_title: payload.songTitle,
      artist: payload.artist,
      resonance: payload.resonance,
      reflection: payload.reflection,
      stage_id: stageId,
      youtube_id: payload.youtubeId ?? null,
    })
    .select('id, song_title, artist, resonance, reflection, youtube_id, created_at, stage_id')
    .maybeSingle();

  if (error) throw new Error(supabaseErrorMessage(error));
  if (!data) {
    throw new Error(
      'No row returned after insert. Check INSERT policy on resonance_songs in Supabase (RLS).'
    );
  }
  return rowToNote(data as SongRow);
}

export async function updateSong(
  id: string,
  payload: Omit<ResonanceNote, 'id' | 'createdAt'>
): Promise<ResonanceNote> {
  const supabase = getSupabase();
  const stageId = STAGE_NAME_TO_ID[payload.resonanceStage];

  const { data, error } = await supabase
    .from('resonance_songs')
    .update({
      song_title: payload.songTitle,
      artist: payload.artist,
      resonance: payload.resonance,
      reflection: payload.reflection,
      stage_id: stageId,
      youtube_id: payload.youtubeId ?? null,
    })
    .eq('id', id)
    .select('id, song_title, artist, resonance, reflection, youtube_id, created_at, stage_id')
    .maybeSingle();

  if (error) throw new Error(supabaseErrorMessage(error));
  if (!data) {
    throw new Error(
      'Could not update this song: no row was updated. If you use Row Level Security, run the SQL in ' +
        'supabase/migrations/20250328150000_echoes_update_policy.sql in the Supabase SQL Editor ' +
        '(adds an UPDATE policy on resonance_songs).'
    );
  }
  return rowToNote(data as SongRow);
}
