export const sendToTelegram = async (message: string) => {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
        console.error('Telegram configuration missing');
        return;
    }

    try {
        const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: 'HTML',
            }),
        });

        return response.ok;
    } catch (error) {
        console.error('Error sending to Telegram:', error);
        return false;
    }
};

export const sendMediaGroupToTelegram = async (files: { buffer: Buffer; filename: string }[]) => {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId || !files.length) return false;

    const formData = new FormData();
    formData.append('chat_id', chatId);

    const media = files.map((file, index) => {
        const fieldName = `photo_${index}`;
        const blob = new Blob([file.buffer as any]);
        formData.append(fieldName, blob, file.filename);
        return {
            type: 'photo',
            media: `attach://${fieldName}`,
        };
    });

    formData.append('media', JSON.stringify(media));

    try {
        const response = await fetch(`https://api.telegram.org/bot${token}/sendMediaGroup`, {
            method: 'POST',
            body: formData,
        });
        return response.ok;
    } catch (error) {
        console.error('Error sending media group to Telegram:', error);
        return false;
    }
};
