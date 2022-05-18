<template>
  <v-data-table
    v-bind="$attrs"
    v-on="$listeners"
    :headers="headers"
    :options.sync="options"
    :server-items-length="totalCount"
    :items="items"
    :loading="loading"
    :single-select="singleSelect"
    item-key="data.id"
    :fixed-header="true"
    show-select
    multi-sort
  >

    <!-- V-SLOT -->
    <template v-for="header in Headers" v-slot:[header]="props">
      <slot :name="header" v-bind="props">
        <div class="d-flex align-center text-no-wrap" style="gap:0.3rem">
          {{ props.header.text }}
          <template v-if="props.header.filterable">
            <DataTableColumnFilter :header="props.header">
            </DataTableColumnFilter>
          </template>
        </div>
      </slot>
    </template>

    <!--    <template #item.data-table-select="props">-->
    <!--      // call native template #item.data-table-select-->
    <!--      <v-btn class="mx-2" small depressed fab text :to="{name: 'UserForm', params: {id: props.item.data.id}}">-->
    <!--        <v-icon dark>-->
    <!--          mdi-pencil-outline-->
    <!--        </v-icon>-->
    <!--      </v-btn>-->
    <!--    </template>-->

    <!-- V-SLOT -->
    <template v-for="(item, itemKey) in Items" v-slot:[item]="props">

      <slot v-if="props.header.item">

        <slot v-if="!props.header.item.type" :name="item" v-bind="props">
          <component
            :is="props.header.item.attrs.is || 'span'"
            v-bind="props.header.item.attrs"
            v-bind:key="itemKey"
          >
            {{ props.item.data[props.header.value] }}
          </component>
        </slot>

        <!-- BUTTON -->
        <slot v-else-if="props.header.item.type === 'button'" :name="item" v-bind="props">
          <v-btn
            class="mx-2"
            small
            depressed
            fab
            text
            v-bind="props.header.item.attrs"
            :to="{name: props.header.item.to.name, params: parseParams(props, props.header.item.to.params)}"
          >
            <v-icon dark v-text="props.header.item.icon.text" v-bind="props.header.item.icon.attrs">
              mdi-pencil-outline
            </v-icon>
          </v-btn>
        </slot>

        <!-- TRUNCATE -->
        <slot v-else-if="props.header.item.type === 'truncate'" :name="item" v-bind="props">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on" class="d-inline-block text-truncate" :style="{maxWidth: props.header.item.width}">
                {{ props.item.data[props.header.value] }}
              </span>
            </template>
            <span style="word-break: break-all;">
              {{ props.item.data[props.header.value] }}
            </span>
          </v-tooltip>
        </slot>

        <!-- DATE -->
        <slot v-else-if="props.header.item.type === 'date'" :name="item" v-bind="props">
          <div class="text-no-wrap" v-bind:key="itemKey">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on">
                {{ props.item.data[props.header.value] | date(props.header.item.format) }}
              </span>
              </template>
              <span>{{ props.item.data[props.header.value] }}</span>
            </v-tooltip>
          </div>
        </slot>

      </slot>

      <!-- LAST COL -->
      <slot v-else-if="item === 'item._last'" :name="item" v-bind="props">
        <v-btn class="mx-2" small depressed fab text color="red" v-on:click="deleteRecord(props.item)" :loading="props.item.Loading" v-if="!props.item.data.deleted">
          <v-icon dark>
            mdi-close
          </v-icon>
        </v-btn>

        <v-btn class="mx-2" small depressed fab text color="green" v-on:click="restoreRecord(props.item)" :loading="props.item.Loading" v-if="props.item.data.deleted">
          <v-icon dark>
            mdi-cached
          </v-icon>
        </v-btn>
      </slot>

      <!-- STATUS -->
      <slot v-else-if="item === 'item.status'" :name="item" v-bind="props">
        <v-chip class="ma-2" label :color="props.item.data.status | color('status')">
          {{ $t('status.' + props.item.data.status) }}
        </v-chip>
      </slot>

      <!-- CREATED AT -->
      <slot v-else-if="['item.createdAt', 'item.updatedAt', 'item.deletedAt', 'item.restoredAt'].includes(item)" :name="item" v-bind="props">
        <div class="text-no-wrap" v-bind:key="itemKey">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on">
                {{ props.item.data[item.replace('item.', '')] | date('YYYY-MM-DD') }}
              </span>
            </template>
            <span>{{ props.item.data[item.replace('item.', '')] }}</span>
          </v-tooltip>
        </div>
      </slot>

      <!-- POSITION -->
      <slot v-else-if="item === 'item.position'" :name="item" v-bind="props">
        <v-chip class="ma-2" outlined pill>
          {{ props.item.data.position }}
        </v-chip>
      </slot>

      <!-- DELETED -->
      <slot v-else-if="item === 'item.deleted'" :name="item" v-bind="props">
        <v-chip class="ma-2" label :color="props.item.data.deleted | color('deleted')">
          {{ $t('deleted.' + props.item.data.deleted) }}
        </v-chip>
      </slot>

      <!-- ROLE LIST -->
      <slot v-else-if="item === 'item.rolelist'" :name="item" v-bind="props">
        <v-chip v-for="role of props.item.data.rolelist" :key="role.data.id" :color="role.data.index | color('role')" :to="{name: 'RoleForm', params: {id: role.data.id}}" class="ma-2" label>
          {{ $t('role.' + role.data.index) }}
        </v-chip>
      </slot>

      <slot v-else :name="item" v-bind="props">
        {{ props.item.data[props.header.value] }}
      </slot>

    </template>

    <!-- SEARCH -->
    <template v-slot:top>
      <!--      <v-text-field-->
      <!--          v-model="search"-->
      <!--          append-icon="mdi-magnify"-->
      <!--          label="Search"-->
      <!--          single-line-->
      <!--      ></v-text-field>-->
    </template>

  </v-data-table>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, PropSync } from 'vue-property-decorator';
