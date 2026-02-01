import { Answers } from './types';

const STORAGE_KEY = 'questionnaire_answers';
const STEP_KEY = 'questionnaire_step';

export const saveAnswers = (answers: Answers) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
    }
};

export const loadAnswers = (): Answers => {
    if (typeof window === 'undefined') return {};
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
};

export const saveCurrentStep = (step: number) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(STEP_KEY, step.toString());
    }
};

export const loadCurrentStep = (): number => {
    if (typeof window === 'undefined') return 0;
    const saved = localStorage.getItem(STEP_KEY);
    return saved ? parseInt(saved, 10) : 0;
};

export const clearAnswers = () => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(STEP_KEY);
    }
};

export const clearAnswer = (questionId: string) => {
    if (typeof window !== 'undefined') {
        const answers = loadAnswers();
        delete answers[questionId];
        saveAnswers(answers);
    }
};
