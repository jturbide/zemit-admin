import _Vue, { VueConstructor } from 'vue';
import Zemit from '@/zemit/zemit';
import { AxiosRequestConfig } from 'axios';
import deepmerge from 'deepmerge';

export class ZemitOptions {
  apiUrl = '';
  axiosRequestConfig?: AxiosRequestConfig;
}

// export class ZemitService {
//   property = '';
//
//   constructor (config: Partial<ZemitOptions>, zemitVue: ZemitVue) {
//
//   }
// }

export default class ZemitVue {

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  public zemit: Zemit;
  static installed = false;
  static config: Partial<ZemitOptions> = {};
  // installed: string[] = [];
  // services: {[key: string]: ZemitService} = {};

  constructor (config: Partial<ZemitOptions> = {}) {
    ZemitVue.config = deepmerge.all([ZemitVue.config, config]);
  }

  static install (Vue: VueConstructor, config: Partial<ZemitOptions> = {}) {
    if (this.installed) return;
    this.installed = true;

    if (_Vue !== Vue) {
      // consoleError(`Multiple instances of Vue detected`);
    }

    ZemitVue.config = deepmerge.all([ZemitVue.config, config]);
    Vue.prototype.$zemit = new Zemit(Vue, ZemitVue.config);

    // Used to avoid multiple mixins being setup
    // when in dev mode and hot module reload
    // https://github.com/vuejs/vue/issues/5089#issuecomment-284260111
    if (Vue.$zemitInstalled) return;
    Vue.$zemitInstalled = true;

    // @todo check if this is too heavy for nothing
    Vue.mixin({
      beforeCreate () {
        if (this.$options.zemit) {
          this.$zemit.init(this, ZemitVue.config);
        }
      },
    });
  }

  // init(root: _Vue) {
  //   if (!root.$zemit) {
  //     root.$zemit = new Zemit(root, ZemitVue.config)
  //   } else {
  //     root.$zemit.init(root);
  //   }
  //   return root.$zemit;
  // }

  // Instantiate a Zemit Service
  // use (Service: ZemitService) {
  //   const property = Service.property
  //
  //   // already installed
  //   if (this.installed.includes(property)) return;
  //
  //   // install service
  //   this.services[property] = new ZemitService(this.config, this);
  //   this.installed.push(property)
  // }
}


