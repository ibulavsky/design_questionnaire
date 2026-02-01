'use client';

import React from 'react';

interface ProgressBarProps {
    current: number;
    total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
    const progress = Math.min(Math.max((current / (total - 1)) * 100, 0), 100);

    return (
        <div className="w-full max-w-2xl mx-auto mb-12">
            <div className="flex justify-between items-end mb-2">
                <span className="text-white/60 text-sm font-medium">Прогресс</span>
                <span className="text-white text-sm font-bold">{Math.round(progress)}%</span>
            </div>
            <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                <div
                    className="h-full bg-blue-500 rounded-full transition-all duration-500 ease-out shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
};

export default ProgressBar;
