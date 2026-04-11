import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';

const locales = ['ja', 'en'];

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(locales, requested) ? requested : 'ja';

  return {
    locale,
    messages: (await import(`../locales/${locale}.json`)).default,
  };
});
