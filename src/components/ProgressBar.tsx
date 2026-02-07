'use client';

import React from 'react';

interface ProgressBarProps {
    current: number;
    total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
    const progress = Math.min(Math.max((current / (total - 1)) * 100, 0), 100);

    return (
        <div className="w-full max-w-2xl mx-auto mb-10 px-1">
            <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <div
                    className="h-full bg-black rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
};

export default ProgressBar;
