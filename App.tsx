import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Envelope from './components/Envelope.tsx';
import Firework from './components/Firework.tsx';
import Snow from './components/Snow.tsx';

const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number; char: string; size: number }[]>([]);

  const imageUrl = "https://media.discordapp.net/attachments/773103472127508504/1452838010826653706/IMG_20251223_023551_306.jpg?ex=694b4456&is=6949f2d6&hm=25909b2111bf74a30bf33f2a014dbd59e5019b1eb81b4fc8096ad5f3b6a9aeb6&=&format=webp&width=688&height=1224";

  const message = useMemo(() => `My Dearest Nutty,

As 2026 begins, I’ve been thinking about every smile you’ve given me. You aren't just a part of my life—you are the rhythm of my heart and the light that guides me home.

Last year was beautiful, but with you by my side, I know 2026 will be our best chapter yet. I want to be the reason you wake up happy every single day. I want to be the one who supports your dreams and loves you more with every passing second.

Thank you for being my peace, my favorite chaos, and my favorite person in the entire world. You are my forever, Nutty.

Happy New Year, my love. Forever and always yours.`, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (Math.random() > 0.85) {
      const chars = ['✨', '💖', '⭐', '🥂', '❄️'];
      const newSparkle = {
        id: Math.random(),
        x: e.clientX,
        y: e.clientY,
        char: chars[Math.floor(Math.random() * chars.length)],
        size: Math.random() * 20 + 15
      };
      setSparkles(prev => [...prev.slice(-12), newSparkle]);
      setTimeout(() => {
        setSparkles(prev => prev.filter(p => p.id !== newSparkle.id));
      }, 1000);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setTimeout(() => setShowFireworks(true), 1000);
    } else {
      setShowFireworks(false);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#020617] flex flex-col items-center justify-center select-none">
      {/* Dynamic Background Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] w-[70%] h-[70%] bg-emerald-900/10 blur-[180px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[70%] h-[70%] bg-rose-900/10 blur-[180px] rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none"></div>
      </div>

      <Snow />
      {showFireworks && <Firework />}

      {/* Interactive Cursor Trail */}
      {sparkles.map(s => (
        <div 
          key={s.id}
          className="fixed pointer-events-none animate-sparkle"
          style={{ 
            left: s.x, 
            top: s.y, 
            fontSize: `${s.size}px`,
            transform: 'translate(-50%, -50%)',
            filter: 'drop-shadow(0 0 10px white)'
          }}
        >
          {s.char}
        </div>
      ))}

      {/* Main Experience Layer */}
      <div className={`z-10 text-center transition-all duration-[1200ms] cubic-bezier(0.34, 1.56, 0.64, 1) ${isOpen ? 'translate-y-[-40vh] opacity-0 scale-50 blur-xl' : 'translate-y-0 opacity-100 scale-100'}`}>
        <div className="flex items-center justify-center gap-6 mb-4">
          <span className="text-4xl animate-bounce">🎇</span>
          <div className="flex flex-col">
            <p className="text-amber-400 font-black tracking-[0.6em] uppercase text-[10px] md:text-xs">A New Beginning</p>
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-amber-500/50 to-transparent mt-1"></div>
          </div>
          <span className="text-4xl animate-bounce" style={{ animationDelay: '0.3s' }}>🎇</span>
        </div>
        
        <h1 className="text-8xl md:text-[12rem] font-['Great_Vibes'] gold-shimmer drop-shadow-[0_10px_40px_rgba(0,0,0,0.8)] leading-none mb-6">
          Nutty
        </h1>
        
        <div className="flex items-center justify-center gap-4">
          <p className="text-white/20 font-bold tracking-[1em] uppercase text-[9px] md:text-[11px] whitespace-nowrap">Infinity & Beyond • 2026</p>
        </div>
      </div>

      {/* The Central Gift */}
      <div className="relative z-20 mt-4 md:mt-8 flex items-center justify-center">
        <Envelope 
          isOpen={isOpen} 
          onToggle={toggleOpen} 
          message={message} 
          imageUrl={imageUrl} 
        />
      </div>

      {/* CTA Prompt */}
      {!isOpen && (
        <div className="absolute bottom-24 md:bottom-32 z-30 animate-pulse flex flex-col items-center gap-6 group cursor-pointer" onClick={toggleOpen}>
          <div className="bg-white/5 backdrop-blur-xl px-12 py-4 rounded-full border border-white/10 group-hover:border-amber-500/50 transition-all duration-500 shadow-2xl">
            <span className="text-amber-100/70 font-black tracking-[0.8em] text-[10px] uppercase">Open Your Heart</span>
          </div>
          <div className="text-6xl group-hover:scale-125 transition-transform duration-500 filter drop-shadow-[0_0_15px_rgba(251,191,36,0.3)]">💌</div>
        </div>
      )}

      <footer className="absolute bottom-8 w-full text-center text-white/5 font-black tracking-[2.5em] text-[8px] uppercase pointer-events-none">
        For Nutty with Love
      </footer>

      <style>{`
        @keyframes sparkle {
          0% { opacity: 1; transform: translate(-50%, -50%) scale(0.5) rotate(0deg); }
          50% { opacity: 1; transform: translate(-50%, -100%) scale(1.2) rotate(180deg); }
          100% { opacity: 0; transform: translate(-50%, -200%) scale(0.2) rotate(360deg); }
        }
        .animate-sparkle { animation: sparkle 1s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
      `}</style>
    </div>
  );
};

export default App;