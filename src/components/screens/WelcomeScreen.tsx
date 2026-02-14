'use client';

import React from 'react';
import { useQuizStore } from '@/store/quizStore';

const WelcomeScreen = () => {
    const { startQuiz } = useQuizStore();

    return (
        <div className="flex flex-col items-center min-h-[70vh] animate-fade-in">
            <div className="flex flex-col items-center justify-center flex-1 w-full text-center">
                <h1 className="text-[clamp(2.5rem,10vw,5.5rem)] uppercase font-light text-black leading-[1] tracking-tight mb-8">
                    Давайте
                    <br />
                    поможем
                    <br />
                    вашему
                    <br />
                    бренду
                    <br />
                    сиять
                    <br />
                    сильнее
                </h1>
                <div className="text-3xl mb-10 select-none" aria-hidden="true">
                    ✨
                </div>
                <p className="text-sm text-black/60 max-w-xs mx-auto mb-10">
                    Пожалуйста, ответьте на эти вопросы. Это поможет мне
                    лучше понять, как помочь вашей компании стать ярче
                    конкурентов
                </p>
                <button
                    onClick={startQuiz}
                    className="w-full max-w-sm py-4 bg-black hover:bg-gray-900 text-white rounded-2xl text-base uppercase shadow-xl shadow-black/10 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                    НАЧАТЬ
                </button>
            </div>
        </div>
    );
};

export default WelcomeScreen;
