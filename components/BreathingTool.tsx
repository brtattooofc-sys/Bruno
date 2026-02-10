
import React, { useState, useEffect } from 'react';

const BreathingTool: React.FC = () => {
  const [phase, setPhase] = useState<'Inhale' | 'Hold' | 'Exhale' | 'Pause'>('Inhale');
  const [timer, setTimer] = useState(4);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: any;
    if (isActive) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            switch (phase) {
              case 'Inhale': setPhase('Hold'); return 4;
              case 'Hold': setPhase('Exhale'); return 4;
              case 'Exhale': setPhase('Pause'); return 4;
              case 'Pause': setPhase('Inhale'); return 4;
              default: return 4;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, phase]);

  const phaseColors = {
    Inhale: 'bg-blue-400',
    Hold: 'bg-indigo-400',
    Exhale: 'bg-teal-400',
    Pause: 'bg-slate-400',
  };

  const phaseText = {
    Inhale: 'Inspire...',
    Hold: 'Segure...',
    Exhale: 'Expire...',
    Pause: 'Aguarde...',
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white rounded-3xl shadow-xl w-full max-w-md mx-auto">
      <h2 className="text-2xl font-display font-bold text-slate-700 mb-8">Respiração Quadrada</h2>
      
      <div className="relative flex items-center justify-center w-64 h-64 mb-8">
        <div 
          className={`absolute rounded-full transition-all duration-[4000ms] ease-linear ${phaseColors[phase]} opacity-20`}
          style={{ 
            width: phase === 'Inhale' ? '100%' : phase === 'Exhale' ? '40%' : phase === 'Hold' ? '100%' : '40%',
            height: phase === 'Inhale' ? '100%' : phase === 'Exhale' ? '40%' : phase === 'Hold' ? '100%' : '40%'
          }}
        />
        <div 
          className={`z-10 w-40 h-40 rounded-full flex flex-col items-center justify-center transition-colors duration-500 ${phaseColors[phase]} text-white shadow-lg`}
        >
          <span className="text-xl font-medium">{phaseText[phase]}</span>
          <span className="text-4xl font-bold mt-1">{timer}</span>
        </div>
      </div>

      <button 
        onClick={() => setIsActive(!isActive)}
        className={`px-8 py-3 rounded-full font-bold text-white transition-all transform active:scale-95 ${isActive ? 'bg-red-400 hover:bg-red-500' : 'bg-blue-500 hover:bg-blue-600'}`}
      >
        {isActive ? 'Parar' : 'Começar'}
      </button>
      
      <p className="mt-6 text-slate-500 text-center text-sm">
        A respiração quadrada ajuda a acalmar o sistema nervoso rapidamente.
      </p>
    </div>
  );
};

export default BreathingTool;
