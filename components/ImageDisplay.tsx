
import React from 'react';

interface ImageDisplayProps {
    imageSrc: string;
    altText: string;
}

export const ImageDisplay: React.FC<ImageDisplayProps> = ({ imageSrc, altText }) => {
    return (
        <section className="mt-8 animate-fade-in">
             <h3 className="text-2xl font-bold text-center mb-4 text-cyan-300">Generated Product Visual</h3>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-2xl shadow-violet-500/10">
                <img
                    src={imageSrc}
                    alt={`AI generated concept for ${altText}`}
                    className="rounded-md w-full h-auto aspect-square object-cover"
                />
            </div>
        </section>
    );
};
