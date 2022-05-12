<template>
  <v-autocomplete
    v-model="model"
    :loading="loading"
    :items="list"
    :search-input.sync="search"
    :label="$t('placeholder.site')"
    item-text="data.title"
    dense
    flat
    clearable
    solo
    light
    full-width
    append-icon="mdi-earth"
    hide-no-data
    hide-details="auto"
    return-object
    v-bind="$attrs"
    v-on="$listeners"
    ref="siteSwitcher"
  >
    <template #item="{ item }">
      <div class="d-flex align-center">
        <v-icon>mdi-cube</v-icon>
        <div class="ml-2">
          <h4 v-text="item.data.title"></h4>
          <p class="ma-0" v-text="item.data.name"></p>
        </div>
      </div>
    </template>
  </v-autocomplete>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop, PropSync } from 'vue-property-decorator';
import Logger from '@/zemit/core/logger';
import Service from '@/zemit/core/service';
import SiteService from '@/zemit/services/site.service';
import { debounce } from 'debounce';
import Model from '@/zemit/core/model';
import SiteModel from '@/zemit/model/site.model';

const d = new Logger('components/SiteSwitcher');

@Component({})
export default class SiteSwitcher extends Vue {
  @Prop({ default: () => SiteService.getInstance() }) private service!: Service;
  model: null|Model = new SiteModel();
  loading = false;
  search = '';
  list = [];

  load (search = this.search) {
    d.d('load', search);
    this.loading = true;
    this.service.getAll({ search })
      .then(response => this.list = response.data.view.list)
      .catch(reason => this.$root.$zemit.handleError(reason))
      .finally(() => this.loading = false);
  }

  loadDebounce = debounce(() => {
    d.d('loadDebounce');
    this.load();
  }, 333);

  @Watch('search')
  onSearch (search: string, oldSearch: string) {
    d.d('onSearch', search, oldSearch);
    if (this.model?.data.title !== search && search !== oldSearch) {
      this.loadDebounce();
    }
  }

  created () {
    d.d('created');
    this.load();
  }
}
</script>

<style scoped lang="scss">
</style>
