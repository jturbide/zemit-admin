<template>
  <v-form ref="form" :disabled="loading" v-model="formIsValid" @submit="handleFormSubmit" lazy-validation>

    <v-text-field
      v-model="data.email"
      :error-messages="formErrors.email"
      :label="$t('placeholder.email')"
      :rules="[rules.required, rules.email]"
      :autofocus="$vuetify.breakpoint.mdAndUp"
      prepend-inner-icon="mdi-account"
      autocomplete="email"
      outlined
      required
      tabindex="1"
      @input="handleInput"
    />

    <v-text-field
      v-model="data.password"
      :error-messages="formErrors.password"
      :label="$t('placeholder.password')"
      :rules="[rules.required]"
      :type="showPassword ? 'text' : 'password'"
      :append-icon="!showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      prepend-inner-icon="mdi-lock"
      autocomplete="password"
      outlined
      required
      tabindex="2"
      @click:append="showPassword = !showPassword"
      @input="handleInput"
    />

    <v-text-field
      v-model="data.confirmation"
      :error-messages="formErrors.confirmation"
      :label="$t('placeholder.confirmation')"
      :rules="[rules.required, rules.identical]"
      :type="showConfirmation ? 'text' : 'password'"
      :append-icon="!showConfirmation ? 'mdi-eye' : 'mdi-eye-off'"
      prepend-inner-icon="mdi-lock"
      autocomplete="password"
      outlined
      required
      tabindex="3"
      @click:append="showConfirmation = !showConfirmation"
      @input="handleInput"
    />

    <v-checkbox
      v-model="acceptTerms"
      class="mt-0 pt-0"
      tabindex="4"
      :rules="[rules.true]"
    >
      <template #label>
        <i18n path="auth.acceptTerms" tag="label">
          <a v-text="$t('auth.acceptTermsText')" @click.stop="$emit('terms')"></a>
        </i18n>
      </template>
    </v-checkbox>

    <v-btn class="mt-4" tabindex="5" type="submit" color="primary" :disabled="!canSubmit" :loading="loading" block @click="handleFormSubmit">
      <v-icon left>mdi-login-variant</v-icon>
      <span v-text="$t('btn.register')"></span>
    </v-btn>

    <v-btn class="mt-4" tabindex="6" block text :to="{ name: 'login' }">
      <v-icon left>mdi-arrow-left</v-icon>
      <span v-text="$t('btn.back')"></span>
    </v-btn>
  </v-form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Main from '@/main';
import App from '@/App.vue';
import Rules from '@/zemit/core/rules';
import Identity from '@/zemit/core/identity';
import AuthService from '@/zemit/services/auth.service';
import Logger from '@/zemit/core/logger';

const d = new Logger('Auth/Login.vue');

@Component({})
export default class RegisterView extends Vue {
  loading = false;
  formIsValid = true;
  showPassword = false;
  showConfirmation = false;
  acceptTerms = false;
  formErrors = {};
  rules = {};
  data = {
    email: '',
    password: '',
    confirmation: '',
  };

  get canSubmit () {
    return !this.loading && this.formIsValid;
  }

  handleInput () {
    this.formErrors = {};
    const form = this.$refs.form as any;
    form.validate();
  }

  handleFormSubmit (event: Event) {
    event.preventDefault();
    this.formErrors = {};

    const form = this.$refs.form as any;
    if (form && form.validate()) {
      this.loading = true;
      AuthService.getInstance().register(this.data)
        .then(response => {
          Identity.setIdentity(response.data.view);
          Main.render(App); // Logged in - render the app
        })
        .catch(reason => this.$root.$zemit.handleError(reason, this.formErrors))
        .finally(() => this.loading = false);
    }
  }

  created () {
    this.rules = {
      required: (value: any) => Rules.required(value) || this.$t('rules.required'),
      email: (value: any) => Rules.email(value) || this.$t('rules.email'),
      true: (value: any) => value || this.$t('rules.checkbox'),
      identical: () => Rules.identical(this.data.password, this.data.confirmation) || this.$t('rules.passwordConfirmation'),
    };
  }
}
</script>
