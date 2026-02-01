'use client';

import React, { useRef, useState } from 'react';
import { Upload, X, FileImage, Link as LinkIcon } from 'lucide-react';

interface FileUploadProps {
    value: (File | string)[];
    onChange: (items: (File | string)[]) => void;
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

    const handleFiles = (files: FileList | null) => {
        if (!files) return;
        const newFiles = Array.from(files).slice(0, maxFiles - value.length);
        onChange([...value, ...newFiles]);
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
            <div className="flex gap-2">
                <input
                    type="text"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    placeholder="Вставьте ссылку на изображение..."
                    className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                />
                <button
                    type="button"
                    onClick={addLink}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors whitespace-nowrap"
                >
                    Добавить ссылку
                </button>
            </div>
            <p className="text-white/60 mt-4">Либо загрузите файлы</p>
            <div
                onClick={() => inputRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${dragOver
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-white/20 hover:border-white/40 hover:bg-white/5'
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
                <Upload className="w-10 h-10 mx-auto mb-3 text-white/40" />
                <p className="text-white/60 text-sm">
                    Перетащите файлы сюда или <span className="text-blue-400">нажмите для выбора</span>
                </p>
                <p className="text-white/30 text-xs mt-2">
                    Максимум {maxFiles} элементов (файлов или ссылок)
                </p>
            </div>

            {
                value.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {value.map((item, index) => {
                            const isFile = item instanceof File;
                            return (
                                <div
                                    key={index}
                                    className="relative bg-white/5 rounded-lg p-3 flex items-center gap-2 group border border-white/10"
                                >
                                    {isFile ? (
                                        <FileImage className="w-5 h-5 text-white/40 flex-shrink-0" />
                                    ) : (
                                        <LinkIcon className="w-5 h-5 text-blue-400 flex-shrink-0" />
                                    )}
                                    <span className="text-white/70 text-sm truncate flex-1">
                                        {isFile ? (item as File).name : (item as string)}
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
