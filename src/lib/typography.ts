export const fixTypography = (text: string): string => {
    if (!text) return text;

    const prepositions = [
        'в', 'во', 'без', 'до', 'из', 'к', 'ко', 'на', 'по', 'о', 'от', 'при', 'с', 'со', 'у',
        'и', 'а', 'но', 'да', 'или', 'ли', 'бы', 'же', 'от', 'за', 'над', 'под', 'перед', 'про'
    ];

    let result = text;

    prepositions.forEach(prep => {
        const regex = new RegExp(`(^|\\s|\\()(${prep})\\s+`, 'gi');
        result = result.replace(regex, `$1$2\u00A0`);
    });

    return result;
};
