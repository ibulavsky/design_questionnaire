import { fixTypography } from './typography';
import { ru } from '../locales/ru';

export type Locale = 'ru';

// Current locale - could be connected to localized store later
const currentLocale: Locale = 'ru';

const locales = {
    ru,
};

/**
 * Basic translation function
 * Pulls strings from locales and applies typography fix to Russian text
 */
export const t = (key: string, options?: { replacements?: Record<string, string>, raw?: boolean }): string => {
    const localeData = locales[currentLocale] || ru;
    const { replacements, raw = false } = options || {};

    // Support nested keys like 'welcome.title'
    const value = key.split('.').reduce((obj, k) => (obj as any)?.[k], localeData);

    if (typeof value !== 'string') {
        console.warn(`Translation key not found or is not a string: ${key}`);
        return key;
    }

    let result: string = value;

    // Handle replacements if any
    if (replacements) {
        Object.entries(replacements).forEach(([k, v]) => {
            result = result.replace(new RegExp(`{{${k}}}`, 'g'), v);
        });
    }

    // Apply typography fix for Russian locale
    if (currentLocale === 'ru' && !raw) {
        return fixTypography(result);
    }

    return result;
};
