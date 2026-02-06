'use client';

import React from 'react';
import { RotateCcw, Trash2 } from 'lucide-react';

interface ResetButtonProps {
    onReset: () => void;
    type: 'full' | 'single';
    label?: string;
}

const ResetButton: React.FC<ResetButtonProps> = ({ onReset, type, label }) => {
    if (type === 'full') {
        return (
            <button
                onClick={onReset}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-red-50 text-gray-500 hover:text-red-600 border border-gray-200 hover:border-red-200 transition-all text-sm group cursor-pointer"
            >
                <RotateCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                <span>{label || 'Начать заново'}</span>
            </button>
        );
    }

    return (
        <button
            onClick={onReset}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-all text-xs cursor-pointer"
            title="Очистить ответ"
        >
            <Trash2 className="w-3 h-3" />
            <span>Очистить</span>
        </button>
    );
};

export default ResetButton;
