'use client';

import React from 'react';
import Image from 'next/image';
import { Check } from 'lucide-react';

interface CheckboxItemProps {
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    description?: string;
    image?: string;
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
    image,
    isEditable = false,
    onLabelChange,
    partiallySelected = false,
    className = ""
}) => {
    return (
        <div className="flex flex-col w-full h-full">
            <label
                className={`w-full p-4 rounded-2xl border transition-all cursor-pointer flex ${image ? 'flex-col items-center' : 'items-center'} gap-4 h-full ${checked || partiallySelected
                    ? "bg-white border-black text-black shadow-lg shadow-black/5"
                    : "bg-white border-black/10 text-black hover:border-black/30"
                    } ${className}`}
            >
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => onChange(e.target.checked)}
                    className="sr-only"
                />

                {image && (
                    <div className="w-full aspect-video relative rounded-lg overflow-hidden bg-black/5 mb-2">
                        <Image
                            src={image}
                            alt={label}
                            fill
                            className="object-contain p-2"
                        />
                    </div>
                )}

                <div className="flex items-center gap-4 w-full">
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all ${checked
                        ? "bg-black border-black"
                        : partiallySelected
                            ? "bg-black/40 border-black/50"
                            : "bg-white border-black/20"
                        }`}>
                        {checked && <Check className="w-3 h-3 text-white" />}
                        {partiallySelected && !checked && <div className="w-2 h-2 bg-white rounded-sm" />}
                    </div>

                    <div className="flex flex-col flex-1 pl-1 text-left">
                        {!isEditable ? (
                            <span className="font-light text-sm md:text-base">{label}</span>
                        ) : (
                            <span className="font-light text-sm md:text-base">
                                {checked ? "Свой вариант" : "Добавить свой вариант"}
                            </span>
                        )}

                        {description && !isEditable && (
                            <span className={`text-xs mt-1 transition-colors ${checked || partiallySelected ? "text-black/70" : "text-black/40"}`}>
                                {description}
                            </span>
                        )}
                    </div>
                </div>
            </label>

            {isEditable && checked && (
                <div className="mt-2 pl-4">
                    <input
                        type="text"
                        value={label === "Свой вариант" ? "" : label}
                        onChange={(e) => onLabelChange?.(e.target.value)}
                        placeholder="Введите ваш вариант..."
                        className="w-full bg-white border border-black/10 rounded-2xl px-4 py-2 text-black text-sm font-light focus:outline-none focus:border-black/40 transition-all"
                        autoFocus
                    />
                </div>
            )}
        </div>
    );
};

export default CheckboxItem;
