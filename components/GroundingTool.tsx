
import React, { useState, useRef } from 'react';
import { GoogleGenAI, Modality } from "@google/genai";

const steps = [
  { id: 5, label: 'Coisas que você pode ver', instruction: 'Olhe ao seu redor e identifique 5 objetos diferentes.' },
  { id: 4, label: 'Coisas que você pode tocar', instruction: 'Sinta 4 texturas diferentes, como sua roupa, a mesa ou sua própria pele.' },
  { id: 3, label: 'Coisas que você pode ouvir', instruction: 'Preste atenção em 3 sons distintos no ambiente, próximos ou distantes.' },
  { id: 2, label: 'Coisas que você pode cheirar', instruction: 'Tente identificar 2 odores diferentes ao seu redor.' },
  { id: 1, label: 'Coisa que você pode saborear', instruction: 'Sinta 1 gosto na sua boca ou imagine intensamente seu sabor favorito.' },
];

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

const GroundingTool: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAudioLoading, setIsAudioLoading] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(0);
    }
  };

  const playInstruction = async () => {
    if (isAudioLoading) return;
    setIsAudioLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const prompt = `Fale calmamente e suavemente a seguinte instrução de aterramento para ajudar alguém com ansiedade: "${steps[currentStep].instruction}"`;
      
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: prompt }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Kore' }, // Kore is a soft, suitable voice
            },
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      
      if (base64Audio) {
        if (!audioContextRef.current) {
          audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        }
        const ctx = audioContextRef.current;
        const audioBuffer = await decodeAudioData(decode(base64Audio), ctx, 24000, 1);
        
        const source = ctx.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(ctx.destination);
        source.start();
      }
    } catch (error) {
      console.error("TTS Error:", error);
    } finally {
      setIsAudioLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md mx-auto">
      <h2 className="text-2xl font-display font-bold text-slate-700 mb-2">Técnica 5-4-3-2-1</h2>
      <p className="text-slate-500 mb-8 text-sm italic">Traga sua mente de volta para o presente.</p>
      
      <div className="space-y-6">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-4">
            <div className="bg-indigo-100 text-indigo-600 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold">
              {steps[currentStep].id}
            </div>
            <h3 className="font-bold text-slate-800">{steps[currentStep].label}</h3>
          </div>
          <button 
            onClick={playInstruction}
            disabled={isAudioLoading}
            className={`p-2 rounded-full transition-all ${isAudioLoading ? 'bg-slate-100 text-slate-300' : 'bg-indigo-50 text-indigo-500 hover:bg-indigo-100'}`}
            title="Ouvir instrução"
          >
            {isAudioLoading ? (
              <svg className="w-6 h-6 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
            )}
          </button>
        </div>
        
        <div className="bg-slate-50 p-6 rounded-2xl min-h-[120px] flex items-center justify-center text-center relative overflow-hidden">
          {isAudioLoading && (
            <div className="absolute bottom-0 left-0 h-1 bg-indigo-400 animate-[loading_2s_ease-in-out_infinite]" style={{ width: '100%' }}></div>
          )}
          <p className="text-lg text-slate-700 leading-relaxed">
            {steps[currentStep].instruction}
          </p>
        </div>

        <div className="flex justify-between items-center pt-4">
          <div className="flex space-x-1">
            {steps.map((_, i) => (
              <div 
                key={i} 
                className={`h-2 w-8 rounded-full transition-colors ${i <= currentStep ? 'bg-indigo-500' : 'bg-slate-200'}`} 
              />
            ))}
          </div>
          <button 
            onClick={handleNext}
            className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-md active:scale-95 transform"
          >
            {currentStep === steps.length - 1 ? 'Reiniciar' : 'Próximo'}
          </button>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}} />
    </div>
  );
};

export default GroundingTool;
