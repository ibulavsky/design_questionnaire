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
                    ? "bg-white border-black text-black"
                    : "bg-white border-gray-200 text-gray-700 hover:border-black"
                    } ${className}`}
            >
                <input
                    type="radio"
                    name={name}
                    checked={checked}
                    onChange={() => { }}
                    className="sr-only"
                />

                {image && (
                    <div className="w-full aspect-video relative rounded-lg overflow-hidden bg-gray-100">
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
                        ? "border-black"
                        : "border-gray-300"
                        }`}>
                        {checked && <div className="w-2.5 h-2.5 rounded-full bg-black" />}
                    </div>

                    <div className="flex flex-col flex-1 pl-1 text-left">
                        {isEditable ? (
                            <span className="text-sm font-medium">
                                {checked ? "Свой вариант" : "Добавить свой вариант"}
                            </span>
                        ) : (
                            <>
                                <span className="text-sm font-medium">{label}</span>
                                {description && (
                                    <span className={`text-xs mt-0.5 transition-colors ${checked ? "text-gray-600" : "text-gray-400"}`}>
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
                        className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                        autoFocus
                    />
                </div>
            )}
        </div>
    );
};

export default RadioItem;
