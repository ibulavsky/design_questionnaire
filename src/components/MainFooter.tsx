'use client';

import React from 'react';
import { Instagram, Send } from 'lucide-react';

const MainFooter = () => {

    const instagram = process.env.INSTAGRAM;
    const telegram = process.env.TELEGRAM_NAME;

    return (
        <footer className="mt-24 pb-12 animate-fade-in [animation-delay:400ms] opacity-0 fill-mode-forwards">
            <div className="max-w-4xl mx-auto px-4">
                <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-12" />

                <div className="flex flex-col md:flex-row justify-between items-center gap-10">
                    {/* Brand / Info */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left order-2 md:order-1">
                        <span className="text-black font-bold tracking-[0.2em] uppercase text-xs mb-2">space</span>
                        <p className="text-gray-400 text-[10px] leading-relaxed max-w-[240px]">
                            Помогаем брендам создавать визуальную историю, которая вдохновляет и выделяет.
                        </p>
                        <span className="text-gray-300 text-[10px] mt-4">
                            &copy; {new Date().getFullYear()}. Все права защищены.
                        </span>
                    </div>

                    {/* Social Links */}
                    <div className="flex items-center gap-6 order-1 md:order-2">
                        <a
                            href={`https://instagram.com/${instagram}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-black transition-colors"
                            title="Instagram"
                        >
                            <Instagram className="w-5 h-5" />
                        </a>
                        <a
                            href={`https://t.me/${telegram}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-black transition-colors"
                            title="Telegram"
                        >
                            <Send className="w-5 h-5" />
                        </a>
                    </div>

                </div>
            </div>
        </footer>
    );
};

export default MainFooter;
