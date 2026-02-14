'use client';

import React from 'react';
import TextInput from './questions/TextInput';
import CheckboxGroup from './questions/CheckboxGroup';
import RadioGroup from './questions/RadioGroup';
import FileUpload from './questions/FileUpload';
import { Question, Answers } from '../lib/types';

interface FieldGroupProps {
    fields: Question[];
    answers: Answers;
    onUpdate: (questionId: string, value: string | string[] | (string | { name: string; data: string; })[]) => void;
}

const FieldGroup: React.FC<FieldGroupProps> = ({ fields, answers, onUpdate }) => {
    return (
        <div className="flex flex-col gap-8">
            {fields.map((field) => {
                if (field.showIf && !field.showIf(answers)) return null;

                const currentValue = answers[field.id];

                return (
                    <div key={field.id}>
                        <label className="block text-xs font-light uppercase tracking-widest text-black mb-3">
                            {field.title}
                            {field.required && <span className="text-red-500 ml-1">*</span>}
                        </label>
                        {field.description && (
                            <p className="text-black/60 text-sm font-light mb-3">{field.description}</p>
                        )}

                        {(field.type === 'text' || field.type === 'textarea') && (
                            <TextInput
                                value={(currentValue as string) || ''}
                                onChange={(val) => onUpdate(field.id, val)}
                                placeholder={field.placeholder}
                                isTextArea={field.type === 'textarea'}
                            />
                        )}

                        {field.type === 'checkbox' && (
                            <CheckboxGroup
                                options={field.options || []}
                                value={(currentValue as string[]) || []}
                                onChange={(val) => onUpdate(field.id, val)}
                                allowOther={field.allowOther}
                            />
                        )}

                        {field.type === 'radio' && (
                            <RadioGroup
                                options={field.options || []}
                                value={(currentValue as string) || ''}
                                onChange={(val) => onUpdate(field.id, val)}
                                name={field.id}
                                allowOther={field.allowOther}
                            />
                        )}

                        {field.type === 'file' && (
                            <FileUpload
                                value={(currentValue as (string | { name: string, data: string })[]) || []}
                                onChange={(items: (string | { name: string, data: string })[]) => onUpdate(field.id, items)}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default FieldGroup;
