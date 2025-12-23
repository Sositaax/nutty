
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
    if (focus === mode) {
      setFocus('none');
    } else {
      setFocus(mode);
    }
  };

  const closeFocus = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFocus('none');
  };

  return (
    <div className="relative w-[320px] h-[220px] md:w-[600px] md:h-[400px] flex items-center justify-center">
      
      {/* 
        ========================================
        OVERLAY when focused
        ========================================
      */}
      <div 
        className={`fixed inset-0 bg-[#020617]/90 backdrop-blur-md transition-opacity duration-700 pointer-events-none ${focus !== 'none' ? 'opacity-100 z-[50]' : 'opacity-0 z-0'}`}
      />

      {/* 
        ========================================
        THE LETTER
        ========================================
      */}
      <div 
        onClick={(e) => handleItemClick('letter', e)}
        className={`absolute bg-[#fffef0] transition-all duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)] cursor-pointer
          ${isOpen 
            ? (focus === 'letter' 
                ? 'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92vw] md:w-[650px] h-[85vh] md:h-[850px] z-[60] rotate-0 scale-100 shadow-[0_60px_120px_rgba(0,0,0,0.9)]' 
                : (focus === 'photo' 
                    ? 'opacity-0 scale-50 pointer-events-none z-0'
                    : 'top-1/2 left-1/2 -translate-x-[90%] -translate-y-[80%] md:-translate-x-[110%] md:-translate-y-[90%] w-[240px] md:w-[450px] h-[320px] md:h-[600px] z-[30] rotate-[-12deg] scale-100 opacity-100 shadow-2xl hover:rotate-[-5deg] hover:-translate-y-[95%] md:hover:-translate-y-[105%] hover:scale-[1.05]'))
            : 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-0 scale-50 z-0 pointer-events-none'}
        `}
        style={{
          boxShadow: focus === 'letter' ? '0 50px 100px rgba(0,0,0,0.9)' : '0 20px 40px rgba(0,0,0,0.6)'
        }}
      >
        <div className="w-full h-full flex flex-col p-6 md:p-14 relative overflow-hidden">
          <div className="absolute inset-4 border-[2px] border-amber-500/30 pointer-events-none"></div>
          <div className="absolute inset-6 border-[1px] border-amber-500/20 pointer-events-none"></div>
          
          <div className="absolute top-4 left-4 text-amber-600/40 text-2xl">❧</div>
          <div className="absolute top-4 right-4 text-amber-600/40 text-2xl rotate-90">❧</div>
          <div className="absolute bottom-4 left-4 text-amber-600/40 text-2xl -rotate-90">❧</div>
          <div className="absolute bottom-4 right-4 text-amber-600/40 text-2xl rotate-180">❧</div>

          <div className="flex-shrink-0 text-center mb-8 relative">
            <div className="text-3xl mb-2 opacity-80">🎄</div>
            <h2 className="font-['Playfair_Display'] text-rose-900 text-3xl md:text-6xl italic font-bold tracking-tight">Dearest Nutty</h2>
            <div className="w-32 md:w-64 h-[2px] bg-gradient-to-r from-transparent via-amber-500/40 to-transparent mx-auto mt-6"></div>
          </div>

          <div className={`flex-grow overflow-y-auto scrollbar-hide px-2 md:px-10 text-center ${focus === 'letter' ? 'opacity-100' : 'opacity-30'}`}>
            <p className="font-['Dancing_Script'] text-slate-800 text-2xl md:text-5xl leading-relaxed md:leading-[2.2] font-bold whitespace-pre-wrap pb-10 drop-shadow-sm">
              {message}
            </p>
            
            <div className="mt-8 mb-12 flex flex-col items-center">
               <div className="text-4xl text-rose-600 drop-shadow-md">🎀</div>
               <span className="font-['Montserrat'] text-[10px] md:text-sm tracking-[0.8em] uppercase text-amber-800 font-black mt-6">My Love Eternally</span>
            </div>
          </div>

          {focus === 'letter' && (
            <button 
              onClick={closeFocus}
              className="absolute top-8 right-8 w-12 h-12 bg-rose-900 text-white rounded-full flex items-center justify-center font-bold shadow-2xl hover:bg-rose-800 transition-all hover:scale-110 active:scale-90 z-[70] border-2 border-amber-500/30"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* 
        ========================================
        THE PHOTO
        ========================================
      */}
      <div 
        onClick={(e) => handleItemClick('photo', e)}
        className={`absolute bg-white p-4 md:p-8 pb-16 md:pb-28 transition-all duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)] cursor-pointer
          ${isOpen 
            ? (focus === 'photo' 
                ? 'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[88vw] md:w-[550px] aspect-[3/4] z-[60] rotate-0 scale-100 shadow-[0_60px_120px_rgba(0,0,0,0.9)]' 
                : (focus === 'letter' 
                    ? 'opacity-0 scale-50 pointer-events-none z-0'
                    : 'top-1/2 left-1/2 -translate-x-[10%] -translate-y-[75%] md:-translate-x-[0%] md:-translate-y-[85%] w-[220px] md:w-[400px] aspect-[4/5] z-[31] rotate-[15deg] scale-100 opacity-100 shadow-2xl hover:rotate-[10deg] hover:scale-110 hover:-translate-y-[85%] md:hover:-translate-y-[95%]'))
            : 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-0 scale-50 z-0 pointer-events-none'}
        `}
      >
        <div className="w-full h-full bg-slate-200 overflow-hidden relative shadow-inner">
           <img 
            src={imageUrl} 
            alt="Nutty" 
            className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
           />
           <div className="absolute inset-0 bg-gradient-to-tr from-rose-900/10 to-transparent pointer-events-none"></div>
        </div>
        <div className="absolute bottom-4 md:bottom-10 left-0 w-full text-center">
           <div className="text-xl md:text-3xl mb-1 opacity-60">✨</div>
           <span className="font-['Dancing_Script'] text-3xl md:text-6xl text-slate-900 font-bold block">My Nutty</span>
           {focus === 'photo' && (
              <span className="block font-['Montserrat'] text-[8px] md:text-xs tracking-[0.6em] text-rose-800 mt-3 uppercase font-black">Merry Christmas 2026</span>
           )}
        </div>

        {focus === 'photo' && (
          <button 
            onClick={closeFocus}
            className="absolute top-8 right-8 w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-900 font-bold shadow-2xl hover:bg-slate-50 transition-all hover:scale-110 active:scale-90 z-[70] border-2 border-slate-100"
          >
            ✕
          </button>
        )}
      </div>

      {/* 
        ========================================
        ENVELOPE BODY
        ========================================
      */}
      <div 
        className={`absolute inset-0 bg-[#7f1d1d] rounded-b-2xl md:rounded-b-[40px] shadow-[0_30px_70px_rgba(0,0,0,0.8)] cursor-pointer transition-all duration-700 ease-in-out ${focus !== 'none' ? 'opacity-0 scale-90 blur-xl pointer-events-none z-0' : 'opacity-100 z-[20]'}`}
        onClick={onToggle}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')] opacity-10"></div>
      </div>

      {/* Front Pocket */}
      <div 
        className={`absolute inset-0 pointer-events-none transition-all duration-700 ease-in-out ${focus !== 'none' ? 'opacity-0 z-0' : 'opacity-100 z-[20]'}`}
        style={{
          clipPath: 'polygon(0% 0%, 50% 65%, 100% 0%, 100% 100%, 0% 100%)',
          background: 'linear-gradient(145deg, #991b1b, #6b0000)',
          boxShadow: 'inset 0 0 80px rgba(0,0,0,0.7)'
        }}
      >
        <div 
          className={`absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 md:w-36 md:h-36 transition-all duration-1000 ${isOpen ? 'opacity-0 scale-150 rotate-[45deg]' : 'opacity-100 scale-100'}`}
        >
          <div className="w-full h-full bg-[#fcd34d] rounded-full shadow-[0_15px_40px_rgba(0,0,0,0.6)] flex items-center justify-center border-[6px] border-[#fbbf24] ring-4 ring-amber-400/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent"></div>
            <span className="font-['Great_Vibes'] text-rose-900 text-4xl md:text-8xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">N</span>
          </div>
        </div>
      </div>

      {/* Top Flap */}
      <div 
        className={`absolute top-0 left-0 w-full transition-all duration-1000 ease-in-out origin-top
          ${isOpen ? 'rotate-x-180 z-0 opacity-0' : 'rotate-x-0 z-[30]'}
        `}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="w-full h-0 border-l-[160px] md:border-l-[300px] border-l-transparent border-r-[160px] md:border-r-[300px] border-r-transparent border-t-[120px] md:border-t-[220px] border-t-[#881337] relative">
           <div className="absolute -top-[115px] md:-top-[215px] left-1/2 -translate-x-1/2 w-16 h-16 bg-rose-400/10 rounded-full blur-3xl animate-pulse"></div>
        </div>
      </div>

      {isOpen && focus === 'none' && (
        <div className="absolute -bottom-40 md:-bottom-60 w-full text-center z-[10] pointer-events-none animate-[pulse_2s_infinite]">
           <div className="flex flex-col items-center gap-3">
              <span className="text-3xl">🎁</span>
              <p className="text-amber-100 font-['Montserrat'] tracking-[0.5em] text-[10px] md:text-xs uppercase font-black drop-shadow-md">
                Click a Gift to Read or See
              </p>
           </div>
        </div>
      )}

    </div>
  );
};

export default Envelope;
