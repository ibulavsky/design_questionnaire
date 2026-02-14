'use client';

import React from 'react';
import { Instagram, Send } from 'lucide-react';
import { useQuizStore, useVisibleStepIndex, useVisibleTotal } from '@/store/quizStore';
import ProgressBar from './ProgressBar';

const MainFooter = () => {

    const {
        isStarted,
        isSubmitted,
        submittedAnswers,
        resetCurrentQuestion,
        openResetModal,
    } = useQuizStore();

    const visibleStepIndex = useVisibleStepIndex();
    const visibleTotal = useVisibleTotal();

    const instagram = process.env.NEXT_PUBLIC_INSTAGRAM;
    const telegram = process.env.NEXT_PUBLIC_TELEGRAM_NAME;

    const isShortInfo = !isStarted || (isSubmitted && submittedAnswers);

    return (
        <footer className="animate-fade-in [animation-delay:400ms] opacity-0 fill-mode-forwards">
            <div className="max-w-4xl mx-auto px-4">
                {!isShortInfo && (
                    <>
                        <div className="max-w-2xl mx-auto flex justify-between items-end mb-2 px-1">
                            <div className="text-[10px] font-light tracking-widest text-black/40 uppercase">
                                {Math.round(Math.min(Math.max((visibleStepIndex / (visibleTotal - 1)) * 100, 0), 100))}%
                            </div>
                            <div className="text-[10px] font-light tracking-widest text-black/40 uppercase opacity-80">
                                {visibleStepIndex + 1} <span className="mx-0.5 text-black/20">/</span> {visibleTotal}
                            </div>
                        </div>
                        <ProgressBar current={visibleStepIndex} total={visibleTotal} />
                    </>
                )}
                <div className={`flex items-center text-[10px] tracking-widest ${isShortInfo ? 'justify-center' : 'justify-between'}`}>
                    {!isShortInfo &&
                        <div className="flex items-center justify-center gap-6">
                            <button
                                onClick={resetCurrentQuestion}
                                className="text-black/50 font-light hover:text-black transition-colors"
                                title="Reset"
                            >
                                ОЧИСТИТЬ ВСЁ
                            </button>
                        </div>
                    }
                    <div className="flex flex-col items-center gap-4">
                        <div className="flex items-center justify-center gap-6">
                            <a
                                href={`https://instagram.com/${instagram}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-black/50 hover:text-black transition-colors"
                                title="Instagram"
                            >
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a
                                href={`https://t.me/${telegram}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-black/50 hover:text-black transition-colors"
                                title="Telegram"
                            >
                                <Send className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                    {!isShortInfo && (
                        <div className="flex items-center justify-center gap-6">
                            <button
                                onClick={openResetModal}
                                className="text-black/50 font-light hover:text-black transition-colors"
                                title="Reset"
                            >
                                НАЧАТЬ ЗАНОВО
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </footer>
    );
};

export default MainFooter;
