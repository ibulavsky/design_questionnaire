'use client';

import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { QUESTIONS } from '../data/questions';
import { Answers } from './types';

// Register Roboto font which has excellent Cyrillic support and stable TTF links
Font.register({
    family: 'Onest',
    fonts: [
        { src: '/fonts/Onest-Regular.ttf' },
        { src: '/fonts/Onest-Bold.ttf', fontWeight: 'bold' },
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
                <Text style={styles.title}>Design Brief Result</Text>
                <Text style={styles.subtitle}>Generated on {new Date().toLocaleDateString()}</Text>
            </View>

            {QUESTIONS.map((q) => {
                const answer = answers[q.id];
                if (!answer) return null;

                return (
                    <View key={q.id} style={styles.section}>
                        <Text style={styles.question}>{q.title}</Text>
                        <Text style={styles.answer}>
                            {Array.isArray(answer) ? answer.join(', ') : answer}
                        </Text>
                    </View>
                );
            })}

            <Text style={styles.footer}>
                © {new Date().getFullYear()} Design Studio. All rights reserved.
            </Text>
        </Page>
    </Document>
);
