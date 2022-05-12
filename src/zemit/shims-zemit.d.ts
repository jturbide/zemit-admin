import Vue from 'vue';
import ZemitVue from '@/zemit/vue'
import Zemit from '@/zemit/zemit'
import GlobalOverlay from '@/components/GlobalOverlay.vue';
import GlobalSnack from '@/components/GlobalSnack.vue';

declare module 'vue/types/vue' {
  interface Vue {
    $zemit: Zemit;
    $globalSnack: GlobalSnack;
    $globalOverlay: GlobalOverlay;

  }

  interface VueConstructor {
    $zemitInstalled?: true;
  }
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    zemit?: ZemitVue;
  }
}

