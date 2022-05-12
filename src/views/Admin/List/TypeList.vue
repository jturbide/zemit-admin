<template>
  <v-container fluid class="pa-4">
    <ListView
      title="Type List"
      :new-route="{name: 'TypeForm'}"
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
import TypeService from '@/zemit/services/type.service';

@Component({
  components: {
    ListView,
    DataTable
  }
})
export default class TypeList extends Vue {
  name = 'TypeList';
  service = TypeService.getInstance();
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
          name: 'TypeForm',
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
      filterable: 'number',
    },
    {
      text: 'Index',
      align: 'start',
      sortable: true,
      value: 'index',
      filterable: 'number',
    },
    {
      text: 'Label (Fr)',
      align: 'start',
      sortable: true,
      value: 'labelFr',
      filterable: 'string',
    },
    {
      text: 'Label (En)',
      align: 'start',
      sortable: true,
      value: 'labelEn',
      filterable: 'string',
    },
    {
      text: 'Position',
      align: 'start',
      sortable: true,
      value: 'position',
      filterable: 'int',
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
