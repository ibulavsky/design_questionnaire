'use client';

import React from 'react';
import { Answers } from '../../lib/types';
import DownloadPDF from '../DownloadPDF';

interface ThankYouScreenProps {
    answers: Answers;
}

const ThankYouScreen: React.FC<ThankYouScreenProps> = ({ answers }) => {
    return (
        <div className="flex flex-col items-center animate-fade-in pt-4 px-4 w-full">
            <div className="flex flex-col items-center w-full text-center">
                <header className="mb-12">
                    <h1 className="text-3xl md:text-5xl font-light uppercase text-black leading-[1] mb-6">
                        СПАСИБО
                        <br />
                        ЗА ВАШИ
                        <br />
                        ОТВЕТЫ
                    </h1>

                    <h2 className="text-[clamp(2.5rem,10vw,5.5rem)] font-light uppercase text-black leading-[1] tracking-tighter mb-12">
                        БРИФ
                        <br />
                        ПОЛУЧИЛА
                        <br />
                        И УЖЕ
                        <br />
                        ЧИТАЮ
                    </h2>
                </header>

                <div className="text-sm text-black/90 font-light max-w-xs mx-auto mb-16 space-y-2">
                    <p>В течении 3 рабочих дней я свяжусь с вами, чтобы обсудить проект</p>
                    <p>До связи!</p>
                </div>

                <div className="flex flex-col gap-4 w-full max-w-sm">
                    <DownloadPDF answers={answers}>
                        <button className="w-full py-4 bg-black hover:bg-gray-900 text-white rounded-full text-base uppercase transition-all">
                            СКАЧАТЬ БРИФ
                        </button>
                    </DownloadPDF>

                    <button
                        onClick={() => window.location.reload()}
                        className="w-full py-4 border border-black hover:bg-black hover:text-white text-black rounded-full text-base uppercase transition-all"
                    >
                        ВЕРНУТЬСЯ НА ГЛАВНУЮ
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ThankYouScreen;
