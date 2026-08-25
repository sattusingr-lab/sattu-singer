import React, { useState } from 'react';
import { Mic, Volume2, Play, Pause, Download, RefreshCw, Sparkles, Sliders, CheckCircle2, Music, Radio, Flame, FileText } from 'lucide-react';
import { GEMINI_VOICES } from '../utils/audio';
import confetti from 'canvas-confetti';

interface TTSStudioSectionProps {
  onGenerateTTS: (text: string, title: string, voiceName: string, promptPrefix?: string) => Promise<string | undefined>;
  currentAudioUrl: string | null;
  isPlaying: boolean;
  onTogglePlay: () => void;
  activePlayingTitle: string | null;
}

export const TTSStudioSection: React.FC<TTSStudioSectionProps> = ({
  onGenerateTTS,
  currentAudioUrl,
  isPlaying,
  onTogglePlay,
  activePlayingTitle,
}) => {
  const [selectedVoice, setSelectedVoice] = useState<string>('Puck');
  const [selectedPreset, setSelectedPreset] = useState<string>('manifesto');
  const [customText, setCustomText] = useState<string>(
    `Hii, Mera naam Sattu hai, aur meri identity hai — Sattu Singer. Main abhi sirf 17 saal ka hoon, lekin mere dreams meri age se kaafi bade hain. Main khud ko sirf ek trader, singer ya businessman nahi maanta. Main ek creator hoon. Main apni kahani khud likhna chahta hoon.`
  );
  const [tonePrefix, setTonePrefix] = useState<string>('Say with passionate energy and confidence');
  const [loading, setLoading] = useState<boolean>(false);
  const [audioHistory, setAudioHistory] = useState<Array<{ title: string; voice: string; url: string; date: string }>>([]);

  const presets = [
    {
      id: 'manifesto',
      title: "Sattu's Journey & Creator Manifesto",
      desc: "Full 17-year-old creator vision & oath",
      text: `Hii, Mera naam Sattu hai, aur meri identity hai — Sattu Singer. Main abhi sirf 17 saal ka hoon, lekin mere dreams meri age se kaafi bade hain. Main khud ko sirf ek trader, singer ya businessman nahi maanta. Main ek creator hoon. Mujhe naye ideas sochna, naye concepts banana aur unhe reality mein convert karna pasand hai. Trading meri journey ka ek important part hai. Main Crypto aur Forex trading ko deeply samajhne ki koshish karta hoon. Isi journey mein maine apna khud ka concept develop kiya — MSCC, Mirror Smart Code Crackr. Lekin meri soch sirf trading tak limited nahi hai. Mujhe technology aur AI mein bhi interest hai. Main apne ideas ko apps aur digital platforms mein convert karna chahta hoon. Isi vision ka ek example hai CCX — Chart Cracker X. Success ke liye direction, discipline, consistency aur execution chahiye. Main seekhunga. Main galtiyan karunga. Main un galtiyon se seekhunga. Main dobara try karunga. Aur jab tak apne goals ke kareeb nahi pahunchta, tab tak rukunga nahi. Main apni kahani khud likhna chahta hoon.`,
      recommendedVoice: 'Puck',
      recommendedTone: 'Say with passionate energy and confidence',
    },
    {
      id: 'mscc',
      title: "MSCC: Mirror Smart Code Crackr Framework",
      desc: "Crypto & Forex symmetry and liquidity mechanics",
      text: `MSCC stands for Mirror Smart Code Crackr. A proprietary concept developed by Sattu for Crypto and Forex markets. It unifies Mirror Symmetry, Smart Liquidity Sniping, Code Fractals, and Crackr Execution Matrix. We do not chase price — we let institutional liquidity sweeps resolve into mirror reaction zones, then execute with mathematical precision.`,
      recommendedVoice: 'Charon',
      recommendedTone: 'Say with calm, disciplined trading confidence',
    },
    {
      id: 'ccx',
      title: "CCX: Chart Cracker X Platform Vision",
      desc: "All-in-one charts, journal, analytics & AI",
      text: `CCX is the future of trading intelligence. Unifying interactive charting, automated trade journaling, performance analytics, MSCC concept engines, and artificial intelligence into a single high-performance terminal. Built for modern disciplined traders who demand statistical clarity.`,
      recommendedVoice: 'Zephyr',
      recommendedTone: 'Say with visionary clarity and modern excitement',
    },
    {
      id: 'lyrics',
      title: "Sattu Singer - 17 Ka Junoon (Lyrics)",
      desc: "Soulful poetry & raw motivation",
      text: `Umar hai satrah, par sapne aasmaan se unche hain. Log kehte hain ruk ja, par hum to rahon mein dooje hain. Chart ke pardo par roshni humne dekhi hai, MSCC ki mirror mein apni lakeer khud kheechi hai. Seekhenge, girenge, dobara khade honge, Jab tak manzil na mile, hum ladte rahenge! Sattu Singer!`,
      recommendedVoice: 'Kore',
      recommendedTone: 'Say rhythmically with soulful passion',
    },
    {
      id: 'oath',
      title: "The 5 Execution Laws of Sattu",
      desc: "Discipline, Mistakes, Learn, Retry, Never Stop",
      text: `Law One: Main seekhunga. Law Two: Main galtiyan karunga. Law Three: Main un galtiyon se seekhunga. Law Four: Main dobara try karunga. And Law Five: Jab tak apne goals ke kareeb nahi pahunchta, tab tak rukunga nahi!`,
      recommendedVoice: 'Fenrir',
      recommendedTone: 'Say with bold intensity and unshakeable conviction',
    },
  ];

  const handleSelectPreset = (p: typeof presets[0]) => {
    setSelectedPreset(p.id);
    setCustomText(p.text);
    setSelectedVoice(p.recommendedVoice);
    setTonePrefix(p.recommendedTone);
  };

  const handleGenerate = async () => {
    if (!customText.trim() || loading) return;
    setLoading(true);
    try {
      const activeP = presets.find((p) => p.id === selectedPreset);
      const title = activeP ? activeP.title : 'Custom Sattu Speech';
      const url = await onGenerateTTS(customText, title, selectedVoice, tonePrefix);
      if (url) {
        setAudioHistory((prev) => [
          {
            title,
            voice: selectedVoice,
            url,
            date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
          ...prev.slice(0, 4),
        ]);
        confetti({ particleCount: 50, spread: 60 });
      }
    } finally {
      setLoading(false);
    }
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
                GEMINI-3.1-FLASH-TTS-PREVIEW ENGINE
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black uppercase italic tracking-tighter text-white">
              Sattu <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-300">TTS Audio Studio</span>
            </h1>

            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Gemini 3.1 Flash Text-to-Speech model ka use karke Sattu ke manifesto, MSCC concepts, 
              CCX whitepaper aur custom shabdon ko realistic aur expressive audio mein convert karein.
            </p>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#0A0A0A] border border-white/10 text-xs text-gray-300 font-mono">
            <Sparkles className="w-5 h-5 text-orange-400" />
            <span className="font-bold text-white uppercase tracking-wider">24kHz Studio Quality WAV</span>
          </div>
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Presets & Voice Selectors */}
        <div className="space-y-6">
          
          {/* Preset Scripts */}
          <div className="p-7 rounded-3xl bg-[#151515] border border-white/10 space-y-4">
            <h2 className="text-base font-black italic uppercase text-white tracking-tight flex items-center gap-2">
              <FileText className="w-4 h-4 text-orange-400" />
              Sattu Audio Presets
            </h2>

            <div className="space-y-2">
              {presets.map((p) => {
                const isSelected = selectedPreset === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => handleSelectPreset(p)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all text-xs ${
                      isSelected
                        ? 'bg-white text-black border-white shadow-lg'
                        : 'bg-[#0A0A0A] border-white/10 text-gray-300 hover:border-white/30'
                    }`}
                  >
                    <div className="font-black italic uppercase flex items-center justify-between">
                      <span className="tracking-tight">{p.title}</span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-orange-600" />}
                    </div>
                    <p className={`text-[11px] mt-1 line-clamp-1 font-mono ${isSelected ? 'text-gray-600' : 'text-gray-400'}`}>{p.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Voice Models */}
          <div className="p-7 rounded-3xl bg-[#151515] border border-white/10 space-y-4">
            <h2 className="text-base font-black italic uppercase text-white tracking-tight flex items-center gap-2">
              <Sliders className="w-4 h-4 text-orange-400" />
              Select Gemini Voice Actor
            </h2>

            <div className="space-y-2">
              {GEMINI_VOICES.map((v) => {
                const isSelected = selectedVoice === v.id;
                return (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVoice(v.id)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all text-xs ${
                      isSelected
                        ? 'bg-orange-500 text-black border-orange-500 font-bold shadow-lg shadow-orange-500/20'
                        : 'bg-[#0A0A0A] border-white/10 text-gray-300 hover:border-white/30'
                    }`}
                  >
                    <div className="flex items-center justify-between font-black uppercase italic">
                      <span className="flex items-center gap-2">
                        <Volume2 className="w-4 h-4" />
                        {v.name} ({v.gender})
                      </span>
                      <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full font-bold uppercase ${isSelected ? 'bg-black text-white' : 'bg-white/10 text-orange-400'}`}>
                        {v.tone}
                      </span>
                    </div>
                    <p className={`text-[11px] mt-1 font-mono ${isSelected ? 'text-gray-900' : 'text-gray-400'}`}>{v.description}</p>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Center/Right: Studio Text Canvas & Controls */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-8 sm:p-10 rounded-3xl bg-[#151515] border border-white/10 shadow-xl space-y-6">
            
            {/* Tone / Emotion instruction */}
            <div>
              <label className="text-xs font-mono uppercase text-gray-400 font-bold block mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-orange-400" />
                Vocal Emotion &amp; Prompt Tone Modifier:
              </label>
              <input
                type="text"
                value={tonePrefix}
                onChange={(e) => setTonePrefix(e.target.value)}
                placeholder="e.g. Say passionately with high energy"
                className="w-full bg-[#0A0A0A] border border-white/10 rounded-full px-5 py-3 text-xs sm:text-sm text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none font-mono"
              />
            </div>

            {/* Main Text to Speech Script */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-mono uppercase text-gray-400 font-bold">
                  Script to Convert to Speech:
                </label>
                <span className="text-[11px] text-gray-500 font-mono">
                  {customText.length} CHARACTERS
                </span>
              </div>
              <textarea
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                rows={9}
                className="w-full bg-[#0A0A0A] border border-white/10 rounded-2xl p-5 text-xs sm:text-sm text-gray-100 font-mono leading-relaxed focus:border-orange-500 focus:outline-none"
                placeholder="Type or paste Hindi, Hinglish, or English text to vocalize with Gemini 3.1 Flash TTS..."
              />
            </div>

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <div className="text-xs text-gray-400 font-mono uppercase">
                MODEL: <span className="text-orange-400 font-mono font-black">GEMINI-3.1-FLASH-TTS-PREVIEW</span>
              </div>

              <button
                id="btn-generate-tts"
                onClick={handleGenerate}
                disabled={loading || !customText.trim()}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-300 text-black font-black uppercase tracking-wider text-xs flex items-center justify-center gap-2 shadow-xl disabled:opacity-50 transition-all hover:scale-105"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Synthesizing Voice...</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4" />
                    <span>Generate Speech Audio</span>
                  </>
                )}
              </button>
            </div>

            {/* Active Audio Player Section */}
            {currentAudioUrl && (
              <div className="p-6 rounded-3xl bg-[#0A0A0A] border border-orange-500/40 space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-orange-500 animate-ping" />
                    <span className="text-sm font-black italic uppercase text-white">
                      {activePlayingTitle || 'Generated Speech'}
                    </span>
                  </div>

                  <a
                    href={currentAudioUrl}
                    download="sattu_speech_gemini_tts.wav"
                    className="px-4 py-2 rounded-full bg-[#151515] hover:bg-orange-500 hover:text-black text-xs font-mono font-bold uppercase text-orange-400 border border-white/10 flex items-center gap-2 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download WAV</span>
                  </a>
                </div>

                {/* HTML5 Native Audio Control */}
                <audio
                  src={currentAudioUrl}
                  controls
                  autoPlay
                  className="w-full h-10 rounded-lg"
                />
              </div>
            )}

          </div>

          {/* History / Recent generations */}
          {audioHistory.length > 0 && (
            <div className="p-7 rounded-3xl bg-[#151515] border border-white/10 space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-widest text-gray-400 font-bold">
                Recent Audio Generations
              </h3>
              <div className="space-y-2">
                {audioHistory.map((item, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-2xl bg-[#0A0A0A] border border-white/10 flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-bold text-white">{item.title}</span>
                      <p className="text-[11px] font-mono text-gray-400 mt-0.5">Voice: {item.voice} • {item.date}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <audio src={item.url} controls className="h-8 w-48" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
