import { useLanguage } from '../context/LanguageProvider';

export default function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage();

    return (
        <div className="flex items-center gap-2">
            <button
                onClick={() => setLanguage('ar')}
                className={`text-sm font-medium ${language === 'ar' ? 'text-blue-600' : 'text-gray-600'}`}
            >
                العربية
            </button>

            <span className="text-gray-300">|</span>

            <button
                onClick={() => setLanguage('en')}
                className={`text-sm font-medium ${language === 'en' ? 'text-blue-600' : 'text-gray-600'}`}
            >
                English
            </button>
        </div>
    );
}
