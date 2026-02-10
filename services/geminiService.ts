
import { GoogleGenAI } from "@google/genai";
import { Message } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getCalmSupport = async (messages: Message[]) => {
  try {
    const history = messages.slice(0, -1).map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));

    const lastMessage = messages[messages.length - 1].content;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [{ text: lastMessage }]
      },
      config: {
        systemInstruction: `Você é um assistente empático e calmo especializado em ajudar pessoas durante crises de ansiedade. 
        Suas respostas devem ser curtas, suaves e focadas em técnicas de relaxamento imediatas. 
        Não dê conselhos médicos. 
        Foque em validar os sentimentos do usuário e guiá-lo para o momento presente. 
        Use frases como "Eu estou aqui com você", "Tente respirar devagar", "Você está seguro agora". 
        Idioma: Português Brasileiro.`,
        temperature: 0.7,
        topP: 0.8,
      }
    });

    return response.text || "Estou aqui com você. Respire fundo.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Peço desculpas, tive um pequeno problema técnico, mas continuo aqui com você. Tente focar na sua respiração por um momento.";
  }
};
