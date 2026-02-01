export type QuestionType = 'text' | 'textarea' | 'radio' | 'checkbox' | 'file' | 'group';

export type AnswerType = string | string[] | (File | string)[];

export interface QuestionOption {
    label: string;
    description?: string;
    image?: string;
    children?: QuestionOption[];
}

export interface Question {
    id: string;
    type: QuestionType;
    title: string;
    description?: string;
    options?: (string | QuestionOption)[];
    required?: boolean;
    placeholder?: string;
    fields?: Question[]; // For group type - multiple fields on one slide
    allowOther?: boolean;
}

export interface Answers {
    [questionId: string]: AnswerType;
}

export interface AppState {
    currentStep: number;
    answers: Answers;
}
