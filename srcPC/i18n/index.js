import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';
import localStorage from '@pc/utils/store';
import en from '@i18n/en';
import id from '@i18n/id';
import ko from '@i18n/ko';
import ru from '@i18n/ru';
import vi from '@i18n/vi';
import tr from '@i18n/tr';
import fi from '@i18n/fil';

// Import de from '@i18n/de';
// import fr from '@i18n/fr';
// import ja from '@i18n/ja';
// import ru from '@i18n/ru';

const locale = localStorage.getItem('lang') || getDefaultLang() || 'en';
// De,
// fr,
// ja,
// ru

const i18nConf = {
  locale,
  fallbackLocale: 'en',
  silentFallbackWarn: true,
  messages: { en, id_ID: id, ko, ru, vi, tr, fi }
};

const i18n = createI18n(i18nConf);

const app = createApp({});

app.use(i18n);
app.mount('#app');  // Adjust the mounting point as necessary

export default i18n;

function getDefaultLang() {
  try {
    const type = navigator.appName;
    // type == 'Netscape' ? !IE : IE5+ == navigator.systemLanguage
    let lang = type === 'Netscape' ? navigator.language : navigator.userLanguage;
    lang = lang.substr(0, 2);
    // navigator.languages
    const languages = ['en', 'id', 'ko', 'ru', 'vi', 'tr', 'fi'];
    const nameMap = { 'id': 'id_ID' };
    if (languages.indexOf(lang) !== -1) {
      return nameMap[lang] || lang;
    }
    return 'en';
  } catch (err) {
    console.warn(err);
    return 'en';
  }
}
