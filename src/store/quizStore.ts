'use client';

import { create } from 'zustand';
import { QUESTIONS } from '@/data/questions';
import { Answers, Question } from '@/lib/types';
import {
    saveAnswers, loadAnswers,
    saveCurrentStep, loadCurrentStep,
    clearAnswers, clearAnswer
} from '@/lib/storage';

interface QuizState {
    currentStep: number;
    direction: number;
    answers: Answers;
    isSubmitting: boolean;
    isSubmitted: boolean;
    submittedAnswers: Answers | null;
    isResetModalOpen: boolean;
    isStarted: boolean;

    // Actions
    init: () => void;
    startQuiz: () => void;
    next: () => void;
    prev: () => void;
    updateAnswer: (questionId: string, value: string | string[] | (File | string)[]) => void;
    openResetModal: () => void;
    closeResetModal: () => void;
    confirmReset: () => void;
    resetCurrentQuestion: () => void;
    submit: () => Promise<void>;
}

const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

export const useQuizStore = create<QuizState>((set, get) => ({
    currentStep: -1,
    direction: 0,
    answers: {},
    isSubmitting: false,
    isSubmitted: false,
    submittedAnswers: null,
    isResetModalOpen: false,
    isStarted: false,

    init: () => {
        const savedAnswers = loadAnswers();
        let savedStep = loadCurrentStep();
        const hasAnswers = Object.keys(savedAnswers).length > 0;

        if (savedStep >= QUESTIONS.length || savedStep < 0) {
            savedStep = 0;
            saveCurrentStep(0);
        }

        set({
            answers: savedAnswers,
            currentStep: savedStep,
            isStarted: hasAnswers || savedStep > 0
        });
    },

    startQuiz: () => {
        set({ isStarted: true, currentStep: 0 });
        saveCurrentStep(0);
    },

    next: () => {
        const { currentStep } = get();
        if (currentStep < QUESTIONS.length - 1) {
            const nextStep = currentStep + 1;
            set({ direction: 1, currentStep: nextStep });
            saveCurrentStep(nextStep);
            scrollToTop();
        }
    },

    prev: () => {
        const { currentStep } = get();
        if (currentStep > 0) {
            const prevStep = currentStep - 1;
            set({ direction: -1, currentStep: prevStep });
            saveCurrentStep(prevStep);
            scrollToTop();
        }
    },

    updateAnswer: (questionId, value) => {
        const { answers } = get();
        const newAnswers = { ...answers, [questionId]: value };
        set({ answers: newAnswers });

        // Don't save File objects to localStorage
        const storableAnswers = { ...newAnswers };
        Object.keys(storableAnswers).forEach(key => {
            if (Array.isArray(storableAnswers[key]) && storableAnswers[key][0] instanceof File) {
                delete storableAnswers[key];
            }
        });
        saveAnswers(storableAnswers);
    },

    openResetModal: () => set({ isResetModalOpen: true }),
    closeResetModal: () => set({ isResetModalOpen: false }),

    confirmReset: () => {
        clearAnswers();
        set({
            answers: {},
            currentStep: 0,
            isStarted: false,
            isResetModalOpen: false
        });
        saveCurrentStep(0);
    },

    resetCurrentQuestion: () => {
        const { currentStep, answers } = get();
        const currentQuestion = QUESTIONS[currentStep];
        if (!currentQuestion) return;

        const newAnswers = { ...answers };

        if (currentQuestion.type === 'group' && currentQuestion.fields) {
            currentQuestion.fields.forEach(field => {
                clearAnswer(field.id);
                delete newAnswers[field.id];
            });
        } else {
            clearAnswer(currentQuestion.id);
            delete newAnswers[currentQuestion.id];
        }

        set({ answers: newAnswers });
    },

    submit: async () => {
        const { answers } = get();
        set({ isSubmitting: true });

        try {
            const formData = new FormData();

            const cleanAnswers = { ...answers };
            Object.keys(answers).forEach(key => {
                const value = answers[key];
                if (Array.isArray(value)) {
                    const files = value.filter(item => item instanceof File);
                    const nonFiles = value.filter(item => !(item instanceof File));

                    files.forEach(file => {
                        formData.append(`file_${key}`, file as File);
                    });

                    cleanAnswers[key] = nonFiles;
                }
            });

            Object.keys(cleanAnswers).forEach(key => {
                formData.append(key, JSON.stringify(cleanAnswers[key]));
            });

            const response = await fetch('/api/submit', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                set({
                    submittedAnswers: { ...answers },
                    isSubmitted: true
                });
                clearAnswers();
                scrollToTop();
            } else {
                alert('Ошибка при отправке. Попробуйте снова.');
            }
        } catch (error) {
            console.error('Submission error:', error);
            alert('Ошибка при отправке. Проверьте соединение.');
        } finally {
            set({ isSubmitting: false });
        }
    },
}));

// Selectors
export const useCurrentQuestion = () => useQuizStore(state => {
    const currentStep = state.currentStep;
    return currentStep >= 0 ? QUESTIONS[currentStep] : undefined;
});

// Separate hooks instead of object to avoid infinite loop
export const useVisibleStepIndex = () => useQuizStore(state => {
    const currentQuestion = QUESTIONS[state.currentStep];
    if (!currentQuestion) return 0;

    const visibleQuestions = QUESTIONS.filter(q => !q.showIf || q.showIf(state.answers));
    return visibleQuestions.findIndex(q => q.id === currentQuestion.id);
});

export const useVisibleTotal = () => useQuizStore(state => {
    const visibleQuestions = QUESTIONS.filter(q => !q.showIf || q.showIf(state.answers));
    return visibleQuestions.length;
});

export const useIsAnswered = () => useQuizStore(state => {
    const currentQuestion = QUESTIONS[state.currentStep];
    if (!currentQuestion) return false;

    const isGroupAnswered = (question: Question): boolean => {
        if (question.type === 'group' && question.fields) {
            return question.fields.every(field => {
                const isVisible = !field.showIf || field.showIf(state.answers);
                if (!isVisible || !field.required) return true;
                const answer = state.answers[field.id];
                return Array.isArray(answer) ? answer.length > 0 : !!answer;
            });
        }
        if (!question.required) return true;
        const answer = state.answers[question.id];
        return Array.isArray(answer) ? answer.length > 0 : !!answer;
    };

    return isGroupAnswered(currentQuestion);
});

export const useIsLastStep = () => useQuizStore(state =>
    state.currentStep === QUESTIONS.length - 1
);
