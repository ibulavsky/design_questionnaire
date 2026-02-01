import { NextResponse } from 'next/server';
import { sendToTelegram, sendMediaGroupToTelegram } from '@/lib/telegram';
import { sendEmail } from '@/lib/email';
import { QUESTIONS } from '@/data/questions';
import { renderToBuffer } from '@react-pdf/renderer';
import { QuestionnairePDF } from '@/lib/pdf';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const answers: any = {};
        const userImages: { buffer: Buffer; filename: string; contentType: string }[] = [];

        // Parse FormData
        for (const [key, value] of formData.entries()) {
            if (key.startsWith('file_')) {
                const file = value as File;
                const buffer = Buffer.from(await file.arrayBuffer());
                userImages.push({
                    buffer,
                    filename: file.name,
                    contentType: file.type,
                });

                // Track files in answers for PDF
                const questionId = key.replace('file_', '');
                if (!answers[questionId]) answers[questionId] = [];
                answers[questionId].push({
                    data: `data:${file.type};base64,${buffer.toString('base64')}`,
                    name: file.name,
                    isImage: file.type.startsWith('image/'),
                });
            } else {
                try {
                    answers[key] = JSON.parse(value as string);
                } catch {
                    answers[key] = value;
                }
            }
        }

        // 1. Format message for Telegram
        let message = `<b>🚀 Новый бриф получен!</b>\n\n`;
        QUESTIONS.forEach(q => {
            if (q.type === 'group' && q.fields) {
                q.fields.forEach(f => {
                    const answer = answers[f.id];
                    if (answer) {
                        message += `<b>${f.title}:</b>\n${Array.isArray(answer) ? answer.join(', ') : answer}\n\n`;
                    }
                });
            } else {
                const answer = answers[q.id];
                if (answer) {
                    if (q.type === 'file' && Array.isArray(answer)) {
                        const filesCount = userImages.length;
                        const links = answer.filter(a => typeof a === 'string');
                        message += `<b>${q.title}:</b>\n${filesCount > 0 ? `• [Прикреплено ${filesCount} фото]\n` : ''}${links.length > 0 ? `• Ссылки:\n${links.map(l => l).join('\n')}\n` : ''}\n`;
                    } else {
                        message += `<b>${q.title}:</b>\n${Array.isArray(answer) ? answer.join(', ') : answer}\n\n`;
                    }
                }
            }
        });

        // 2. Format HTML for Email
        let html = `<h1>Новый бриф на дизайн</h1>`;
        QUESTIONS.forEach(q => {
            if (q.type === 'group' && q.fields) {
                q.fields.forEach(f => {
                    const answer = answers[f.id];
                    if (answer) {
                        html += `<h3>${f.title}</h3><p>${Array.isArray(answer) ? answer.join(', ') : answer}</p>`;
                    }
                });
            } else {
                const answer = answers[q.id];
                if (answer) {
                    if (q.type === 'file') {
                        html += `<h3>${q.title}</h3><p>Прикреплено ${userImages.length} изображений (см. во вложениях)</p>`;
                    } else {
                        html += `<h3>${q.title}</h3><p>${Array.isArray(answer) ? answer.join(', ') : answer}</p>`;
                    }
                }
            }
        });

        // 3. Generate PDF Buffer
        let pdfBuffer: Buffer | null = null;
        try {
            pdfBuffer = await renderToBuffer(<QuestionnairePDF answers={answers} />);
        } catch (pdfError) {
            console.error('PDF Generation error:', pdfError);
        }

        // 4. Prepare Email Attachments
        const emailAttachments = [];
        if (pdfBuffer) {
            emailAttachments.push({
                filename: 'brief.pdf',
                content: pdfBuffer,
            });
        }
        userImages.forEach(img => {
            emailAttachments.push({
                filename: img.filename,
                content: img.buffer,
            });
        });

        // 5. Send notifications (Parallel)
        const telegramPromises = [sendToTelegram(message)];
        if (userImages.length > 0) {
            telegramPromises.push(sendMediaGroupToTelegram(userImages.map(img => ({
                buffer: img.buffer,
                filename: img.filename
            }))));
        }

        const [tgResults, emailResult] = await Promise.all([
            Promise.all(telegramPromises),
            sendEmail('Новый бриф на дизайн', html, emailAttachments)
        ]);

        return NextResponse.json({
            success: true,
            telegram: tgResults.every(r => r),
            email: emailResult?.success
        });

    } catch (error) {
        console.error('Submission error:', error);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
}
