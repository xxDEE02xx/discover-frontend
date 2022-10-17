module.exports = {
  locales: ['en'], // Array with the languages that you want to use
  defaultLocale: 'en', // Default language of your website
  pages: {
    '*': ['common'],
    '/': ['datasets'],
    '/jobs/[datasetId]': ['jobs'],
    '/jobs/[datasetId]/[jobId]': ['topics'],
    '/jobs/[datasetId]/[jobId]/[topicId]': ['jobs'],
    '/login': ['login'],
    '/reset-password': ['reset-password'],
  },
  loadLocaleFrom: (locale, ns) => {
    let countrySpecific = {},
      languageOnly = {};
    try {
      countrySpecific = require(`./src/assets/locales/${locale.replace('-', '_')}/${ns}.json`);
    } catch (error) {}
    try {
      languageOnly = require(`./src/assets/locales/${locale.substring(0, 2)}/${ns}.json`);
    } catch (error) {}
    return { ...languageOnly, ...countrySpecific };
  },
};
