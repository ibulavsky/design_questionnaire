'use client';

import React from 'react';
import { THANK_YOU_MESSAGE } from '../../data/questions';
import { Answers } from '../../lib/types';
import DownloadPDF from '../DownloadPDF';
import { CheckCircle2 } from 'lucide-react';

interface ThankYouScreenProps {
    answers: Answers;
}

const ThankYouScreen: React.FC<ThankYouScreenProps> = ({ answers }) => {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in duration-500">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Спасибо за ваши ответы!</h1>
            <p className="text-gray-500 max-w-md mx-auto mb-2 whitespace-pre-line">
                {THANK_YOU_MESSAGE}
            </p>
            <DownloadPDF answers={answers} />
            <div className="mt-12">
                <button
                    onClick={() => window.location.reload()}
                    className="px-8 py-3 bg-black text-white font-semibold rounded-xl hover:bg-gray-800 transition-all font-bold"
                >
                    Вернуться на главную
                </button>
            </div>
        </div>
    );
};

export default ThankYouScreen;
