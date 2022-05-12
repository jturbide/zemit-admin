import axios, { Axios, AxiosError } from 'axios';
import _Vue, { ComponentOptions, VueConstructor } from 'vue';
import ZemitVue, { ZemitOptions } from '@/zemit/vue';
import Logger from '@/zemit/core/logger';
import Service, { ServiceConfig, ZemitData } from '@/zemit/core/service';
import store from 'store2';
import events from 'events';
import deepmerge from 'deepmerge';
import moment from 'moment';
import VueI18n from 'vue-i18n';
import Model from '@/zemit/core/model';

const d = new Logger('zemit/zemit');

export default class Zemit {

  store = store;
  merge = deepmerge;
  moment = moment;
  events = events;
  logger = new Logger('ZEMIT');
  crypt = require('crypto-js');

  // http: Axios;
  // service: Service;

  services: { [key: string]: Service } = {};

  vm?: Vue;

  constructor (
    public vue: VueConstructor,
    public config: Partial<ZemitOptions> = {},
  ) {
    this.config = deepmerge.all([ZemitVue.config, this.config]);
    // this.http = axios.create(config.axiosRequestConfig);
    // this.service = this.getService({name: 'zemit'});
  }

  init (vm: Vue, config: Partial<ZemitOptions> = {}) {
    this.config = deepmerge.all([this.config, config]);
    this.vm = vm;
    d.d(this.vm);
  }

  handleError (reason: AxiosError<ZemitData<any>>, formErrors: { [key: string]: Array<string> } = {}) {
    if (reason?.response?.data?.view?.messages?.length) {
      let msgs = [];
      for (const message of reason.response.data.view.messages) {
        if (message.field) {
          if (!Array.isArray(message.field)) {
            message.field = [message.field];
          }
          for (const field of message.field) {
            if (!formErrors[field]) {
              formErrors[field] = [];
            }
            formErrors[field].push(message.message);
          }
        } else {
          formErrors._ = [message.message];
        }
        const msg = message.code + ': ' + message.message + ' (' + message.field.join(', ') + ')';
        msgs.push(msg);
      }
      this.vm?.$root.$globalSnack.error({ message: msgs.join('\r\n') });
      d.error(msgs);
    } else {
      const code = reason.response?.data?.code || reason.response?.status || reason.code || 0;
      const msg = (code + ': ' + reason.message || 'Request failed by server') + (reason.response?.data?.status ? ' (' + reason.response.data.status + ')' : '');
      this.vm?.$root.$globalSnack.error({message: msg, icon: 'mdi-robot-dead-outline'});
      formErrors._ = [msg];
      d.error(msg);
    }
    return formErrors;
  }

  // // Called on the new vuetify instance
  // // bootstrap in install beforeCreate
  // // Exposes ssrContext if available
  // init (root: Vue) {
  //   this.config = root.$zemit.config;
  //   // this.installed.forEach(property => {
  //   //   const service = this.framework[property]
  //   //
  //   //   service.framework = this.framework
  //   //
  //   //   service.init(root, ssrContext)
  //   // })
  // }

  locale (locale: string) {
    if (this.vm?.$root.$i18n.locale) {
      this.vm.$root.$i18n.locale = locale;
    }
  }

  // getService(config: Partial<ServiceConfig> = {zemit: this}) {
  //
  // }

  // locale(locale: string) {
  //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //   // @ts-ignore
  //   console.log(this.vue);
  //   this.vue.prototype.$i18n.locale = locale;
  // }
}
