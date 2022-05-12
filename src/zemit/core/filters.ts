import Vue, { VueConstructor } from 'vue';
import moment from 'moment';

export default class Filters {

  static getInstance<T> (this: new () => T, opts: Partial<Filters> = {}): T {
    return Object.assign(new this(), opts);
  }

  color = (index: string, type?: string) => {
    if (type) {
      index = type + ':' + index;
    }
    switch (index?.toLowerCase()) {
      case 'deleted:0':
        return 'light-blue accent-1';
      case 'deleted:1':
        return 'red accent-1';
      default:
        return 'default';
    }
  };

  date = (value: string, format = 'YYYY-MM-DD') => {
    if (value) {
      return moment(String(value)).format(format);
    }
  };

  init() {
    Vue.filter('color', this.color);
    Vue.filter('date', this.date);
  }
}
