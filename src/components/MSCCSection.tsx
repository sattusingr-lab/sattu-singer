import React, { useState, useMemo } from 'react';
import { Volume2, TrendingUp, ShieldAlert, Cpu, ArrowUpRight, ArrowDownRight, RefreshCw, CheckCircle2, Sliders, Zap, Award, ShieldCheck, Eye, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CandleData } from '../types';
import cryptoCertImg from '../assets/images/crypto_analyst_cert_1787658829110.jpg';

interface MSCCSectionProps {
  onPlayTTS: (text: string, title: string, voiceName?: string) => Promise<void>;
}

export const MSCCSection: React.FC<MSCCSectionProps> = ({ onPlayTTS }) => {
  const [selectedAsset, setSelectedAsset] = useState<'BTC/USDT' | 'ETH/USDT' | 'EUR/USD' | 'SOL/USDT'>('BTC/USDT');
  const [showMirrorSymmetry, setShowMirrorSymmetry] = useState<boolean>(true);
  const [showLiquidityZone, setShowLiquidityZone] = useState<boolean>(true);
  const [showCodeFractals, setShowCodeFractals] = useState<boolean>(true);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [simulationResult, setSimulationResult] = useState<string | null>(null);
  const [isCertModalOpen, setIsCertModalOpen] = useState<boolean>(false);

  // Calculator State
  const [balance, setBalance] = useState<number>(1000);
  const [riskPercent, setRiskPercent] = useState<number>(2);
  const [entryPrice, setEntryPrice] = useState<number>(68500);
  const [stopLoss, setStopLoss] = useState<number>(67800);
  const [takeProfit, setTakeProfit] = useState<number>(71300);

  // Sample candlestick sequences for MSCC demonstration
  const candleSeries: Record<string, CandleData[]> = {
    'BTC/USDT': [
      { time: '10:00', open: 67200, high: 67600, low: 67100, close: 67500, volume: 120 },
      { time: '10:15', open: 67500, high: 68100, low: 67400, close: 68000, volume: 210 },
      { time: '10:30', open: 68000, high: 68200, low: 67300, close: 67400, volume: 380, isMirrorPoint: true },
      { time: '10:45', open: 67400, high: 67500, low: 66900, close: 67050, volume: 450 }, // Liquidity Sweep
      { time: '11:00', open: 67050, high: 67900, low: 67000, close: 67850, volume: 590, signal: 'BUY' },
      { time: '11:15', open: 67850, high: 68600, low: 67700, close: 68500, volume: 480 },
      { time: '11:30', open: 68500, high: 69200, low: 68400, close: 69100, volume: 530 },
      { time: '11:45', open: 69100, high: 69800, low: 68900, close: 69700, volume: 620 },
      { time: '12:00', open: 69700, high: 70400, low: 69600, close: 70350, volume: 710 },
      { time: '12:15', open: 70350, high: 71400, low: 70200, close: 71300, volume: 820 },
    ],
    'ETH/USDT': [
      { time: '10:00', open: 3450, high: 3490, low: 3430, close: 3480, volume: 80 },
      { time: '10:15', open: 3480, high: 3520, low: 3470, close: 3510, volume: 150 },
      { time: '10:30', open: 3510, high: 3530, low: 3460, close: 3470, volume: 280, isMirrorPoint: true },
      { time: '10:45', open: 3470, high: 3480, low: 3410, close: 3430, volume: 320 },
      { time: '11:00', open: 3430, high: 3500, low: 3420, close: 3495, volume: 410, signal: 'BUY' },
      { time: '11:15', open: 3495, high: 3560, low: 3480, close: 3550, volume: 380 },
      { time: '11:30', open: 3550, high: 3620, low: 3540, close: 3610, volume: 460 },
      { time: '11:45', open: 3610, high: 3690, low: 3600, close: 3680, volume: 520 },
    ],
    'EUR/USD': [
      { time: '08:00', open: 1.082, high: 1.084, low: 1.081, close: 1.0835, volume: 95 },
      { time: '08:30', open: 1.0835, high: 1.086, low: 1.083, close: 1.0855, volume: 180 },
      { time: '09:00', open: 1.0855, high: 1.087, low: 1.082, close: 1.0825, volume: 290, isMirrorPoint: true },
      { time: '09:30', open: 1.0825, high: 1.083, low: 1.0795, close: 1.0805, volume: 340 },
      { time: '10:00', open: 1.0805, high: 1.085, low: 1.080, close: 1.0848, volume: 430, signal: 'BUY' },
      { time: '10:30', open: 1.0848, high: 1.089, low: 1.084, close: 1.0885, volume: 390 },
    ],
    'SOL/USDT': [
      { time: '14:00', open: 175, high: 179, low: 174, close: 178, volume: 140 },
      { time: '14:15', open: 178, high: 184, low: 177, close: 183, volume: 260 },
      { time: '14:30', open: 183, high: 185, low: 176, close: 177, volume: 380, isMirrorPoint: true },
      { time: '14:45', open: 177, high: 178, low: 170, close: 172, volume: 510 },
      { time: '15:00', open: 172, high: 182, low: 171, close: 181, volume: 680, signal: 'BUY' },
      { time: '15:15', open: 181, high: 191, low: 180, close: 189, volume: 740 },
      { time: '15:30', open: 189, high: 198, low: 188, close: 196, volume: 830 },
    ],
  };

  const currentCandles = candleSeries[selectedAsset];

  // MSCC Concept Explanation for TTS
  const msccTTSAudioScript = `MSCC stands for Mirror Smart Code Crackr, a proprietary trading framework developed by Sattu for Crypto and Forex markets. 
It combines four core mechanics: 
First, Mirror Symmetry — identifying algorithmic price reflection zones where past price impulses reflect into current liquidity. 
Second, Smart Liquidity Sniping — tracking where retail stop-losses accumulate before smart money initiates institutional order execution. 
Third, Code Fractals — calculating mathematical reaction ratios before momentum breaks out. 
And fourth, Crackr Validation Matrix — executing high risk to reward ratio entries with strict invalidation rules. MSCC eliminates emotion and delivers disciplined execution.`;

  // Calculator calculations
  const riskAmount = (balance * riskPercent) / 100;
  const slDistance = Math.abs(entryPrice - stopLoss);
  const tpDistance = Math.abs(takeProfit - entryPrice);
  const rrRatio = slDistance > 0 ? (tpDistance / slDistance).toFixed(2) : '0';
  const positionUnits = slDistance > 0 ? (riskAmount / slDistance).toFixed(4) : '0';
  const estimatedProfit = (Number(positionUnits) * tpDistance).toFixed(2);

  const msccPillars = [
    {
      letter: 'M',
      title: 'Mirror Symmetry',
      subtitle: 'Price Symmetry & Angle Reflection',
      desc: 'Price moves in fractal mirror waves. When an impulse phase completes, the market constructs an inverted mirror reaction zone before trend continuation.',
      accent: 'border-cyan-500/40 text-cyan-400 bg-cyan-950/20',
    },
    {
      letter: 'S',
      title: 'Smart Liquidity',
      subtitle: 'Order Flow & Stop Hunting',
      desc: 'Institutions engineer liquidity sweeps below equal lows or above equal highs. MSCC detects the fake breakout trap and rides institutional volume.',
      accent: 'border-amber-500/40 text-amber-400 bg-amber-950/20',
    },
    {
      letter: 'C',
      title: 'Code Fractals',
      subtitle: 'Time & Price Harmony',
      desc: 'Cracking the recurring mathematical patterns across 1m, 15m, 1h, and 4h charts to find high-confluence ignition points.',
      accent: 'border-indigo-500/40 text-indigo-400 bg-indigo-950/20',
    },
    {
      letter: 'C',
      title: 'Crackr Matrix',
      subtitle: 'Execution & Invalidation Rules',
      desc: 'Clear, zero-guesswork entry trigger: Enter on liquidity reclaim with minimum 1:3 Risk-to-Reward ratio and tight mathematical stop loss.',
      accent: 'border-emerald-500/40 text-emerald-400 bg-emerald-950/20',
    },
  ];

  const handleRunBacktest = () => {
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.6 },
    });
    setSimulationResult(
      `MSCC Code Successfully Cracked on ${selectedAsset}! Entry: $${entryPrice} | Target: $${takeProfit} | Realized R:R: 1:${rrRatio} | Profit: +$${estimatedProfit} (+${((Number(estimatedProfit)/balance)*100).toFixed(1)}% on Account)`
    );
  };

  // Min/Max for Candlestick drawing
  const { minPrice, maxPrice } = useMemo(() => {
    let min = Infinity;
    let max = -Infinity;
    currentCandles.forEach((c) => {
      if (c.low < min) min = c.low;
      if (c.high > max) max = c.high;
    });
    const pad = (max - min) * 0.1;
    return { minPrice: min - pad, maxPrice: max + pad };
  }, [currentCandles]);

  const svgHeight = 260;
  const svgWidth = 640;

  const getY = (price: number) => {
    return svgHeight - ((price - minPrice) / (maxPrice - minPrice)) * svgHeight;
  };

  return (
    <div className="space-y-10">
      
      {/* Header Banner with Bold Typography */}
      <div className="relative p-8 sm:p-12 rounded-3xl bg-[#151515] border border-white/10 overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse"></span>
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-orange-500 font-bold">
                PROPRIETARY TRADING ALGORITHM
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono text-emerald-400 font-bold uppercase flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                Certified Crypto Analyst (CCA 349/2025)
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black uppercase italic tracking-tighter text-white">
              MSCC: <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-300">Mirror Smart Code Crackr</span>
            </h1>

            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Developed directly by Sattu at 17 to decode Crypto and Forex institutional market symmetry, order block traps, and mathematical code mechanics with zero emotional guesswork.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setIsCertModalOpen(true)}
              className="px-5 py-3 rounded-full bg-[#0A0A0A] hover:bg-white hover:text-black border border-white/10 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-xl"
            >
              <Award className="w-4 h-4 text-orange-400" />
              <span>View Certificate</span>
            </button>
            <button
              onClick={() => onPlayTTS(msccTTSAudioScript, 'MSCC Concept Breakdown', 'Charon')}
              className="px-6 py-3 rounded-full bg-white text-black font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl hover:bg-orange-400 transition-colors"
            >
              <Volume2 className="w-4 h-4" />
              <span>Audio Breakdown</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Pillars of MSCC */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-orange-500 font-bold">
            THE 4 ALGORITHMIC PILLARS
          </span>
          <span className="text-xs font-mono text-gray-500">M • S • C • C</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {msccPillars.map((p, idx) => (
            <div
              key={idx}
              className="p-7 rounded-3xl bg-[#151515] border border-white/10 hover:border-orange-500/40 transition-all duration-300 flex flex-col justify-between space-y-6"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-4xl font-black italic text-orange-500">{p.letter}</span>
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/10 text-gray-300">
                    0{idx + 1}
                  </span>
                </div>
                <h2 className="text-xl font-black italic uppercase text-white tracking-tight">{p.title}</h2>
                <p className="text-xs text-orange-400 font-mono mt-0.5 mb-3">{p.subtitle}</p>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">{p.desc}</p>
              </div>
              
              <button
                onClick={() => onPlayTTS(`${p.title}: ${p.subtitle}. ${p.desc}`, `MSCC Pillar: ${p.title}`, 'Charon')}
                className="pt-3 border-t border-white/10 text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 text-gray-400 hover:text-orange-400 transition-colors"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Listen Audio</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Candlestick Chart & MSCC Visualizer */}
      <div className="p-8 sm:p-10 rounded-3xl bg-[#151515] border border-white/10 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-orange-500" />
              <h2 className="text-2xl font-black italic uppercase text-white tracking-tight">Interactive MSCC Chart Engine</h2>
            </div>
            <p className="text-xs font-mono text-gray-400 mt-1">Real-time Visualization of Symmetry &amp; Liquidity Sweeps</p>
          </div>

          {/* Asset Switcher */}
          <div className="flex flex-wrap gap-2">
            {(['BTC/USDT', 'ETH/USDT', 'EUR/USD', 'SOL/USDT'] as const).map((pair) => (
              <button
                key={pair}
                onClick={() => setSelectedAsset(pair)}
                className={`px-4 py-2 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all ${
                  selectedAsset === pair
                    ? 'bg-orange-500 text-black shadow-lg shadow-orange-500/20'
                    : 'bg-[#0A0A0A] text-gray-400 hover:text-white border border-white/10'
                }`}
              >
                {pair}
              </button>
            ))}
          </div>
        </div>

        {/* Toggle Overlays */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setShowMirrorSymmetry(!showMirrorSymmetry)}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border flex items-center gap-2 transition-colors ${
              showMirrorSymmetry
                ? 'bg-orange-500/20 border-orange-500 text-orange-400'
                : 'bg-[#0A0A0A] border-white/10 text-gray-500'
            }`}
          >
            <CheckCircle2 className={`w-3.5 h-3.5 ${showMirrorSymmetry ? 'text-orange-400' : 'text-gray-600'}`} />
            <span>Mirror Symmetry Axis</span>
          </button>

          <button
            onClick={() => setShowLiquidityZone(!showLiquidityZone)}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border flex items-center gap-2 transition-colors ${
              showLiquidityZone
                ? 'bg-yellow-500/20 border-yellow-500 text-yellow-300'
                : 'bg-[#0A0A0A] border-white/10 text-gray-500'
            }`}
          >
            <CheckCircle2 className={`w-3.5 h-3.5 ${showLiquidityZone ? 'text-yellow-400' : 'text-gray-600'}`} />
            <span>Smart Liquidity Sweep Zone</span>
          </button>

          <button
            onClick={() => setShowCodeFractals(!showCodeFractals)}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border flex items-center gap-2 transition-colors ${
              showCodeFractals
                ? 'bg-white/20 border-white text-white'
                : 'bg-[#0A0A0A] border-white/10 text-gray-500'
            }`}
          >
            <CheckCircle2 className={`w-3.5 h-3.5 ${showCodeFractals ? 'text-white' : 'text-gray-600'}`} />
            <span>MSCC Buy Signal</span>
          </button>
        </div>

        {/* SVG Chart Stage */}
        <div className="relative w-full overflow-x-auto bg-[#0A0A0A] rounded-2xl border border-white/10 p-6">
          <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="w-full h-auto min-w-[560px] select-none"
          >
            {/* Grid lines */}
            <line x1="0" y1={svgHeight * 0.25} x2={svgWidth} y2={svgHeight * 0.25} stroke="#222" strokeDasharray="4" />
            <line x1="0" y1={svgHeight * 0.5} x2={svgWidth} y2={svgHeight * 0.5} stroke="#222" strokeDasharray="4" />
            <line x1="0" y1={svgHeight * 0.75} x2={svgWidth} y2={svgHeight * 0.75} stroke="#222" strokeDasharray="4" />

            {/* Liquidity Sweep Box */}
            {showLiquidityZone && (
              <g>
                <rect
                  x="180"
                  y={getY(minPrice + (maxPrice - minPrice) * 0.25)}
                  width="140"
                  height={svgHeight * 0.2}
                  fill="rgba(245, 158, 11, 0.12)"
                  stroke="rgba(245, 158, 11, 0.6)"
                  strokeDasharray="3"
                  rx="6"
                />
                <text x="185" y={getY(minPrice + (maxPrice - minPrice) * 0.25) + 16} fill="#fbbf24" fontSize="10" fontFamily="monospace" fontWeight="bold">
                  Institutional Liquidity Sweep
                </text>
              </g>
            )}

            {/* Mirror Symmetry Axis Line */}
            {showMirrorSymmetry && (
              <g>
                <line
                  x1="180"
                  y1="20"
                  x2="180"
                  y2={svgHeight - 20}
                  stroke="#f97316"
                  strokeWidth="2"
                  strokeDasharray="6"
                />
                <text x="185" y="35" fill="#f97316" fontSize="10" fontFamily="monospace" fontWeight="bold">
                  Symmetry Axis (MSCC Mirror)
                </text>
              </g>
            )}

            {/* Candlesticks */}
            {currentCandles.map((candle, idx) => {
              const candleWidth = 24;
              const spacing = svgWidth / (currentCandles.length + 1);
              const x = (idx + 1) * spacing;
              const isBullish = candle.close >= candle.open;
              const top = getY(Math.max(candle.open, candle.close));
              const bottom = getY(Math.min(candle.open, candle.close));
              const height = Math.max(bottom - top, 2);
              const highY = getY(candle.high);
              const lowY = getY(candle.low);
              const color = isBullish ? '#10b981' : '#f43f5e';

              return (
                <g key={idx} className="cursor-pointer hover:opacity-80 transition-opacity">
                  {/* Wick */}
                  <line
                    x1={x}
                    y1={highY}
                    x2={x}
                    y2={lowY}
                    stroke={color}
                    strokeWidth="2"
                  />
                  {/* Body */}
                  <rect
                    x={x - candleWidth / 2}
                    y={top}
                    width={candleWidth}
                    height={height}
                    fill={color}
                    rx="3"
                  />

                  {/* Signal Tag */}
                  {candle.signal === 'BUY' && showCodeFractals && (
                    <g>
                      <circle cx={x} cy={lowY + 16} r="12" fill="#f97316" />
                      <text x={x} y={lowY + 20} fill="#000000" fontSize="9" fontWeight="900" textAnchor="middle">
                        BUY
                      </text>
                      <text x={x} y={lowY + 36} fill="#fb923c" fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                        MSCC Signal
                      </text>
                    </g>
                  )}

                  {/* Time label */}
                  <text x={x} y={svgHeight - 6} fill="#666" fontSize="9" fontFamily="monospace" textAnchor="middle">
                    {candle.time}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Real-time Code Crackr Simulator Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-[#0A0A0A] border border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-400">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-black italic uppercase text-white">Live MSCC Code Simulator</h3>
              <p className="text-xs font-mono text-gray-400">Evaluate setup confluence across {selectedAsset}</p>
            </div>
          </div>

          <button
            onClick={handleRunBacktest}
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 to-yellow-400 hover:scale-105 text-black font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg transition-all"
          >
            <Zap className="w-4 h-4" />
            <span>Crack The Code (Test Setup)</span>
          </button>
        </div>

        {simulationResult && (
          <div className="p-5 rounded-2xl bg-[#111] border-l-4 border-orange-500 text-orange-400 text-xs font-mono leading-relaxed">
            {simulationResult}
          </div>
        )}
      </div>

      {/* MSCC Risk & Position Size Calculator */}
      <div className="p-8 sm:p-10 rounded-3xl bg-[#151515] border border-white/10 space-y-6">
        <div className="flex items-center gap-3 border-b border-white/10 pb-6">
          <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-400">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-2xl font-black italic uppercase text-white tracking-tight">MSCC Position &amp; Risk Matrix Calculator</h2>
            <p className="text-xs font-mono text-gray-400 mt-0.5">Calculate mathematical position sizing with zero emotional guesswork</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div>
            <label className="text-[10px] font-mono uppercase text-gray-400 font-bold block mb-1">Account Balance ($)</label>
            <input
              type="number"
              value={balance}
              onChange={(e) => setBalance(Number(e.target.value))}
              className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white font-mono focus:border-orange-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-[10px] font-mono uppercase text-gray-400 font-bold block mb-1">Risk Per Trade (%)</label>
            <input
              type="number"
              step="0.5"
              value={riskPercent}
              onChange={(e) => setRiskPercent(Number(e.target.value))}
              className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white font-mono focus:border-orange-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-[10px] font-mono uppercase text-gray-400 font-bold block mb-1">Entry Price ($)</label>
            <input
              type="number"
              value={entryPrice}
              onChange={(e) => setEntryPrice(Number(e.target.value))}
              className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white font-mono focus:border-orange-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-[10px] font-mono uppercase text-gray-400 font-bold block mb-1">Stop Loss ($)</label>
            <input
              type="number"
              value={stopLoss}
              onChange={(e) => setStopLoss(Number(e.target.value))}
              className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-rose-400 font-mono focus:border-rose-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-[10px] font-mono uppercase text-gray-400 font-bold block mb-1">Take Profit Target ($)</label>
            <input
              type="number"
              value={takeProfit}
              onChange={(e) => setTakeProfit(Number(e.target.value))}
              className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-emerald-400 font-mono focus:border-emerald-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Matrix Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
          <div className="p-5 rounded-2xl bg-[#0A0A0A] border border-white/10">
            <span className="text-[10px] font-mono uppercase text-gray-400 font-bold block">Total Risk ($)</span>
            <span className="text-2xl font-black font-mono text-rose-400 mt-1 block">${riskAmount.toFixed(2)}</span>
            <span className="text-[10px] font-mono text-gray-500">Max allowable loss</span>
          </div>

          <div className="p-5 rounded-2xl bg-[#0A0A0A] border border-white/10">
            <span className="text-[10px] font-mono uppercase text-gray-400 font-bold block">MSCC Risk:Reward</span>
            <span className="text-2xl font-black font-mono text-orange-400 mt-1 block">1:{rrRatio}</span>
            <span className="text-[10px] font-mono text-orange-500 font-bold">{Number(rrRatio) >= 3 ? '✓ HIGH MSCC GRADE' : 'MODERATE'}</span>
          </div>

          <div className="p-5 rounded-2xl bg-[#0A0A0A] border border-white/10">
            <span className="text-[10px] font-mono uppercase text-gray-400 font-bold block">Position Size (Units)</span>
            <span className="text-2xl font-black font-mono text-yellow-300 mt-1 block">{positionUnits}</span>
            <span className="text-[10px] font-mono text-gray-500">Auto-hedged lots</span>
          </div>

          <div className="p-5 rounded-2xl bg-[#0A0A0A] border border-white/10">
            <span className="text-[10px] font-mono uppercase text-gray-400 font-bold block">Target Profit ($)</span>
            <span className="text-2xl font-black font-mono text-emerald-400 mt-1 block">+${estimatedProfit}</span>
            <span className="text-[10px] font-mono text-emerald-500 font-bold">+{((Number(estimatedProfit)/balance)*100).toFixed(1)}% RETURN</span>
          </div>
        </div>
      </div>

      {/* Certificate Modal */}
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
                alt="Certified Crypto Analyst Certificate Sattu Singer X"
                referrerPolicy="no-referrer"
                className="max-h-[70vh] w-auto object-contain rounded-xl"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 text-xs font-mono text-gray-400">
              <span>Presented by Technical Kingdom • Signed by Rohan Sharma</span>
              <button
                onClick={() => setIsCertModalOpen(false)}
                className="px-4 py-2 rounded-full bg-orange-500 text-black font-bold uppercase tracking-wider hover:bg-orange-400 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
