import React from 'react';
import { TabType } from '../types';
import { Sparkles, TrendingUp, Music, Volume2, Layers, Compass, Mic } from 'lucide-react';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  isPlayingGlobal: boolean;
  onStopGlobalAudio: () => void;
  currentPlayingTitle: string | null;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  isPlayingGlobal,
  onStopGlobalAudio,
  currentPlayingTitle,
}) => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#0A0A0A]/90 border-b border-white/10 text-[#F5F5F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Identity */}
          <div 
            onClick={() => setActiveTab('story')}
            className="flex items-center gap-3.5 cursor-pointer group select-none"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-orange-600 via-orange-500 to-yellow-400 p-[2px] shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-[#0A0A0A] rounded-[14px] flex items-center justify-center">
                <span className="text-xl font-black italic text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-300">
                  S
                </span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-black text-xl tracking-tight uppercase italic text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-300 flex items-center gap-2">
                  Sattu
                  <span className="text-[10px] not-italic tracking-[0.2em] font-mono px-2 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/40 text-orange-400 font-bold">
                    17.00
                  </span>
                </h1>
              </div>
              <p className="text-[10px] tracking-[0.3em] uppercase font-bold text-gray-400 hidden sm:block">
                Singer • Trader • CCX
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1.5 sm:gap-2">
            <button
              id="nav-tab-story"
              onClick={() => setActiveTab('story')}
              className={`px-3.5 sm:px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center gap-1.5 ${
                activeTab === 'story'
                  ? 'bg-white text-black shadow-lg shadow-white/10'
                  : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Mera Safar</span>
              <span className="md:hidden">Story</span>
            </button>

            <button
              id="nav-tab-mscc"
              onClick={() => setActiveTab('mscc')}
              className={`px-3.5 sm:px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center gap-1.5 ${
                activeTab === 'mscc'
                  ? 'bg-gradient-to-r from-orange-500 to-yellow-400 text-black shadow-lg shadow-orange-500/20'
                  : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>MSCC</span>
            </button>

            <button
              id="nav-tab-ccx"
              onClick={() => setActiveTab('ccx')}
              className={`px-3.5 sm:px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center gap-1.5 ${
                activeTab === 'ccx'
                  ? 'bg-white text-black shadow-lg shadow-white/10'
                  : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>CCX Hub</span>
            </button>

            <button
              id="nav-tab-music"
              onClick={() => setActiveTab('music')}
              className={`px-3.5 sm:px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center gap-1.5 ${
                activeTab === 'music'
                  ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg shadow-orange-600/30'
                  : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10'
              }`}
            >
              <Music className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Music Lab</span>
              <span className="sm:hidden">Music</span>
            </button>

            <button
              id="nav-tab-tts"
              onClick={() => setActiveTab('tts-studio')}
              className={`px-3.5 sm:px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center gap-1.5 ${
                activeTab === 'tts-studio'
                  ? 'bg-orange-500 text-black shadow-lg shadow-orange-500/30'
                  : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10'
              }`}
            >
              <Mic className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">Gemini TTS</span>
              <span className="lg:hidden">TTS</span>
            </button>
          </nav>

          {/* Quick Active Audio Indicator (if playing) */}
          {isPlayingGlobal && (
            <div className="flex items-center gap-2 bg-[#151515] border border-orange-500/50 px-3.5 py-1.5 rounded-full">
              <div className="flex items-center gap-1">
                <span className="w-1 h-3 bg-orange-500 rounded-full animate-bounce"></span>
                <span className="w-1 h-4 bg-yellow-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1 h-2 bg-orange-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
              <span className="text-[11px] font-mono text-orange-300 font-bold max-w-[100px] sm:max-w-[150px] truncate">
                {currentPlayingTitle || 'Speaking...'}
              </span>
              <button
                onClick={onStopGlobalAudio}
                className="text-[10px] uppercase font-bold bg-red-600/30 hover:bg-red-600/60 text-red-300 px-2 py-0.5 rounded-full border border-red-500/40 ml-1"
                title="Stop Audio"
              >
                Stop
              </button>
            </div>
          )}

        </div>
      </div>
    </header>
  );
};
