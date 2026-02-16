import React from 'react';
import { useQuizStore } from '@/store/quizStore';
import { t } from '@/lib/i18n';

const WelcomeScreen = () => {
    const { startQuiz } = useQuizStore();

    return (
        <div className="flex flex-col items-center flex-1 animate-fade-in w-full md:justify-center">
            <div className="flex flex-col items-center justify-center flex-1 w-full text-center py-12 md:flex-none">
                <h1 className="text-[clamp(2.5rem,10vw,5.5rem)] uppercase font-light text-black leading-[1] tracking-tight mb-8">
                    {t('welcome.title').split('\n').map((line, i) => (
                        <React.Fragment key={i}>
                            {line}
                            <br />
                        </React.Fragment>
                    ))}
                </h1>
                <div className="text-3xl mb-10 select-none" aria-hidden="true">
                    ✨
                </div>
                <p className="text-sm text-black/60 max-w-xs mx-auto">
                    {t('welcome.description')}
                </p>
            </div>

            <div className="w-full flex justify-center pb-8 md:pb-0 md:mt-12">
                <button
                    onClick={startQuiz}
                    className="w-full max-w-sm py-4 bg-black hover:bg-gray-900 text-white rounded-2xl text-base uppercase shadow-xl shadow-black/10 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                    {t('common.start')}
                </button>
            </div>
        </div>
    );
};

export default WelcomeScreen;
