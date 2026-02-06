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
                    className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <button
                    type="button"
                    onClick={addLink}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors whitespace-nowrap"
                >
                    Добавить ссылку
                </button>
            </div>
            <p className="text-gray-500">Либо загрузите файлы</p>
            <div
                onClick={() => inputRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${dragOver
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
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
                <Upload className="w-10 h-10 mx-auto mb-3 text-gray-400" />
                <p className="text-gray-500 text-sm">
                    Перетащите файлы сюда или <span className="text-blue-600">нажмите для выбора</span>
                </p>
                <p className="text-gray-400 text-xs mt-2">
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
                                    className="relative bg-gray-50 rounded-lg p-3 flex items-center gap-2 group border border-gray-200"
                                >
                                    {isFile ? (
                                        <FileImage className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                    ) : (
                                        <LinkIcon className="w-5 h-5 text-blue-500 flex-shrink-0" />
                                    )}
                                    <span className="text-gray-700 text-sm truncate flex-1">
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
