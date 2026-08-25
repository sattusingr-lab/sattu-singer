import React, { useState } from 'react';
import { Play, Pause, Volume2, Sparkles, Flame, Target, Compass, Code, Music, Rocket, Quote, CheckCircle2, RefreshCw, Award, ShieldCheck, ExternalLink, Download, Eye, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import cryptoCertImg from '../assets/images/crypto_analyst_cert_1787658829110.jpg';
import sattuProfileImg from '../assets/images/sattu_creator_profile_1787658852383.jpg';

interface StorySectionProps {
  onPlayTTS: (text: string, title: string, voiceName?: string) => Promise<void>;
  isPlaying: boolean;
  activePlayingTitle: string | null;
}

export const StorySection: React.FC<StorySectionProps> = ({
  onPlayTTS,
  isPlaying,
  activePlayingTitle,
}) => {
  const [completedPrinciples, setCompletedPrinciples] = useState<Record<string, boolean>>({});
  const [isCertModalOpen, setIsCertModalOpen] = useState<boolean>(false);

  const fullManifesto = `Hii, Mera naam Sattu hai, aur meri identity hai — Sattu Singer. 
Main abhi sirf 17 saal ka hoon, lekin mere dreams meri age se kaafi bade hain. 
Main khud ko sirf ek trader, singer ya businessman nahi maanta. Main ek creator hoon. 
Mujhe naye ideas sochna, naye concepts banana aur unhe reality mein convert karna pasand hai. 
Trading meri journey ka ek important part hai. Main Crypto aur Forex trading ko deeply samajhne ki koshish karta hoon. Isi journey mein maine apna khud ka concept develop kiya — MSCC, Mirror Smart Code Crackr. 
Lekin meri soch sirf trading tak limited nahi hai. 
Mujhe technology aur AI mein bhi interest hai. Main apne ideas ko apps aur digital platforms mein convert karna chahta hoon. Isi vision ka ek example hai CCX — Chart Cracker X, jiska goal trading chart, trading journal, analytics, concepts aur AI ko ek hi platform par lana hai. 
Music bhi meri identity ka important part hai. Sattu Singer mere liye sirf ek naam nahi, balki meri creative identity hai. 
Main maanta hoon ki success sirf bada dream dekhne se nahi milti. Success ke liye direction, discipline, consistency aur execution chahiye. 
Mere paas bahut saare dreams hain. Lekin ab mera goal sirf dreams dekhna nahi hai. Mera goal hai un dreams ko step-by-step reality mein convert karna. 
Main seekhunga. Main galtiyan karunga. Main un galtiyon se seekhunga. Main dobara try karunga. Aur jab tak apne goals ke kareeb nahi pahunchta, tab tak rukunga nahi. 
Meri journey abhi shuru hui hai. 
Aur meri identity simple hai: I am Sattu. I am a creator. I am a learner. I am an entrepreneur in the making. I am a trader. I am an artist. 
Aur sabse important — Main apni kahani khud likhna chahta hoon.`;

  const identityTags = [
    { title: 'Creator', sub: 'The Genesis', desc: 'Conceiving innovative systems & turning raw vision into reality', icon: '🎨', bg: 'bg-[#151515] border-white/10' },
    { title: 'Trader', sub: 'Crypto & Forex', desc: 'Architect of MSCC (Mirror Smart Code Crackr) market mechanics', icon: '📈', bg: 'bg-[#1A1A1A] border-white/10' },
    { title: 'Sattu Singer', sub: 'Creative Frequency', desc: 'Soulful musical expression, lyrics & beats reflecting the hustle', icon: '🎙️', bg: 'bg-gradient-to-br from-orange-600 to-red-600 text-white border-transparent' },
    { title: 'Tech Visionary', sub: 'Project CCX', desc: 'Building Chart Cracker X — unified charts, journal & AI intelligence', icon: '⚡', bg: 'bg-[#151515] border-white/10' },
    { title: 'Executioner', sub: 'Never Give Up', desc: '17-year-old disciplined mindset: Learn, Fail, Re-execute, Conquer', icon: '🔥', bg: 'bg-[#1A1A1A] border-white/10' },
  ];

  const executionPrinciples = [
    {
      id: 'p1',
      title: 'Main Seekhunga',
      eng: 'I Will Learn',
      hindi: 'Har naye market cycle aur technology se har din naye lessons absorb karna.',
      ttsQuote: 'Main seekhunga. Har din bina ruke apne knowledge ko upgrade karunga.',
      badge: '01 / LEARN',
    },
    {
      id: 'p2',
      title: 'Main Galtiyan Karunga',
      eng: 'I Will Make Mistakes',
      hindi: 'Risk lene se mat daro. Galtiyan experimentation ka compulsory part hain.',
      ttsQuote: 'Main galtiyan karunga. Experimentation se hi real breakthroughs nikalte hain.',
      badge: '02 / FAIL BOLDLY',
    },
    {
      id: 'p3',
      title: 'Main Un Galtiyon Se Seekhunga',
      eng: 'I Will Learn From Mistakes',
      hindi: 'Har stop-loss aur failed idea ko deep analysis journal mein record karna.',
      ttsQuote: 'Main un galtiyon se seekhunga. Stop loss sirf ek cost of learning hai.',
      badge: '03 / ANALYZE',
    },
    {
      id: 'p4',
      title: 'Main Dobara Try Karunga',
      eng: 'I Will Try Again',
      hindi: 'Resilience aur persistence ke sath double conviction se execute karna.',
      ttsQuote: 'Main dobara try karunga. Haar tab hoti hai jab aap quit karte ho.',
      badge: '04 / RETRY',
    },
    {
      id: 'p5',
      title: 'Jab Tak Goal Na Mile, Rukunga Nahi',
      eng: 'Relentless Execution',
      hindi: 'Consistency aur discipline ke sath tab tak fight karna jab tak vision reality na ban jaye.',
      ttsQuote: 'Aur jab tak apne goals ke kareeb nahi pahunchta, tab tak rukunga nahi. Main apni kahani khud likhunga.',
      badge: '05 / CONQUER',
    },
  ];

  const togglePrinciple = (id: string) => {
    const updated = { ...completedPrinciples, [id]: !completedPrinciples[id] };
    setCompletedPrinciples(updated);
    if (!completedPrinciples[id]) {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.8 },
      });
    }
  };

  const isCurrentFullManifestoPlaying = isPlaying && activePlayingTitle === 'Sattu\'s Full Journey Manifesto';

  return (
    <div className="space-y-12">
      
      {/* High-Impact Hero Section matching the Bold Typography Archetype */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Heavy Typography & Intro */}
        <div className="lg:col-span-7 bg-[#151515] rounded-3xl p-8 sm:p-12 border border-white/10 flex flex-col justify-between relative overflow-hidden">
          
          <div className="space-y-6 relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={sattuProfileImg}
                    alt="Sattu Singer X Profile"
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl object-cover border-2 border-orange-500 shadow-lg shadow-orange-500/20"
                  />
                  <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#151515] flex items-center justify-center text-[9px] text-black font-bold">
                    ✓
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse"></span>
                    <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-orange-500 font-bold">
                      GENESIS / AGE 17.00
                    </span>
                  </div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-gray-400">
                    Sattu Singer X • Creator
                  </span>
                </div>
              </div>
              
              <button
                onClick={() => setIsCertModalOpen(true)}
                className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-orange-500/20 border border-white/10 text-[10px] font-mono uppercase tracking-wider text-orange-400 hover:text-white flex items-center gap-1.5 transition-all"
              >
                <Award className="w-3.5 h-3.5 text-orange-400" />
                <span>CCA 349/2025</span>
              </button>
            </div>

            <div>
              <h1 className="text-6xl sm:text-7xl lg:text-[88px] leading-[0.85] font-black uppercase italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-300">
                Sattu
              </h1>
              <p className="text-xs sm:text-sm tracking-[0.4em] uppercase font-bold mt-3 text-orange-500">
                Singer • Trader • Entrepreneur
              </p>
            </div>

            <div className="border-l-2 border-orange-500 pl-6 space-y-4 pt-2">
              <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white leading-tight">
                Writing My <br className="hidden sm:inline" /> Own Story.
              </h2>
              <p className="text-sm sm:text-base text-gray-400 max-w-xl leading-relaxed">
                I don&apos;t just follow trends. I build frameworks. From <strong className="text-white font-mono">MSCC (Mirror Smart Code Crackr)</strong> to the vision of <strong className="text-white font-mono">CCX (Chart Cracker X)</strong>. Reality is just a concept waiting to be hacked through discipline and execution.
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5 pt-2">
              <span className="px-4 py-2 border border-white/20 rounded-full text-[11px] uppercase tracking-widest font-bold text-gray-300">
                Learn
              </span>
              <span className="px-4 py-2 border border-white/20 rounded-full text-[11px] uppercase tracking-widest font-bold text-gray-300">
                Fail
              </span>
              <span className="px-4 py-2 bg-white text-black rounded-full text-[11px] uppercase tracking-widest font-bold shadow-md">
                Execute
              </span>
              <span className="px-4 py-2 border border-orange-500/40 text-orange-400 bg-orange-500/10 rounded-full text-[11px] uppercase tracking-widest font-bold">
                Never Stop
              </span>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-xs text-gray-400 font-mono">
              <span className="text-white font-bold">SATTU SINGER IDENTITY</span> • EST. 17 YRS
            </div>
            
            <button
              id="btn-play-full-manifesto"
              onClick={() => onPlayTTS(fullManifesto, "Sattu's Full Journey Manifesto", "Puck")}
              className={`px-5 py-3 rounded-full text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                isCurrentFullManifestoPlaying
                  ? 'bg-red-600 text-white shadow-lg shadow-red-600/30 animate-pulse'
                  : 'bg-gradient-to-r from-orange-500 to-yellow-400 text-black hover:scale-105 shadow-lg shadow-orange-500/20'
              }`}
            >
              {isCurrentFullManifestoPlaying ? (
                <>
                  <Pause className="w-4 h-4" />
                  <span>Speaking Manifesto...</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4" />
                  <span>Hear Sattu&apos;s Voice (TTS)</span>
                </>
              )}
            </button>
          </div>

        </div>

        {/* Right Bento Grid Cards */}
        <div className="lg:col-span-5 grid grid-rows-2 gap-6">
          
          {/* Top: Official Certified Crypto Analyst Spotlight Card */}
          <div 
            onClick={() => setIsCertModalOpen(true)}
            className="group cursor-pointer bg-[#151515] rounded-3xl p-6 sm:p-7 border border-orange-500/30 hover:border-orange-500/80 transition-all flex flex-col justify-between relative overflow-hidden shadow-2xl shadow-orange-500/5"
          >
            <div className="flex justify-between items-center z-10">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-orange-400" />
                <span className="text-xs font-mono uppercase text-orange-400 tracking-wider font-bold">
                  Official Credential • 2025
                </span>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-orange-500/20 border border-orange-500/40 text-[9px] font-mono text-orange-300 font-bold uppercase">
                Verified
              </span>
            </div>

            <div className="my-3 flex items-center gap-4 z-10">
              <div className="w-24 h-16 sm:w-28 sm:h-20 rounded-xl overflow-hidden border border-white/20 shrink-0 relative group-hover:scale-105 transition-transform bg-white">
                <img
                  src={cryptoCertImg}
                  alt="Certified Crypto Analyst Certificate Sattu Singer X"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Eye className="w-4 h-4 text-white" />
                </div>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-black italic uppercase tracking-tight text-white group-hover:text-orange-400 transition-colors">
                  Certified Crypto Analyst
                </h3>
                <p className="text-xs text-gray-300 mt-0.5">Presented to <strong className="text-white font-mono">SATTU SINGER X</strong></p>
                <p className="text-[10px] font-mono text-gray-400 mt-1">
                  Founder Technical Kingdom • Cert #CCA 349/2025
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-white/10 z-10">
              <span className="text-[10px] font-mono text-gray-400 uppercase">
                Tap to Inspect Full Resolution Certificate
              </span>
              <span className="text-xs text-orange-400 font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                View &rarr;
              </span>
            </div>
          </div>

          {/* Bottom Dual Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Identity Card: Sattu Singer */}
            <div className="bg-gradient-to-br from-orange-600 via-orange-500 to-red-600 rounded-3xl p-7 flex flex-col justify-between text-white shadow-xl shadow-orange-600/10">
              <div className="text-[10px] uppercase font-bold tracking-[0.25em] text-white/80">
                Artistic Identity
              </div>
              <div className="space-y-1 my-2">
                <h4 className="text-2xl sm:text-3xl font-black italic leading-none uppercase">
                  Sattu<br />Singer
                </h4>
                <p className="text-xs text-white/90">The creative frequency &amp; music.</p>
              </div>
              <button
                onClick={() => onPlayTTS("Music meri soul hai. Sattu Singer identity ke through main apne sapno aur jazbaat ko awaaz deta hoon.", "Sattu Singer Identity", "Kore")}
                className="self-start text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-md transition-colors"
              >
                Listen
              </button>
            </div>

            {/* Asset Class: Crypto & Forex */}
            <div className="bg-[#1a1a1a] rounded-3xl p-7 border border-white/10 flex flex-col justify-between">
              <div className="text-[10px] uppercase font-bold tracking-[0.25em] text-gray-500">
                Asset Mastery
              </div>
              <div className="space-y-1 my-2">
                <h4 className="text-2xl sm:text-3xl font-black italic leading-none uppercase text-white">
                  Crypto<br />Forex
                </h4>
                <p className="text-xs text-gray-400">Deep Liquidity Matrix.</p>
              </div>
              <span className="text-[11px] font-mono font-bold text-orange-500">
                1:3+ MIN RR
              </span>
            </div>

          </div>

        </div>

      </div>

      {/* Core Identity Pillars */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-orange-500 font-bold block mb-1">
              PILLARS OF SATTU
            </span>
            <h2 className="text-2xl sm:text-4xl font-black italic uppercase tracking-tight text-white">
              Who Is Sattu?
            </h2>
          </div>
          <span className="text-xs font-mono text-gray-500 hidden sm:inline">5 CORE VECTORS</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {identityTags.map((tag, idx) => (
            <div
              key={idx}
              className={`p-7 rounded-3xl border transition-all duration-300 hover:scale-[1.02] flex flex-col justify-between ${tag.bg}`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{tag.icon}</span>
                  <button
                    onClick={() => onPlayTTS(`${tag.title}. ${tag.desc}`, `Identity: ${tag.title}`, 'Puck')}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                    title="Listen with Gemini TTS"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-orange-400 font-bold mb-1">
                  {tag.sub}
                </div>
                <h3 className="text-2xl font-black italic uppercase tracking-tight text-white">
                  {tag.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 mt-2 leading-relaxed">
                  {tag.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sattu's Full Journey Manifesto in Hinglish */}
      <div className="p-8 sm:p-12 rounded-3xl bg-[#151515] border border-white/10 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-orange-500 font-bold block mb-1">
              DIRECT WORDS • HINGLISH
            </span>
            <h2 className="text-2xl sm:text-4xl font-black italic uppercase text-white tracking-tight">
              The Creator Manifesto
            </h2>
          </div>

          <button
            onClick={() => onPlayTTS(fullManifesto, "Sattu's Full Journey Manifesto", "Puck")}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black text-xs font-black uppercase tracking-wider shadow-lg hover:bg-orange-400 transition-colors"
          >
            <Volume2 className="w-4 h-4" />
            <span>Narrate Full Manifesto</span>
          </button>
        </div>

        {/* Story Prose Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm sm:text-base text-gray-300 leading-relaxed font-normal">
          <div className="space-y-5 bg-[#0A0A0A] p-7 rounded-3xl border border-white/5">
            <p className="text-white text-lg font-bold">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-300">&ldquo;Hii, Mera naam Sattu hai</span>, aur meri identity hai — <strong className="text-white uppercase italic">Sattu Singer</strong>.
            </p>
            <p>
              Main abhi sirf <span className="text-orange-400 font-bold font-mono">17 saal ka hoon</span>, lekin mere dreams meri age se kaafi bade hain. 
              Main khud ko sirf ek trader, singer ya businessman nahi maanta. <strong className="text-white font-bold">Main ek creator hoon.</strong>
            </p>
            <p>
              Mujhe naye ideas sochna, naye concepts banana aur unhe reality mein convert karna pasand hai.
            </p>
            <div className="p-4 rounded-2xl bg-[#151515] border-l-2 border-orange-500 text-xs font-mono text-gray-300">
              <strong className="text-orange-400">TRADING MECHANICS:</strong> Crypto &amp; Forex deep market symmetry with MSCC (Mirror Smart Code Crackr).
            </div>
          </div>

          <div className="space-y-5 bg-[#0A0A0A] p-7 rounded-3xl border border-white/5">
            <p>
              <strong className="text-white font-bold">Lekin meri soch sirf trading tak limited nahi hai.</strong> Mujhe technology aur AI mein bhi interest hai. 
              Main apne ideas ko apps aur digital platforms mein convert karna chahta hoon.
            </p>
            <div className="p-4 rounded-2xl bg-[#151515] border-l-2 border-orange-500 text-xs font-mono text-gray-300">
              <strong className="text-orange-400">PROJECT CCX:</strong> Chart + Journal + Analytics + AI in ONE unified platform.
            </div>
            <p>
              Music bhi meri identity ka important part hai. <strong className="text-white">Sattu Singer</strong> mere liye sirf ek naam nahi, 
              balki meri creative identity hai.
            </p>
            <p className="text-white font-bold italic text-base border-t border-white/10 pt-3">
              &ldquo;Success ke liye direction, discipline, consistency aur execution chahiye.&rdquo;
            </p>
          </div>
        </div>
      </div>

      {/* 5 Principles of Relentless Execution */}
      <div className="p-8 sm:p-12 rounded-3xl bg-[#151515] border border-white/10 space-y-8">
        <div className="flex items-center justify-between flex-wrap gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 text-[10px] font-mono font-bold text-orange-500 uppercase tracking-[0.3em] mb-1">
              <Flame className="w-3.5 h-3.5" />
              SATTU&apos;S FIVE-STEP ALGORITHM
            </div>
            <h2 className="text-2xl sm:text-4xl font-black italic uppercase text-white tracking-tight">
              Principles of Relentless Execution
            </h2>
          </div>
          <div className="text-xs font-mono text-gray-300 bg-[#0A0A0A] px-4 py-2 rounded-full border border-white/10">
            Committed: <span className="text-orange-400 font-bold">{Object.values(completedPrinciples).filter(Boolean).length}</span> / 5
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {executionPrinciples.map((item, idx) => {
            const isCompleted = !!completedPrinciples[item.id];
            return (
              <div
                key={item.id}
                className={`p-7 rounded-3xl border transition-all duration-300 flex flex-col justify-between space-y-6 ${
                  isCompleted
                    ? 'bg-[#1a1a1a] border-orange-500/60 shadow-xl shadow-orange-500/10'
                    : 'bg-[#0A0A0A] border-white/10 hover:border-white/20'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-white/10 text-orange-400">
                      {item.badge}
                    </span>
                    <span className="text-[11px] font-mono uppercase text-gray-500">
                      {item.eng}
                    </span>
                  </div>

                  <h3 className="text-xl font-black italic uppercase text-white tracking-tight">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-300 mt-2.5 leading-relaxed">
                    {item.hindi}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                  <button
                    onClick={() => onPlayTTS(item.ttsQuote, item.title, 'Fenrir')}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-orange-400 transition-colors"
                    title="Speak Principle"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => togglePrinciple(item.id)}
                    className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${
                      isCompleted
                        ? 'bg-orange-500 text-black shadow-md'
                        : 'bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10'
                    }`}
                  >
                    <CheckCircle2 className={`w-4 h-4 ${isCompleted ? 'text-black' : 'text-gray-500'}`} />
                    <span>{isCompleted ? 'Adopted' : 'Commit'}</span>
                  </button>
                </div>
              </div>
            );
          })}

          {/* Goal Summary Card */}
          <div className="p-7 rounded-3xl bg-gradient-to-br from-orange-600 via-orange-500 to-yellow-500 text-black flex flex-col justify-between shadow-2xl">
            <div className="space-y-2">
              <span className="text-[10px] font-mono font-black uppercase tracking-[0.25em] text-black/80">
                UNBREAKABLE OATH
              </span>
              <h3 className="text-2xl font-black italic uppercase tracking-tight text-black">
                Main Apni Kahani Khud Likhunga
              </h3>
              <p className="text-xs sm:text-sm text-black/90 font-medium leading-relaxed">
                Age 17 is only the genesis. Reality is built step-by-step through MSCC mechanics and CCX platforms.
              </p>
            </div>
            <button
              onClick={() => {
                confetti({ particleCount: 100, spread: 80 });
                onPlayTTS("Main apni kahani khud likhna chahta hoon. Sattu Singer, 17 years old, creator, trader, artist.", "Sattu's Oath", "Puck");
              }}
              className="mt-6 w-full py-3 px-4 rounded-full bg-black text-white font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white hover:text-black transition-all shadow-xl"
            >
              <Flame className="w-4 h-4 text-orange-400" />
              <span>Declare Oath</span>
            </button>
          </div>
        </div>
      </div>

      {/* Official Crypto Analyst Certification Showcase Banner */}
      <div id="crypto-analyst-certificate-section" className="p-8 sm:p-12 rounded-3xl bg-[#151515] border border-orange-500/30 shadow-2xl relative overflow-hidden space-y-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-orange-500 animate-pulse"></span>
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-orange-500 font-bold">
                OFFICIAL PROFESSIONAL CREDENTIAL
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black italic uppercase tracking-tight text-white mt-1">
              Certified Crypto Analyst
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1 max-w-xl">
              Official certificate presented to <strong className="text-white">SATTU SINGER X</strong> by Technical Kingdom for completing the Certified Crypto Analyst Program in 2025.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsCertModalOpen(true)}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-300 text-black font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-orange-500/20 hover:scale-105 transition-transform"
            >
              <Eye className="w-4 h-4" />
              <span>Inspect Certificate</span>
            </button>
            <a
              href={cryptoCertImg}
              download="Sattu_Singer_X_Certified_Crypto_Analyst.jpg"
              className="px-5 py-3 rounded-full bg-[#0A0A0A] hover:bg-white hover:text-black border border-white/10 text-xs font-bold uppercase tracking-wider text-gray-300 flex items-center gap-2 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Download</span>
            </a>
          </div>
        </div>

        {/* Certificate Display Card & Verification Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Certificate Image Frame */}
          <div 
            onClick={() => setIsCertModalOpen(true)}
            className="lg:col-span-7 group cursor-pointer relative rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-white/10 hover:border-orange-500/80 transition-all bg-white p-2 shadow-2xl"
          >
            <img
              src={cryptoCertImg}
              alt="Certified Crypto Analyst Sattu Singer X Certificate No CCA 349/2025"
              referrerPolicy="no-referrer"
              className="w-full h-auto object-contain rounded-xl sm:rounded-2xl transition-transform group-hover:scale-[1.01]"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl">
              <span className="px-5 py-2.5 rounded-full bg-orange-500 text-black font-black text-xs uppercase tracking-widest flex items-center gap-2 shadow-xl">
                <Eye className="w-4 h-4" />
                Click to Enlarge Full View
              </span>
            </div>
          </div>

          {/* Verification Details */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-5 rounded-2xl bg-[#0A0A0A] border border-white/10 space-y-1">
              <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Certificate Holder</span>
              <div className="text-xl font-black italic uppercase text-white tracking-tight flex items-center gap-2">
                <span>Sattu Singer X</span>
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
              </div>
              <p className="text-xs text-orange-400 font-mono">Trader, Creator &amp; Framework Architect</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-[#0A0A0A] border border-white/10">
                <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest block">Certificate No.</span>
                <span className="text-sm font-mono font-bold text-white mt-1 block">CCA 349/2025</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#0A0A0A] border border-white/10">
                <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest block">Accreditation Year</span>
                <span className="text-sm font-mono font-bold text-orange-400 mt-1 block">2025</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#0A0A0A] border border-white/10 space-y-1">
              <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Issuer &amp; Signatory</span>
              <div className="text-base font-bold text-white">Rohan Sharma</div>
              <p className="text-xs text-gray-400 font-mono">Founder, Technical Kingdom • Crypto Currency King</p>
            </div>

            <div className="p-4 rounded-2xl bg-orange-500/10 border border-orange-500/30 text-xs font-mono text-orange-300 flex items-center gap-2">
              <Award className="w-5 h-5 text-orange-400 shrink-0" />
              <span>Official Verification for Crypto Market Analysis, Technical Architecture, and MSCC Execution.</span>
            </div>
          </div>

        </div>
      </div>

      {/* Interactive Certificate Zoom Modal */}
      {isCertModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fadeIn"
          onClick={() => setIsCertModalOpen(false)}
        >
          <div 
            className="relative max-w-5xl w-full bg-[#151515] border border-white/20 rounded-3xl p-4 sm:p-6 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-orange-400" />
                <span className="text-xs sm:text-sm font-black italic uppercase text-white tracking-tight">
                  Certified Crypto Analyst — Sattu Singer X (CCA 349/2025)
                </span>
              </div>
              <button
                onClick={() => setIsCertModalOpen(false)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="rounded-2xl overflow-hidden bg-white p-2 border border-white/10 max-h-[75vh] flex items-center justify-center">
              <img
                src={cryptoCertImg}
                alt="Full Resolution Certified Crypto Analyst Certificate"
                referrerPolicy="no-referrer"
                className="max-h-[70vh] w-auto object-contain rounded-xl"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 text-xs font-mono text-gray-400">
              <span>Issued by Technical Kingdom • Signed by Rohan Sharma</span>
              <div className="flex gap-2">
                <a
                  href={cryptoCertImg}
                  download="Sattu_Singer_X_Certified_Crypto_Analyst.jpg"
                  className="px-4 py-2 rounded-full bg-orange-500 text-black font-bold uppercase tracking-wider hover:bg-orange-400 transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Image</span>
                </a>
                <button
                  onClick={() => setIsCertModalOpen(false)}
                  className="px-4 py-2 rounded-full bg-white/10 text-white font-bold uppercase tracking-wider hover:bg-white/20 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
