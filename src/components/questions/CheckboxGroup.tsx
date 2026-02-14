'use client';

import React, { useState, useEffect } from 'react';
import { QuestionOption } from '../../lib/types';
import CheckboxItem from './CheckboxItem';

interface CheckboxGroupProps {
    options: (string | QuestionOption)[];
    value: string[];
    onChange: (value: string[]) => void;
    allowOther?: boolean;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ options, value = [], onChange, allowOther = false }) => {
    const normalizeOption = (opt: string | QuestionOption): QuestionOption => {
        return typeof opt === 'string' ? { label: opt } : opt;
    };

    const isInternalOption = (val: string) => {
        const checkRecursive = (opts: (string | QuestionOption)[]): boolean => {
            return opts.some(opt => {
                const normalized = normalizeOption(opt);
                const optId = normalized.id || normalized.label;
                if (val === optId || val.startsWith(`${optId}: `)) return true;
                if (normalized.children) return checkRecursive(normalized.children);
                return false;
            });
        };
        return checkRecursive(options);
    };

    const customValue = value.find(v => !isInternalOption(v)) || '';
    const [isOtherActive, setIsOtherActive] = useState(!!customValue);

    useEffect(() => {
        if (customValue) setIsOtherActive(true);
    }, [customValue]);

    const toggleOption = (id: string) => {
        const newValue = value.includes(id)
            ? value.filter((v) => v !== id)
            : [...value, id];
        onChange(newValue);
    };

    const isAnyChildSelected = (option: QuestionOption, prefix: string = ""): boolean => {
        if (!option.children) return false;
        const currentId = prefix ? `${prefix}: ${option.id || option.label}` : (option.id || option.label);

        return option.children.some(child => {
            const childId = `${currentId}: ${child.id || child.label}`;
            if (value.includes(childId)) return true;
            return isAnyChildSelected(child, currentId);
        });
    };

    const RecursiveOption = ({ option, prefix = "", level = 0 }: { option: QuestionOption, prefix?: string, level?: number }) => {
        const optId = option.id || option.label;
        const fullId = prefix ? `${prefix}: ${optId}` : optId;
        const isSelected = value.includes(fullId);
        const hasChildren = option.children && option.children.length > 0;
        const anyChildSelected = hasChildren && isAnyChildSelected(option, prefix);
        const isPartiallySelected = anyChildSelected && !isSelected;

        return (
            <div className={`flex flex-col ${level > 0 ? 'ml-6 mt-2' : ''}`}>
                <CheckboxItem
                    label={option.label}
                    description={option.description}
                    image={option.image}
                    checked={isSelected}
                    partiallySelected={isPartiallySelected}
                    onChange={() => toggleOption(fullId)}
                    className={level > 0 ? '!p-3 !rounded-lg' : ''}
                />

                {hasChildren && (isSelected || isPartiallySelected) && (
                    <div className="flex flex-col gap-2">
                        {option.children!.map((child) => (
                            <RecursiveOption
                                key={child.id || child.label}
                                option={child}
                                prefix={fullId}
                                level={level + 1}
                            />
                        ))}
                    </div>
                )}
            </div>
        );
    };

    const handleCustomToggle = (active: boolean) => {
        if (!active) {
            onChange(value.filter(v => isInternalOption(v)));
            setIsOtherActive(false);
        } else {
            setIsOtherActive(true);
        }
    };

    const handleCustomChange = (text: string) => {
        const otherOptions = value.filter(v => isInternalOption(v));
        if (text) {
            onChange([...otherOptions, text]);
        } else {
            onChange(otherOptions);
        }
    };

    return (
        <div className="flex flex-col gap-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                {options.map((opt) => {
                    const option = normalizeOption(opt);
                    return <RecursiveOption key={option.id || option.label} option={option} />;
                })}
            </div>

            {allowOther && (
                <div className="mt-2">
                    <CheckboxItem
                        label={customValue || "Свой вариант"}
                        checked={isOtherActive}
                        isEditable={true}
                        onChange={handleCustomToggle}
                        onLabelChange={handleCustomChange}
                    />
                </div>
            )}
        </div>
    );
};

export default CheckboxGroup;
