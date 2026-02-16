import React from 'react';
import { Answers } from '../../lib/types';
import DownloadPDF from '../DownloadPDF';
import { t } from '@/lib/i18n';

interface ThankYouScreenProps {
    answers: Answers;
}

const ThankYouScreen: React.FC<ThankYouScreenProps> = ({ answers }) => {
    return (
        <div className="flex flex-col items-center animate-fade-in pt-4 px-4 w-full">
            <div className="flex flex-col items-center w-full text-center">
                <header className="mb-12">
                    <h1 className="text-3xl md:text-5xl font-light uppercase text-black leading-[1] mb-6">
                        {t('thankYou.title').split('\n').map((line, i) => (
                            <React.Fragment key={i}>
                                {line}
                                <br />
                            </React.Fragment>
                        ))}
                    </h1>

                    <h2 className="text-[clamp(2.5rem,10vw,5.5rem)] font-light uppercase text-black leading-[1] tracking-tighter mb-12">
                        {t('thankYou.subtitle').split('\n').map((line, i) => (
                            <React.Fragment key={i}>
                                {line}
                                <br />
                            </React.Fragment>
                        ))}
                    </h2>
                </header>

                <div className="text-sm text-black/90 font-light max-w-xs mx-auto mb-16 space-y-2">
                    {t('thankYou.message').split('\n').map((line, i) => (
                        <p key={i}>{line}</p>
                    ))}
                </div>

                <div className="flex flex-col gap-4 w-full max-w-sm">
                    <DownloadPDF answers={answers}>
                        <button className="w-full py-4 bg-black hover:bg-gray-900 text-white rounded-full text-base uppercase transition-all">
                            {t('thankYou.downloadPdf')}
                        </button>
                    </DownloadPDF>

                    <button
                        onClick={() => window.location.reload()}
                        className="w-full py-4 border border-black hover:bg-black hover:text-white text-black rounded-full text-base uppercase transition-all"
                    >
                        {t('common.goHome')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ThankYouScreen;
