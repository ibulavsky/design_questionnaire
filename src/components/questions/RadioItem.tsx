'use client';

import React from 'react';
import Image from 'next/image';
import { t } from '@/lib/i18n';
import { fixTypography } from '@/lib/typography';

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
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col items-center gap-3 h-full ${checked
                    ? "bg-white border-black text-black shadow-lg shadow-black/5"
                    : "bg-white border-black/10 text-black hover:border-black/30"
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
                    <div className="w-full aspect-video relative rounded-lg overflow-hidden bg-white">
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
                        : "border-black/20"
                        }`}>
                        {checked && <div className="w-2.5 h-2.5 rounded-full bg-black" />}
                    </div>

                    <div className="flex flex-col flex-1 pl-1 text-left">
                        {isEditable ? (
                            <span className="text-sm font-light">
                                {checked ? t('common.other') : t('common.addOther')}
                            </span>
                        ) : (
                            <>
                                <span className="text-sm font-light">{fixTypography(label)}</span>
                                {description && (
                                    <span className={`text-xs mt-0.5 transition-colors ${checked ? "text-black/70" : "text-black/40"}`}>
                                        {fixTypography(description)}
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
                        value={label === t('common.other', { raw: true }) ? "" : label}
                        onChange={(e) => onLabelChange?.(e.target.value)}
                        placeholder={t('common.enterOther')}
                        className="w-full bg-white border border-black/10 rounded-2xl px-4 py-3 text-black text-base font-light text-xs placeholder:tracking-normal placeholder:placeholder-black/30 focus:outline-none focus:border-black/40 transition-all"
                        autoFocus
                    />
                </div>
            )}
        </div>
    );
};

export default RadioItem;
