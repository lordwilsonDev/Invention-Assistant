
import { GoogleGenAI, Type } from "@google/genai";
import type { Invention } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const inventionSchema = {
    type: Type.OBJECT,
    properties: {
        name: { 
            type: Type.STRING, 
            description: "A catchy, marketable name for the invention, under 5 words." 
        },
        pitch: { 
            type: Type.STRING, 
            description: "A one-sentence elevator pitch for the invention." 
        },
        features: {
            type: Type.ARRAY,
            description: "A list of 3-5 key features.",
            items: {
                type: Type.OBJECT,
                properties: {
                    title: { type: Type.STRING, description: "The name of the feature." },
                    description: { type: Type.STRING, description: "A brief description of what the feature does and its benefit to the user." }
                },
                required: ["title", "description"]
            }
        },
        targetAudience: { 
            type: Type.STRING, 
            description: "A description of the ideal customer for this invention." 
        },
        challenges: {
            type: Type.ARRAY,
            description: "A list of 2-3 potential challenges or obstacles in creating this invention.",
            items: { type: Type.STRING }
        }
    },
    required: ["name", "pitch", "features", "targetAudience", "challenges"]
};

export const generateInventionIdea = async (userInput: string): Promise<Invention> => {
    const prompt = `Act as an expert product designer and world-class inventor. Based on the following user idea, brainstorm a complete product concept. The idea is: "${userInput}". Generate a name, pitch, key features, target audience, and potential challenges.`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: inventionSchema,
                temperature: 0.8,
            },
        });

        const jsonText = response.text.trim();
        const parsedJson = JSON.parse(jsonText);
        
        return parsedJson as Invention;

    } catch (error) {
        console.error("Error generating invention idea:", error);
        throw new Error("Failed to communicate with the Gemini API for idea generation.");
    }
};

export const generateInventionImage = async (prompt: string): Promise<string> => {
    try {
        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: prompt,
            config: {
                numberOfImages: 1,
                outputMimeType: 'image/jpeg',
                aspectRatio: '1:1',
            },
        });
        
        if (response.generatedImages && response.generatedImages.length > 0) {
            return response.generatedImages[0].image.imageBytes;
        } else {
            throw new Error("No image was generated.");
        }
    } catch (error) {
        console.error("Error generating invention image:", error);
        throw new Error("Failed to communicate with the Gemini API for image generation.");
    }
};
