'use client';

import React from 'react';

interface TextInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    isTextArea?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({ value, onChange, placeholder, isTextArea }) => {
    const commonClasses = "w-full p-4 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all";

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
