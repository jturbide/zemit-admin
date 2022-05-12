<template>
  <v-container fluid class="pa-4">
    <ListView
      title="Template List"
      :new-route="{name: 'TemplateForm'}"
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
import TemplateService from '@/zemit/services/template.service';

@Component({
  components: {
    ListView,
    DataTable
  }
})
export default class TemplateList extends Vue {
  name = 'TemplateList';
  service = TemplateService.getInstance();
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
          name: 'TemplateForm',
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
      filterable: 'string',
      item: {
        attrs: {
          class: 'text-no-wrap',
        }
      }
    },
    {
      text: 'Label',
      align: 'start',
      sortable: true,
      value: 'labelEn',
      filterable: 'string',
    },
    {
      text: 'Subject',
      align: 'start',
      sortable: true,
      value: 'subject',
      filterable: 'string',
    },
    {
      text: 'Content',
      align: 'start',
      sortable: true,
      value: 'content',
      filterable: 'string',
    },
    {
      text: 'Meta',
      align: 'start',
      sortable: true,
      value: 'meta',
      filterable: 'string',
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
