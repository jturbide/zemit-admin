import Vue from 'vue';
import VueI18n, { I18nOptions } from 'vue-i18n'
import en from '@/locales/en';
import fr from '@/locales/fr';

Vue.use(VueI18n);

const messages = {
  en,
  fr,
};

const opts: I18nOptions = {
  locale: 'en',
  fallbackLocale: ['en', 'fr'],
  formatFallbackMessages: true,
  messages,
};

export default new VueI18n(opts);
