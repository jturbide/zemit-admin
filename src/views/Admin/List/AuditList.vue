<template>
  <v-container fluid class="pa-4">
    <ListView
      title="Audit List"
      :new-route="{name: 'AuditForm'}"
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
import AuditService from '@/zemit/services/audit.service';

@Component({
  components: {
    ListView,
    DataTable
  }
})
export default class AuditList extends Vue {
  name = 'AuditList';
  service = AuditService.getInstance();
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
          name: 'AuditForm',
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
      text: 'Parent ID',
      align: 'start',
      sortable: true,
      value: 'parentId',
      filterable: 'number',
    },
    {
      text: 'Model',
      align: 'start',
      sortable: true,
      value: 'model',
      filterable: 'text',
    },
    {
      text: 'Table',
      align: 'start',
      sortable: true,
      value: 'table',
      filterable: 'distinct',
    },
    {
      text: 'Primary',
      align: 'start',
      sortable: true,
      value: 'primary',
      filterable: 'number',
    },
    {
      text: 'Event',
      align: 'start',
      sortable: true,
      value: 'event',
      filterable: 'distinct',
    },
    {
      text: 'Columns',
      align: 'start',
      sortable: true,
      value: 'columns',
      filterable: 'json',
      item: {
        type: 'truncate',
        width: '333px',
      }
    },
    {
      text: 'Before',
      align: 'start',
      sortable: true,
      value: 'before',
      filterable: 'json',
      item: {
        type: 'truncate',
        width: '333px',
      }
    },
    {
      text: 'After',
      align: 'start',
      sortable: true,
      value: 'after',
      filterable: 'json',
      item: {
        type: 'truncate',
        width: '333px',
      }
    },
    {
      text: 'Deleted',
      align: 'start',
      sortable: true,
      value: 'deleted',
      filterable: 'boolean',
    },
    {
      text: 'Created at',
      align: 'start',
      sortable: true,
      value: 'createdAt',
      filterable: {
        type: 'date'
      },
      item: {
        type: 'date',
        format: 'YYYY-MM-DD'
      }
    },
    {
      text: 'Updated at',
      align: 'start',
      sortable: true,
      value: 'updatedAt',
      filterable: {
        type: 'date'
      },
      item: {
        type: 'date',
        format: 'YYYY-MM-DD'
      }
    },
    {
      text: 'Deleted at',
      align: 'start',
      sortable: true,
      value: 'deletedAt',
      filterable: {
        type: 'date'
      },
      item: {
        type: 'date',
        format: 'YYYY-MM-DD'
      }
    },
    {
      text: 'Restored at',
      align: 'start',
      sortable: true,
      value: 'restoredAt',
      filterable: {
        type: 'date'
      },
      item: {
        type: 'date',
        format: 'YYYY-MM-DD'
      }
    },
    {
      text: '',
      align: 'start',
      sortable: false,
      value: '_last',
    },
  ];
}
</script>
