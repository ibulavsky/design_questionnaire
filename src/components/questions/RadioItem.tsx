'use client';

import React from 'react';
import Image from 'next/image';

interface RadioItemProps {
    label: string;
    checked: boolean;
    onSelect: () => void;
    description?: string;
    image?: string;
    isEditable?: boolean;
    onLabelChange?: (newLabel: string) => void;
    name?: string;
    className?: string;
}

const RadioItem: React.FC<RadioItemProps> = ({
    label,
    checked,
    onSelect,
    description,
    image,
    isEditable = false,
    onLabelChange,
    name,
    className = ""
}) => {
    return (
        <div className="flex flex-col w-full h-full">
            <label
                onClick={onSelect}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col items-center gap-3 h-full ${checked
                    ? "bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-900/40"
                    : "bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:border-white/20"
                    } ${className}`}
            >
                <input
                    type="radio"
                    name={name}
                    checked={checked}
                    onChange={() => { }} // Controlled via label click
                    className="sr-only"
                />

                {image && (
                    <div className="w-full aspect-video relative rounded-lg overflow-hidden bg-white/10">
                        <Image
                            src={image}
                            alt={label}
                            fill
                            className="object-contain p-2"
                        />
                    </div>
                )}

                <div className="flex items-center gap-3 w-full">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${checked
                        ? "bg-white border-white"
                        : "bg-transparent border-white/40"
                        }`}>
                        {checked && <div className="w-2 h-2 rounded-full bg-blue-600" />}
                    </div>

                    <div className="flex flex-col flex-1 pl-1 text-left">
                        {isEditable ? (
                            <span className="text-sm font-semibold">
                                {checked ? "Свой вариант" : "Добавить свой вариант"}
                            </span>
                        ) : (
                            <>
                                <span className="text-sm font-semibold">{label}</span>
                                {description && (
                                    <span className={`text-xs mt-0.5 transition-colors ${checked ? "text-white/80" : "text-white/40"}`}>
                                        {description}
                                    </span>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </label>

            {isEditable && checked && (
                <div className="mt-2 px-1">
                    <input
                        type="text"
                        value={label === "Свой вариант" ? "" : label}
                        onChange={(e) => onLabelChange?.(e.target.value)}
                        placeholder="Введите ваш вариант..."
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                        autoFocus
                    />
                </div>
            )}
        </div>
    );
};

export default RadioItem;
