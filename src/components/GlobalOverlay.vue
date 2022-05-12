<template>
  <v-overlay v-bind="$attrs" :value="showOverlay">
    <slot name="progress">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </slot>
  </v-overlay>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class GlobalOverlay extends Vue {
  name = 'GlobalOverlay';
  showOverlay = false;

  show (data: any = {}) {
    Object.assign(this, data);
    this.showOverlay = true;
  }

  hide() {
    this.showOverlay = false;
  }

  mounted() {
    this.$root.$globalOverlay = this;
  }
}
</script>
