import 'server-only';
import { headers } from 'next/headers';
import { Locale, i18n } from '@/i18n.config';

export const getCurrentLocale = async () => {
  const url = (await headers()).get('x-url');
  const locale = url?.split('/')[3] as Locale;

  // لو الـ locale مش متعرف أو مش موجود في القايمة، نرجع الـ defaultLocale
  if (!locale || !i18n.locales.includes(locale)) {
    return i18n.defaultLocale;
  }

  return locale;
};