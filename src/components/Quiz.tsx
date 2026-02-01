'use client';

import React, { useState, useEffect } from 'react';
import { QUESTIONS } from '../data/questions';
import { Answers, Question } from '../lib/types';
import {
    saveAnswers, loadAnswers,
    saveCurrentStep, loadCurrentStep,
    clearAnswers, clearAnswer
} from '../lib/storage';
import ProgressBar from './ProgressBar';
import Slide from './Slide';
import TextInput from './questions/TextInput';
import RadioGroup from './questions/RadioGroup';
import CheckboxGroup from './questions/CheckboxGroup';
import FileUpload from './questions/FileUpload';
import FieldGroup from './FieldGroup';
import ResetButton from './ResetButton';
import DownloadPDF from './DownloadPDF';
import Modal from './ui/Modal';
import { ChevronLeft, ChevronRight, Send, CheckCircle2 } from 'lucide-react';

const Quiz = () => {
    const [currentStep, setCurrentStep] = useState<number>(-1);
    const [direction, setDirection] = useState(0);
    const [answers, setAnswers] = useState<Answers>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submittedAnswers, setSubmittedAnswers] = useState<Answers | null>(null);
    const [isResetModalOpen, setIsResetModalOpen] = useState(false);

    useEffect(() => {
        const savedAnswers = loadAnswers();
        let savedStep = loadCurrentStep();

        // Safety check: if saved step is out of bounds (due to question list changes), reset to 0
        if (savedStep >= QUESTIONS.length || savedStep < 0) {
            savedStep = 0;
            saveCurrentStep(0);
        }

        setAnswers(savedAnswers);
        setCurrentStep(savedStep);
    }, []);

    const handleNext = () => {
        if (currentStep < QUESTIONS.length - 1) {
            setDirection(1);
            const nextStep = currentStep + 1;
            setCurrentStep(nextStep);
            saveCurrentStep(nextStep);
        }
    };

    const handlePrev = () => {
        if (currentStep > 0) {
            setDirection(-1);
            const prevStep = currentStep - 1;
            setCurrentStep(prevStep);
            saveCurrentStep(prevStep);
        }
    };

    const updateAnswer = (questionId: string, value: string | string[] | (File | string)[]) => {
        const newAnswers = { ...answers, [questionId]: value };
        setAnswers(newAnswers);
        // Don't save File objects to localStorage
        const storableAnswers = { ...newAnswers };
        Object.keys(storableAnswers).forEach(key => {
            if (Array.isArray(storableAnswers[key]) && storableAnswers[key][0] instanceof File) {
                delete storableAnswers[key];
            }
        });
        saveAnswers(storableAnswers);
    };

    const handleFullReset = () => {
        setIsResetModalOpen(true);
    };

    const confirmFullReset = () => {
        clearAnswers();
        setAnswers({});
        setCurrentStep(0);
        saveCurrentStep(0);
        setIsResetModalOpen(false);
    };

    const handleGroupReset = (fields: Question[]) => {
        const newAnswers = { ...answers };
        fields.forEach(field => {
            clearAnswer(field.id);
            delete newAnswers[field.id];
        });
        setAnswers(newAnswers);
    };

    const handleSingleReset = (questionId: string) => {
        clearAnswer(questionId);
        const newAnswers = { ...answers };
        delete newAnswers[questionId];
        setAnswers(newAnswers);
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            const formData = new FormData();

            // Separate data: questions with simple values and questions with files
            Object.keys(answers).forEach(key => {
                const value = answers[key];
                if (Array.isArray(value) && value[0] instanceof File) {
                    value.forEach(file => {
                        formData.append(`file_${key}`, file);
                    });
                } else {
                    formData.append(key, JSON.stringify(value));
                }
            });

            const response = await fetch('/api/submit', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                setSubmittedAnswers({ ...answers });
                setIsSubmitted(true);
                clearAnswers();
            } else {
                alert('Ошибка при отправке. Попробуйте снова.');
            }
        } catch (error) {
            console.error('Submission error:', error);
            alert('Ошибка при отправке. Проверьте соединение.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const isGroupAnswered = (question: Question | undefined): boolean => {
        if (!question) return false;
        if (question.type === 'group' && question.fields) {
            return question.fields.every(field => {
                if (!field.required) return true;
                const answer = answers[field.id];
                return Array.isArray(answer) ? answer.length > 0 : !!answer;
            });
        }
        if (!question.required) return true;
        const answer = answers[question.id];
        return Array.isArray(answer) ? answer.length > 0 : !!answer;
    };

    if (currentStep === -1) return null;

    if (isSubmitted && submittedAnswers) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6 border border-green-500/30">
                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                </div>
                <h1 className="text-3xl font-bold text-white mb-4">Спасибо за ответы!</h1>
                <p className="text-white/60 max-w-md mx-auto mb-2">
                    Ваш бриф успешно отправлен в Telegram и на Email.
                </p>
                <DownloadPDF answers={submittedAnswers} />
                <div className="mt-12">
                    <button
                        onClick={() => window.location.reload()}
                        className="px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-white/90 transition-all shadow-xl shadow-white/10"
                    >
                        Вернуться на главную
                    </button>
                </div>
            </div>
        );
    }

    const currentQuestion = QUESTIONS[currentStep];

    // Final defensive check
    if (!currentQuestion) {
        return (
            <div className="text-center py-20">
                <p className="text-white mb-4">Произошла ошибка загрузки вопроса.</p>
                <ResetButton type="full" onReset={handleFullReset} />
            </div>
        );
    }

    const isLastStep = currentStep === QUESTIONS.length - 1;
    const isAnswered = isGroupAnswered(currentQuestion);

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
            <div className="flex justify-between items-center mb-8">
                <ResetButton type="full" onReset={handleFullReset} />
                <div className="text-white/40 text-sm font-medium">
                    Вопрос {currentStep + 1} из {QUESTIONS.length}
                </div>
            </div>

            <ProgressBar current={currentStep} total={QUESTIONS.length} />

            <Slide direction={direction} slideKey={currentQuestion.id}>
                <div className="bg-white/[0.03] border border-white/10 p-8 rounded-3xl backdrop-blur-xl shadow-2xl">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-2">{currentQuestion.title}</h2>
                            {currentQuestion.description && (
                                <p className="text-white/60 mb-6">{currentQuestion.description}</p>
                            )}
                        </div>
                        <ResetButton
                            type="single"
                            onReset={() => currentQuestion.type === 'group' && currentQuestion.fields
                                ? handleGroupReset(currentQuestion.fields)
                                : handleSingleReset(currentQuestion.id)
                            }
                        />
                    </div>

                    <div className="min-h-[250px]">
                        {renderQuestionContent()}
                    </div>

                    <div className="flex justify-between mt-10 gap-4">
                        <button
                            onClick={handlePrev}
                            disabled={currentStep === 0}
                            className={`flex items-center gap-2 px-6 py-4 rounded-xl font-bold transition-all cursor-pointer ${currentStep === 0
                                ? "opacity-0 pointer-events-none"
                                : "bg-white/5 text-white hover:bg-white/10"
                                }`}
                        >
                            <ChevronLeft className="w-5 h-5" />
                            Назад
                        </button>

                        {isLastStep ? (
                            <button
                                onClick={handleSubmit}
                                disabled={!isAnswered || isSubmitting}
                                className={`flex items-center gap-2 px-8 py-4 rounded-xl font-bold transition-all shadow-lg cursor-pointer ${isAnswered && !isSubmitting
                                    ? "bg-green-600 text-white hover:bg-green-500 shadow-green-900/30"
                                    : "bg-white/10 text-white/40 cursor-not-allowed"
                                    }`}
                            >
                                {isSubmitting ? "Отправка..." : "Отправить бриф"}
                                <Send className="w-5 h-5" />
                            </button>
                        ) : (
                            <button
                                onClick={handleNext}
                                disabled={!isAnswered}
                                className={`flex items-center gap-2 px-8 py-4 rounded-xl font-bold transition-all shadow-lg cursor-pointer ${isAnswered
                                    ? "bg-blue-600 text-white hover:bg-blue-500 shadow-blue-900/30"
                                    : "bg-white/10 text-white/40 cursor-not-allowed"
                                    }`}
                            >
                                Далее
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                </div>
            </Slide>
            {/* Modal Confirmations */}
            <Modal
                isOpen={isResetModalOpen}
                onClose={() => setIsResetModalOpen(false)}
                onConfirm={confirmFullReset}
                title="Сброс ответов"
                description="Вы уверены, что хотите сбросить все заполненные данные? Это действие нельзя будет отменить."
                confirmLabel="Сбросить всё"
                confirmVariant="danger"
            />
        </div>
    );
};

export default Quiz;
