'use client';

import React from 'react';

interface ProgressBarProps {
    current: number;
    total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
    const progress = Math.min(Math.max((current / (total - 1)) * 100, 0), 100);

    return (
        <div className="w-full max-w-2xl mx-auto mb-10">
            <div className="flex justify-between items-end mb-2">
                <span className="text-gray-400 text-sm font-medium">Прогресс</span>
                <span className="text-gray-700 text-sm font-semibold">{Math.round(progress)}%</span>
            </div>
            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                <div
                    className="h-full bg-blue-600 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
};

export default ProgressBar;
