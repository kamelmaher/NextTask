import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en/translation.json';
import ar from './locales/ar/translation.json';

const resources = {
    en: { translation: en },
    ar: { translation: ar },
};

i18n.use(initReactI18next).init({
    resources,
    lng: localStorage.getItem('i18nextLng') || 'ar',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
});

// set initial document lang/dir
try {
    const initial = localStorage.getItem('i18nextLng') || i18n.language || 'ar';
    document.documentElement.lang = initial;
    document.documentElement.dir = initial === 'ar' ? 'rtl' : 'ltr';
} catch (e) {
    // ignore in non-browser environments
}

// keep document attributes in sync with current language
i18n.on('languageChanged', (lng) => {
    try {
        document.documentElement.lang = lng;
        document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
    } catch (e) {
        // server-side or unavailable document
    }

    try {
        localStorage.setItem('i18nextLng', lng);
    } catch (e) {
        // ignore
    }
});

export default i18n;
