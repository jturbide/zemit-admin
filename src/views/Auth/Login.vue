<template>
  <v-form ref="form" :disabled="loading" v-model="formIsValid" @submit="login" lazy-validation>

    <v-text-field
      v-model="data.email"
      :error-messages="formErrors.email"
      :label="$t('placeholder.email')"
      :rules="[rules.required, rules.email]"
      :autofocus="$vuetify.breakpoint.mdAndUp"
      prepend-inner-icon="mdi-account"
      autocomplete="email"
      tabindex="1"
      outlined
      required
      @input="formErrors = {}"
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
      tabindex="2"
      outlined
      required
      @click:append="showPassword = !showPassword"
      @input="formErrors = {}"
    />

    <div class="d-flex align-center">
      <v-icon left>mdi-help-circle-outline</v-icon>
      <router-link :to="{ name: 'forgotPassword' }" tabindex="5">
        <span v-text="$t('btn.forgotPassword')"></span>
      </router-link>
    </div>

    <v-btn class="mt-4" tabindex="3" type="submit" color="primary" :disabled="!canSubmit" :loading="loading" block @click="login">
      <v-icon left>mdi-login-variant</v-icon>
      <span v-text="$t('btn.login')"></span>
    </v-btn>

    <v-btn class="mt-4" tabindex="4" color="primary" block outlined :to="{ name: 'register' }">
      <v-icon left>mdi-account-plus-outline</v-icon>
      <span v-text="$t('btn.createAccount')"></span>
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
export default class LoginView extends Vue {
  loading = false;
  formIsValid = true;
  showPassword = false;
  formErrors = {};
  rules = {};
  data = {
    email: '',
    password: '',
  };

  get canSubmit () {
    return !this.loading && this.formIsValid;
  }

  login (event: any) {
    event.preventDefault();
    this.formErrors = {};

    const form = this.$refs.form as any;
    if (form && form.validate()) {
      this.loading = true;

      AuthService.getInstance().login({
          email: this.data.email,
          password: this.data.password,
        })
        .then(response => {
          if (response.data.view.loggedIn) {
            Identity.setIdentity(response.data.view);
            Main.render(App); // Logged in - render the app
          } else {
            this.$root.$globalSnack.warning({
              message: this.$t('error.login'),
              icon: 'mdi-emoticon-dead-outline'
            });
          }
        })
        .catch(reason => this.$root.$zemit.handleError(reason, this.formErrors))
        .finally(() => this.loading = false);
    }
  }

  created () {
    this.rules = {
      required: (value: string) => Rules.required(value) || this.$t('rules.required'),
      email: (value: string) => Rules.email(value) || this.$t('rules.email'),
    };
  }
}
</script>
