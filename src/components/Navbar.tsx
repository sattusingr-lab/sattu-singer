import React from 'react';
import { TabType, ThemeMode } from '../types';
import { Sparkles, TrendingUp, Music, Volume2, Layers, Compass, Mic, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  isPlayingGlobal: boolean;
  onStopGlobalAudio: () => void;
  currentPlayingTitle: string | null;
  theme: ThemeMode;
  toggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  isPlayingGlobal,
  onStopGlobalAudio,
  currentPlayingTitle,
  theme,
  toggleTheme,
}) => {
  const isDark = theme === 'dark';

  return (
    <header className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-colors duration-300 ${
      isDark 
        ? 'bg-[#0A0A0A]/90 border-white/10 text-[#F5F5F5]' 
        : 'bg-white/90 border-gray-200 text-gray-900 shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Identity */}
          <div 
            onClick={() => setActiveTab('story')}
            className="flex items-center gap-3.5 cursor-pointer group select-none"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-orange-600 via-orange-500 to-yellow-400 p-[2px] shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform duration-300">
              <div className={`w-full h-full rounded-[14px] flex items-center justify-center transition-colors ${
                isDark ? 'bg-[#0A0A0A]' : 'bg-white'
              }`}>
                <span className="text-xl font-black italic text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-400">
                  S
                </span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-black text-xl tracking-tight uppercase italic text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400 flex items-center gap-2">
                  Sattu
                  <span className="text-[10px] not-italic tracking-[0.2em] font-mono px-2 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/40 text-orange-500 font-bold">
                    17.00
                  </span>
                </h1>
              </div>
              <p className={`text-[10px] tracking-[0.3em] uppercase font-bold hidden sm:block ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>
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
                  ? isDark 
                    ? 'bg-white text-black shadow-lg shadow-white/10'
                    : 'bg-gray-900 text-white shadow-md'
                  : isDark
                    ? 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10'
                    : 'text-gray-600 hover:text-black hover:bg-gray-100 border border-transparent hover:border-gray-200'
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
                  : isDark
                    ? 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10'
                    : 'text-gray-600 hover:text-black hover:bg-gray-100 border border-transparent hover:border-gray-200'
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
                  ? isDark
                    ? 'bg-white text-black shadow-lg shadow-white/10'
                    : 'bg-gray-900 text-white shadow-md'
                  : isDark
                    ? 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10'
                    : 'text-gray-600 hover:text-black hover:bg-gray-100 border border-transparent hover:border-gray-200'
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
                  : isDark
                    ? 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10'
                    : 'text-gray-600 hover:text-black hover:bg-gray-100 border border-transparent hover:border-gray-200'
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
                  : isDark
                    ? 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10'
                    : 'text-gray-600 hover:text-black hover:bg-gray-100 border border-transparent hover:border-gray-200'
              }`}
            >
              <Mic className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">Gemini TTS</span>
              <span className="lg:hidden">TTS</span>
            </button>
          </nav>

          {/* Right Controls: Theme Toggle & Global Audio Indicator */}
          <div className="flex items-center gap-2.5">
            
            {/* Dark / Light Mode Toggle Button */}
            <button
              id="theme-toggle-button"
              onClick={toggleTheme}
              className={`p-2.5 rounded-full border transition-all duration-200 flex items-center justify-center ${
                isDark
                  ? 'bg-[#151515] border-white/15 text-yellow-400 hover:bg-white/10 hover:border-yellow-400/50 hover:text-yellow-300'
                  : 'bg-gray-100 border-gray-200 text-gray-700 hover:bg-gray-200 hover:text-black'
              }`}
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? (
                <Sun className="w-4 h-4 transition-transform hover:rotate-45" />
              ) : (
                <Moon className="w-4 h-4 transition-transform hover:-rotate-12" />
              )}
            </button>

            {/* Quick Active Audio Indicator (if playing) */}
            {isPlayingGlobal && (
              <div className={`flex items-center gap-2 border px-3.5 py-1.5 rounded-full ${
                isDark 
                  ? 'bg-[#151515] border-orange-500/50' 
                  : 'bg-orange-50 border-orange-300 shadow-sm'
              }`}>
                <div className="flex items-center gap-1">
                  <span className="w-1 h-3 bg-orange-500 rounded-full animate-bounce"></span>
                  <span className="w-1 h-4 bg-yellow-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1 h-2 bg-orange-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
                <span className={`text-[11px] font-mono font-bold max-w-[90px] sm:max-w-[140px] truncate ${
                  isDark ? 'text-orange-300' : 'text-orange-700'
                }`}>
                  {currentPlayingTitle || 'Speaking...'}
                </span>
                <button
                  onClick={onStopGlobalAudio}
                  className="text-[10px] uppercase font-bold bg-red-600/30 hover:bg-red-600/60 text-red-400 px-2 py-0.5 rounded-full border border-red-500/40 ml-1"
                  title="Stop Audio"
                >
                  Stop
                </button>
              </div>
            )}

          </div>

        </div>
      </div>
    </header>
  );
};
