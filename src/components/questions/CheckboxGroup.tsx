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
        return options.some(opt => normalizeOption(opt).label === val) || val.includes(': ');
    };

    const customValue = value.find(v => !isInternalOption(v)) || '';
    const [isOtherActive, setIsOtherActive] = useState(!!customValue);

    // Sync isOtherActive if customValue changes externally
    useEffect(() => {
        if (customValue) setIsOtherActive(true);
    }, [customValue]);

    const toggleOption = (label: string) => {
        const newValue = value.includes(label)
            ? value.filter((v) => v !== label)
            : [...value, label];
        onChange(newValue);
    };

    const toggleChild = (parentLabel: string, childLabel: string) => {
        const fullLabel = `${parentLabel}: ${childLabel}`;
        toggleOption(fullLabel);
    };

    const isParentSelected = (option: QuestionOption) => {
        if (value.includes(option.label)) return true;
        if (option.children) {
            return option.children.some(child => value.includes(`${option.label}: ${child.label}`));
        }
        return false;
    };

    const handleCustomToggle = (active: boolean) => {
        if (!active) {
            // Remove the custom value
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
            // If text emptied, we keep isOtherActive but clear the actual value in Answers
            onChange(otherOptions);
        }
    };

    return (
        <div className="flex flex-col gap-3">
            {options.map((opt) => {
                const option = normalizeOption(opt);
                const isSelected = value.includes(option.label);
                const hasChildren = option.children && option.children.length > 0;
                const isPartiallySelected = hasChildren && isParentSelected(option) && !isSelected;

                return (
                    <div key={option.label}>
                        <CheckboxItem
                            label={option.label}
                            description={option.description}
                            checked={isSelected}
                            partiallySelected={isPartiallySelected}
                            onChange={() => toggleOption(option.label)}
                        />

                        {/* Nested children */}
                        {hasChildren && (isSelected || isPartiallySelected) && (
                            <div className="ml-8 mt-2 flex flex-col gap-2">
                                {option.children!.map((child) => {
                                    const childLabel = `${option.label}: ${child.label}`;
                                    const isChildSelected = value.includes(childLabel);

                                    return (
                                        <CheckboxItem
                                            key={child.label}
                                            label={child.label}
                                            checked={isChildSelected}
                                            onChange={() => toggleChild(option.label, child.label)}
                                            className="!p-3 !rounded-lg"
                                        />
                                    );
                                })}
                            </div>
                        )}
                    </div>
                );
            })}

            {/* Other Option */}
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
