<template>
  <div class="editor">
    <editor-content :editor="editor" />
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { Editor, EditorContent } from '@tiptap/vue-3'


const props = defineProps({
  formData: {
    type: Object,
    required: true,
  },
  field: {
    type: String,
    required: true,
  },
})

const editor = ref(null)

onMounted(() => {

  console.log(props.field);

  editor.value = new Editor({
    extensions: [TiptapStarterKit],
    content: props.formData[props.field],
    onUpdate: ({ editor }) => {
      props.formData[props.field] = editor.getHTML();
    },
  })
})

onBeforeUnmount(() => {
  editor.value.destroy()
})
</script>