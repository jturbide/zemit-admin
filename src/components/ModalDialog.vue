<template>
  <v-dialog v-model="_value" v-bind="$attrs" v-on="$listeners">
    <v-card>
      <v-card-title class="d-flex align-center flex-nowrap justify-space-between">
        <slot name="title">
          <div class="d-flex align-center overflow-hidden">
            <v-icon v-if="icon" left v-text="icon"></v-icon>
            <span class="headline text-truncate" v-text="title"></span>
          </div>
        </slot>
        <v-btn @click="_value = false" icon>
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <slot name="body">
          <div v-html="body"></div>
        </slot>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <slot name="actions">
          <div class="d-flex flex-column flex-md-row w-100 justify-end" style="gap: 0.5rem">
            <v-btn :key="btnIdx" v-for="(btn, btnIdx) in buttons" v-bind="btn.attrs" v-on="btn.events" :block="$vuetify.breakpoint.smAndDown" large>
              <span v-text="btn.text"></span>
            </v-btn>
          </div>
        </slot>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ModalDialog',

  props: {
    value: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
    body: {
      type: String,
      default: null,
    },
    buttons: {
      type: Array,
      default: () => ([]),
    },
  },

  computed: {
    _value: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      },
    },
  },
}
</script>
