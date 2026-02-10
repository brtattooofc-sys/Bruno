
import React, { useState } from 'react';

const affirmations = [
  "Isto é temporário. Eu já superei isso antes e vou superar de novo.",
  "Eu sou mais forte do que minha ansiedade.",
  "Meus pensamentos são apenas pensamentos, não fatos.",
  "Eu estou seguro aqui e agora.",
  "Eu me permito relaxar e soltar a tensão.",
  "Eu sou capaz de lidar com o que vier pela frente.",
  "Minha respiração é minha âncora.",
  "Tudo o que eu preciso fazer agora é respirar.",
  "Eu aceito meus sentimentos sem julgamento.",
  "Eu mereço paz e tranquilidade."
];

const AffirmationsTool: React.FC = () => {
  const [index, setIndex] = useState(0);

  const nextAffirmation = () => {
    setIndex((prev) => (prev + 1) % affirmations.length);
  };

  return (
    <div className="bg-gradient-to-br from-teal-50 to-emerald-50 p-8 rounded-3xl shadow-xl w-full max-w-md mx-auto text-center border border-teal-100">
      <div className="mb-6">
        <svg className="w-12 h-12 text-teal-400 mx-auto opacity-50" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21L14.017 18C14.017 16.8954 13.1216 16 12.017 16C10.9124 16 10.017 16.8954 10.017 18L10.017 21H4.01701V11C4.01701 6.58172 7.59873 3 12.017 3C16.4353 3 20.017 6.58172 20.017 11V21H14.017Z" />
        </svg>
      </div>
      
      <h2 className="text-xl font-display font-bold text-teal-800 mb-6">Afirmações Positivas</h2>
      
      <div className="min-h-[100px] flex items-center justify-center mb-8">
        <p className="text-2xl font-medium text-teal-900 leading-snug">
          "{affirmations[index]}"
        </p>
      </div>

      <button 
        onClick={nextAffirmation}
        className="bg-teal-600 text-white px-8 py-3 rounded-full font-bold hover:bg-teal-700 shadow-md transition-all active:scale-95"
      >
        Nova Afirmação
      </button>
    </div>
  );
};

export default AffirmationsTool;
