'use client';

import React from 'react';
import {
    useQuizStore,
    useCurrentQuestion,
    useVisibleStepIndex,
    useVisibleTotal,
    useIsAnswered,
    useIsLastStep
} from '@/store/quizStore';
import ProgressBar from '../ProgressBar';
import Slide from '../Slide';
import TextInput from '../questions/TextInput';
import RadioGroup from '../questions/RadioGroup';
import CheckboxGroup from '../questions/CheckboxGroup';
import FileUpload from '../questions/FileUpload';
import FieldGroup from '../FieldGroup';
import ResetButton from '../ResetButton';
import { Send, RotateCcw } from 'lucide-react';

const QuizScreen = () => {
    const {
        currentStep,
        direction,
        answers,
        isSubmitting,
        next,
        prev,
        submit,
        updateAnswer,
        openResetModal,
        resetCurrentQuestion
    } = useQuizStore();

    const currentQuestion = useCurrentQuestion();
    const visibleStepIndex = useVisibleStepIndex();
    const visibleTotal = useVisibleTotal();
    const isAnswered = useIsAnswered();
    const isLastStep = useIsLastStep();

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
                        value={currentAnswer as (File | string)[]}
                        onChange={(val) => updateAnswer(currentQuestion.id, val)}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="w-full">
            <div className="max-w-2xl mx-auto flex justify-between items-end mb-2 px-1">
                <div className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                    {Math.round(Math.min(Math.max((visibleStepIndex / (visibleTotal - 1)) * 100, 0), 100))}%
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-[10px] font-bold tracking-widest text-gray-400 uppercase opacity-80">
                        {visibleStepIndex + 1} <span className="mx-0.5 text-gray-300">/</span> {visibleTotal}
                    </div>
                    <button
                        onClick={openResetModal}
                        className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer group"
                        title="Начать заново"
                    >
                        <RotateCcw className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-500" />
                    </button>
                </div>
            </div>
            <ProgressBar current={visibleStepIndex} total={visibleTotal} />
            <Slide direction={direction} slideKey={currentQuestion.id}>
                <div className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-2">{currentQuestion.title}</h2>
                            {currentQuestion.description && (
                                <p className="text-gray-500">{currentQuestion.description}</p>
                            )}
                        </div>
                        <ResetButton type="single" onReset={resetCurrentQuestion} />
                    </div>

                    <div className="min-h-[200px]">
                        {renderQuestionContent()}
                    </div>

                    <div className="flex justify-between mt-10 gap-4">
                        <button
                            onClick={prev}
                            disabled={currentStep === 0}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${currentStep === 0
                                ? "opacity-0 pointer-events-none"
                                : "text-gray-600 hover:bg-gray-100"
                                }`}
                        >
                            НАЗАД
                        </button>

                        {isLastStep ? (
                            <button
                                onClick={submit}
                                disabled={!isAnswered || isSubmitting}
                                className={`flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all ${isAnswered && !isSubmitting
                                    ? "bg-green-600 text-white hover:bg-green-700"
                                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                                    }`}
                            >
                                {isSubmitting ? "Отправка..." : "Отправить бриф"}
                                <Send className="w-5 h-5" />
                            </button>
                        ) : (
                            <button
                                onClick={next}
                                disabled={!isAnswered}
                                className={`flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all ${isAnswered
                                    ? "bg-black text-white hover:bg-gray-100 hover:text-gray-600"
                                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
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
