import { NextResponse } from 'next/server';
import { sendToTelegram } from '@/lib/telegram';
import { sendEmail } from '@/lib/email';
import { QUESTIONS } from '@/data/questions';

export async function POST(request: Request) {
    try {
        const answers = await request.json();

        // 1. Format message for Telegram
        let message = `<b>🚀 Новый бриф получен!</b>\n\n`;
        QUESTIONS.forEach(q => {
            const answer = answers[q.id];
            if (answer) {
                message += `<b>${q.title}:</b>\n${Array.isArray(answer) ? answer.join(', ') : answer}\n\n`;
            }
        });

        // 2. Format HTML for Email
        let html = `<h1>Новый бриф на дизайн</h1>`;
        QUESTIONS.forEach(q => {
            const answer = answers[q.id];
            if (answer) {
                html += `<h3>${q.title}</h3><p>${Array.isArray(answer) ? answer.join(', ') : answer}</p>`;
            }
        });

        // 3. Send notifications (Parallel)
        const [tgResult, emailResult] = await Promise.all([
            sendToTelegram(message),
            sendEmail('Новый бриф на дизайн', html)
        ]);

        return NextResponse.json({
            success: true,
            telegram: tgResult,
            email: emailResult?.success
        });

    } catch (error) {
        console.error('Submission error:', error);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
}
