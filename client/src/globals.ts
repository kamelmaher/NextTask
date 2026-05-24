export function getGlobals(lang: string) {
    return {
        appName: lang === 'ar' ? 'نظام السوق' : 'Market System',
        currencySymbol: lang === 'ar' ? 'د.إ' : '$',
        dateFormat: lang === 'ar' ? 'DD/MM/YYYY' : 'MM/DD/YYYY',
    };
}
