import { NextResponse } from 'next/server';
import { sendToTelegram, sendMediaGroupToTelegram, sendDocumentToTelegram } from '@/lib/telegram';
import { sendEmail } from '@/lib/email';
import { QUESTIONS } from '@/data/questions';
import { renderToBuffer } from '@react-pdf/renderer';
import { QuestionnairePDF } from '@/lib/pdf';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const answers: any = {};
        const userImages: { buffer: Buffer; filename: string; contentType: string; fieldId: string }[] = [];

        // Parse FormData
        for (const [key, value] of formData.entries()) {
            if (key.startsWith('file_')) {
                if (!(value instanceof Blob)) continue;
                const file = value as File;
                const buffer = Buffer.from(await file.arrayBuffer());
                const questionId = key.replace('file_', '');

                userImages.push({
                    buffer,
                    filename: file.name,
                    contentType: file.type,
                    fieldId: questionId
                });

                // Track files in answers for PDF
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

        const formatAnswer = (q: any, answer: any) => {
            if (q.type === 'file' && Array.isArray(answer)) {
                const filesCount = userImages.filter(img => img.fieldId === q.id).length;
                const links = answer.filter(a => typeof a === 'string');
                let result = '';
                if (filesCount > 0) result += `[Прикреплено файлов: ${filesCount}] `;
                if (links.length > 0) result += `Ссылки: ${links.join(', ')}`;
                return result || 'Нет материалов';
            }
            if (Array.isArray(answer)) {
                return answer.map(a => typeof a === 'object' ? a.label || JSON.stringify(a) : a).join(', ');
            }
            return answer;
        };

        // 1. Format message for Telegram
        let message = `<b>🚀 Новый бриф получен!</b>\n\n`;
        QUESTIONS.forEach(q => {
            if (q.type === 'group' && q.fields) {
                let hasGroupAnswers = q.fields.some(f => answers[f.id]);
                if (hasGroupAnswers) {
                    message += `<b>--- ${q.title} ---</b>\n`;
                    q.fields.forEach(f => {
                        const answer = answers[f.id];
                        if (answer) {
                            message += `<b>${f.title}:</b> ${formatAnswer(f, answer)}\n`;
                        }
                    });
                    message += `\n`;
                }
            } else {
                const answer = answers[q.id];
                if (answer) {
                    message += `<b>${q.title}:</b> ${formatAnswer(q, answer)}\n\n`;
                }
            }
        });

        // 2. Format HTML for Email
        let html = `<h1 style="color: #333;">Новый бриф на дизайн</h1>`;
        QUESTIONS.forEach(q => {
            if (q.type === 'group' && q.fields) {
                let hasGroupAnswers = q.fields.some(f => answers[f.id]);
                if (hasGroupAnswers) {
                    html += `<div style="margin-bottom: 20px; border-bottom: 1px solid #eee; padding-bottom: 10px;">`;
                    html += `<h2 style="color: #555;">${q.title}</h2>`;
                    q.fields.forEach(f => {
                        const answer = answers[f.id];
                        if (answer) {
                            html += `<p><strong>${f.title}:</strong> ${formatAnswer(f, answer)}</p>`;
                        }
                    });
                    html += `</div>`;
                }
            } else {
                const answer = answers[q.id];
                if (answer) {
                    html += `<h3>${q.title}</h3><p>${formatAnswer(q, answer)}</p>`;
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
        if (pdfBuffer) {
            telegramPromises.push(sendDocumentToTelegram(pdfBuffer, 'brief.pdf', '📄 Бриф в PDF'));
        }
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
