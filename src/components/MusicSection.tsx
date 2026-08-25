import React, { useState } from 'react';
import { Music, Volume2, Mic, Play, Pause, Sparkles, Disc, Radio, Heart, Edit3, Share2 } from 'lucide-react';
import { MusicTrack } from '../types';
import confetti from 'canvas-confetti';

interface MusicSectionProps {
  onPlayTTS: (text: string, title: string, voiceName?: string) => Promise<void>;
  isPlaying: boolean;
  activePlayingTitle: string | null;
}

export const MusicSection: React.FC<MusicSectionProps> = ({
  onPlayTTS,
  isPlaying,
  activePlayingTitle,
}) => {
  const tracks: MusicTrack[] = [
    {
      id: 'm1',
      title: '17 Ka Junoon (The Ambition)',
      genre: 'Motivational Desi Hip-Hop',
      bpm: 135,
      key: 'A Minor',
      duration: '3:15',
      lyrics: `Umar hai satrah, par sapne aasmaan se unche hain.
Log kehte hain ruk ja, par hum to rahon mein dooje hain.
Chart ke pardo par roshni humne dekhi hai,
MSCC ki mirror mein apni lakeer khud kheechi hai.
Seekhenge, girenge, dobara khade honge,
Jab tak manzil na mile, hum ladte rahenge!`,
      story: 'Sattu\'s flagship anthem celebrating youthful fearlessness, discipline, and the refusal to live an ordinary life.',
      tags: ['Motivational', 'High Energy', 'Dreamer', 'Discipline'],
    },
    {
      id: 'm2',
      title: 'Dastaan-e-Trader (Midnight Candles)',
      genre: 'Lofi Soul & Melodic Poetry',
      bpm: 90,
      key: 'F# Minor',
      duration: '2:48',
      lyrics: `Raat ke do baje, screen ki neeli roshni,
Ek stop loss ke baad bhi himmat nahi khoi thi.
Market ki symmetry mein chupaa hai ek raaz,
Smart money ke kadmo par humari hai parwaaz.
Har trade ek sabaq hai, har candle ek kahani,
Sattu Singer ki awaaz mein likhi yeh zindagani.`,
      story: 'An introspective late-night tribute to every trader who sits alone studying charts and market psychology.',
      tags: ['Chill', 'Introspective', 'Trading Life', 'Crypto'],
    },
    {
      id: 'm3',
      title: 'Mirror Reflections (MSCC Symphony)',
      genre: 'Cyberpunk Synthwave & Hindi Rap',
      bpm: 120,
      key: 'C Minor',
      duration: '3:05',
      lyrics: `Aaine mein dekha to ek creator nazar aaya,
Khali baaton se nahi, execution se naam banaya.
CCX ka vision, code crackr ka junoon,
Har galti ko seekh banake milta hai sukoon.
Main apni kahani khud likh raha hoon!`,
      story: 'Energetic fusion track linking the MSCC trading concept with artistic creation and personal transformation.',
      tags: ['Synthwave', 'Tech', 'MSCC', 'Empowerment'],
    },
  ];

  const [selectedTrack, setSelectedTrack] = useState<MusicTrack>(tracks[0]);
  const [customLyrics, setCustomLyrics] = useState<string>(tracks[0].lyrics);

  const handleSelectTrack = (track: MusicTrack) => {
    setSelectedTrack(track);
    setCustomLyrics(track.lyrics);
  };

  const handleVocalizeLyrics = () => {
    confetti({ particleCount: 40, spread: 50 });
    onPlayTTS(
      customLyrics,
      `Sattu Singer - ${selectedTrack.title}`,
      'Kore' // Expressive, musical tone
    );
  };

  return (
    <div className="space-y-10">
      
      {/* Banner */}
      <div className="relative p-8 sm:p-12 rounded-3xl bg-[#151515] border border-white/10 overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse"></span>
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-orange-500 font-bold">
                SATTU SINGER CREATIVE IDENTITY
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black uppercase italic tracking-tighter text-white">
              Sattu Singer: <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-300">Music &amp; Artistry Lab</span>
            </h1>

            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              &ldquo;Sattu Singer mere liye sirf ek naam nahi, balki meri creative identity hai.&rdquo; 
              Yahan concepts, jazbaat aur shabdon ko suron aur beats mein piroya jata hai.
            </p>
          </div>

          <button
            onClick={() => onPlayTTS(
              "Music meri soul hai. Sattu Singer identity ke through main apne sapno, sangharsh aur jazbaat ko awaaz deta hoon.",
              "Sattu Singer Musical Statement",
              "Kore"
            )}
            className="px-6 py-3 rounded-full bg-white text-black font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl hover:bg-orange-400 transition-colors"
          >
            <Volume2 className="w-4 h-4" />
            <span>Hear Music Philosophy</span>
          </button>
        </div>
      </div>

      {/* Track Selector & Studio View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Track List */}
        <div className="space-y-4">
          <h2 className="text-xl font-black italic uppercase text-white tracking-tight flex items-center gap-2">
            <Radio className="w-5 h-5 text-orange-400" />
            Discography Concepts
          </h2>

          <div className="space-y-3">
            {tracks.map((t) => {
              const isSelected = selectedTrack.id === t.id;
              return (
                <div
                  key={t.id}
                  onClick={() => handleSelectTrack(t)}
                  className={`p-6 rounded-3xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-white text-black border-white shadow-xl'
                      : 'bg-[#151515] border-white/10 text-white hover:border-white/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-mono font-black uppercase tracking-wider ${isSelected ? 'text-orange-600' : 'text-orange-400'}`}>
                      {t.genre}
                    </span>
                    <span className={`text-[10px] font-mono ${isSelected ? 'text-gray-600' : 'text-gray-400'}`}>{t.duration}</span>
                  </div>

                  <h3 className="text-base font-black italic uppercase tracking-tight mt-2">{t.title}</h3>
                  <p className={`text-xs mt-1 leading-relaxed line-clamp-2 ${isSelected ? 'text-gray-700' : 'text-gray-400'}`}>{t.story}</p>

                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {t.tags.map((tag, i) => (
                      <span key={i} className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded-full font-bold ${isSelected ? 'bg-black/10 text-black' : 'bg-white/5 text-gray-400'}`}>
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Lyrics & Vocalizer Studio */}
        <div className="lg:col-span-2 p-8 sm:p-10 rounded-3xl bg-[#151515] border border-white/10 shadow-xl space-y-6 flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <span className="text-[10px] font-mono text-orange-400 uppercase tracking-widest font-bold">
                  NOW LOADED IN STUDIO
                </span>
                <h3 className="text-2xl font-black italic uppercase text-white tracking-tight">{selectedTrack.title}</h3>
                <p className="text-xs font-mono text-gray-400 mt-0.5">{selectedTrack.genre} • {selectedTrack.bpm} BPM • Key: {selectedTrack.key}</p>
              </div>

              <button
                onClick={handleVocalizeLyrics}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 to-yellow-400 text-black text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:scale-105 transition-all"
              >
                <Volume2 className="w-4 h-4" />
                <span>Vocalize with Gemini TTS</span>
              </button>
            </div>

            {/* Lyrics Editor / Viewer */}
            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono uppercase text-gray-400 font-bold flex items-center gap-2">
                  <Edit3 className="w-4 h-4 text-orange-400" />
                  Original Hindi / Hinglish Lyrics (Editable):
                </label>
                <button
                  onClick={() => setCustomLyrics(selectedTrack.lyrics)}
                  className="text-[10px] font-mono uppercase text-gray-400 hover:text-orange-400 transition-colors font-bold"
                >
                  Reset Lyrics
                </button>
              </div>

              <textarea
                value={customLyrics}
                onChange={(e) => setCustomLyrics(e.target.value)}
                rows={8}
                className="w-full bg-[#0A0A0A] border border-white/10 rounded-2xl p-5 text-xs sm:text-sm text-white font-mono leading-relaxed focus:border-orange-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Sattu Singer Creative Vibe Footer */}
          <div className="p-5 rounded-2xl bg-[#0A0A0A] border border-white/10 flex items-center justify-between text-xs text-gray-300">
            <div className="flex items-center gap-3">
              <Heart className="w-4 h-4 text-orange-400 fill-orange-400" />
              <span>Identity crafted with authentic emotion, raw ambition, and relentless creativity.</span>
            </div>
            <span className="font-mono text-orange-400 font-black tracking-widest hidden sm:inline">SATTU SINGER</span>
          </div>
        </div>

      </div>

    </div>
  );
};
