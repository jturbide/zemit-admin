<template>
  <v-container fluid class="pa-4">
    <ListView
      title="User List"
      :new-route="{name: 'UserForm'}"
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
import UserService from '@/zemit/services/user.service';

@Component({
  components: {
    ListView,
    DataTable
  }
})
export default class UserList extends Vue {
  name = 'UserList';
  service = UserService.getInstance();
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
          name: 'UserForm',
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
      text: 'Email',
      align: 'start',
      sortable: true,
      value: 'email',
      filterable: {
        attrs: {
          appendIcon: 'mdi-at'
        }
      }
    },
    {
      text: 'First Name',
      align: 'start',
      sortable: true,
      value: 'firstName',
      filterable: true,
    },
    {
      text: 'Last Name',
      align: 'start',
      sortable: true,
      value: 'lastName',
      filterable: true,
    },
    {
      text: 'Role',
      align: 'start',
      sortable: true,
      value: 'rolelist',
      filterable: {
        type: 'select',
      }
    },
    {
      text: 'Status',
      align: 'start',
      sortable: true,
      value: 'status',
      filterable: {
        type: 'enum',
      }
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
