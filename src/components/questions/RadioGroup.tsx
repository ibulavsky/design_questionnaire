'use client';

import React, { useState, useEffect } from 'react';
import { QuestionOption } from '../../lib/types';
import RadioItem from './RadioItem';
import { t } from '@/lib/i18n';

interface RadioGroupProps {
    options: (string | QuestionOption)[];
    value: string;
    onChange: (value: string) => void;
    name?: string;
    allowOther?: boolean;
}

const RadioGroup: React.FC<RadioGroupProps> = ({ options, value, onChange, name = 'radio-group', allowOther = false }) => {
    const normalizeOption = (opt: string | QuestionOption): QuestionOption => {
        return typeof opt === 'string' ? { label: opt } : opt;
    };

    const isCustomValue = (val: string) => {
        if (!val) return false;
        return !options.some(opt => {
            const normalized = normalizeOption(opt);
            return (normalized.id || normalized.label) === val;
        });
    };

    const [isOtherActive, setIsOtherActive] = useState(isCustomValue(value));

    useEffect(() => {
        if (isCustomValue(value)) {
            setIsOtherActive(true);
        }
    }, [value]);

    const handleOptionSelect = (option: QuestionOption) => {
        setIsOtherActive(false);
        onChange(option.id || option.label);
    };

    const handleOtherSelect = () => {
        setIsOtherActive(true);
        if (!isCustomValue(value)) {
            onChange('');
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" role="radiogroup">
                {options.map((opt) => {
                    const option = normalizeOption(opt);
                    const optId = option.id || option.label;
                    const isSelected = !isOtherActive && value === optId;

                    return (
                        <RadioItem
                            key={optId}
                            label={option.label}
                            description={option.description}
                            image={option.image}
                            checked={isSelected}
                            onSelect={() => handleOptionSelect(option)}
                            name={name}
                        />
                    );
                })}
                {allowOther && (
                    <RadioItem
                        label={isCustomValue(value) ? value : t('common.other', { raw: true })}
                        checked={isOtherActive}
                        isEditable={true}
                        onSelect={handleOtherSelect}
                        onLabelChange={(val) => onChange(val)}
                        name={name}
                    />
                )}
            </div>
        </div>
    );
};

export default RadioGroup;
