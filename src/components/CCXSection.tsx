import React, { useState } from 'react';
import { Layers, Plus, TrendingUp, BarChart3, BookOpen, Bot, Volume2, ShieldCheck, Sparkles, Check, Trash2, ArrowUpRight, ArrowDownRight, Send } from 'lucide-react';
import { TradeJournalEntry } from '../types';
import confetti from 'canvas-confetti';

interface CCXSectionProps {
  onPlayTTS: (text: string, title: string, voiceName?: string) => Promise<void>;
}

export const CCXSection: React.FC<CCXSectionProps> = ({ onPlayTTS }) => {
  const [activeSubTab, setActiveSubTab] = useState<'journal' | 'analytics' | 'ai-copilot'>('journal');

  // Trade Journal state
  const [trades, setTrades] = useState<TradeJournalEntry[]>([
    {
      id: 't1',
      pair: 'BTC/USDT',
      type: 'BUY',
      entryPrice: 67200,
      exitPrice: 70800,
      pnl: 360,
      percentage: 5.35,
      msccRule: 'Mirror Liquidity Sweep (Rule #1)',
      status: 'WIN',
      date: '2026-08-24',
      notes: 'Clean 15m mirror symmetry bounce after stop-hunt below equal lows.',
      timeframe: '15m',
    },
    {
      id: 't2',
      pair: 'ETH/USDT',
      type: 'BUY',
      entryPrice: 3420,
      exitPrice: 3590,
      pnl: 170,
      percentage: 4.97,
      msccRule: 'Fractal Ignition Matrix',
      status: 'WIN',
      date: '2026-08-23',
      notes: 'High volume reclaim on 1h order block confluence.',
      timeframe: '1h',
    },
    {
      id: 't3',
      pair: 'SOL/USDT',
      type: 'SELL',
      entryPrice: 198,
      exitPrice: 202,
      pnl: -40,
      percentage: -2.02,
      msccRule: 'Upper Range Rejection',
      status: 'LOSS',
      date: '2026-08-22',
      notes: 'Disciplined stop loss hit. Cut fast without ego.',
      timeframe: '5m',
    },
    {
      id: 't4',
      pair: 'EUR/USD',
      type: 'BUY',
      entryPrice: 1.0815,
      exitPrice: 1.0880,
      pnl: 130,
      percentage: 0.60,
      msccRule: 'London Session Mirror High Reclaim',
      status: 'WIN',
      date: '2026-08-21',
      notes: 'Forex liquidity grab during London open.',
      timeframe: '15m',
    },
  ]);

  // New trade modal form
  const [showAddTrade, setShowAddTrade] = useState<boolean>(false);
  const [newPair, setNewPair] = useState<string>('BTC/USDT');
  const [newType, setNewType] = useState<'BUY' | 'SELL'>('BUY');
  const [newEntry, setNewEntry] = useState<number>(68000);
  const [newExit, setNewExit] = useState<number>(71000);
  const [newRule, setNewRule] = useState<string>('MSCC Mirror Symmetry Reclaim');
  const [newNotes, setNewNotes] = useState<string>('Followed disciplined execution without FOMO.');

  // AI Copilot state
  const [aiPrompt, setAiPrompt] = useState<string>('');
  const [aiLoading, setAiLoading] = useState<boolean>(false);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([
    {
      sender: 'ai',
      text: 'Namaste! Main hoon CCX AI Copilot — Sattu ke MSCC trading logic aur chart insights ka smart engine. Aap mujhse MSCC setups, risk management ya trading discipline ke baare mein kuch bhi pooch sakte hain!',
    },
  ]);

  const ccxVisionTTS = `CCX stands for Chart Cracker X. It is Sattu's flagship platform vision designed to unify five fragmented trading pillars into one seamless terminal: 
Interactive Trading Charts, Smart Automated Journaling, Deep Performance Analytics, Proprietary MSCC Concepts, and Server-Side Artificial Intelligence. 
With CCX, traders eliminate emotional bias, track discipline metrics, and execute like algorithmic professionals.`;

  // Calculated Stats
  const totalPnL = trades.reduce((acc, t) => acc + t.pnl, 0);
  const winCount = trades.filter((t) => t.status === 'WIN').length;
  const winRate = trades.length > 0 ? ((winCount / trades.length) * 100).toFixed(1) : '0';
  const profitTrades = trades.filter((t) => t.pnl > 0).reduce((acc, t) => acc + t.pnl, 0);
  const lossTrades = Math.abs(trades.filter((t) => t.pnl < 0).reduce((acc, t) => acc + t.pnl, 0));
  const profitFactor = lossTrades > 0 ? (profitTrades / lossTrades).toFixed(2) : '16.5';

  const handleAddTrade = (e: React.FormEvent) => {
    e.preventDefault();
    const pnl = newType === 'BUY' ? newExit - newEntry : newEntry - newExit;
    const percentage = ((pnl / newEntry) * 100);
    const newEntryObj: TradeJournalEntry = {
      id: `t-${Date.now()}`,
      pair: newPair,
      type: newType,
      entryPrice: newEntry,
      exitPrice: newExit,
      pnl: Math.round(pnl * 0.1), // normalized lot pnl
      percentage: Number(percentage.toFixed(2)),
      msccRule: newRule,
      status: pnl >= 0 ? 'WIN' : 'LOSS',
      date: new Date().toISOString().split('T')[0],
      notes: newNotes,
      timeframe: '15m',
    };

    setTrades([newEntryObj, ...trades]);
    setShowAddTrade(false);
    confetti({ particleCount: 50, spread: 60 });
  };

  const handleDeleteTrade = (id: string) => {
    setTrades(trades.filter((t) => t.id !== id));
  };

  const handleSendAiPrompt = async () => {
    if (!aiPrompt.trim() || aiLoading) return;
    const userText = aiPrompt;
    setAiPrompt('');
    setChatMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setAiLoading(true);

    try {
      const response = await fetch('/api/ask-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: userText,
          context: `Recent user trades logged: ${trades.length} trades, Win rate: ${winRate}%, Total PnL: $${totalPnL}. Focus on Sattu's MSCC (Mirror Smart Code Crackr) philosophy.`,
        }),
      });

      const data = await response.json();
      if (data.text) {
        setChatMessages((prev) => [...prev, { sender: 'ai', text: data.text }]);
      } else {
        setChatMessages((prev) => [
          ...prev,
          { sender: 'ai', text: 'MSCC Analysis Complete. Continue strict risk management and follow your mirror rules.' },
        ]);
      }
    } catch (err) {
      console.error(err);
      setChatMessages((prev) => [
        ...prev,
        { sender: 'ai', text: 'CCX Copilot is evaluating your query. Remember: Focus on discipline, patience, and symmetry.' },
      ]);
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="space-y-10">
      
      {/* Platform Banner */}
      <div className="relative p-8 sm:p-12 rounded-3xl bg-[#151515] border border-white/10 overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse"></span>
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-orange-500 font-bold">
                SATTU&apos;S ALL-IN-ONE TECH ECOSYSTEM
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black uppercase italic tracking-tighter text-white">
              CCX: <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-300">Chart Cracker X</span>
            </h1>

            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Trading Chart, Smart Journal, Deep Analytics, MSCC Concepts aur Server-side AI ko ek hi unified platform par lane ka ultimate vision.
            </p>
          </div>

          <button
            onClick={() => onPlayTTS(ccxVisionTTS, 'CCX Platform Vision', 'Zephyr')}
            className="px-6 py-3 rounded-full bg-white text-black font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl hover:bg-orange-400 transition-colors"
          >
            <Volume2 className="w-4 h-4" />
            <span>Listen Platform Vision</span>
          </button>
        </div>
      </div>

      {/* 5 Integrated Pillars of CCX */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {[
          { title: '1. Live Charts', desc: 'Symmetry & mirror tools', icon: '📈' },
          { title: '2. Smart Journal', desc: 'Rule tagging & emotion logs', icon: '📓' },
          { title: '3. Analytics', desc: 'Win-rate & RR metrics', icon: '📊' },
          { title: '4. MSCC Concepts', desc: 'Code cracking algorithms', icon: '⚡' },
          { title: '5. AI Copilot', desc: 'Gemini setup intelligence', icon: '🤖' },
        ].map((item, idx) => (
          <div key={idx} className="p-5 rounded-3xl bg-[#151515] border border-white/10 flex flex-col justify-between hover:border-orange-500/40 transition-all">
            <span className="text-3xl mb-3">{item.icon}</span>
            <div>
              <h3 className="text-xs font-black uppercase italic text-white tracking-wide">{item.title}</h3>
              <p className="text-[11px] font-mono text-gray-400 mt-1">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Sub Tab Navigation */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-4">
        <button
          onClick={() => setActiveSubTab('journal')}
          className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 ${
            activeSubTab === 'journal'
              ? 'bg-orange-500 text-black shadow-lg shadow-orange-500/20'
              : 'text-gray-400 hover:text-white bg-[#151515] border border-white/10'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Smart Trading Journal</span>
        </button>

        <button
          onClick={() => setActiveSubTab('analytics')}
          className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 ${
            activeSubTab === 'analytics'
              ? 'bg-orange-500 text-black shadow-lg shadow-orange-500/20'
              : 'text-gray-400 hover:text-white bg-[#151515] border border-white/10'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Performance Analytics</span>
        </button>

        <button
          onClick={() => setActiveSubTab('ai-copilot')}
          className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 ${
            activeSubTab === 'ai-copilot'
              ? 'bg-orange-500 text-black shadow-lg shadow-orange-500/20'
              : 'text-gray-400 hover:text-white bg-[#151515] border border-white/10'
          }`}
        >
          <Bot className="w-4 h-4" />
          <span>CCX AI Copilot</span>
        </button>
      </div>

      {/* Tab 1: Smart Trading Journal */}
      {activeSubTab === 'journal' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black italic uppercase text-white tracking-tight">Interactive MSCC Trade Journal</h2>
              <p className="text-xs font-mono text-gray-400 mt-0.5">Track execution adherence, risk compliance, and market psychology</p>
            </div>

            <button
              onClick={() => setShowAddTrade(true)}
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-orange-500 to-yellow-400 text-black text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:scale-105 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Log New Trade</span>
            </button>
          </div>

          {/* Trade Cards / Table */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {trades.map((t) => (
              <div
                key={t.id}
                className="p-7 rounded-3xl bg-[#151515] border border-white/10 space-y-4 flex flex-col justify-between hover:border-white/20 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-base font-black font-mono text-white">{t.pair}</span>
                      <span
                        className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full font-black uppercase ${
                          t.type === 'BUY' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                        }`}
                      >
                        {t.type}
                      </span>
                      <span className="text-[10px] text-gray-400 font-mono">{t.timeframe}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`text-base font-mono font-black ${
                          t.pnl >= 0 ? 'text-emerald-400' : 'text-rose-400'
                        }`}
                      >
                        {t.pnl >= 0 ? `+$${t.pnl}` : `-$${Math.abs(t.pnl)}`} ({t.percentage > 0 ? `+${t.percentage}%` : `${t.percentage}%`})
                      </span>
                      <button
                        onClick={() => handleDeleteTrade(t.id)}
                        className="p-1 text-gray-500 hover:text-rose-400 transition-colors"
                        title="Delete trade"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="text-xs text-orange-400 font-mono mt-1 font-bold">
                    ⚡ {t.msccRule}
                  </div>

                  <p className="text-xs sm:text-sm text-gray-300 mt-3 bg-[#0A0A0A] p-4 rounded-2xl border border-white/5 leading-relaxed">
                    &ldquo;{t.notes}&rdquo;
                  </p>
                </div>

                <div className="flex items-center justify-between text-[10px] text-gray-500 border-t border-white/10 pt-3 font-mono">
                  <span>ENTRY: ${t.entryPrice} → EXIT: ${t.exitPrice}</span>
                  <span>{t.date}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Add Trade Modal */}
          {showAddTrade && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
              <div className="bg-[#151515] border border-white/10 rounded-3xl p-8 max-w-md w-full shadow-2xl space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <h3 className="text-xl font-black italic uppercase text-white">Log MSCC Journal Trade</h3>
                  <button
                    onClick={() => setShowAddTrade(false)}
                    className="text-gray-400 hover:text-white text-lg font-bold"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleAddTrade} className="space-y-4 text-xs">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-mono uppercase text-gray-400 font-bold block mb-1">Asset Pair</label>
                      <input
                        type="text"
                        value={newPair}
                        onChange={(e) => setNewPair(e.target.value)}
                        className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-3 py-2.5 text-white font-mono"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono uppercase text-gray-400 font-bold block mb-1">Trade Direction</label>
                      <select
                        value={newType}
                        onChange={(e) => setNewType(e.target.value as 'BUY' | 'SELL')}
                        className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-3 py-2.5 text-white font-mono"
                      >
                        <option value="BUY">BUY (Long)</option>
                        <option value="SELL">SELL (Short)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-mono uppercase text-gray-400 font-bold block mb-1">Entry Price ($)</label>
                      <input
                        type="number"
                        value={newEntry}
                        onChange={(e) => setNewEntry(Number(e.target.value))}
                        className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-3 py-2.5 text-white font-mono"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono uppercase text-gray-400 font-bold block mb-1">Exit Price ($)</label>
                      <input
                        type="number"
                        value={newExit}
                        onChange={(e) => setNewExit(Number(e.target.value))}
                        className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-3 py-2.5 text-white font-mono"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono uppercase text-gray-400 font-bold block mb-1">MSCC Rule Applied</label>
                    <input
                      type="text"
                      value={newRule}
                      onChange={(e) => setNewRule(e.target.value)}
                      className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-3 py-2.5 text-white"
                      placeholder="e.g. Liquidity Sweep Reclaim"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono uppercase text-gray-400 font-bold block mb-1">Journal Reflection &amp; Psychology</label>
                    <textarea
                      value={newNotes}
                      onChange={(e) => setNewNotes(e.target.value)}
                      rows={3}
                      className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-3 py-2.5 text-white"
                      placeholder="How did you manage emotions during the trade?"
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAddTrade(false)}
                      className="w-1/2 py-3 rounded-full bg-[#0A0A0A] border border-white/10 text-gray-300 font-bold uppercase tracking-wider text-xs"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="w-1/2 py-3 rounded-full bg-gradient-to-r from-orange-500 to-yellow-400 text-black font-black uppercase tracking-wider text-xs"
                    >
                      Save to CCX
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Performance Analytics */}
      {activeSubTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-6 rounded-3xl bg-[#151515] border border-white/10">
              <span className="text-[10px] font-mono uppercase text-gray-400 font-bold block">Total Net PnL</span>
              <span className="text-3xl font-black font-mono text-emerald-400 mt-1 block">+${totalPnL}</span>
              <span className="text-[10px] font-mono text-emerald-500 font-bold">POSITIVE EDGE</span>
            </div>

            <div className="p-6 rounded-3xl bg-[#151515] border border-white/10">
              <span className="text-[10px] font-mono uppercase text-gray-400 font-bold block">MSCC Win Rate</span>
              <span className="text-3xl font-black font-mono text-orange-400 mt-1 block">{winRate}%</span>
              <span className="text-[10px] font-mono text-gray-400">{winCount} WINS / {trades.length} TRADES</span>
            </div>

            <div className="p-6 rounded-3xl bg-[#151515] border border-white/10">
              <span className="text-[10px] font-mono uppercase text-gray-400 font-bold block">Profit Factor</span>
              <span className="text-3xl font-black font-mono text-yellow-300 mt-1 block">{profitFactor}</span>
              <span className="text-[10px] font-mono text-orange-500 font-bold">ASYMMETRIC R:R</span>
            </div>

            <div className="p-6 rounded-3xl bg-[#151515] border border-white/10">
              <span className="text-[10px] font-mono uppercase text-gray-400 font-bold block">Discipline Score</span>
              <span className="text-3xl font-black font-mono text-white mt-1 block">98/100</span>
              <span className="text-[10px] font-mono text-orange-400 font-bold">STRICT STOP LOSS</span>
            </div>
          </div>

          <div className="p-8 sm:p-10 rounded-3xl bg-[#151515] border border-white/10 space-y-6">
            <h3 className="text-2xl font-black italic uppercase text-white tracking-tight">Statistical Edge Insights</h3>
            <div className="space-y-4 text-xs sm:text-sm text-gray-300 leading-relaxed">
              <p className="flex items-start gap-3">
                <Check className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                <span><strong>Mirror Symmetry Confluence:</strong> 85% of winning trades were initiated on 15m liquidity sweep reclaims with zero premature entries.</span>
              </p>
              <p className="flex items-start gap-3">
                <Check className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                <span><strong>Disciplined Loss Mitigation:</strong> Average losing trade stopped out at -$40 vs average winning trade at +$220 (1:5.5 Realized R:R).</span>
              </p>
              <p className="flex items-start gap-3">
                <Check className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                <span><strong>Psychology Metric:</strong> Zero emotional revenge trading detected across the last 4 trading sessions.</span>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: AI Copilot */}
      {activeSubTab === 'ai-copilot' && (
        <div className="p-8 sm:p-10 rounded-3xl bg-[#151515] border border-white/10 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <Bot className="w-6 h-6 text-orange-400" />
              <div>
                <h3 className="text-xl font-black italic uppercase text-white">CCX AI Trading Partner</h3>
                <p className="text-xs font-mono text-gray-400 mt-0.5">Trained on Sattu&apos;s MSCC framework &amp; market discipline</p>
              </div>
            </div>
          </div>

          {/* Chat Messages Log */}
          <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
            {chatMessages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-3 text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-xl p-5 rounded-3xl ${
                    msg.sender === 'user'
                      ? 'bg-orange-500 text-black font-medium rounded-tr-none'
                      : 'bg-[#0A0A0A] border border-white/10 text-gray-200 rounded-tl-none'
                  }`}
                >
                  <p>{msg.text}</p>
                </div>
              </div>
            ))}
            {aiLoading && (
              <div className="flex items-center gap-2 text-xs text-orange-400 font-mono animate-pulse">
                <Bot className="w-4 h-4" />
                <span>CCX Copilot is thinking...</span>
              </div>
            )}
          </div>

          {/* Input Bar */}
          <div className="flex gap-3 pt-2">
            <input
              type="text"
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendAiPrompt()}
              placeholder="Ask CCX: e.g. How does MSCC handle false breakouts in Crypto?"
              className="flex-1 bg-[#0A0A0A] border border-white/10 rounded-full px-5 py-3 text-xs sm:text-sm text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none"
            />
            <button
              onClick={handleSendAiPrompt}
              disabled={aiLoading || !aiPrompt.trim()}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 to-yellow-400 text-black text-xs font-black uppercase tracking-wider flex items-center gap-2 disabled:opacity-50 transition-all hover:scale-105"
            >
              <Send className="w-4 h-4" />
              <span>Send</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
