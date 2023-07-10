import V from 'vue';
import Sortable from 'vue-sortable';

declare module 'vue/types/vue' {
  interface Vue extends V, Sortable {
    $sortable: Sortable;
  }
}
