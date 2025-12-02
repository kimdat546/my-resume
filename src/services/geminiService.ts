import { GoogleGenAI, type GenerateContentConfig, type Content } from "@google/genai";
import { GeminiModel, SYSTEM_INSTRUCTION } from "../constants.ts";
import type { ChatMessage } from "../types.ts";

// Initialize the client
// Note: In a real production app, you would likely proxy this through a backend
// to protect the key, but for this demo we use import.meta.env directly as requested.
const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_API_KEY });

// Parse rate limit error to extract retry time
const parseRateLimitError = (error: unknown): { isRateLimit: boolean; retryAfter?: number } => {
  if (error instanceof Error) {
    const message = error.message;
    if (message.includes('429') || message.includes('RESOURCE_EXHAUSTED') || message.includes('quota')) {
      const retryMatch = message.match(/retry in (\d+(?:\.\d+)?)/i);
      const retryAfter = retryMatch ? Math.ceil(parseFloat(retryMatch[1])) : undefined;
      return { isRateLimit: true, retryAfter };
    }
  }
  return { isRateLimit: false };
};

// Convert chat messages to Gemini content format
const convertToGeminiHistory = (messages: ChatMessage[]): Content[] => {
  return messages
    .filter(msg => msg.id !== 'welcome') // Exclude the welcome message
    .map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));
};

export const generateResponse = async (
  prompt: string,
  useThinking: boolean = false,
  conversationHistory: ChatMessage[] = []
): Promise<string> => {
  try {
    const modelName = useThinking ? GeminiModel.PRO_THINKING : GeminiModel.FLASH;

    const config: GenerateContentConfig = {
      systemInstruction: SYSTEM_INSTRUCTION,
    };

    if (useThinking) {
      // Enable thinking budget for complex queries
      config.thinkingConfig = { thinkingBudget: 32768 };
    }

    // Build contents with conversation history
    const history = convertToGeminiHistory(conversationHistory);
    const contents: Content[] = [
      ...history,
      { role: 'user', parts: [{ text: prompt }] }
    ];

    const response = await ai.models.generateContent({
      model: modelName,
      contents: contents,
      config: config,
    });

    if (response.text) {
        return response.text;
    }

    return "I apologize, but I couldn't generate a text response at this moment.";

  } catch (error) {
    console.error("Error generating content:", error);

    const { isRateLimit, retryAfter } = parseRateLimitError(error);

    if (isRateLimit) {
      const modelType = useThinking ? "Deep Reasoning (Gemini Pro)" : "Standard (Gemini Flash)";
      const retryMessage = retryAfter
        ? `Please try again in ${retryAfter} seconds.`
        : "Please wait a moment before trying again.";

      return `⚠️ **Rate Limit Reached**\n\nThe ${modelType} model has reached its API quota limit.\n\n${retryMessage}\n\n💡 **Tips:**\n- Try switching to Standard Mode (toggle off Deep Reasoning)\n- Wait a minute between requests\n- The free tier has limited requests per minute/day`;
    }

    return "Sorry, I encountered an error while processing your request. Please try again.";
  }
};
