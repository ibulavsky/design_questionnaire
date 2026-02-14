'use client';

import React from 'react';
import { useQuizStore } from '@/store/quizStore';

const MainHeader = () => {
    const { isStarted } = useQuizStore();

    return (
        <nav className="w-full flex items-start justify-between py-2 mb-6">
            <span className="text-[12px] text-black/50 tracking-wide font-light">
                argd_space
            </span>
            {!isStarted && (
                <span className="text-[12px] text-black font-light tracking-wide text-center leading-tight">
                    добро пожаловать<br />в space
                </span>
            )}
            <span className="text-[12px] text-black/50 tracking-wide font-light">
                design brief
            </span>
        </nav>
    );
};

export default MainHeader;
