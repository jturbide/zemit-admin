<template>
  <v-card>
    <v-card-title>
      {{ form.name }}
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
      <v-form ref="formRef" :disabled="form.isLoading" v-model="form.isValid" @submit="handleSubmit" lazy-validation class="pa-2 ma-2">
        <slot name="form">

        </slot>
      </v-form>
    </v-card-text>
    <v-divider/>
    <v-card-actions>
      <v-btn
        :disabled="form.isLoading"
        :loading="form.isLoading"
        @click="$router.go(-1)"
        text
      >
        {{ $t('btn.discard') }}
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        :disabled="form.isLoading"
        :loading="form.isLoading"
        @click="$refs.formRef.reset()"
        text
        depressed
      >
        {{ $t('btn.clear') }}
      </v-btn>
      <v-btn
        v-if="!form.model.data.deleted"
        :disabled="!canDelete"
        :loading="form.isLoading"
        @click="handleDelete"
        color="error"
        depressed
      >
        {{ $t('btn.delete') }}
      </v-btn>
      <v-btn
        v-else-if="form.model.data.deleted"
        :disabled="!canRestore"
        :loading="form.isLoading"
        @click="handleRestore"
        color="success"
        depressed
      >
        {{ $t('btn.restore') }}
      </v-btn>
      <v-btn
        :disabled="!canSubmit"
        :loading="form.isLoading"
        @click="handleSubmit"
        color="primary"
        depressed
      >
        {{ $t('btn.save') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Watch, PropSync, Prop } from 'vue-property-decorator';
import Model from '@/zemit/core/model';
import Rules from '@/zemit/core/rules';
import Service from '@/zemit/core/service';

@Component({
  components: {}
})
export default class FormView extends Vue {
  name = 'FormView';

  @PropSync('zForm', {
    default: () => ({
      name: 'Form',
      model: new Model(),
      service: Service.getInstance(),
      isLoading: false,
      isValid: true,
      errors: {},
      rules: {}
    })
  }) form!: {
    name: string,
    model: Model,
    service: Service
    isLoading: boolean,
    isValid: boolean,
    errors: {[key: string]: Array<string>},
    rules: object,
  };

  get canSubmit () {
    return !this.form.isLoading && this.form.isValid;
  }

  get canRestore () {
    return !this.form.isLoading;
  }

  get canDelete () {
    return !this.form.isLoading;
  }

  load (id: number) {
    this.form.isLoading = true;
    this.form.service.get({ id })
      .then(response => this.form.model = response.data.view.single)
      .catch(reason => this.$root.$zemit.handleError(reason))
      .finally(() => this.form.isLoading = false);
  }

  handleDelete (event: Event) {
    event.preventDefault();
    this.form.isLoading = true;
    this.form.errors = {};
    this.form.service.delete({ id: this.form.model?.data.id })
      .then(response => this.form.model = response.data.view.single)
      .catch(reason => this.$root.$zemit.handleError(reason, this.form.errors))
      .finally(() => this.form.isLoading = false);
  }

  handleRestore (event: Event) {
    event.preventDefault();
    this.form.isLoading = true;
    this.form.errors = {};
    this.form.service.restore({ id: this.form.model?.data.id })
      .then(response => this.form.model = response.data.view.single)
      .catch(reason => this.$root.$zemit.handleError(reason, this.form.errors))
      .finally(() => this.form.isLoading = false);
  }

  handleSubmit (event: Event) {
    event.preventDefault();
    this.form.isLoading = true;
    this.form.errors = {};
    this.form.service.save(this.form.model)
      .then(response => this.form.model = response.data.view.single)
      .catch(reason => this.$root.$zemit.handleError(reason, this.form.errors))
      .finally(() => this.form.isLoading = false);
  }

  created () {

    // Validations
    this.form.rules = {
      required: (value: string) => Rules.required(value) || this.$t('rules.required'),
      email: (value: string) => Rules.email(value) || this.$t('rules.email'),
    };

    // Load entity
    if (this.$route.params.id) {
      this.load(parseInt(this.$route.params.id));
    }
  }

  @Watch('loading')
  onLoadingChange (loading: boolean) {
    if (loading) {
      this.$root.$globalOverlay.show();
    } else {
      this.$root.$globalOverlay.hide();
    }
  }
}
</script>
