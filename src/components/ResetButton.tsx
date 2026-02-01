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
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-red-500/20 text-white/60 hover:text-red-400 border border-white/10 hover:border-red-500/30 transition-all text-sm group cursor-pointer"
            >
                <RotateCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                <span>{label || 'Начать заново'}</span>
            </button>
        );
    }

    return (
        <button
            onClick={onReset}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-white/10 text-white/40 hover:text-white/80 transition-all text-xs cursor-pointer"
            title="Очистить ответ"
        >
            <Trash2 className="w-3 h-3" />
            <span>Очистить</span>
        </button>
    );
};

export default ResetButton;
