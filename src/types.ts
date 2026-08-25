export type TabType = 'story' | 'mscc' | 'ccx' | 'music' | 'tts-studio';

export interface TTSVoice {
  id: string;
  name: string;
  gender: 'male' | 'female' | 'neutral';
  tone: string;
  description: string;
}

export interface TradeJournalEntry {
  id: string;
  pair: string;
  type: 'BUY' | 'SELL';
  entryPrice: number;
  exitPrice: number;
  pnl: number;
  percentage: number;
  msccRule: string;
  status: 'WIN' | 'LOSS' | 'OPEN';
  date: string;
  notes: string;
  timeframe: string;
}

export interface MusicTrack {
  id: string;
  title: string;
  genre: string;
  bpm: number;
  key: string;
  duration: string;
  lyrics: string;
  story: string;
  tags: string[];
}

export interface MSCCRule {
  id: string;
  name: string;
  acronym: string;
  description: string;
  keyPrinciples: string[];
  winRate: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Mastery';
  icon: string;
}

export interface CandleData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  isMirrorPoint?: boolean;
  signal?: 'BUY' | 'SELL' | null;
}
