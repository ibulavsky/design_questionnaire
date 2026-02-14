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
                const getLabel = (field: any, val: any) => {
                    if (typeof val !== 'string') return val;
                    const option = (field.options || []).find((opt: any) => {
                        const optId = typeof opt === 'string' ? opt : (opt.id || opt.label);
                        return optId === val;
                    });
                    return typeof option === 'string' ? option : (option?.label || val);
                };

                const getAbsoluteUrl = (url: string) => {
                    if (!url) return '';
                    if (url.startsWith('http') || url.startsWith('data:')) return url;

                    // Client side: use window.location.origin
                    if (typeof window !== 'undefined') {
                        return `${window.location.origin}${url}`;
                    }

                    // Server side: resolve path to public folder
                    if (url.startsWith('/')) {
                        return path.join(process.cwd(), 'public', url);
                    }

                    return url;
                };

                const renderField = (field: any, val: any) => {
                    if (!val) return null;

                    // Handle file uploads (images)
                    if (field.type === 'file' && Array.isArray(val)) {
                        return (
                            <View key={field.id} style={styles.section} wrap={false}>
                                <Text style={styles.question}>{field.title}</Text>
                                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
                                    {val.map((item: any, idx: number) => {
                                        const imgSrc = typeof item === 'string' ? item : item.data;
                                        if (!imgSrc) return null;

                                        return (
                                            <View key={idx} style={{ width: '30%', marginBottom: 10 }}>
                                                <PDFImage src={imgSrc} style={{ width: '100%' }} />
                                                <Text style={{ fontSize: 8, color: '#666', marginTop: 2 }}>
                                                    {typeof item === 'object' ? (item.name || `Файл ${idx + 1}`) : `Ссылка ${idx + 1}`}
                                                </Text>
                                                {typeof item === 'string' && (
                                                    <Text style={{ fontSize: 7, color: '#2563eb', marginTop: 1 }}>
                                                        {item.length > 30 ? item.substring(0, 27) + '...' : item}
                                                    </Text>
                                                )}
                                            </View>
                                        );
                                    })}
                                </View>
                            </View>
                        );
                    }

                    // Handle options with images (radio/checkbox)
                    const selectedOptionsWithImages = (field.options || [])
                        .filter((opt: any) => {
                            const optId = typeof opt === 'string' ? opt : (opt.id || opt.label);
                            const isSelected = Array.isArray(val) ? val.includes(optId) : val === optId;
                            return isSelected && typeof opt === 'object' && opt.image;
                        });

                    if (selectedOptionsWithImages.length > 0) {
                        return (
                            <View key={field.id} style={styles.section} wrap={false}>
                                <Text style={styles.question}>{field.title}</Text>
                                <Text style={[styles.answer, { marginBottom: 10 }]}>
                                    {Array.isArray(val)
                                        ? val.map(v => getLabel(field, v)).join(', ')
                                        : getLabel(field, val)}
                                </Text>
                                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
                                    {selectedOptionsWithImages.map((opt: any, idx: number) => {
                                        const isSvg = opt.image.toLowerCase().endsWith('.svg');
                                        return (
                                            <View key={idx} style={{ width: '30%', marginBottom: 10 }}>
                                                {!isSvg ? (
                                                    <PDFImage src={getAbsoluteUrl(opt.image)} style={{ width: '100%' }} />
                                                ) : (
                                                    <View style={{ width: '100%', aspectRatio: 1, backgroundColor: '#f3f4f6', justifyContent: 'center', alignItems: 'center' }}>
                                                        <Text style={{ fontSize: 8, color: '#9ca3af' }}>SVG Preview N/A</Text>
                                                    </View>
                                                )}
                                                <Text style={{ fontSize: 8, color: '#666', marginTop: 2 }}>
                                                    {opt.label}
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
                        <View key={field.id} style={styles.section} wrap={false}>
                            <Text style={styles.question}>{field.title}</Text>
                            <Text style={styles.answer}>
                                {Array.isArray(val)
                                    ? val.map(v => getLabel(field, v)).join(', ')
                                    : getLabel(field, val)}
                            </Text>
                        </View>
                    );
                };

                if (q.type === 'group' && q.fields) {
                    const groupAnswers = q.fields.map(f => ({ field: f, val: answers[f.id] })).filter(a => a.val);
                    if (groupAnswers.length === 0) return null;

                    return (
                        <View key={q.id}>
                            <Text style={[styles.question, { color: '#3b82f6', borderBottom: 1, borderBottomColor: '#eee', paddingBottom: 5, marginBottom: 10, marginTop: 10 }]}>
                                {q.title}
                            </Text>
                            {groupAnswers.map(a => renderField(a.field, a.val))}
                        </View>
                    );
                }

                return renderField(q, answers[q.id]);
            })}

            <Text style={styles.footer}>
                © {new Date().getFullYear()} Design Studio. Все права защищены.
            </Text>
        </Page>
    </Document>
);
