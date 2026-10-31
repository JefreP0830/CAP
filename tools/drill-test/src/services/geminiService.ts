import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const getDrillSequences = async (achievementUrl: string) => {
  const prompt = `Extract the drill sequences for each achievement from this Civil Air Patrol PDF: ${achievementUrl}. 
  Return a JSON object where keys are achievement numbers (1-16) and values are arrays of drill movements.
  Each movement should have a 'description' and a 'score' (default 0).
  Focus on Achievements 1 through 8 as a priority.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            achievements: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  number: { type: Type.INTEGER },
                  name: { type: Type.STRING },
                  movements: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        command: { type: Type.STRING },
                        description: { type: Type.STRING }
                      },
                      required: ["command"]
                    }
                  }
                },
                required: ["number", "name", "movements"]
              }
            }
          }
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Error fetching drill sequences:", error);
    return null;
  }
};
