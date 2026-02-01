'use client';

import React from 'react';
import { Check } from 'lucide-react';

interface CheckboxGroupProps {
    options: string[];
    value: string[];
    onChange: (value: string[]) => void;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ options, value = [], onChange }) => {
    const toggleOption = (option: string) => {
        const newValue = value.includes(option)
            ? value.filter((v) => v !== option)
            : [...value, option];
        onChange(newValue);
    };

    return (
        <div className="flex flex-col gap-3">
            {options.map((option) => {
                const isSelected = value.includes(option);

                return (
                    <label
                        key={option}
                        className={`w-full p-4 rounded-xl border transition-all cursor-pointer flex items-center gap-4 ${isSelected
                                ? "bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-900/40"
                                : "bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:border-white/20"
                            }`}
                    >
                        <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleOption(option)}
                            className="sr-only"
                        />

                        {/* Визуальный чекбокс */}
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all ${isSelected
                                ? "bg-white border-white"
                                : "bg-transparent border-white/40"
                            }`}>
                            {isSelected && <Check className="w-3 h-3 text-blue-600" />}
                        </div>

                        <span>{option}</span>
                    </label>
                );
            })}
        </div>
    );
};

export default CheckboxGroup;
