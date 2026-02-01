import path from 'path';
import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Image as PDFImage } from '@react-pdf/renderer';
import { QUESTIONS } from '../data/questions';
import { Answers } from './types';

// Helper to get absolute path to fonts for server-side rendering
const getFontPath = (fontFile: string) => {
    if (typeof window === 'undefined') {
        return path.join(process.cwd(), 'public', 'fonts', fontFile);
    }
    return `/fonts/${fontFile}`;
};

// Register font for Cyrillic support
Font.register({
    family: 'Onest',
    fonts: [
        { src: getFontPath('Onest-Regular.ttf') },
        { src: getFontPath('Onest-Bold.ttf'), fontWeight: 'bold' },
    ],
});

const styles = StyleSheet.create({
    page: {
        padding: 50,
        backgroundColor: '#ffffff',
        fontFamily: 'Onest',
    },
    header: {
        marginBottom: 30,
        borderBottom: 2,
        borderBottomColor: '#3b82f6',
        paddingBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1f2937',
    },
    subtitle: {
        fontSize: 12,
        color: '#6b7280',
        marginTop: 5,
    },
    section: {
        marginBottom: 20,
    },
    question: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#374151',
        marginBottom: 5,
    },
    answer: {
        fontSize: 12,
        color: '#4b5563',
        backgroundColor: '#f9fafb',
        padding: 10,
        borderRadius: 5,
    },
    footer: {
        position: 'absolute',
        bottom: 30,
        left: 50,
        right: 50,
        textAlign: 'center',
        fontSize: 10,
        color: '#9ca3af',
        borderTop: 1,
        borderTopColor: '#e5e7eb',
        paddingTop: 10,
    },
});

interface PDFTemplateProps {
    answers: Answers;
}

export const QuestionnairePDF: React.FC<PDFTemplateProps> = ({ answers }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.header}>
                <Text style={styles.title}>Результаты брифа на дизайн</Text>
                <Text style={styles.subtitle}>Сгенерировано {new Date().toLocaleDateString()}</Text>
            </View>

            {QUESTIONS.map((q) => {
                const answer = answers[q.id];
                if (!answer) return null;

                // Handle file uploads (images)
                if (q.type === 'file' && Array.isArray(answer)) {
                    return (
                        <View key={q.id} style={styles.section} wrap={false}>
                            <Text style={styles.question}>{q.title}</Text>
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
                                {answer.map((item, idx) => {
                                    const imgSrc = typeof item === 'string' ? item : (item as any).data;
                                    if (!imgSrc) return null;

                                    return (
                                        <View key={idx} style={{ width: '30%', marginBottom: 10 }}>
                                            <PDFImage src={imgSrc} style={{ width: '100%' }} />
                                            <Text style={{ fontSize: 8, color: '#666', marginTop: 2 }}>
                                                {(item as any).name || `Изображение ${idx + 1}`}
                                            </Text>
                                        </View>
                                    );
                                })}
                            </View>
                        </View>
                    );
                }

                // Handle regular answers
                return (
                    <View key={q.id} style={styles.section} wrap={false}>
                        <Text style={styles.question}>{q.title}</Text>
                        <Text style={styles.answer}>
                            {Array.isArray(answer) ? answer.join(', ') : answer}
                        </Text>
                    </View>
                );
            })}

            <Text style={styles.footer}>
                © {new Date().getFullYear()} Design Studio. Все права защищены.
            </Text>
        </Page>
    </Document>
);
