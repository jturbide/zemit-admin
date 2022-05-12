<template>
  <v-card>
    <v-card-title>
      <v-btn v-if="newRoute" :to="newRoute" small depressed fab text exact>
        <v-icon dark>mdi-plus</v-icon>
      </v-btn>
      {{ title }}
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        @keydown.enter="forceLoad++"
        append-icon="mdi-magnify"
        label="Search"
        clearable
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-card-text>
      <slot name="DataTable" v-bind="{...attrs, search, forceLoad}">
        <DataTable v-bind="attrs" :search="search" :forceLoad="forceLoad">
        </DataTable>
      </slot>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import DataTable from '@/components/DataTable.vue';
import { Route } from 'vue-router';

@Component({
  components: {
    DataTable
  }
})
export default class ListView extends Vue {
  name = 'ListView';
  @Prop() private newRoute?: Partial<Route>;
  @Prop({default: 'List'}) private title!: string;
  search = '';
  forceLoad = 0;
  attrs = this.$attrs as Record<string, string> | any;

  created() {
    if (!this.attrs.footerProps) {
      this.attrs.footerProps = {};
    }
    if (!this.attrs.footerProps.itemsPerPageOptions) {
      this.attrs.footerProps.itemsPerPageOptions = [10, 25, 50, 100];
    }
  }
}
</script>
