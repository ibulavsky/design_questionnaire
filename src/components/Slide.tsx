'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SlideProps {
    children: React.ReactNode;
    direction: number; // 1 for next, -1 for prev
    slideKey: string;
}

const Slide: React.FC<SlideProps> = ({ children, direction, slideKey }) => {
    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
        }),
    };

    return (
        <div className="relative w-full max-w-2xl mx-auto overflow-x-hidden min-h-[400px]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                    key={slideKey}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 },
                    }}
                    className="w-full"
                >
                    {children}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default Slide;
