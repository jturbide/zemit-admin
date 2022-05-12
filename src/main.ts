import Vue, { VueConstructor } from 'vue';
import App from './App.vue';
import Auth from './Auth.vue';
import router from './router';
import i18n from '@/plugins/i18n';
import vuetify from '@/plugins/vuetify';
import zemit from '@/plugins/zemit';
import Identity from '@/zemit/core/identity';
import Filters from '@/zemit/core/filters';
import 'reflect-metadata';
import './index.scss';

Filters.getInstance().init();
Vue.config.productionTip = false;

export default class Main {

  static element = '#app';

  static options = {
    i18n,
    router,
    vuetify,
    zemit,
    render: (h: any) => h(Auth),
  };

  static $vue = Main.render(Identity.isLoggedIn()? App : Auth);

  static init (options = Main.options, elementOrSelector: Element | string = this.element, hydrating?: boolean): Vue {
    console.log('Main.init', options, elementOrSelector);
    if (Main.$vue) Main.$vue.$destroy();
    return Main.$vue = new Vue(options).$mount(elementOrSelector, hydrating);
  }

  static render(render: VueConstructor, elementOrSelector: Element | string = this.element, hydrating?: boolean) {
    return Main.init(Object.assign(this.options, {render: (h: any) => h(render)}), elementOrSelector, hydrating);
  }
}
