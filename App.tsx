import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Envelope from './components/Envelope.tsx';
import Firework from './components/Firework.tsx';
import Snow from './components/Snow.tsx';

const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<{ id: number, x: number, y: number, char: string }[]>([]);
  
  const imageUrl = "https://media.discordapp.net/attachments/773103472127508504/1452838010826653706/IMG_20251223_023551_306.jpg?ex=694b4456&is=6949f2d6&hm=25909b2111bf74a30bf33f2a014dbd59e5019b1eb81b4fc8096ad5f3b6a9aeb6&=&format=webp&width=688&height=1224";

  const message = useMemo(() => `To my most precious Nutty,

As the clock ticks towards 2026, I found myself thinking about every single smile you've given me. You aren't just a part of my life—you are the rhythm that keeps my heart beating and the light that guides me home.

This past year was beautiful, but with you by my side, I know 2026 is going to be our most legendary chapter yet. I want to be the reason you wake up with a smile every morning. I want to be the one who listens to your dreams and helps you chase them until they’re real.

Thank you for being my peace, my chaos, and my favorite person in the entire universe. You are my forever girl, and I am so lucky to call you mine.

Happy New Year, Nutty. I love you more than words could ever explain.`, []);
  
  const handleMouseMove = useCallback((e: MouseEvent) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
    
    // Add sparkles on move
    if (Math.random() > 0.85) {
      const chars = ['✨', '💖', '⭐', '❄️', '🥂'];
      const newParticle = {
        id: Math.random(),
        x: e.clientX,
        y: e.clientY,
        char: chars[Math.floor(Math.random() * chars.length)]
      };
      setParticles(prev => [...prev.slice(-20), newParticle]);
      setTimeout(() => {
        setParticles(prev => prev.filter(p => p.id !== newParticle.id));
      }, 1200);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  const toggleEnvelope = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      // Small delay for fireworks to make it feel like a celebration of opening
      setTimeout(() => setShowFireworks(true), 1200);
    } else {
      setShowFireworks(false);
    }
  };

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center bg-[#020617] p-4 overflow-hidden touch-none">
      {/* Background Layers */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,_#0f172a_0%,_#020617_80%)] opacity-100"></div>
        <div className={`absolute inset-0 bg-rose-950/20 transition-opacity duration-1000 ${isOpen ? 'opacity-60' : 'opacity-0'}`}></div>
        
        {/* Animated Orbs */}
        <div className="absolute top-[-15%] left-[-10%] w-[50%] h-[50%] bg-emerald-900/10 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-15%] right-[-10%] w-[50%] h-[50%] bg-rose-900/10 blur-[120px] rounded-full animate-pulse delay-1000"></div>
      </div>

      <Snow />
      {showFireworks && <Firework />}

      {/* Cursor Magic */}
      {particles.map(p => (
        <div 
          key={p.id}
          className="fixed pointer-events-none text-xl md:text-2xl animate-fade-out-up shadow-white/20"
          style={{ left: p.x, top: p.y, transform: 'translate(-50%, -50%)' }}
        >
          {p.char}
        </div>
      ))}

      {/* Main Experience UI */}
      <div className={`z-10 text-center transition-all duration-[1500ms] cubic-bezier(0.34, 1.56, 0.64, 1) ${isOpen ? 'translate-y-[-40vh] opacity-0 scale-50 blur-xl' : 'translate-y-0 opacity-100 scale-100'} mb-12`}>
        <div className="flex items-center justify-center gap-4 mb-3">
          <span className="text-3xl animate-bounce">🎇</span>
          <p className="text-amber-400 font-['Montserrat'] tracking-[0.5em] uppercase text-sm font-black drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]">Welcome to 2026</p>
          <span className="text-3xl animate-bounce delay-150">🎇</span>
        </div>
        <h1 className="text-8xl md:text-[12rem] font-['Great_Vibes'] gold-shimmer drop-shadow-[0_10px_40px_rgba(0,0,0,0.9)] leading-none mb-6">
          Nutty
        </h1>
        <div className="flex items-center justify-center gap-6">
          <div className="h-[2px] w-20 bg-gradient-to-r from-transparent to-amber-500/50"></div>
          <p className="text-white/40 font-['Montserrat'] tracking-[0.8em] uppercase text-[10px] md:text-xs italic font-bold">A Forever Masterpiece</p>
          <div className="h-[2px] w-20 bg-gradient-to-l from-transparent to-amber-500/50"></div>
        </div>
      </div>

      {/* Interactive Heart of the App */}
      <div className="relative z-20 flex items-center justify-center">
        <Envelope 
          isOpen={isOpen} 
          onToggle={toggleEnvelope} 
          message={message}
          imageUrl={imageUrl}
        />
      </div>

      {/* Interaction Prompt */}
      {!isOpen && (
        <div className="mt-24 z-30 animate-pulse flex flex-col items-center gap-4 group cursor-pointer" onClick={toggleEnvelope}>
          <div className="bg-white/5 backdrop-blur-lg px-8 py-3 rounded-full border border-white/10 hover:border-amber-500/50 transition-all duration-300">
            <p className="text-amber-200/70 font-['Montserrat'] tracking-[0.6em] text-[10px] md:text-xs uppercase font-black">Open Your Heart</p>
          </div>
          <div className="text-5xl group-hover:scale-125 transition-transform duration-300">💌</div>
        </div>
      )}

      <footer className="absolute bottom-8 w-full text-center text-white/5 font-['Montserrat'] tracking-[2em] text-[9px] uppercase font-black pointer-events-none">
        Nutty & You • Infinity • 2026
      </footer>

      <style>{`
        @keyframes fade-out-up {
          0% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          100% { opacity: 0; transform: translate(-50%, -150%) scale(0.5) rotate(45deg); }
        }
        .animate-fade-out-up {
          animation: fade-out-up 1.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default App;