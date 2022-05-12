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
              v-model="form.model.data.label"
              :error-messages="form.errors.index"
              :label="$t('placeholder.label')"
              :rules="[form.rules.required]"
              hide-details="auto"
              clearable
              required
              @input="form.errors = {}"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="form.model.data.code"
              :error-messages="form.errors.code"
              :label="$t('placeholder.code')"
              :rules="[form.rules.required]"
              hide-details="auto"
              clearable
              required
              @input="form.errors = {}"
            />
          </v-col>
          <v-col cols="12">
            <v-autocomplete
              v-model="form.model.data.siteList"
              :loading="form.isLoading"
              :search-input.sync="siteListSearch"
              :items="items"
              :label="$t('placeholder.siteList')"
              hide-details="auto"
              deletable-chips
              multiple
              chips
              clearable
              item-text="data.label"
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
import LangService from '@/zemit/services/lang.service';
import LangModel from '@/zemit/model/lang.model';
import SiteService from '@/zemit/services/site.service';

@Component({
  components: {
    FormView
  }
})
export default class LangForm extends Vue {
  name = 'LangForm';

  items = [];
  siteListSearch = '';

  service = LangService.getInstance();
  model = LangModel;

  relations = {
    siteList: SiteService,
  };

  form = {
    name: 'Lang Form',
    model: new LangModel(),
    service: LangService.getInstance(),
    errors: {},
    rules: {},
    isLoading: false,
  };

  @Watch('siteListSearch')
  onUserListSearch(search: string) {
    SiteService.getInstance().getAll({search}).then(response => this.items = response.data.view.list);
  }
}
</script>
