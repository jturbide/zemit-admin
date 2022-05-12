<template>
  <v-container fluid class="pa-4">
    <ListView
      title="Site List"
      :new-route="{name: 'SiteForm'}"
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
import SiteService from '@/zemit/services/site.service';

@Component({
  components: {
    ListView,
    DataTable
  }
})
export default class SiteList extends Vue {
  name = 'SiteList';
  service = SiteService.getInstance();
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
          name: 'SiteForm',
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
      text: 'Name',
      align: 'start',
      sortable: true,
      value: 'name',
      filterable: 'string',
    },
    {
      text: 'Title',
      align: 'start',
      sortable: true,
      value: 'title',
      filterable: 'string',
    },
    {
      text: 'Description',
      align: 'start',
      sortable: true,
      value: 'description',
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
