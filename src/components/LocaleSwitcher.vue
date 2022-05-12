<template>
  <v-menu offset-y v-bind="zBind.menu" v-if="locales && locales.length">
    <template v-slot:activator="{ on: menu }">
      <v-tooltip v-bind="zBind.tooltip" v-model="show">
        <template v-slot:activator="{ on: tooltip }">
          <v-btn icon v-on="{ ...tooltip, ...menu }" @click="show = false">
            <span v-if="locale.id">{{ locale.id }}</span>
            <v-icon v-else>mdi-translate</v-icon>
          </v-btn>
        </template>
        <span>Change Language</span>
      </v-tooltip>
    </template>
    <v-list>
      <v-list-item v-for="locale in locales" :key="locale.id" @click="Locale = locale">
        <v-list-item-avatar tile size="24" v-if="locale.src || locale.icon">
          <v-img :src="locale.src" v-if="locale.src"/>
          <v-icon v-text="locale.icon" v-else-if="locale.icon"></v-icon>
        </v-list-item-avatar>
        <v-list-item-title>{{ locale.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Vue } from 'vue-property-decorator';
import Logger from '@/zemit/core/logger';

const d = new Logger('components/LocaleSwitcher');

@Component({})
export default class LocaleSwitcher extends Vue {
  @Prop() private locales?: any;
  @Prop({
    default: () => ({
        menu: {} as object,
        tooltip: {bottom: true} as object
    })
  }) private zBind?: {menu: object, tooltip: object};

  show = false;
  locale = {
    id: '',
    title: '',
  };

  get Locale () {
    return this.locale;
  }

  set Locale (locale: any) {
    this.locale = locale;
    this.$i18n.locale = this.locale.id;
  }

  created () {
    if (!this.locales) {
      this.locales = this.$i18n.availableLocales.map(lang => ({
        id: lang,
        title: lang.toLocaleUpperCase(),
      }));
    }
  }
}
</script>

<style scoped lang="scss">
</style>
