export type Locale = (typeof locales)[number];

export const locales = ['en', 'hu'] as const;
export const defaultLocale: Locale = 'hu';