<template>
  <div class="hide-textarea">
    <v-textarea
      ref="vTextarea"
      v-bind="$attrs"
      v-model="model"
      rows="1"
      @click:clear="clear"
    >
    </v-textarea>
    <ckeditor
      v-model="model"
      :editor="editor"
      :config="editorConfig"
      v-on="events"
    ></ckeditor>
  </div>
</template>
<script lang="ts">
import {Vue, Component, Prop, Watch, PropSync, VModel} from 'vue-property-decorator';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/fr';
import Logger from '@/zemit/core/logger';
import {VTextarea} from "vuetify/lib/components";

const d = new Logger('components/CKEditor');

@Component({
  components: {
    ClassicEditor
  }
})
export default class CKEditor extends Vue {
  name = 'CKEditor';

  @VModel({ type: String }) model!: string
  @Prop({ default: () => ClassicEditor }) readonly editor!: typeof ClassicEditor;
  @Prop({ default: () => ({language: 'en'}) }) readonly editorConfig!: {[key: string]: any};

  clear() {
    this.model = '';
  }

  events = {
    ready: this.dispatchEvent,
    focus: this.dispatchEvent,
    blur: this.dispatchEvent,
    input: this.dispatchEvent,
    destroy: this.dispatchEvent,
  };

  dispatchEvent(event: any) {
    const element = (this.$refs.vTextarea as Vue)?.$el;
    if (element instanceof VTextarea) {
      d.d('dispatchEvent', element, event);
      element.dispatchEvent(event);
    }
  }
}
</script>

<style scoped>
.hide-textarea >>> textarea {
  display: none !important;
}
.hide-textarea >>> label {
  position: initial !important;
}
</style>
