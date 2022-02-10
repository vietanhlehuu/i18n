module.exports = {
  locales: ["en", "vi"],
  sourceLocale: "en",
  fallbackLocales: {
    default: "en",
  },
  catalogs: [
    {
      path: "<rootDir>/translations/locales/{locale}/messages",
      include: ["<rootDir>/"],
      exclude: ["**/node_modules/**"],
    },
  ],
  format: "po",
  service: {
    name: "TranslationIO",
    apiKey: "dfe164c44f5c45fc9e136a7a7e356db2",
  },
};
