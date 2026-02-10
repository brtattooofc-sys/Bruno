
import React, { useState } from 'react';
import { ExerciseType, MoodType } from './types';
import BreathingTool from './components/BreathingTool';
import GroundingTool from './components/GroundingTool';
import AffirmationsTool from './components/AffirmationsTool';
import ChatTool from './components/ChatTool';
import DailyTasks from './components/DailyTasks';

const moodConfig: Record<MoodType, { gradient: string; label: string; emoji: string; color: string }> = {
  calm: { 
    gradient: 'from-emerald-50 to-teal-100', 
    label: 'Calmo', 
    emoji: '😌',
    color: 'text-emerald-600'
  },
  anxious: { 
    gradient: 'from-blue-50 to-indigo-100', 
    label: 'Ansioso', 
    emoji: '😰',
    color: 'text-blue-600'
  },
  stressed: { 
    gradient: 'from-purple-50 to-fuchsia-100', 
    label: 'Estressado', 
    emoji: '😫',
    color: 'text-purple-600'
  },
  sad: { 
    gradient: 'from-slate-100 to-blue-200', 
    label: 'Triste', 
    emoji: '😔',
    color: 'text-slate-600'
  },
  angry: { 
    gradient: 'from-orange-50 to-rose-100', 
    label: 'Irritado', 
    emoji: '😤',
    color: 'text-orange-600'
  }
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ExerciseType>('home');
  const [mood, setMood] = useState<MoodType>('anxious');

  const renderContent = () => {
    switch (activeTab) {
      case 'breathing': return <BreathingTool />;
      case 'grounding': return <GroundingTool />;
      case 'affirmations': return <AffirmationsTool />;
      case 'chat': return <ChatTool />;
      case 'tasks': return <DailyTasks />;
      default: return (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-white/70 backdrop-blur-md p-8 rounded-3xl shadow-sm border border-white/50">
            <h2 className="text-3xl font-display font-bold text-slate-800 mb-2">Respire Fundo.</h2>
            <p className="text-slate-500 mb-6 leading-relaxed">Estamos aqui para te ajudar a encontrar seu centro novamente e acalmar sua mente.</p>
            
            <div className="pt-4 border-t border-slate-100">
              <p className="text-xs font-bold text-slate-400 mb-4 uppercase tracking-[0.2em]">Como você está agora?</p>
              <div className="flex justify-between gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {(Object.keys(moodConfig) as MoodType[]).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMood(m)}
                    className={`flex flex-col items-center p-3 rounded-2xl transition-all duration-500 min-w-[72px] ${
                      mood === m 
                        ? 'bg-white shadow-sm scale-105 ring-1 ring-slate-100' 
                        : 'bg-transparent opacity-60 grayscale-[0.5] hover:opacity-100 hover:grayscale-0'
                    }`}
                  >
                    <span className="text-2xl mb-1">{moodConfig[m].emoji}</span>
                    <span className={`text-[10px] font-bold tracking-tight ${mood === m ? moodConfig[m].color : 'text-slate-400'}`}>
                      {moodConfig[m].label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => setActiveTab('tasks')}
              className="group p-6 bg-white/40 hover:bg-emerald-500 hover:text-white rounded-[2rem] flex flex-col items-center text-center backdrop-blur-sm border border-white/40 transition-all duration-300 transform active:scale-95 shadow-sm hover:shadow-emerald-200 hover:shadow-xl"
            >
              <div className="bg-emerald-100 group-hover:bg-white/20 p-4 rounded-2xl mb-3 transition-colors">
                <svg className="w-6 h-6 text-emerald-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="font-bold text-slate-800 group-hover:text-white">Tarefas</span>
            </button>

            <button 
              onClick={() => setActiveTab('breathing')}
              className="group p-6 bg-white/40 hover:bg-blue-500 hover:text-white rounded-[2rem] flex flex-col items-center text-center backdrop-blur-sm border border-white/40 transition-all duration-300 transform active:scale-95 shadow-sm hover:shadow-blue-200 hover:shadow-xl"
            >
              <div className="bg-blue-100 group-hover:bg-white/20 p-4 rounded-2xl mb-3 transition-colors">
                <svg className="w-6 h-6 text-blue-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M4.5 12a7.5 7.5 0 0015 0 7.5 7.5 0 00-15 0z" strokeWidth="2"/>
                  <path d="M12 9v6m-3-3h6" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <span className="font-bold text-slate-800 group-hover:text-white">Respiração</span>
            </button>

            <button 
              onClick={() => setActiveTab('grounding')}
              className="group p-6 bg-white/40 hover:bg-indigo-500 hover:text-white rounded-[2rem] flex flex-col items-center text-center backdrop-blur-sm border border-white/40 transition-all duration-300 transform active:scale-95 shadow-sm hover:shadow-indigo-200 hover:shadow-xl"
            >
              <div className="bg-indigo-100 group-hover:bg-white/20 p-4 rounded-2xl mb-3 transition-colors">
                <svg className="w-6 h-6 text-indigo-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeWidth="2"/>
                </svg>
              </div>
              <span className="font-bold text-slate-800 group-hover:text-white">Foco</span>
            </button>

            <button 
              onClick={() => setActiveTab('chat')}
              className="group p-6 bg-white/40 hover:bg-slate-800 hover:text-white rounded-[2rem] flex flex-col items-center text-center backdrop-blur-sm border border-white/40 transition-all duration-300 transform active:scale-95 shadow-sm hover:shadow-slate-300 hover:shadow-xl"
            >
              <div className="bg-slate-100 group-hover:bg-white/20 p-4 rounded-2xl mb-3 transition-colors">
                <svg className="w-6 h-6 text-slate-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="font-bold text-slate-800 group-hover:text-white">Conversar</span>
            </button>
          </div>

          <div className="bg-rose-50/80 backdrop-blur-sm border border-rose-100 p-6 rounded-[2rem] transition-all hover:bg-rose-50">
            <h3 className="text-rose-800 font-bold mb-2">Precisa de ajuda imediata?</h3>
            <p className="text-rose-700/80 text-sm mb-4 leading-relaxed">Se você sente que está em sofrimento extremo, o CVV oferece apoio emocional gratuito.</p>
            <a 
              href="tel:188" 
              className="inline-flex items-center bg-rose-500 text-white px-6 py-3 rounded-2xl font-bold hover:bg-rose-600 transition-all shadow-md active:scale-95"
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 005.105 5.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
              </svg>
              Ligar para 188
            </a>
          </div>
        </div>
      );
    }
  };

  const navItemClass = (type: ExerciseType) => {
    const isActive = activeTab === type;
    return `relative flex flex-col items-center justify-center py-2 px-1 transition-all duration-500 ease-in-out ${
      isActive ? 'flex-[2] text-blue-600' : 'flex-1 text-slate-400'
    }`;
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${moodConfig[mood].gradient} transition-colors duration-1000 pb-32`}>
      <header className="p-8 max-w-lg mx-auto flex items-center justify-between">
        <h1 
          className="text-2xl font-display font-bold text-slate-800 cursor-pointer select-none tracking-tight"
          onClick={() => setActiveTab('home')}
        >
          serenity<span className="text-blue-500">.</span>
        </h1>
        {activeTab !== 'home' && (
          <button 
            onClick={() => setActiveTab('home')}
            className="group text-slate-600 font-bold text-xs flex items-center bg-white/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-sm hover:shadow-md transition-all active:scale-95"
          >
            <svg className="w-3.5 h-3.5 mr-2 transition-transform group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M10 19l-7-7m0 0l7-7m-7 7h18" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            VOLTAR
          </button>
        )}
      </header>

      <main className="px-6 max-w-lg mx-auto transition-all duration-700 ease-in-out">
        {renderContent()}
      </main>

      {/* Modern Minimalist Navbar */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] max-w-md z-50">
        <nav className="bg-white/70 backdrop-blur-2xl border border-white/50 rounded-[2.5rem] px-3 py-2 flex items-center shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-300">
          
          <button onClick={() => setActiveTab('home')} className={navItemClass('home')}>
            <div className={`p-2 rounded-2xl transition-all duration-300 ${activeTab === 'home' ? 'bg-blue-100/50' : ''}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            {activeTab === 'home' && <span className="text-[10px] font-bold mt-1 animate-fade-in">Início</span>}
          </button>

          <button onClick={() => setActiveTab('tasks')} className={navItemClass('tasks')}>
            <div className={`p-2 rounded-2xl transition-all duration-300 ${activeTab === 'tasks' ? 'bg-blue-100/50' : ''}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            {activeTab === 'tasks' && <span className="text-[10px] font-bold mt-1 animate-fade-in">Metas</span>}
          </button>

          <button onClick={() => setActiveTab('breathing')} className={navItemClass('breathing')}>
            <div className={`p-2 rounded-2xl transition-all duration-300 ${activeTab === 'breathing' ? 'bg-blue-100/50' : ''}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            {activeTab === 'breathing' && <span className="text-[10px] font-bold mt-1 animate-fade-in">Ar</span>}
          </button>

          <button onClick={() => setActiveTab('chat')} className={navItemClass('chat')}>
            <div className={`p-2 rounded-2xl transition-all duration-300 ${activeTab === 'chat' ? 'bg-blue-100/50' : ''}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            {activeTab === 'chat' && <span className="text-[10px] font-bold mt-1 animate-fade-in">Chat</span>}
          </button>

        </nav>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
};

export default App;
