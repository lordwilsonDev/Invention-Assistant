
import React from 'react';
import type { Invention } from '../types';

interface ResultsDisplayProps {
    invention: Invention;
    onVisualize: () => void;
    isVisualizing: boolean;
}

const SectionCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-gray-800/60 p-6 rounded-lg border border-gray-700">
        <h3 className="text-xl font-bold mb-3 text-cyan-300">{title}</h3>
        {children}
    </div>
);

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ invention, onVisualize, isVisualizing }) => {
    return (
        <div className="mt-8 space-y-6">
            <header className="text-center p-6 bg-gray-800 rounded-lg border border-gray-700">
                <h2 className="text-3xl md:text-4xl font-extrabold text-white">{invention.name}</h2>
                <p className="mt-2 text-lg text-gray-300 italic">"{invention.pitch}"</p>
            </header>

            <div className="grid md:grid-cols-2 gap-6">
                <SectionCard title="Key Features">
                    <ul className="space-y-4">
                        {invention.features.map((feature, index) => (
                            <li key={index} className="p-3 bg-gray-900/50 rounded-md">
                                <strong className="font-semibold text-gray-200">{feature.title}</strong>
                                <p className="text-gray-400 text-sm">{feature.description}</p>
                            </li>
                        ))}
                    </ul>
                </SectionCard>

                <SectionCard title="Target Audience">
                    <p className="text-gray-300">{invention.targetAudience}</p>
                </SectionCard>

                <SectionCard title="Potential Challenges">
                    <ul className="list-disc list-inside space-y-2 text-gray-300">
                        {invention.challenges.map((challenge, index) => (
                            <li key={index}>{challenge}</li>
                        ))}
                    </ul>
                </SectionCard>

                <div className="flex flex-col items-center justify-center bg-gray-800/60 p-6 rounded-lg border-2 border-dashed border-gray-600">
                     <h3 className="text-xl font-bold mb-3 text-cyan-300">Visualize Your Invention</h3>
                     <p className="text-gray-400 text-center mb-4">Generate a photorealistic product image based on the concept.</p>
                     <button
                        onClick={onVisualize}
                        disabled={isVisualizing}
                        className="px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-700 text-white font-bold rounded-lg hover:from-violet-500 hover:to-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-violet-500/30 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-violet-500/50"
                    >
                        {isVisualizing ? 'Visualizing...' : 'Visualize It!'}
                    </button>
                </div>
            </div>
        </div>
    );
};
