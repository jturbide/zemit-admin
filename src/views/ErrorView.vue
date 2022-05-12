<template>
  <div class="ErrorView">
    <v-card flat class="text-center">

      <v-icon style="font-size: 120px;" class="mt-10">mdi-robot-dead</v-icon>
      <h1 class="display-3 mt-5">
        Page not found
      </h1>
      <p class="grey--text lighten-5">
        The page you are trying to get to never existed in this reality,
        or has migrated to a parallel universe.
      </p>
      <p class="paragraph-text mt-2">
        Try going back to <v-btn :to="{name: 'home'}">home page</v-btn>
      </p>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class ErrorView extends Vue {
}
</script>

<style>
.paragraph-text {
  font-size: 18px;
}
</style>
