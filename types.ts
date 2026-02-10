
export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export type ExerciseType = 'breathing' | 'grounding' | 'affirmations' | 'chat' | 'home' | 'tasks';

export type MoodType = 'calm' | 'anxious' | 'stressed' | 'sad' | 'angry';

export interface Affirmation {
  text: string;
  author?: string;
}

export interface Task {
  id: number;
  text: string;
  completed: boolean;
}
