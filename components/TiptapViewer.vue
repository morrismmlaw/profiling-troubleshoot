<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { Editor, EditorContent, BubbleMenu, FloatingMenu } from '@tiptap/vue-3'

// import '/assets/css/tiptap.css' //Gotta need this for Tiptap menus.

const props = defineProps({
  text: {
    type: String,
    required: true,
  }
})

const editor = ref(null)

onMounted(() => {
  // console.log("Tiptap field: ", props.field);
  editor.value = new Editor({
    editorProps: {
      attributes: {
        // class: 'border border-gray-400 px-3 py-2 rounded ',
      },
    },
    extensions: [TiptapStarterKit],
    content: props.text,
  })
})

onBeforeUnmount(() => {
  editor.value.destroy()
})
</script>

<template>
  <div class="">
    <div v-if="editor">
      <editor-content :editor="editor" />
    </div>
  </div>
</template>