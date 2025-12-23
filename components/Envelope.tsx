import React, { useState } from 'react';

interface EnvelopeProps {
  isOpen: boolean;
  onToggle: () => void;
  message: string;
  imageUrl: string;
}

type FocusMode = 'none' | 'letter' | 'photo';

const Envelope: React.FC<EnvelopeProps> = ({ isOpen, onToggle, message, imageUrl }) => {
  const [focus, setFocus] = useState<FocusMode>('none');

  const handleItemClick = (mode: FocusMode, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isOpen) return;
    setFocus(focus === mode ? 'none' : mode);
  };

  return (
    <div className="relative w-[300px] h-[200px] md:w-[500px] md:h-[350px] flex items-center justify-center perspective-1000">
      
      {/* Blurred Backdrop for Focus */}
      <div 
        className={`fixed inset-0 bg-[#020617]/95 backdrop-blur-xl transition-opacity duration-700 ${focus !== 'none' ? 'opacity-100 z-[100]' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setFocus('none')}
      />

      {/* The Letter */}
      <div 
        onClick={(e) => handleItemClick('letter', e)}
        className={`absolute bg-[#fffdf0] transition-all duration-1000 cubic-bezier(0.23, 1, 0.32, 1) cursor-pointer
          ${isOpen 
            ? (focus === 'letter' 
                ? 'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] md:w-[600px] h-[80vh] z-[110] rotate-0 scale-100 shadow-[0_40px_100px_rgba(0,0,0,0.8)]' 
                : (focus === 'photo' 
                    ? 'opacity-0 scale-50 z-0 pointer-events-none'
                    : 'top-1/2 left-1/2 -translate-x-[95%] -translate-y-[85%] w-[220px] md:w-[400px] h-[280px] md:h-[500px] z-[30] rotate-[-8deg] shadow-xl hover:rotate-[-4deg] hover:scale-105'))
            : 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-0 scale-50 z-0 pointer-events-none'}
        `}
      >
        <div className="w-full h-full p-8 md:p-12 border-[1px] border-amber-900/10 flex flex-col items-center text-center overflow-hidden">
          <div className="mb-4 text-3xl opacity-30 italic">2026</div>
          <h2 className="font-['Great_Vibes'] text-rose-900 text-3xl md:text-5xl mb-6">Dearest Nutty,</h2>
          <div className="flex-grow overflow-y-auto scrollbar-hide w-full px-2">
            <p className="font-['Dancing_Script'] text-slate-800 text-xl md:text-3xl leading-relaxed md:leading-loose whitespace-pre-wrap">
              {message}
            </p>
          </div>
          <div className="mt-6 font-['Dancing_Script'] text-2xl text-rose-800 italic">Forever Yours</div>
        </div>
        {focus === 'letter' && (
          <button className="absolute top-4 right-4 text-2xl text-rose-900/50 hover:text-rose-900">✕</button>
        )}
      </div>

      {/* The Photo */}
      <div 
        onClick={(e) => handleItemClick('photo', e)}
        className={`absolute bg-white p-3 md:p-5 pb-12 md:pb-20 transition-all duration-1000 cubic-bezier(0.23, 1, 0.32, 1) cursor-pointer
          ${isOpen 
            ? (focus === 'photo' 
                ? 'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] md:w-[450px] aspect-[3/4] z-[110] rotate-0 scale-100 shadow-[0_40px_100px_rgba(0,0,0,0.8)]' 
                : (focus === 'letter' 
                    ? 'opacity-0 scale-50 z-0 pointer-events-none'
                    : 'top-1/2 left-1/2 -translate-x-[5%] -translate-y-[75%] w-[200px] md:w-[350px] aspect-[4/5] z-[31] rotate-[10deg] shadow-xl hover:rotate-[6deg] hover:scale-105'))
            : 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-0 scale-50 z-0 pointer-events-none'}
        `}
      >
        <div className="w-full h-full bg-slate-100 overflow-hidden relative border border-slate-200 shadow-inner">
           <img src={imageUrl} alt="Nutty" className="w-full h-full object-cover" />
        </div>
        <div className="absolute bottom-4 left-0 w-full text-center">
           <span className="font-['Great_Vibes'] text-2xl md:text-4xl text-slate-900">My Beautiful Nutty</span>
        </div>
        {focus === 'photo' && (
          <button className="absolute top-4 right-4 text-2xl text-slate-400">✕</button>
        )}
      </div>

      {/* Envelope Body */}
      <div 
        className={`absolute inset-0 bg-[#8b0000] rounded-b-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] cursor-pointer transition-all duration-700 z-[20] ${focus !== 'none' ? 'opacity-0 pointer-events-none scale-90' : 'opacity-100'}`}
        onClick={onToggle}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        {/* Seal */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[120%] w-24 h-24 bg-[#ffd700] rounded-full border-4 border-amber-600 flex items-center justify-center text-rose-900 font-['Great_Vibes'] text-5xl shadow-lg transition-transform duration-700 ${isOpen ? 'scale-0' : 'scale-100 animate-pulse'}`}>
          N
        </div>
      </div>

      {/* Front Flap (Pocket) */}
      <div 
        className={`absolute inset-0 pointer-events-none z-[20] transition-all duration-700 ${focus !== 'none' ? 'opacity-0' : 'opacity-100'}`}
        style={{
          clipPath: 'polygon(0% 0%, 50% 60%, 100% 0%, 100% 100%, 0% 100%)',
          background: 'linear-gradient(145deg, #a50000, #7b0000)',
          boxShadow: 'inset 0 10px 30px rgba(0,0,0,0.5)'
        }}
      />

      {/* Top Flap */}
      <div 
        className={`absolute top-0 left-0 w-full transition-all duration-1000 origin-top z-[30]
          ${isOpen ? '-rotate-x-180 opacity-0 pointer-events-none' : 'rotate-x-0'}
        `}
      >
        <div className="w-full h-0 border-l-[150px] md:border-l-[250px] border-l-transparent border-r-[150px] md:border-r-[250px] border-r-transparent border-t-[110px] md:border-t-[190px] border-t-[#b91c1c]" />
      </div>
    </div>
  );
};

export default Envelope;