import React, { createContext, useContext, useEffect, useState } from 'react';
import i18n from '../i18n';

type LanguageContextValue = {
    language: string;
    setLanguage: (lng: string) => void;
};

const LanguageContext = createContext<LanguageContextValue>({
    language: 'ar',
    setLanguage: () => { },
});

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
    const [language, setLanguage] = useState<string>(i18n.language || 'ar');

    useEffect(() => {
        if (language !== i18n.language) {
            i18n.changeLanguage(language);
        }
    }, [language]);

    return (
        <LanguageContext.Provider value={{ language, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = () => useContext(LanguageContext);
export default LanguageContext;
