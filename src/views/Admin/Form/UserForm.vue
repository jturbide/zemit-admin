<template>
  <v-container fluid class="pa-4">
    <v-card>
      <v-card-title>
        User Form
        <v-spacer></v-spacer>
        <v-menu bottom left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-subheader>Actions</v-subheader>
            <v-list-item-group color="primary">
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-email-send</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    Send password reset
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-history</v-icon>
                </v-list-item-icon>
                <v-list-item-title>
                  Audit change history
                </v-list-item-title>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-menu>
      </v-card-title>

      <v-divider></v-divider>

      <v-card-text>
        <v-form ref="form" :disabled="loading" v-model="formIsValid" @submit="handleSubmit" lazy-validation class="pa-2 ma-2">

        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model="model.data.username"
              :error-messages="formErrors.username"
              :label="$t('placeholder.username')"
              :rules="[rules.required, rules.username]"
              prepend-inner-icon="mdi-account-circle"
              autocomplete="username"
              hide-details="auto"
              dense
              clearable
              required
              @input="formErrors = {}"
            />
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="model.data.email"
              error-count="3"
              :error-messages="formErrors.email"
              :label="$t('placeholder.email')"
              :autofocus="true"
              prepend-inner-icon="mdi-at"
              autocomplete="email"
              hide-details="auto"
              dense
              clearable
              @input="formErrors = {}"
            />
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="model.data.firstName"
              :error-messages="formErrors.firstName"
              :label="$t('placeholder.firstName')"
              :rules="[rules.required]"
              prepend-inner-icon="mdi-account-question"
              hide-details="auto"
              clearable
              required
              @input="formErrors = {}"
            />
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="model.data.lastName"
              :error-messages="formErrors.lastName"
              :label="$t('placeholder.lastName')"
              :rules="[rules.required]"
              prepend-inner-icon="mdi-account-question"
              hide-details="auto"
              clearable
              required
              @input="formErrors = {}"
            />
          </v-col>

          <v-divider></v-divider>

          <v-col cols="6">
            <v-menu
              v-model="menuDob"
              :close-on-content-click="false"
              transition="fade-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="model.data.dob"
                  label="Date of birth"
                  prepend-inner-icon="mdi-calendar"
                  v-bind="attrs"
                  v-on="on"
                  hide-details="auto"
                  clearable
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="model.data.dob"
                @input="menuDob = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="3">
            <v-select
              v-model="model.data.language"
              :items="languageList"
              :item-text="(item) => $t('language.' + item.id)"
              item-value="id"
              :error-messages="formErrors.language"
              :label="$t('placeholder.language')"
              :rules="[rules.required]"
              prepend-inner-icon="mdi-translate"
              hide-details="auto"
              clearable
              @input="formErrors = {}"
            >
            </v-select>
          </v-col>
          <v-col cols="3">
            <v-radio-group v-model="model.data.gender" row>
              <v-radio label="Male" :value="1"></v-radio>
              <v-radio label="Female" :value="0"></v-radio>
            </v-radio-group>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-autocomplete
              v-model="model.data.rolelist"
              :items="relations.roleList"
              :item-text="(item) => $t('role.' + item.data.index)"
              item-value="data.id"
              :error-messages="formErrors.rolelist"
              :label="$t('placeholder.rolelist')"
              prepend-inner-icon="mdi-account-lock"
              hide-details="auto"
              chips
              clearable
              deletable-chips
              multiple
              @input="formErrors = {}"
            >
            </v-autocomplete>
          </v-col>
        </v-row>

          <v-row>
            <v-col cols="12">
              <v-autocomplete
                v-model="model.data.grouplist"
                :items="relations.groupList"
                :item-text="(item) => $t('group.' + item.data.index)"
                item-value="data.id"
                :error-messages="formErrors.grouplist"
                :label="$t('placeholder.grouplist')"
                prepend-inner-icon="mdi-account-group"
                hide-details="auto"
                chips
                clearable
                deletable-chips
                multiple
                @input="formErrors = {}"
              >
              </v-autocomplete>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <v-autocomplete
                v-model="model.data.typelist"
                :items="relations.typeList"
                :item-text="(item) => $t('type.' + item.data.index)"
                item-value="data.id"
                :error-messages="formErrors.typelist"
                :label="$t('placeholder.typelist')"
                prepend-inner-icon="mdi-account-tie"
                hide-details="auto"
                chips
                clearable
                deletable-chips
                multiple
                @input="formErrors = {}"
              >
              </v-autocomplete>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-checkbox
                v-model="model.data.newsletter"
                :error-messages="formErrors.newsletter"
                :value="1"
                label="Subscribe to newsletter"
                type="checkbox"
              ></v-checkbox>
            </v-col>
          </v-row>
      </v-form>
      </v-card-text>
      <v-divider/>
      <v-card-actions>
        <v-btn
          :disabled="loading"
          :loading="loading"
          @click="$router.go(-1)"
          text
        >
          {{ $t('btn.discard') }}
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          :disabled="loading"
          :loading="loading"
          @click="$refs.form.reset()"
          text
          depressed
        >
          {{ $t('btn.clear') }}
        </v-btn>
        <v-btn
          v-if="!model.data.deleted"
          :disabled="!canDelete"
          :loading="loading"
          @click="handleDelete"
          color="error"
          depressed
        >
          {{ $t('btn.delete') }}
        </v-btn>
        <v-btn
          v-else-if="model.data.deleted"
          :disabled="!canRestore"
          :loading="loading"
          @click="handleRestore"
          color="success"
          depressed
        >
          {{ $t('btn.restore') }}
        </v-btn>
        <v-btn
          :disabled="!canSubmit"
          :loading="loading"
          @click="handleSubmit"
          color="primary"
          depressed
        >
          {{ $t('btn.save') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import UserService from '@/zemit/services/user.service';
import Model from '@/zemit/core/model';
import Rules from '@/zemit/core/rules';
import RoleService from '@/zemit/services/role.service';

@Component({
  components: {}
})
export default class UserForm extends Vue {
  name = 'UserForm';
  service = UserService.getInstance();
  loading = false;
  formIsValid = true;
  menuDob = false;
  formErrors = {};
  rules = {};
  model?: Model = new Model();
  relations = {
    roleList: []
  };

  languageList = [
    {id: 'fr'},
    {id: 'en'},
  ];

  get canSubmit () {
    return !this.loading && this.formIsValid;
  }

  get canRestore () {
    return !this.loading;
  }

  get canDelete () {
    return !this.loading;
  }

  load (id: number) {
    this.loading = true;
    this.service.get({ id })
      .then(response => this.model = response.data.view.single)
      .catch(reason => this.$root.$zemit.handleError(reason))
      .finally(() => this.loading = false);
  }

  loadRelations () {
    RoleService.getInstance().getAll()
      .then(response => this.relations.roleList = response.data.view.list)
      .catch(reason => this.$root.$zemit.handleError(reason))
      .finally(() => this.loading = false);
  }

  handleDelete (event: Event) {
    event.preventDefault();
    this.loading = true;
    this.formErrors = {};
    this.service.delete({id: this.model?.data.id})
      .then(response => this.model = response.data.view.single)
      .catch(reason => this.$root.$zemit.handleError(reason, this.formErrors))
      .finally(() => this.loading = false);
  }

  handleRestore (event: Event) {
    event.preventDefault();
    this.loading = true;
    this.formErrors = {};
    this.service.restore({id: this.model?.data.id})
      .then(response => this.model = response.data.view.single)
      .catch(reason => this.$root.$zemit.handleError(reason, this.formErrors))
      .finally(() => this.loading = false);
  }

  handleSubmit (event: Event) {
    event.preventDefault();
    this.loading = true;
    this.formErrors = {};
    this.service.save(this.model)
      .then(response => this.model = response.data.view.single)
      .catch(reason => this.$root.$zemit.handleError(reason, this.formErrors))
      .finally(() => this.loading = false);
  }

  created () {

    // Validations
    this.rules = {
      required: (value: string) => Rules.required(value) || this.$t('rules.required'),
      email: (value: string) => Rules.email(value) || this.$t('rules.email'),
    };

    // Load entity
    if (this.$route.params.id) {
      this.load(parseInt(this.$route.params.id));
    }

    // Load relations
    this.loadRelations();
  }

  @Watch('loading')
  onLoadingChange(loading: boolean) {
    if (loading) {
      this.$root.$globalOverlay.show();
    } else {
      this.$root.$globalOverlay.hide();
    }
  }
}
</script>
