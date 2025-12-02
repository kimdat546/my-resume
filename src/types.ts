import type { GeminiModel } from "./constants";

export interface Experience {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string;
  type: string;
  technologies: string[];
  responsibilities: string[];
}

export interface Project {
  name: string;
  role: string;
  period: string;
  description: string;
  technologies: string[];
  type: string;
}

export interface SkillCategory {
  name: string;
  icon: 'monitor' | 'server' | 'cloud' | 'database';
  skills: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
  timestamp: Date;
}

export type GeminiModel = (typeof GeminiModel)[keyof typeof GeminiModel];
