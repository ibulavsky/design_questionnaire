'use client';

import React, { useEffect } from 'react';
import { useQuizStore, useCurrentQuestion } from '@/store/quizStore';
import Modal from './ui/Modal';
import ResetButton from './ResetButton';
import ThankYouScreen from './screens/ThankYouScreen';
import QuizScreen from './screens/QuizScreen';

const Quiz = () => {
    const {
        currentStep,
        isSubmitted,
        submittedAnswers,
        isResetModalOpen,
        init,
        openResetModal,
        closeResetModal,
        confirmReset
    } = useQuizStore();

    const currentQuestion = useCurrentQuestion();

    useEffect(() => {
        init();
    }, [init]);

    // Loading state
    if (currentStep === -1) return null;

    // Thank you screen
    if (isSubmitted && submittedAnswers) {
        return <ThankYouScreen answers={submittedAnswers} />;
    }

    // Error state
    if (!currentQuestion) {
        return (
            <div className="text-center py-20">
                <p className="text-white mb-4">Произошла ошибка загрузки вопроса.</p>
                <ResetButton type="full" onReset={openResetModal} />
            </div>
        );
    }

    return (
        <>
            <QuizScreen />
            <Modal
                isOpen={isResetModalOpen}
                onClose={closeResetModal}
                onConfirm={confirmReset}
                title="Сброс ответов"
                description="Вы уверены, что хотите сбросить все заполненные данные? Это действие нельзя будет отменить."
                confirmLabel="Сбросить всё"
                confirmVariant="danger"
            />
        </>
    );
};

export default Quiz;
