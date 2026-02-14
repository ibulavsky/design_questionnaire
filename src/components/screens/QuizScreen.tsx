'use client';

import React, { useEffect } from 'react';
import {
    useQuizStore,
    useCurrentQuestion,
    useIsAnswered,
    useIsLastStep,
    useVisibleStepIndex
} from '@/store/quizStore';

import Slide from '../Slide';
import TextInput from '../questions/TextInput';
import RadioGroup from '../questions/RadioGroup';
import CheckboxGroup from '../questions/CheckboxGroup';
import FileUpload from '../questions/FileUpload';
import FieldGroup from '../FieldGroup';

import { Send } from 'lucide-react';

const QuizScreen = () => {
    const {
        currentStep,
        direction,
        answers,
        isSubmitting,
        next,
        prev,
        submit,
        updateAnswer
    } = useQuizStore();

    const currentQuestion = useCurrentQuestion();
    const isAnswered = useIsAnswered();
    const isLastStep = useIsLastStep();
    const visibleStepIndex = useVisibleStepIndex();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentStep]);

    if (!currentQuestion) return null;

    const renderQuestionContent = () => {
        if (currentQuestion.type === 'group' && currentQuestion.fields) {
            return (
                <FieldGroup
                    fields={currentQuestion.fields}
                    answers={answers}
                    onUpdate={updateAnswer}
                />
            );
        }

        const currentAnswer = answers[currentQuestion.id] ||
            (currentQuestion.type === 'checkbox' ? [] :
                currentQuestion.type === 'file' ? [] : '');

        switch (currentQuestion.type) {
            case 'text':
                return (
                    <TextInput
                        value={currentAnswer as string}
                        onChange={(val) => updateAnswer(currentQuestion.id, val)}
                        placeholder={currentQuestion.placeholder}
                    />
                );
            case 'textarea':
                return (
                    <TextInput
                        value={currentAnswer as string}
                        onChange={(val) => updateAnswer(currentQuestion.id, val)}
                        placeholder={currentQuestion.placeholder}
                        isTextArea
                    />
                );
            case 'radio':
                return (
                    <RadioGroup
                        options={currentQuestion.options || []}
                        value={currentAnswer as string}
                        onChange={(val) => updateAnswer(currentQuestion.id, val)}
                        allowOther={currentQuestion.allowOther}
                    />
                );
            case 'checkbox':
                return (
                    <CheckboxGroup
                        options={currentQuestion.options || []}
                        value={currentAnswer as string[]}
                        onChange={(val) => updateAnswer(currentQuestion.id, val)}
                        allowOther={currentQuestion.allowOther}
                    />
                );
            case 'file':
                return (
                    <FileUpload
                        value={(currentAnswer as (string | { name: string, data: string })[]) || []}
                        onChange={(val) => updateAnswer(currentQuestion.id, val)}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="w-full">
            <Slide direction={direction} slideKey={currentQuestion.id}>
                <div className="py-4">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl md:text-5xl font-light text-black mb-6 uppercase leading-[1]">
                            <span className="block mb-2">БЛОК {visibleStepIndex + 1}.</span>
                            {currentQuestion.title}
                        </h2>
                        {currentQuestion.description && (
                            <p className="text-black/60 font-light text-sm">{currentQuestion.description}</p>
                        )}
                    </div>

                    <div className="min-h-[200px]">
                        {renderQuestionContent()}
                    </div>

                    <div className="flex justify-between mt-10 gap-4">
                        <button
                            onClick={prev}
                            disabled={currentStep === 0}
                            className={`flex items-center gap-2 px-8 py-3 rounded-full font-light uppercase text-sm tracking-wide transition-all ${currentStep === 0
                                ? "opacity-0 pointer-events-none"
                                : "border border-black text-black hover:bg-black hover:text-white"
                                }`}
                        >
                            НАЗАД
                        </button>

                        {isLastStep ? (
                            <div className="flex gap-4">
                                <button
                                    onClick={submit}
                                    disabled={!isAnswered || isSubmitting}
                                    className={`flex items-center gap-2 px-8 py-3 rounded-full font-light uppercase text-sm tracking-wide transition-all ${isAnswered && !isSubmitting
                                        ? "bg-black text-white hover:bg-gray-900"
                                        : "bg-black/5 text-black/20 cursor-not-allowed"
                                        }`}
                                >
                                    {isSubmitting ? "Отправка..." : "Отправить бриф"}
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={next}
                                disabled={!isAnswered}
                                className={`flex items-center gap-2 px-8 py-3 rounded-full font-light uppercase text-sm tracking-wide transition-all ${isAnswered
                                    ? "bg-black text-white hover:bg-gray-900"
                                    : "bg-black/5 text-black/20 cursor-not-allowed"
                                    }`}
                            >
                                ДАЛЕЕ
                            </button>
                        )}
                    </div>
                </div>
            </Slide>
        </div>
    );
};

export default QuizScreen;
