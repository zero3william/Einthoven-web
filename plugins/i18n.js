import Vue from 'vue';
import VueI18n from 'vue-i18n';

import lang, {
  locales
} from '../locales/lang';

Vue.use(VueI18n);

export default ({
  app,
  store
}) => {
  // Set i18n instance on app
  // This way we can use it in middleware and pages asyncData/fetch
  app.i18n = new VueI18n({
    locale: store.state.locale,
    fallbackLocale: locales[0],
    messages: lang
  });
}
