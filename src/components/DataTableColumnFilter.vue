<template>
  <v-menu
      offset-y
      :close-on-content-click="false"
      v-model="visible"
  >
    <template #activator="{ on, attrs }">
      <v-btn
          color="default"
          v-bind="{...attrs}"
          v-on="on"
          x-small
          depressed
          fab
          text
          style="min-width: 20px;"
          class="px-0"
      >
        <v-icon x-small>mdi-filter-variant</v-icon>
      </v-btn>
    </template>
    <v-sheet class="pa-4">

      <template v-if="!header.filterable.type || header.filterable.type === 'text'">
        <v-text-field
            v-bind="{...header.filterable.attrs}"
            v-model="Value"
            hide-details
            single-line
            outlined
            clearable
            type="text"
        ></v-text-field>
      </template>

      <template v-else-if="header.filterable.type === 'number'">
        <template v-if="!header.filterable.range">
          <v-text-field
              v-bind="{...header.filterable.attrs}"
              v-model="Value"
              hide-details
              single-line
              outlined
              clearable
              type="number"
          >
          </v-text-field>
        </template>

        <template v-else-if="header.filterable.range">
          <v-range-slider
              v-bind="{...header.filterable.attrs}"
              v-model="header.filterable.range"
              :max="header.filterable.min || 0"
              :min="header.filterable.max || 100"
              hide-details
              class="align-center"
              style="min-width: 400px;"
          >
            <template v-slot:prepend>
              <v-text-field
                  :value="header.filterable.range[0]"
                  class="mt-0 pt-0"
                  hide-details
                  single-line
                  outlined
                  type="number"
                  style="width: 25px"
                  @change="$set(header.filterable.range, 0, $event)"
              ></v-text-field>
            </template>
            <template v-slot:append>
              <v-text-field
                  :value="header.filterable.range[1]"
                  class="mt-0 pt-0"
                  hide-details
                  single-line
                  outlined
                  type="number"
                  style="width: 25px"
                  @change="$set(header.filterable.range, 1, $event)"
              ></v-text-field>
            </template>
          </v-range-slider>
        </template>
      </template>

      <template v-else-if="header.filterable.type === 'date'">
<!--        <v-text-field-->
<!--            v-model="_dateRangeText"-->
<!--            prepend-icon="mdi-calendar"-->
<!--            readonly-->
<!--        ></v-text-field>-->
        <v-date-picker
            v-bind="{...header.filterable.attrs}"
            v-model="Value"
            range
        ></v-date-picker>
      </template>

      <template v-else-if="header.filterable.type === 'distinct'">

      </template>

      <template v-else-if="header.filterable.type === 'select'">

      </template>

      <template v-else-if="header.filterable.type === 'enum'">

      </template>

      <template v-else>
        <v-alert outlined prominent border="left" type="error">
          {{$t('datatable.filter.unsupported', {type: header.filterable.type})}}
        </v-alert>
      </template>

      <v-divider class="my-4"></v-divider>

      <div class="d-flex justify-space-between">
          <v-btn class="mx-2" small depressed fab text color="green" @click="handleSave()"><v-icon>mdi-check</v-icon></v-btn>
          <v-btn class="mx-2" small depressed fab text color="red" @click="handleCancel()"><v-icon>mdi-close</v-icon></v-btn>
      </div>

    </v-sheet>
  </v-menu>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({})
export default class GlobalSnack extends Vue {
  name = 'DataTableColumnFilter';
  @Prop({default: () => ({filterable: {type: 'text'}})}) private header!: object;
  @Prop({default: null}) private value!: string|number|null;

  visible = false;

  get Value() {
    return this.value;
  }

  set Value(value: string|number|null) {
    this.$emit('update:value', value);
  }

  close() {
    this.visible = false;
  }

  handleCancel() {
    // this.value = null;
    this.close();
  }

  handleSave() {
    this.close();
  }
}
</script>

<style scoped>

</style>
