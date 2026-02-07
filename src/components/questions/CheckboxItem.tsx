'use client';

import React from 'react';
import { Check } from 'lucide-react';

interface CheckboxItemProps {
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    description?: string;
    isEditable?: boolean;
    onLabelChange?: (newLabel: string) => void;
    partiallySelected?: boolean;
    className?: string;
}

const CheckboxItem: React.FC<CheckboxItemProps> = ({
    label,
    checked,
    onChange,
    description,
    isEditable = false,
    onLabelChange,
    partiallySelected = false,
    className = ""
}) => {
    return (
        <div className="flex flex-col w-full">
            <label
                className={`w-full p-4 rounded-xl border transition-all cursor-pointer flex items-center gap-4 ${checked || partiallySelected
                    ? "bg-white border-black text-black"
                    : "bg-white border-gray-200 text-gray-700 hover:border-black"
                    } ${className}`}
            >
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => onChange(e.target.checked)}
                    className="sr-only"
                />
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all ${checked
                    ? "bg-black border-black"
                    : partiallySelected
                        ? "bg-gray-400 border-gray-500"
                        : "bg-white border-gray-300"
                    }`}>
                    {checked && <Check className="w-3 h-3 text-white" />}
                    {partiallySelected && !checked && <div className="w-2 h-2 bg-white rounded-sm" />}
                </div>

                <div className="flex flex-col flex-1">
                    {!isEditable ? (
                        <span className="font-medium text-sm md:text-base">{label}</span>
                    ) : (
                        <span className="font-medium text-sm md:text-base">
                            {checked ? "Свой вариант" : "Добавить свой вариант"}
                        </span>
                    )}

                    {description && !isEditable && (
                        <span className={`text-xs mt-1 transition-colors ${checked || partiallySelected ? "text-gray-600" : "text-gray-400"}`}>
                            {description}
                        </span>
                    )}
                </div>
            </label>

            {isEditable && checked && (
                <div className="mt-2 pl-4">
                    <input
                        type="text"
                        value={label === "Свой вариант" ? "" : label}
                        onChange={(e) => onLabelChange?.(e.target.value)}
                        placeholder="Введите ваш вариант..."
                        className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                        autoFocus
                    />
                </div>
            )}
        </div>
    );
};

export default CheckboxItem;
