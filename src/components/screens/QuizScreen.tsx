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
import { ChevronLeft, ChevronRight, Send } from 'lucide-react';

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
            <div className="flex justify-between items-center mb-6">
                <ResetButton type="full" onReset={openResetModal} />
                <div className="text-gray-400 text-sm font-medium">
                    Вопрос {visibleStepIndex + 1} из {visibleTotal}
                </div>
            </div>

            <ProgressBar current={visibleStepIndex} total={visibleTotal} />

            <Slide direction={direction} slideKey={currentQuestion.id}>
                <div className="bg-white border border-gray-100 p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
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
                            <ChevronLeft className="w-5 h-5" />
                            Назад
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
                                    ? "bg-blue-600 text-white hover:bg-blue-700"
                                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                                    }`}
                            >
                                Далее
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                </div>
            </Slide>
        </div>
    );
};

export default QuizScreen;
