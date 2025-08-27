
import React from 'react';

interface IdeaFormProps {
    userInput: string;
    setUserInput: (value: string) => void;
    onSubmit: () => void;
    isLoading: boolean;
}

export const IdeaForm: React.FC<IdeaFormProps> = ({ userInput, setUserInput, onSubmit, isLoading }) => {
    
    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
            event.preventDefault();
            if (!isLoading) {
                onSubmit();
            }
        }
    };

    return (
        <section className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 shadow-2xl shadow-cyan-500/10">
            <label htmlFor="idea-input" className="block text-xl font-semibold mb-3 text-cyan-300">
                What problem do you want to solve?
            </label>
            <textarea
                id="idea-input"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="e.g., 'A way to automatically water house plants when I'm on vacation' or 'A device that finds my lost keys'"
                className="w-full h-32 p-4 bg-gray-900 border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-shadow duration-300 resize-none placeholder-gray-500"
                disabled={isLoading}
            />
            <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                <p className="text-sm text-gray-400">Press Ctrl+Enter or Cmd+Enter to submit.</p>
                <button
                    onClick={onSubmit}
                    disabled={isLoading || !userInput.trim()}
                    className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-bold rounded-lg hover:from-cyan-400 hover:to-violet-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-cyan-500/30 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-cyan-500/50"
                >
                    {isLoading ? 'Generating...' : 'Invent'}
                </button>
            </div>
        </section>
    );
};
