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
  editor.value = new Editor({
    extensions: [TiptapStarterKit],
    content: props.formData[props.field],
    onUpdate: ({ getHTML }) => {
      props.formData[props.field] = getHTML()
    },
  })
})

onBeforeUnmount(() => {
  editor.value.destroy()
})
</script>