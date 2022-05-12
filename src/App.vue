<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" :mini-variant.sync="_mini" permanent dark app>
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-icon>mdi-account-circle-outline</v-icon>
        </v-list-item-avatar>

        <v-list-item-title>
          {{ user.firstName }} {{ user.lastName }}
        </v-list-item-title>

        <v-btn icon @click.stop="mini = !mini">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item v-for="item in items" :key="item.title" link :to="item.to">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app dark>
      <v-btn text :to="{name: 'Home'}" exact class="mr-3">
        <v-img :src="require('@/assets/images/logo-light.png')" width="2rem" class="mr-3"/>
        <div class="title">Zemit</div>
      </v-btn>

      <SiteSwitcher v-model="site"/>

      <v-spacer/>

      <LocaleSwitcher :locales="locales"/>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" icon text :loading="logoutLoading" :disabled="logoutLoading" @click="logout">
            <v-icon>mdi-logout-variant</v-icon>
          </v-btn>
        </template>
        <span>Logout</span>
      </v-tooltip>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view :key="$route.path + (site? site.data.id : null)"></router-view>
      </v-container>
    </v-main>

    <global-overlay/>
    <global-snack top app/>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import LocaleSwitcher from '@/components/LocaleSwitcher.vue';
import AuthService from '@/zemit/services/auth.service';
import Main from '@/main';
import Auth from '@/Auth.vue';
import Identity from '@/zemit/core/identity';
import GlobalSnack from '@/components/GlobalSnack.vue';
import GlobalOverlay from '@/components/GlobalOverlay.vue';
import SiteSwitcher from '@/components/SiteSwitcher.vue';
import SiteModel from '@/zemit/model/site.model';

@Component({
  components: {
    GlobalOverlay,
    LocaleSwitcher,
    GlobalSnack,
    SiteSwitcher,
  }
})
export default class App extends Vue {
  mini = false;
  drawer = true;
  logoutLoading = false;
  user = Identity.identity?.user;
  site: null|SiteModel = null;

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
    }
  ];

  items = [
    { title: 'Dashboard', to: { name: 'Dashboard' }, icon: 'mdi-home-city-outline' },
    { title: 'Users', to: { name: 'UserList' }, icon: 'mdi-account-outline' },
    { title: 'Roles', to: { name: 'RoleList' }, icon: 'mdi-account-tie-outline' },
    { title: 'Groups', to: { name: 'GroupList' }, icon: 'mdi-account-group-outline' },
    { title: 'Types', to: { name: 'TypeList' }, icon: 'mdi-account-tie-hat-outline' },
    { title: 'Sites', to: { name: 'SiteList' }, icon: 'mdi-earth' },
    { title: 'Pages', to: { name: 'PageList' }, icon: 'mdi-cube' },
    { title: 'Languages', to: { name: 'LangList' }, icon: 'mdi-translate' },
    { title: 'Translate', to: { name: 'TranslateList' }, icon: 'mdi-format-text' },
    { title: 'Templates', to: { name: 'TemplateList' }, icon: 'mdi-text-box-multiple-outline' },
    { title: 'Settings', to: { name: 'SettingList' }, icon: 'mdi-cog-sync-outline' },
    { title: 'Emails', to: { name: 'EmailList' }, icon: 'mdi-email-multiple-outline' },
    { title: 'Files', to: { name: 'FileList' }, icon: 'mdi-file-search-outline' },
    { title: 'Logs', to: { name: 'LogList' }, icon: 'mdi-table-search' },
    { title: 'Audits', to: { name: 'AuditList' }, icon: 'mdi-database-search-outline' },
    { title: 'Backups', to: { name: 'BackupList' }, icon: 'mdi-database-export-outline' },
    { title: 'Migrations', to: { name: 'MigrationList' }, icon: 'mdi-database-cog-outline' },
  ];

  get _mini () {
    return this.$vuetify.breakpoint.smAndDown ? true : this.mini;
  }

  set _mini (value) {
    this.mini = value;
  }

  logout () {
    this.logoutLoading = true;
    AuthService.getInstance().logout()
      .then(response => {
        if (!response.data.view.loggedIn) {
          Identity.removeIdentity();
          Main.render(Auth);
        }
        else {
          this.$root.$globalSnack.warning({
            message: this.$t('error.logout'),
            icon: 'mdi-emoticon-dead-outline'
          });
        }
      })
      .catch(reason => this.$root.$zemit.handleError(reason))
      .finally(() => this.logoutLoading = false);
  }
}
</script>

<style lang="scss">
</style>
