'use client';

import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { QuestionnairePDF } from '../lib/pdf';
import { Answers } from '../lib/types';
import { FileText } from 'lucide-react';

interface DownloadPDFProps {
    answers: Answers;
    children?: React.ReactNode;
}

const DownloadPDF: React.FC<DownloadPDFProps> = ({ answers, children }) => {
    return (
        <div className="w-full">
            <PDFDownloadLink
                document={<QuestionnairePDF answers={answers} />}
                fileName="design-brief.pdf"
                className="w-full"
            >
                {({ loading }) => (
                    children ? (
                        <div className={loading ? "opacity-50 pointer-events-none" : ""}>
                            {children}
                        </div>
                    ) : (
                        <button className="inline-flex items-center gap-2 px-6 py-3 bg-black/5 border border-black/10 rounded-xl text-black/60 hover:bg-black/10 hover:text-black transition-all text-sm font-medium w-full justify-center">
                            {loading ? (
                                <span>Генерация PDF...</span>
                            ) : (
                                <>
                                    <FileText className="w-4 h-4" />
                                    <span>Скачать бриф в PDF</span>
                                </>
                            )}
                        </button>
                    )
                )}
            </PDFDownloadLink>
        </div>
    );
};

export default DownloadPDF;
