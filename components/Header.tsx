
import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

export const Header: React.FC = () => {
    return (
        <header className="text-center my-8 md:my-12 animate-fade-in">
            <div className="flex items-center justify-center gap-4">
                <SparklesIcon className="w-10 h-10 text-cyan-400" />
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-violet-500">
                    Invention Assistant
                </h1>
                <SparklesIcon className="w-10 h-10 text-violet-500" />
            </div>
            <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
                Turn your fleeting thoughts into tangible concepts. Describe a problem or an idea, and let AI help you invent the future.
            </p>
        </header>
    );
};
