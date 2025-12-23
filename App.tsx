
import React, { useState, useEffect, useCallback } from 'react';
import Envelope from './components/Envelope.tsx';
import Firework from './components/Firework.tsx';
import Snow from './components/Snow.tsx';

const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [clicks, setClicks] = useState<{ id: number, x: number, y: number, type: string }[]>([]);
  
  // ==================================================================================
  // 🖼️ YOUR PHOTO URL
  // Replace the link below with your own image link!
  // ==================================================================================
  const imageUrl = "https://media.discordapp.net/attachments/773103472127508504/1452838010826653706/IMG_20251223_023551_306.jpg?ex=694b4456&is=6949f2d6&hm=25909b2111bf74a30bf33f2a014dbd59e5019b1eb81b4fc8096ad5f3b6a9aeb6&=&format=webp&width=688&height=1224";

  // ==================================================================================
  // ✍️ THE LETTER TEXT
  // Edit the words inside the backticks ( ` ) below to change the letter content.
  // ==================================================================================
  const message = `My dearest Nutty,

As the magic of Christmas lingers and the clock ticks toward 2026, I find myself thinking only of you.

This past year has been the greatest gift I've ever received, wrapped in your laughter and tied with your beautiful smile. Every moment we shared has become a glowing ornament on the tree of my memories.

You are my celestial light, my holiday joy, and the dream I never want to wake from. May our 2026 be filled with even more warmth, more love, and more us.

Merry Christmas and Happy New Year, my love.`;
  
  const handleMouseMove = useCallback((e: MouseEvent) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    const types = ['❤️', '✨', '⭐', '❄️'];
    const newClick = { 
      id: Date.now(), 
      x: e.clientX, 
      y: e.clientY, 
      type: types[Math.floor(Math.random() * types.length)] 
    };
    setClicks(prev => [...prev.slice(-12), newClick]);
    setTimeout(() => {
      setClicks(prev => prev.filter(c => c.id !== newClick.id));
    }, 1000);
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  const toggleEnvelope = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setTimeout(() => setShowFireworks(true), 1500);
    } else {
      setShowFireworks(false);
    }
  };

  return (
    <div 
      className="relative w-full h-screen flex flex-col items-center justify-center bg-[#020617] p-4 overflow-hidden touch-none"
      onClick={handleClick}
    >
      {/* Festive Dynamic Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,_#064e3b_0%,_#450a0a_40%,_#020617_100%)] opacity-80"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
        
        {/* Subtle Glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-900/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-rose-900/20 blur-[120px] rounded-full"></div>
      </div>

      <Snow />

      {/* Festive Particles on Click */}
      {clicks.map(click => (
        <div 
          key={click.id}
          className="fixed pointer-events-none animate-[ping_1.2s_ease-out_infinite] z-[9999] text-2xl md:text-4xl opacity-90 drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
          style={{ left: click.x - 20, top: click.y - 20 }}
        >
          {click.type}
        </div>
      ))}

      {/* Magic Festive Cursor */}
      <div 
        className="fixed w-16 h-16 z-[9999] pointer-events-none transition-transform duration-75 ease-out hidden md:flex items-center justify-center" 
        style={{ left: cursorPos.x - 32, top: cursorPos.y - 32 }} 
      >
        <div className="relative">
          <div className="absolute inset-0 animate-spin-slow text-amber-300/30 text-6xl">✦</div>
          <div className="text-white text-3xl animate-pulse drop-shadow-[0_0_15px_#fff]">💖</div>
        </div>
      </div>

      {showFireworks && <Firework />}

      {/* Festive Title */}
      <div className={`z-10 text-center transition-all duration-1000 ease-in-out ${isOpen ? 'translate-y-[-30vh] opacity-20 scale-50 blur-[4px]' : 'translate-y-0 opacity-100 scale-100'} mb-8 pointer-events-none`}>
        <div className="flex items-center justify-center gap-2 mb-[-20px]">
          <span className="text-3xl animate-bounce delay-75">🎄</span>
          <span className="text-3xl animate-bounce delay-150">🎁</span>
          <span className="text-3xl animate-bounce delay-300">🎀</span>
        </div>
        <h1 className="text-7xl md:text-[12rem] font-['Great_Vibes'] gold-shimmer drop-shadow-[0_10px_25px_rgba(0,0,0,1)] leading-tight py-4">
          Nutty
        </h1>
        <div className="flex items-center justify-center gap-6 mt-2">
          <span className="h-[2px] w-12 md:w-48 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></span>
          <p className="text-amber-100/80 font-['Montserrat'] tracking-[0.8em] uppercase text-[10px] md:text-sm font-black italic drop-shadow-lg">
            A 2026 Masterpiece
          </p>
          <span className="h-[2px] w-12 md:w-48 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></span>
        </div>
      </div>

      {/* Envelope Section */}
      <div className="relative z-20 flex items-center justify-center">
        <Envelope 
          isOpen={isOpen} 
          onToggle={toggleEnvelope} 
          message={message}
          imageUrl={imageUrl}
        />
      </div>

      {/* Interaction Hint */}
      <div className={`mt-24 md:mt-32 z-30 transition-all duration-500 ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <div className="flex flex-col items-center gap-4">
          <div className="bg-white/5 backdrop-blur-md px-6 py-2 rounded-full border border-white/10 shadow-2xl">
            <p className="text-amber-200/90 font-['Montserrat'] tracking-[0.5em] text-[10px] md:text-xs uppercase font-black animate-pulse text-center">
              Touch the Seal, My Nutty
            </p>
          </div>
          <div className="text-4xl animate-bounce mt-2">👇</div>
        </div>
      </div>

      <footer className="absolute bottom-4 w-full text-center text-amber-200/20 font-['Montserrat'] tracking-[1em] text-[8px] md:text-[11px] uppercase font-black select-none pointer-events-none">
        Christmas • Love • New Year 2026
      </footer>
    </div>
  );
};

export default App;
