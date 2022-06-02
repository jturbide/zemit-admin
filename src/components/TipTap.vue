<template>
  <div>
    <tiptap-vuetify
      v-bind="$attrs"
      v-model="content"
      :extensions="extensions"
    />
  </div>
</template>
<script lang="ts">
import {Vue, Component, Prop, Watch, PropSync} from 'vue-property-decorator';
import {
  TiptapVuetify,
  Heading,
  Bold,
  Italic,
  Strike,
  Underline,
  Code,
  Paragraph,
  BulletList,
  OrderedList,
  ListItem,
  Link,
  Blockquote,
  HardBreak,
  HorizontalRule,
  History
} from 'tiptap-vuetify'
import Logger from '@/zemit/core/logger';

const d = new Logger('components/DataTable');

@Component({
  components: {
    TiptapVuetify
  }
})
export default class TipTap extends Vue {
  name = 'TipTap';
  extensions = [
    History,
    Blockquote,
    Link,
    Underline,
    Strike,
    Italic,
    ListItem,
    BulletList,
    OrderedList,
    [Heading, {
      options: {
        levels: [1, 2, 3, 4, 5, 6]
      }
    }],
    Bold,
    Code,
    HorizontalRule,
    Paragraph,
    HardBreak
  ];
  content = '';
}
</script>

<style scoped>

</style>
