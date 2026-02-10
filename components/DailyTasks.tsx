
import React, { useState, useEffect } from 'react';
import { Task } from '../types';

const DEFAULT_TASKS: Omit<Task, 'completed'>[] = [
  { id: 1, text: "Beber um copo de água calmamente" },
  { id: 2, text: "Fazer 2 minutos de respiração guiada" },
  { id: 3, text: "Anotar uma coisa pela qual sou grato hoje" },
  { id: 4, text: "Sentir o ar fresco por alguns instantes" },
  { id: 5, text: "Alongar o corpo suavemente" },
];

const STORAGE_KEY = 'serenity_daily_tasks';
const DATE_KEY = 'serenity_tasks_date';

const DailyTasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const today = new Date().toDateString();
    const savedDate = localStorage.getItem(DATE_KEY);
    const savedTasks = localStorage.getItem(STORAGE_KEY);

    if (savedDate === today && savedTasks) {
      setTasks(JSON.parse(savedTasks));
    } else {
      // Reset for a new day
      const initialTasks = DEFAULT_TASKS.map(t => ({ ...t, completed: false }));
      setTasks(initialTasks);
      localStorage.setItem(DATE_KEY, today);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialTasks));
    }
  }, []);

  const toggleTask = (id: number) => {
    const newTasks = tasks.map(t => 
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    setTasks(newTasks);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newTasks));
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const progress = (completedCount / tasks.length) * 100;

  return (
    <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-xl w-full max-w-md mx-auto border border-white/50 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-display font-bold text-slate-800">Tarefas Diárias</h2>
          <p className="text-slate-500 text-sm">Pequenos passos para seu bem-estar.</p>
        </div>
        <div className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-bold">
          {completedCount}/{tasks.length}
        </div>
      </div>

      <div className="mb-8">
        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-500 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="space-y-4">
        {tasks.map(task => (
          <button
            key={task.id}
            onClick={() => toggleTask(task.id)}
            className={`w-full flex items-center p-4 rounded-2xl transition-all border text-left ${
              task.completed 
                ? 'bg-blue-50 border-blue-100 opacity-75' 
                : 'bg-white border-slate-100 hover:border-blue-200'
            }`}
          >
            <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center transition-colors ${
              task.completed ? 'bg-blue-500 border-blue-500' : 'border-slate-200'
            }`}>
              {task.completed && (
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            <span className={`text-sm font-medium ${task.completed ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
              {task.text}
            </span>
          </button>
        ))}
      </div>

      {progress === 100 && (
        <div className="mt-8 p-4 bg-emerald-50 text-emerald-700 rounded-2xl text-center animate-bounce">
          <p className="text-sm font-bold">🎉 Incrível! Você completou tudo hoje.</p>
        </div>
      )}
    </div>
  );
};

export default DailyTasks;
