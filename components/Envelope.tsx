import React, { useState } from 'react';

interface Props {
  isOpen: boolean;
  onToggle: () => void;
  message: string;
  imageUrl: string;
}

const Envelope: React.FC<Props> = ({ isOpen, onToggle, message, imageUrl }) => {
  const [focus, setFocus] = useState<'none' | 'letter' | 'photo'>('none');

  const handleItemClick = (mode: 'letter' | 'photo', e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isOpen) return;
    setFocus(focus === mode ? 'none' : mode);
  };

  return (
    <div className="relative w-[300px] h-[200px] md:w-[500px] md:h-[350px] perspective-1500 flex items-center justify-center">
      
      {/* Backdrop for Focus Mode */}
      <div 
        className={`fixed inset-0 bg-black/95 backdrop-blur-xl transition-opacity duration-700 z-[100] ${focus !== 'none' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setFocus('none')}
      />

      {/* The Letter */}
      <div 
        onClick={(e) => handleItemClick('letter', e)}
        className={`absolute transition-all duration-1000 cubic-bezier(0.19, 1, 0.22, 1) cursor-pointer
          ${isOpen 
            ? (focus === 'letter' 
                ? 'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] md:w-[550px] h-[80vh] z-[110] rotate-0 shadow-[0_50px_100px_rgba(0,0,0,0.8)]' 
                : 'top-1/2 left-1/2 -translate-x-[95%] -translate-y-[85%] w-[220px] md:w-[380px] h-[280px] md:h-[480px] z-[30] rotate-[-8deg] shadow-2xl hover:rotate-[-4deg] opacity-100')
            : 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-0 scale-50 z-0 pointer-events-none'}
        `}
      >
        <div className="w-full h-full bg-[#fffdf0] p-6 md:p-12 border border-amber-900/10 flex flex-col shadow-inner">
          <div className="text-amber-900/20 italic text-2xl mb-4 text-center">2026</div>
          <h2 className="font-['Great_Vibes'] text-rose-900 text-3xl md:text-5xl mb-6 text-center border-b border-rose-100 pb-4">Dearest Nutty,</h2>
          <div className="flex-grow overflow-y-auto scrollbar-hide px-2">
            <p className="font-['Dancing_Script'] text-slate-800 text-xl md:text-3xl leading-relaxed whitespace-pre-wrap">
              {message}
            </p>
          </div>
          <div className="mt-8 text-center font-['Dancing_Script'] text-2xl text-rose-800 font-bold italic">Always yours.</div>
        </div>
      </div>

      {/* The Photo */}
      <div 
        onClick={(e) => handleItemClick('photo', e)}
        className={`absolute bg-white p-3 pb-12 md:p-5 md:pb-20 transition-all duration-1000 cubic-bezier(0.19, 1, 0.22, 1) cursor-pointer
          ${isOpen 
            ? (focus === 'photo' 
                ? 'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] md:w-[450px] aspect-[3/4] z-[110] rotate-0 shadow-[0_50px_100px_rgba(0,0,0,0.8)]' 
                : 'top-1/2 left-1/2 -translate-x-[5%] -translate-y-[75%] w-[180px] md:w-[320px] aspect-[4/5] z-[31] rotate-[10deg] shadow-2xl hover:rotate-[6deg] opacity-100')
            : 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-0 scale-50 z-0 pointer-events-none'}
        `}
      >
        <div className="w-full h-full bg-slate-50 overflow-hidden border border-slate-200">
          <img src={imageUrl} alt="Nutty" className="w-full h-full object-cover grayscale-[0.2] contrast-[1.1]" />
        </div>
        <div className="absolute bottom-3 left-0 w-full text-center">
          <span className="font-['Great_Vibes'] text-xl md:text-4xl text-slate-800 drop-shadow-sm">Nutty</span>
        </div>
      </div>

      {/* Envelope Body */}
      <div 
        className={`absolute inset-0 bg-[#8b0000] rounded-b-xl shadow-[0_30px_60px_rgba(0,0,0,0.6)] cursor-pointer z-20 transition-all duration-700 ${focus !== 'none' ? 'opacity-0 scale-90' : 'opacity-100'}`}
        onClick={onToggle}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-b-xl"></div>
        {/* Seal */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[120%] w-24 h-24 bg-[#ffd700] rounded-full border-4 border-amber-600 flex items-center justify-center text-rose-950 font-['Great_Vibes'] text-5xl shadow-xl transition-all duration-500 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}>
          N
        </div>
      </div>

      {/* Pocket Flap */}
      <div 
        className={`absolute inset-0 pointer-events-none z-[20] transition-opacity duration-700 ${focus !== 'none' ? 'opacity-0' : 'opacity-100'}`}
        style={{
          clipPath: 'polygon(0% 0%, 50% 65%, 100% 0%, 100% 100%, 0% 100%)',
          background: 'linear-gradient(145deg, #a50000, #7b0000)',
        }}
      />

      {/* Top Flap */}
      <div 
        className={`absolute top-0 left-0 w-full transition-all duration-1000 origin-top z-[40]
          ${isOpen ? '-rotate-x-180 opacity-0' : 'rotate-x-0'}
        `}
      >
        <div className="w-full h-0 border-l-[150px] md:border-l-[250px] border-l-transparent border-r-[150px] md:border-r-[250px] border-r-transparent border-t-[110px] md:border-t-[190px] border-t-[#991b1b]" />
      </div>
    </div>
  );
};

export default Envelope;