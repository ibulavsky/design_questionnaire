import { Resend } from 'resend';

export const sendEmail = async (subject: string, html: string) => {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
        console.error('Resend API key missing');
        return { success: false, error: 'API key not configured' };
    }

    const resend = new Resend(apiKey);

    try {
        const data = await resend.emails.send({
            from: 'Questionnaire <onboarding@resend.dev>',
            to: process.env.EMAIL_TO || '',
            subject: subject,
            html: html,
        });

        return { success: true, data };
    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, error };
    }
};
