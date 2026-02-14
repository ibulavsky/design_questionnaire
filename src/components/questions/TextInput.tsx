'use client';

import React from 'react';

interface TextInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    isTextArea?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({ value, onChange, placeholder, isTextArea }) => {
    const commonClasses = "w-full p-4 rounded-2xl bg-white border border-black/10 text-black font-light placeholder-black/30 focus:outline-none focus:border-black/40 transition-all";

    if (isTextArea) {
        return (
            <textarea
                className={`${commonClasses} min-h-[150px] resize-none`}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
            />
        );
    }

    return (
        <input
            type="text"
            className={commonClasses}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
        />
    );
};

export default TextInput;
