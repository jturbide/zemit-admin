<template>
  <v-app>
    <v-main>
      <ModalDialog v-model="termsModal"
        :title="$t('auth.termsModal.title')"
        :body="$t('auth.termsModal.body')"
        :buttons="[{ text: $t('btn.close'), attrs: { outlined: true }, events: { click: () => { this.termsModal = false } } }]"
        icon="mdi-gavel"
        max-width="600"
        scrollable
      />

      <v-sheet class="h-100 d-flex flex-column py-4 py-md-0" :color="background">
        <v-sheet color="transparent" class="h-100 d-flex align-center justify-center" style="flex: 1">
          <v-card :max-width="maxWidth" class="text-center w-100" :tile="flat" :flat="flat">
            <v-card-actions class="local-switcher">
              <LocaleSwitcher :locales="locales" :z-bind="{menu: {left: true}, tooltip: {top: true, bottom: false}}"/>
            </v-card-actions>
            <v-card-text class="d-flex flex-column align-center">
              <v-btn fab style="width: 140px; height: 140px;" :style="logoStyle" color="white">
                <v-img :src="logo" max-width="150" contain/>
              </v-btn>
              <h1 class="primary--text display-1 mt-2" style="flex: 1" v-text="$t('auth.title.' + $route.name)" v-if="$route.name !== 'login'">Zemit</h1>
            </v-card-text>
            <v-card-text>
              <router-view @terms="termsModal = true"/>
            </v-card-text>
          </v-card>
        </v-sheet>

        <v-footer :color="background" class="d-block d-md-flex text-center justify-md-space-between justify-center caption">
          <span v-text="$t('footer.copyright', {name: 'Zemit', year})"></span>
          <span v-text="$t('footer.version', {version})"></span>
        </v-footer>
      </v-sheet>
    </v-main>
    <global-snack top app/>
  </v-app>
</template>

<script type="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import LocaleSwitcher from '@/components/LocaleSwitcher';
import ModalDialog from '@/components/ModalDialog';
import GlobalSnack from '@/components/GlobalSnack';
import logo from '@/assets/images/logo.png';
import Identity from '@/zemit/core/identity';

@Component({
  components: {
    LocaleSwitcher,
    GlobalSnack,
    ModalDialog,
  },
})
export default class App extends Vue {
  logo = logo;
  lang = '';
  version = '0.0.1';
  year = new Date().getFullYear();
  termsModal = false;

  locales = [
    {
      id: 'en',
      title: 'English',
      src: 'https://cdn.vuetifyjs.com/images/flags/us.png',
      icon: 'mdi-cog',
    },
    {
      id: 'fr',
      title: 'Français',
      src: 'https://cdn.vuetifyjs.com/images/flags/fr.png',
      icon: 'mdi-account',
    },
  ];

  get flat () {
    return this.$vuetify.breakpoint.smAndDown;
  }

  get background () {
    return this.$vuetify.breakpoint.smAndDown ? 'white' : 'background';
  }

  get maxWidth () {
    return this.$vuetify.breakpoint.mdAndUp ? 350 : null;
  }

  get logoStyle () {
    // return null;
    return this.$vuetify.breakpoint.mdAndUp
      ? 'transform: translateY(-85px); margin-bottom: -85px'
      : null;
  }

  // mounted() {
  //   this.$root.$globalSnack = this.$refs.$globalSnack;
  // }

  created () {
    if (!Identity.identity) {
      Identity.newIdentity()
        .catch(reason => this.$root.$zemit.handleError(reason, this.formErrors))
        .then(() => {
          if (!Identity.identity) {
            this.$root.$globalSnack.warning({
              message: this.$t('error.identity'),
              icon: 'mdi-emoticon-dead-outline',
            });
          }
        });
    }
  }
}
</script>

<style lang="scss" scoped>
.local-switcher {
  position: absolute;
  right: 0;
  width: min-content;
  z-index: 1;
}
</style>
