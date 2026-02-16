'use client';

import React, { useRef, useState } from 'react';
import { Upload, X, FileImage, Link as LinkIcon } from 'lucide-react';
import { t } from '@/lib/i18n';
import { fixTypography } from '@/lib/typography';

interface FileUploadProps {
    value: (string | { name: string, data: string })[];
    onChange: (items: (string | { name: string, data: string })[]) => void;
    maxFiles?: number;
    accept?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
    value = [],
    onChange,
    maxFiles = 10,
    accept = 'image/*'
}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [dragOver, setDragOver] = useState(false);
    const [link, setLink] = useState('');

    const fileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
        });
    };

    const handleFiles = async (files: FileList | null) => {
        if (!files) return;
        const newFilesList = Array.from(files).slice(0, maxFiles - value.length);

        const processedFiles = await Promise.all(
            newFilesList.map(async (file) => ({
                name: file.name,
                data: await fileToBase64(file)
            }))
        );

        onChange([...value, ...processedFiles]);
    };

    const addLink = () => {
        if (!link.trim()) return;
        if (value.length >= maxFiles) {
            alert(`Максимум ${maxFiles} элементов`);
            return;
        }
        onChange([...value, link.trim()]);
        setLink('');
    };

    const removeFile = (index: number) => {
        const newValue = value.filter((_, i) => i !== index);
        onChange(newValue);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);
        handleFiles(e.dataTransfer.files);
    };

    return (
        <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-2">
                <input
                    type="text"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    placeholder={t('common.linkPlaceholder')}
                    className="flex-1 bg-white border border-black/10 rounded-2xl px-4 py-3 text-black text-base font-light text-xs placeholder:tracking-normal placeholder:placeholder-black/30 focus:outline-none focus:border-gray-400 transition-all"
                />
                <button
                    type="button"
                    onClick={addLink}
                    className="px-6 py-3 bg-black hover:bg-gray-900 text-white rounded-2xl text-sm font-light transition-colors whitespace-nowrap"
                >
                    {t('common.addLink')}
                </button>
            </div>
            <p className="text-black/60">{fixTypography(t('common.uploadOr')) || 'Либо загрузите файлы'}</p>
            <div
                onClick={() => inputRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${dragOver
                    ? 'border-black bg-white'
                    : 'border-black/10 hover:border-black hover:bg-white'
                    }`}
            >
                <input
                    ref={inputRef}
                    type="file"
                    multiple
                    accept={accept}
                    onChange={(e) => handleFiles(e.target.files)}
                    className="hidden"
                />
                <Upload className="w-10 h-10 mx-auto mb-3 text-black/40" />
                <p className="text-black/60 text-sm">
                    {fixTypography(t('common.uploadTip'))}
                </p>
                <p className="text-black/40 text-xs mt-2">
                    {fixTypography(t('common.maxItems', { replacements: { count: maxFiles.toString() } }))}
                </p>
            </div>

            {
                value.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {value.map((item, index) => {
                            const isDataFile = typeof item === 'object' && item !== null && 'data' in item;
                            return (
                                <div
                                    key={index}
                                    className="relative bg-white rounded-lg p-3 flex items-center gap-2 group border border-black/10"
                                >
                                    {isDataFile ? (
                                        <FileImage className="w-5 h-5 text-black/40 flex-shrink-0" />
                                    ) : (
                                        <LinkIcon className="w-5 h-5 text-black flex-shrink-0" />
                                    )}
                                    <span className="text-black text-sm truncate flex-1">
                                        {isDataFile ? (item as any).name : (item as string)}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => removeFile(index)}
                                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                                    >
                                        <X className="w-3 h-3 text-white" />
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                )
            }
        </div >
    );
};

export default FileUpload;
