export type QuestionType = 'text' | 'textarea' | 'radio' | 'checkbox';

export interface Question {
    id: string;
    type: QuestionType;
    title: string;
    description?: string;
    options?: string[];
    required?: boolean;
    placeholder?: string;
}

export interface Answers {
    [questionId: string]: string | string[];
}

export interface AppState {
    currentStep: number;
    answers: Answers;
}