import DataTableColumnFilter from '@/components/DataTableColumnFilter.vue';
import Service from '@/zemit/core/service';
import Model from '@/zemit/core/model';
import Logger from '@/zemit/core/logger';
import { debounce } from 'debounce';

const d = new Logger('components/DataTable');

@Component({
  components: {
    DataTableColumnFilter
  }
})
export default class DataTable extends Vue {
  name = 'DataTable';
  @Prop({ default: 0 }) private forceLoad!: number;
  @Prop({ default: '' }) private search!: string;
  @Prop({ default: [] }) private headers!: [];
  @Prop({ default: Service.getInstance() }) private service!: Service;

  loading = true;
  totalCount = 0;
  singleSelect = false;
  items = [];

  options = {
    page: 1,
    itemsPerPage: 25,
  };

  get Items () {
    return this.headers.map((header: any) => 'item.' + header.value);
  }

  get Headers () {
    return this.headers.map((header: any) => 'header.' + header.value);
  }

  parseParams (props: any, params: any) {
    const ret: { [key: string]: any } = {};
    for (const key in params) {
      if (params[key]) {
        // ret[key] = this.ObjectByString(props, params[key]);
        // eslint-disable-next-line no-eval
        ret[key] = eval(params[key]);
      }
    }
    return ret;
  }

  publicTest() {

  }

  load (options = this.options, search = this.search) {
    this.loadDebounce.clear();
    this.service.getAll(this.prepareData(options, search))
      .then(response => {
        d.d('load', response);
        this.totalCount = response.data.view.totalCount;
        this.items = response.data.view.list;
      })
      .catch(reason => this.$root.$zemit.handleError(reason))
      .finally(() => this.loading = false);
  }

  deleteRecord (item: Model) {
    item.Loading = true;
    this.service.delete({ id: item.data.id })
      .then((response: any) => {
          d.d('delete', response, item);
          item.assign(response.data.view.single);
      })
      .catch((reason) => this.$root.$zemit.handleError(reason))
      .finally(() => item.Loading = false);
  }

  restoreRecord (item: Model) {
    item.Loading = true;
    this.service.restore({ id: item.data.id })
      .then((response: any) => {
          d.d('restore', response, item);
          item.assign(response.data.view.single);
      })
      .catch((reason) => this.$root.$zemit.handleError(reason))
      .finally(() => item.Loading = false);
  }

  prepareData (options: any, search: string | null) {
    this.loading = true;

    const data: any = {};

    // Pagination
    data.limit = options.itemsPerPage;
    data.offset = (options.page - 1) * options.itemsPerPage;

    // Order
    const order: any = [];
    for (const key in options.sortBy) {
      order.push(options.sortBy[key] + (options.sortDesc[key] ? ' DESC' : ' ASC'));
    }
    data.order = order.join(', ');

    // Search
    data.search = search;

    return data;
  }

  loadDebounce = debounce(() => {
    this.load();
  }, 333);

  @Watch('options', { deep: true })
  onOptionsChanged () {
    this.load();
  }

  @Watch('forceLoad')
  onTickChanged () {
    this.load();
  }

  @Watch('search')
  onSearchChanged () {
    this.loadDebounce();
  }
}
</script>

<style scoped>

</style>
