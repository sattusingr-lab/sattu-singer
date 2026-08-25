import React, { useState, useRef, useEffect } from 'react';
import { TabType } from './types';
import { Navbar } from './components/Navbar';
import { StorySection } from './components/StorySection';
import { MSCCSection } from './components/MSCCSection';
import { CCXSection } from './components/CCXSection';
import { MusicSection } from './components/MusicSection';
import { TTSStudioSection } from './components/TTSStudioSection';
import { convertBase64PcmToWavUrl } from './utils/audio';
import { Volume2, VolumeX, Sparkles, Flame, Heart, AlertCircle, RefreshCw, Twitter, Instagram, Youtube, ExternalLink } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('story');
  const [currentAudioUrl, setCurrentAudioUrl] = useState<string | null>(null);
  const [activePlayingTitle, setActivePlayingTitle] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isSynthesizing, setIsSynthesizing] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Audio cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, []);

  // Global TTS play handler
  const handlePlayTTS = async (
    text: string,
    title: string,
    voiceName: string = 'Puck',
    promptPrefix?: string
  ): Promise<string | undefined> => {
    setIsSynthesizing(true);
    setErrorMessage(null);

    // If currently playing something, pause it
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }

    try {
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          voice: voiceName,
          promptPrefix: promptPrefix || '',
        }),
      });

      const data = await response.json();
      if (!response.ok || data.error) {
        throw new Error(data.error || 'Failed to generate speech audio');
      }

      if (!data.audioData) {
        throw new Error('No audio returned from Gemini TTS model');
      }

      const wavUrl = await convertBase64PcmToWavUrl(data.audioData, data.sampleRate || 24000);
      setCurrentAudioUrl(wavUrl);
      setActivePlayingTitle(title);

      if (audioRef.current) {
        audioRef.current.src = wavUrl;
        await audioRef.current.play();
        setIsPlaying(true);
      }

      return wavUrl;
    } catch (err: any) {
      console.error('TTS Playback Error:', err);
      setErrorMessage(err?.message || 'Failed to synthesize speech');
    } finally {
      setIsSynthesizing(false);
    }
  };

  const handleTogglePlay = () => {
    if (!audioRef.current || !currentAudioUrl) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(console.error);
      setIsPlaying(true);
    }
  };

  const handleStopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F5F5] flex flex-col selection:bg-orange-500 selection:text-black relative overflow-x-hidden font-display">
      
      {/* Huge Background Typography Watermark */}
      <div className="absolute top-[-20px] left-[-20px] text-[160px] sm:text-[280px] font-black opacity-[0.025] select-none leading-none tracking-tighter pointer-events-none uppercase text-white">
        CREATOR
      </div>

      {/* Hidden Global Audio Element */}
      <audio
        ref={audioRef}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      />

      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isPlayingGlobal={isPlaying}
        onStopGlobalAudio={handleStopAudio}
        currentPlayingTitle={activePlayingTitle}
      />

      {/* Synthesizing Toast / Indicator */}
      {isSynthesizing && (
        <div className="fixed bottom-24 right-6 z-50 bg-[#151515] border border-orange-500 p-4 rounded-2xl shadow-2xl flex items-center gap-3 backdrop-blur-xl animate-pulse">
          <RefreshCw className="w-5 h-5 text-orange-500 animate-spin" />
          <div>
            <p className="text-xs font-black uppercase tracking-wider text-white">Synthesizing Voice Audio</p>
            <p className="text-[10px] text-orange-400 font-mono">gemini-3.1-flash-tts-preview</p>
          </div>
        </div>
      )}

      {/* Error Banner */}
      {errorMessage && (
        <div className="max-w-7xl mx-auto px-4 pt-4 w-full relative z-20">
          <div className="p-4 rounded-2xl bg-[#151515] border border-red-500/60 text-red-300 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-400" />
              <span className="font-mono">{errorMessage}</span>
            </div>
            <button
              onClick={() => setErrorMessage(null)}
              className="text-red-400 hover:text-white font-bold ml-4 text-sm"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative z-10">
        {activeTab === 'story' && (
          <StorySection
            onPlayTTS={handlePlayTTS}
            isPlaying={isPlaying}
            activePlayingTitle={activePlayingTitle}
          />
        )}

        {activeTab === 'mscc' && (
          <MSCCSection onPlayTTS={handlePlayTTS} />
        )}

        {activeTab === 'ccx' && (
          <CCXSection onPlayTTS={handlePlayTTS} />
        )}

        {activeTab === 'music' && (
          <MusicSection
            onPlayTTS={handlePlayTTS}
            isPlaying={isPlaying}
            activePlayingTitle={activePlayingTitle}
          />
        )}

        {activeTab === 'tts-studio' && (
          <TTSStudioSection
            onGenerateTTS={handlePlayTTS}
            currentAudioUrl={currentAudioUrl}
            isPlaying={isPlaying}
            onTogglePlay={handleTogglePlay}
            activePlayingTitle={activePlayingTitle}
          />
        )}
      </main>

      {/* High-Impact Bold Typography Footer & Telemetry */}
      <footer id="app-footer" className="mt-auto border-t border-white/10 bg-[#0A0A0A]/95 backdrop-blur-md relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
          
          {/* Social Media & Community Connect Section */}
          <div id="social-community-section" className="p-6 sm:p-8 rounded-3xl bg-[#151515] border border-white/10 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse"></span>
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-orange-500 font-bold">
                    Community &amp; Creator Journey
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black italic uppercase text-white tracking-tight mt-1">
                  Connect with Sattu
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 max-w-xl mt-1">
                  Follow the journey across music releases, MSCC trading framework updates, CCX development milestones, and creator insights.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono uppercase text-gray-400 bg-[#0A0A0A] px-3.5 py-1.5 rounded-full border border-white/10">
                  @ll_sattu_singer_xy_ll • Everywhere
                </span>
              </div>
            </div>

            {/* Social Media Links Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Instagram */}
              <a
                id="social-link-instagram"
                href="https://instagram.com/ll_sattu_singer_xy_ll"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-5 rounded-2xl bg-[#0A0A0A] border border-white/10 hover:border-orange-500/50 hover:bg-white/5 transition-all flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400 group-hover:scale-110 group-hover:bg-gradient-to-tr group-hover:from-amber-500 group-hover:to-pink-500 group-hover:text-white transition-all">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-orange-400 transition-colors" />
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-black uppercase italic text-white tracking-tight">Instagram</span>
                    <span className="text-[10px] font-mono text-pink-400 font-bold">@ll_sattu_singer_xy_ll</span>
                  </div>
                  <p className="text-[11px] font-mono text-gray-400 mt-1 line-clamp-2">
                    Behind-the-scenes in the music lab, studio stories, and life at 17.
                  </p>
                </div>
              </a>

              {/* Twitter / X */}
              <a
                id="social-link-twitter"
                href="https://twitter.com/ll_sattu_singer_xy_ll"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-5 rounded-2xl bg-[#0A0A0A] border border-white/10 hover:border-orange-500/50 hover:bg-white/5 transition-all flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 group-hover:scale-110 group-hover:bg-sky-500 group-hover:text-black transition-all">
                    <Twitter className="w-5 h-5" />
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-orange-400 transition-colors" />
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-black uppercase italic text-white tracking-tight">Twitter / X</span>
                    <span className="text-[10px] font-mono text-sky-400 font-bold">@ll_sattu_singer_xy_ll</span>
                  </div>
                  <p className="text-[11px] font-mono text-gray-400 mt-1 line-clamp-2">
                    Market setups, MSCC framework thoughts, and daily building in public.
                  </p>
                </div>
              </a>

              {/* YouTube */}
              <a
                id="social-link-youtube"
                href="https://youtube.com/@ll_sattu_singer_xy_ll"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-5 rounded-2xl bg-[#0A0A0A] border border-white/10 hover:border-orange-500/50 hover:bg-white/5 transition-all flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-500 group-hover:scale-110 group-hover:bg-red-600 group-hover:text-white transition-all">
                    <Youtube className="w-5 h-5" />
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-orange-400 transition-colors" />
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-black uppercase italic text-white tracking-tight">YouTube</span>
                    <span className="text-[10px] font-mono text-red-400 font-bold">@ll_sattu_singer_xy_ll</span>
                  </div>
                  <p className="text-[11px] font-mono text-gray-400 mt-1 line-clamp-2">
                    Original tracks, vocal recordings, MSCC chart breakdowns, and CCX demos.
                  </p>
                </div>
              </a>
            </div>
          </div>

          {/* Telemetry & Mission Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            <div className="flex flex-wrap items-center gap-6 sm:gap-8">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase text-gray-500 font-bold tracking-[0.2em]">Current Mission</span>
                <span className="text-xs font-mono font-bold text-orange-500">DREAMS_TO_REALITY.EXE</span>
              </div>
              <div className="h-5 w-[1px] bg-white/20 hidden sm:block"></div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase text-gray-500 font-bold tracking-[0.2em]">Location &amp; Vision</span>
                <span className="text-xs font-mono text-gray-300">CREATOR_SPACE_17.00</span>
              </div>
              <div className="h-5 w-[1px] bg-white/20 hidden sm:block"></div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase text-gray-500 font-bold tracking-[0.2em]">Core Concept</span>
                <span className="text-xs font-mono text-gray-300">MSCC &amp; CCX HUB</span>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-[#151515] px-4 py-2 rounded-full border border-white/10">
              <div className="h-2.5 w-2.5 rounded-full bg-orange-500 animate-pulse"></div>
              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-gray-300">
                System Active / Stay Consistent
              </span>
            </div>

          </div>

          <div className="border-t border-white/5 pt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-2">
            <p className="italic font-bold text-gray-400">
              &ldquo;Main apni kahani khud likhna chahta hoon.&rdquo; — Sattu Singer (Age 17)
            </p>
            <p className="font-mono text-[11px] text-gray-500">
              Powered by Gemini 3.1 Flash TTS
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
