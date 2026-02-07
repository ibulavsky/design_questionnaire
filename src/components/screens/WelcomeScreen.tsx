'use client';

import React from 'react';
import { useQuizStore } from '@/store/quizStore';
const WelcomeScreen = () => {
    const { startQuiz } = useQuizStore();

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center animate-fade-in">
            <header className="mb-12">
                <div className="mb-6">
                    <span className="inline-block text-gray-900 font-bold tracking-[0.3em] leading-[1] uppercase text-sm">
                        Добро пожаловать <br className="hidden md:block" /> в space
                    </span>
                </div>
                <h1 className="text-4xl uppercase md:text-7xl font-bold text-gray-900 mb-8 tracking-tight leading-[1.05]">
                    Давайте вместе поможем <br className="hidden md:block" />
                    вашему бренду сиять сильнее
                </h1>
                <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed mb-10">
                    Пожалуйста, ответьте на эти вопросы. Это поможет мне лучше понять, <br className="hidden md:block" />
                    как помочь вашей компании стать ярче конкурентов ✨
                </p>

                <button
                    onClick={startQuiz}
                    className="group inline-flex items-center gap-3 px-8 py-4 bg-black hover:bg-gray-800 text-white rounded-2xl font-bold text-lg shadow-xl shadow-black/10 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                    НАЧАТЬ
                </button>
            </header>
        </div>
    );
};

export default WelcomeScreen;
