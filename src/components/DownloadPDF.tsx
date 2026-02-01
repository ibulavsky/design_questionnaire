'use client';

import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { QuestionnairePDF } from '../lib/pdf';
import { Answers } from '../lib/types';
import { Download, FileText } from 'lucide-react';

interface DownloadPDFProps {
    answers: Answers;
}

const DownloadPDF: React.FC<DownloadPDFProps> = ({ answers }) => {
    return (
        <div className="mt-8">
            <PDFDownloadLink
                document={<QuestionnairePDF answers={answers} />}
                fileName="design-brief.pdf"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white/80 hover:bg-white/10 hover:text-white transition-all text-sm font-medium"
            >
                {({ loading }) => (
                    <>
                        {loading ? (
                            <span>Генерация PDF...</span>
                        ) : (
                            <>
                                <FileText className="w-4 h-4" />
                                <span>Скачать бриф в PDF</span>
                                <Download className="w-4 h-4 ml-1" />
                            </>
                        )}
                    </>
                )}
            </PDFDownloadLink>
        </div>
    );
};

export default DownloadPDF;
