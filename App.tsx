import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Envelope from './components/Envelope.tsx';
import Firework from './components/Firework.tsx';
import Snow from './components/Snow.tsx';

const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number; char: string }[]>([]);

  const imageUrl = "https://media.discordapp.net/attachments/773103472127508504/1452838010826653706/IMG_20251223_023551_306.jpg?ex=694b4456&is=6949f2d6&hm=25909b2111bf74a30bf33f2a014dbd59e5019b1eb81b4fc8096ad5f3b6a9aeb6&=&format=webp&width=688&height=1224";

  const message = useMemo(() => `My Dearest Nutty,

As 2026 begins, I’ve been thinking about every smile you’ve given me. You aren't just a part of my life—you are the rhythm of my heart and the light that guides me home.

Last year was beautiful, but with you, 2026 will be our best chapter yet. I want to be the reason you wake up happy every day. I want to be the one who supports your dreams and loves you more with every second.

Thank you for being my peace and my favorite person in the world. You are my forever, Nutty.

Happy New Year, my love. Forever yours.`, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (Math.random() > 0.9) {
      const chars = ['✨', '💖', '⭐', '🥂'];
      const newSparkle = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
        char: chars[Math.floor(Math.random() * chars.length)]
      };
      setSparkles(prev => [...prev.slice(-15), newSparkle]);
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
      setTimeout(() => setShowFireworks(true), 1200);
    } else {
      setShowFireworks(false);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#020617] flex flex-col items-center justify-center">
      {/* Background Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-emerald-900/10 blur-[150px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-rose-900/10 blur-[150px] rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <Snow />
      {showFireworks && <Firework />}

      {/* Sparkles */}
      {sparkles.map(s => (
        <div 
          key={s.id}
          className="fixed pointer-events-none text-xl animate-fade-up"
          style={{ left: s.x, top: s.y, transform: 'translate(-50%, -50%)' }}
        >
          {s.char}
        </div>
      ))}

      {/* Header UI */}
      <div className={`z-10 text-center transition-all duration-[1200ms] ${isOpen ? 'translate-y-[-45vh] opacity-0 scale-50 blur-lg' : 'translate-y-0 opacity-100 scale-100'}`}>
        <div className="flex items-center justify-center gap-4 mb-4">
          <span className="text-3xl animate-bounce">🎇</span>
          <p className="text-amber-400 font-bold tracking-[0.6em] uppercase text-xs">A New Chapter</p>
          <span className="text-3xl animate-bounce" style={{ animationDelay: '0.2s' }}>🎇</span>
        </div>
        <h1 className="text-8xl md:text-[11rem] font-['Great_Vibes'] gold-shimmer drop-shadow-2xl leading-none mb-6">
          Nutty
        </h1>
        <p className="text-white/30 font-bold tracking-[0.8em] uppercase text-[10px] md:text-xs">My Forever Masterpiece • 2026</p>
      </div>

      {/* The Interaction */}
      <div className="relative z-20 mt-8">
        <Envelope 
          isOpen={isOpen} 
          onToggle={toggleOpen} 
          message={message} 
          imageUrl={imageUrl} 
        />
      </div>

      {/* Prompt */}
      {!isOpen && (
        <div className="mt-24 z-30 animate-pulse flex flex-col items-center gap-4 group cursor-pointer" onClick={toggleOpen}>
          <div className="bg-white/5 backdrop-blur-md px-10 py-3 rounded-full border border-white/10 group-hover:border-amber-500/50 transition-colors">
            <span className="text-amber-200/60 font-bold tracking-[0.5em] text-[10px] uppercase">Tap to open</span>
          </div>
          <div className="text-5xl group-hover:scale-125 transition-transform duration-300">💌</div>
        </div>
      )}

      <footer className="absolute bottom-8 w-full text-center text-white/5 font-bold tracking-[2.5em] text-[9px] uppercase pointer-events-none">
        Nutty x You • Infinity
      </footer>

      <style>{`
        @keyframes fade-up {
          0% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          100% { opacity: 0; transform: translate(-50%, -200%) scale(0.5); }
        }
        .animate-fade-up { animation: fade-up 1s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default App;