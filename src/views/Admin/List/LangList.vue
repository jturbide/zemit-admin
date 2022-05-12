<template>
  <v-container fluid class="pa-4">
    <ListView
      title="Lang List"
      :new-route="{name: 'LangForm'}"
      :headers="headers"
      :service="service"
    >
    </ListView>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import DataTable from '@/components/DataTable.vue';
import ListView from '@/views/Admin/ListView.vue';
import LangService from '@/zemit/services/lang.service';

@Component({
  components: {
    ListView,
    DataTable
  }
})
export default class LangList extends Vue {
  name = 'LangList';
  service = LangService.getInstance();
  headers = [
    {
      text: '',
      align: 'start',
      sortable: false,
      value: '_first',
      item: {
        type: 'button',
        attrs: {},
        icon: {
          text: 'mdi-pencil-outline'
        },
        to: {
          name: 'LangForm',
          params: {
            id: 'props.item.data.id'
          }
        }
      }
    },
    {
      text: 'ID',
      align: 'start',
      sortable: true,
      value: 'id',
      filterable: {
        type: 'number',
        min: 0,
        max: 100,
        step: 1,
        // range: [0, 100],
        default: 0,
        attrs: {
          suffix: 'int',
        },
      },
    },
    {
      text: 'Label',
      align: 'start',
      sortable: true,
      value: 'label',
      filterable: 'string',
    },
    {
      text: 'Code',
      align: 'start',
      sortable: true,
      value: 'code',
      filterable: 'string',
    },
    {
      text: 'Created at',
      align: 'start',
      sortable: true,
      value: 'createdAt',
      filterable: {
        type: 'date'
      },
    },
    {
      text: 'Updated at',
      align: 'start',
      sortable: true,
      value: 'updatedAt',
      filterable: {
        type: 'date'
      },
    },
    {
      text: 'Deleted at',
      align: 'start',
      sortable: true,
      value: 'deletedAt',
      filterable: {
        type: 'date'
      },
    },
    {
      text: 'Restored at',
      align: 'start',
      sortable: true,
      value: 'restoredAt',
      filterable: {
        type: 'date'
      },
    },
    {
      text: 'Soft delete',
      align: 'start',
      sortable: true,
      value: 'deleted',
      filterable: {
        type: 'boolean'
      },
    },
    {
      text: '',
      align: 'start',
      sortable: false,
      value: '_last',
      filterable: {
        type: 'mistake'
      },
    },
  ];
}
</script>
