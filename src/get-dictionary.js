import "server-only";

// We enumerate all dictionaries here for better linting and typescript support
// We also get the default import for cleaner types
const dictionaries = {
    en: () => import("../i18n/en.json").then((module) => module.default),
    es: () => import("../i18n/es.json").then((module) => module.default),
};

export const getDictionary = async (locale) =>
    dictionaries[locale]?.() ?? dictionaries.en();
