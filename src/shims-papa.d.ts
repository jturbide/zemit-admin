import V from 'vue';
import VuePapaParse from 'vue-papa-parse';

declare module 'vue/types/vue' {
  interface Vue extends V, VuePapaParse {
    $papa: VuePapaParse;
  }
}

declare module '*.csv' {
  const value: any;
  export default value;
}
