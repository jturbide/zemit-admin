<template>
  <v-container fluid class="pa-4">
    <form-view
      ref="formView"
      :z-form="form"
    >
      <template #form>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="form.model.data.index"
              :error-messages="form.errors.index"
              :label="$t('placeholder.index')"
              :rules="[form.rules.required]"
              hide-details="auto"
              clearable
              required
              @input="form.errors = {}"
            />
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="form.model.data.labelFr"
              :error-messages="form.errors.labelFr"
              :label="$t('placeholder.labelFr')"
              :rules="[form.rules.required]"
              hide-details="auto"
              clearable
              required
              @input="form.errors = {}"
            />
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="form.model.data.labelEn"
              :error-messages="form.errors.labelEn"
              :label="$t('placeholder.labelEn')"
              :rules="[form.rules.required]"
              hide-details="auto"
              clearable
              required
              @input="form.errors = {}"
            />
          </v-col>
          <v-col cols="12">
            <v-autocomplete
              v-model="form.model.data.userlist"
              :loading="form.isLoading"
              :search-input.sync="userListSearch"
              :items="items"
              :label="$t('placeholder.userlist')"
              hide-details="auto"
              deletable-chips
              multiple
              chips
              clearable
              item-text="data.firstName"
              item-value="data.id"
            ></v-autocomplete>
          </v-col>
        </v-row>
      </template>
    </form-view>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import FormView from '@/views/Admin/FormView.vue';
import RoleService from '@/zemit/services/role.service';
import RoleModel from '@/zemit/model/role.model';
import UserService from '@/zemit/services/user.service';

@Component({
  components: {
    FormView
  }
})
export default class RoleForm extends Vue {
  name = 'RoleForm';

  items = [];
  userListSearch = '';

  service = RoleService.getInstance();
  model = RoleModel;

  relations = {
    userList: UserService,
  };

  form = {
    name: 'Role Form',
    model: new RoleModel(),
    service: RoleService.getInstance(),
    errors: {},
    rules: {},
    isLoading: false,
  };

  @Watch('userListSearch')
  onUserListSearch(search: string) {
    UserService.getInstance().getAll({search}).then(response => this.items = response.data.view.list);
  }
}
</script>
