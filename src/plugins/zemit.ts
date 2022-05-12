import Vue from 'vue';
import Zemit, { ZemitOptions } from '@/zemit/vue'

Vue.use(Zemit);

const opts: Partial<ZemitOptions> = {
  apiUrl: '/api/'
};

export default new Zemit(opts);
