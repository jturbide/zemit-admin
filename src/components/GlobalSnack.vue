<template>
  <v-snackbar v-bind="$attrs" :color="color" :timeout="timer" v-model="showSnackbar" style="white-space: pre-line;" vertical multi-line>
    <v-icon left>{{ icon }}</v-icon>
    {{ message }}
  </v-snackbar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class GlobalSnack extends Vue {
  name = 'GlobalSnack';
  showSnackbar = false;
  message = '';
  color = 'success';
  icon = 'mdi-check';
  timer = 3000;

  show (data: any) {
    Object.assign(this, data);
    this.showSnackbar = true;
  }

  info(data: any) {
    this.color = 'info';
    this.icon = 'mdi-information-outline';
    this.show(data);
  }

  warning(data: any) {
    this.color = 'warning';
    this.icon = 'mdi-message-alert-outline';
    this.show(data);
  }

  error(data: any) {
    this.color = 'error';
    this.icon = 'mdi-alert-circle-outline';
    this.show(data);
  }

  mounted() {
    this.$root.$globalSnack = this;
  }
}
</script>
