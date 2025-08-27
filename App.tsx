
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { IdeaForm } from './components/IdeaForm';
import { ResultsDisplay } from './components/ResultsDisplay';
import { ImageDisplay } from './components/ImageDisplay';
import { Loader } from './components/Loader';
import { generateInventionIdea, generateInventionImage } from './services/geminiService';
import type { Invention } from './types';

const App: React.FC = () => {
    const [userInput, setUserInput] = useState<string>('');
    const [invention, setInvention] = useState<Invention | null>(null);
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [isLoadingText, setIsLoadingText] = useState<boolean>(false);
    const [isLoadingImage, setIsLoadingImage] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleIdeaGeneration = useCallback(async () => {
        if (!userInput.trim()) {
            setError('Please enter an idea or problem to solve.');
            return;
        }
        setError(null);
        setIsLoadingText(true);
        setInvention(null);
        setGeneratedImage(null);

        try {
            const result = await generateInventionIdea(userInput);
            setInvention(result);
        } catch (e) {
            console.error(e);
            setError('Failed to generate invention idea. The model may be unavailable. Please try again later.');
        } finally {
            setIsLoadingText(false);
        }
    }, [userInput]);

    const handleImageGeneration = useCallback(async () => {
        if (!invention) return;

        setError(null);
        setIsLoadingImage(true);
        setGeneratedImage(null);

        try {
            const imagePrompt = `A high-quality product photograph of '${invention.name}'. It is a device that '${invention.pitch}'. The photo should be in a minimalist style, with studio lighting, on a clean, light gray background. photorealistic, 8k.`;
            const imageResult = await generateInventionImage(imagePrompt);
            setGeneratedImage(`data:image/jpeg;base64,${imageResult}`);
        } catch (e) {
            console.error(e);
            setError('Failed to visualize the invention. The image generation service may be busy. Please try again.');
        } finally {
            setIsLoadingImage(false);
        }
    }, [invention]);

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 font-sans p-4 sm:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
                <Header />
                <main>
                    <IdeaForm
                        userInput={userInput}
                        setUserInput={setUserInput}
                        onSubmit={handleIdeaGeneration}
                        isLoading={isLoadingText}
                    />
                    
                    {error && (
                        <div className="mt-6 bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg animate-fade-in" role="alert">
                            <strong className="font-bold">Error: </strong>
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}

                    {isLoadingText && <Loader message="Inventing the future... this may take a moment." />}

                    {invention && !isLoadingText && (
                        <div className="animate-fade-in">
                            <ResultsDisplay invention={invention} onVisualize={handleImageGeneration} isVisualizing={isLoadingImage} />
                            
                            {isLoadingImage && <Loader message="Creating a high-resolution visual... this can take up to a minute." />}

                            {generatedImage && !isLoadingImage && <ImageDisplay imageSrc={generatedImage} altText={invention.name} />}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default App;
