'use client';

import React from 'react';

interface RadioGroupProps {
    options: string[];
    value: string;
    onChange: (value: string) => void;
    name?: string;
}

const RadioGroup: React.FC<RadioGroupProps> = ({ options, value, onChange, name = 'radio-group' }) => {
    return (
        <div className="flex flex-col gap-3" role="radiogroup">
            {options.map((option) => {
                const isSelected = value === option;

                return (
                    <label
                        key={option}
                        className={`w-full p-4 rounded-xl border transition-all cursor-pointer flex items-center gap-4 ${isSelected
                                ? "bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-900/40"
                                : "bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:border-white/20"
                            }`}
                    >
                        <input
                            type="radio"
                            name={name}
                            checked={isSelected}
                            onChange={() => onChange(option)}
                            className="sr-only"
                        />
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${isSelected
                                ? "bg-white border-white"
                                : "bg-transparent border-white/40"
                            }`}>
                            {isSelected && <div className="w-2 h-2 rounded-full bg-blue-600" />}
                        </div>
                        <span>{option}</span>
                    </label>
                );
            })}
        </div>
    );
};

export default RadioGroup;
