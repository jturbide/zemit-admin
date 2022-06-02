import Vue from 'vue';
import Vuetify, { UserVuetifyPreset } from 'vuetify';
import { TiptapVuetifyPlugin } from 'tiptap-vuetify';
import 'tiptap-vuetify/dist/main.css';
import 'vuetify/dist/vuetify.min.css';
import '@mdi/font/css/materialdesignicons.css';
import en from 'vuetify/src/locale/en';
import fr from 'vuetify/src/locale/fr';

const opts: Partial<UserVuetifyPreset> = {
  lang: {
    locales: { en, fr },
    current: 'en',
  },
  icons: {
    iconfont: 'mdiSvg',
  },
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        background: '#EEEEEE',
        primary: '#1b4d8e',
        secondary: '#FF7383',
        third: '#F9BE6C',
        accent: '#82B1FF',
        error: '#ff7676',
        info: '#2196F3',
        success: '#5ba056',
        warning: '#F9BE6C'
      },
    },
  },
};

const vuetify = new Vuetify(opts);

Vue.use(Vuetify);
Vue.use(TiptapVuetifyPlugin, {
  vuetify,
  iconsGroup: 'mdiSvg'
});

export default vuetify;
