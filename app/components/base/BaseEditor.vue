<template>
  <div v-if="editor" class="editor-shell">
    <div class="html-editor flex items-center justify-between gap-2 px-1.5 py-1.5">
      <div class="flex flex-wrap gap-0.5">
        <button
          v-for="btn in toolbarButtons"
          :key="btn.label || btn.icon"
          type="button"
          class="menu-button"
          :class="{ 'is-active': btn.isActive?.() }"
          :aria-label="btn.label || btn.icon"
          @click="btn.action()"
        >
          <UIcon v-if="btn.icon" :name="btn.icon" class="text-lg" />
          <span v-else class="text-xs font-bold">{{ btn.label }}</span>
        </button>
      </div>
      <button
        type="button"
        class="menu-button"
        aria-label="Fullscreen"
        @click="$emit('fullscreen')"
      >
        <UIcon :name="editorProps.fullscreenIcon ? `i-${editorProps.fullscreenIcon}` : 'i-mdi-fullscreen'" class="text-lg" />
      </button>
    </div>

    <EditorContent :editor="editor" />
  </div>
</template>

<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'
import Mention from '@tiptap/extension-mention'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import Image from '@tiptap/extension-image'
import Paragraph from '@tiptap/extension-paragraph'
import { common, createLowlight } from 'lowlight'

const lowlight = createLowlight(common)

interface IProps {
  editorContent: string
  fullscreenIcon: string
  error: boolean
}

interface IEmits {
  (e: 'update:editorContent', html: string, text: string): void
  (e: 'blur'): void
  (e: 'focus'): void
  (e: 'file-upload'): void
  (e: 'fullscreen'): void
}

const editorProps = defineProps<IProps>()
const emit = defineEmits<IEmits>()

const editor = useEditor({
  extensions: [
    StarterKit.configure({
      codeBlock: false,
      paragraph: false,
      hardBreak: { keepMarks: true },
    }),
    Paragraph.extend({
      addAttributes() {
        return {
          class: {
            default: null,
            parseHTML: element => element.getAttribute('class'),
            renderHTML: attributes => {
              if (!attributes.class) return {}
              return { class: attributes.class }
            },
          },
        }
      },
    }),
    Underline,
    Link,
    Image.configure({ HTMLAttributes: { class: 'blog-image' } }),
    CodeBlockLowlight.configure({ lowlight, HTMLAttributes: { class: 'hljs' } }),
    Mention.configure({
      HTMLAttributes: { class: 'participant-variable' },
      renderLabel(options: any) {
        return `${options.node.attrs.label ?? options.node.attrs.id}`
      },
    }),
  ],
  parseOptions: { preserveWhitespace: 'full' },
  editorProps: {
    attributes: {
      class: 'editor-style valid-border',
      spellcheck: 'false',
    },
    transformPastedHTML(html) {
      return html.replace(/ {2,}/g, match => match.replace(/ /g, '&nbsp;'))
    },
  },
  onUpdate({ editor }) {
    let html = editor.getHTML()
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = html

    const walker = document.createTreeWalker(tempDiv, NodeFilter.SHOW_TEXT)
    let node
    while (node = walker.nextNode()) {
      if (node.nodeValue && node.parentElement?.tagName !== 'PRE' && node.parentElement?.tagName !== 'CODE') {
        node.nodeValue = node.nodeValue.replace(/ {2,}/g, match =>
          match.split('').map((_, i) => i === 0 ? ' ' : '\u00A0').join('')
        )
      }
    }

    html = tempDiv.innerHTML
    emit('update:editorContent', html, editor.getText())
  },
  onFocus() { emit('focus') },
  onBlur() { emit('blur') },
})

const toolbarButtons = computed(() => [
  { icon: 'i-mdi-format-bold', action: () => editor.value?.chain().focus().toggleBold().run(), isActive: () => editor.value?.isActive('bold') },
  { icon: 'i-mdi-format-italic', action: () => editor.value?.chain().focus().toggleItalic().run(), isActive: () => editor.value?.isActive('italic') },
  { icon: 'i-mdi-format-underline', action: () => editor.value?.chain().focus().toggleUnderline().run(), isActive: () => editor.value?.isActive('underline') },
  { icon: 'i-mdi-format-list-bulleted', action: () => editor.value?.chain().focus().toggleBulletList().run(), isActive: () => editor.value?.isActive('bulletList') },
  { icon: 'i-mdi-format-list-numbered', action: () => editor.value?.chain().focus().toggleOrderedList().run(), isActive: () => editor.value?.isActive('orderedList') },
  { icon: 'i-mdi-link', action: () => editor.value?.isActive('link') ? unlink() : setLink(), isActive: () => editor.value?.isActive('link') },
  { label: 'H1', action: () => editor.value?.chain().focus().toggleHeading({ level: 1 }).run(), isActive: () => editor.value?.isActive('heading', { level: 1 }) },
  { label: 'H2', action: () => editor.value?.chain().focus().toggleHeading({ level: 2 }).run(), isActive: () => editor.value?.isActive('heading', { level: 2 }) },
  { label: 'H3', action: () => editor.value?.chain().focus().toggleHeading({ level: 3 }).run(), isActive: () => editor.value?.isActive('heading', { level: 3 }) },
  { icon: 'i-mdi-code-tags', action: () => editor.value?.chain().focus().toggleCodeBlock().run(), isActive: () => editor.value?.isActive('codeBlock') },
  { icon: 'i-mdi-code-braces', action: () => editor.value?.chain().focus().toggleCode().run(), isActive: () => editor.value?.isActive('code') },
  { icon: 'i-mdi-image', action: () => addImage() },
])

watch(
  () => editorProps.editorContent,
  (newVal: string, oldVal: string) => {
    if (newVal !== oldVal && editor.value) {
      const currentContent = editor.value.getHTML()
      if (newVal !== currentContent) {
        editor.value.commands.setContent(newVal, false)
      }
    }
  }
)

watch(
  () => editorProps.error,
  (newVal: boolean) => { validateEditor(newVal) }
)

function setLink() {
  const previousUrl: string = editor.value?.getAttributes('link').href
  const url = window.prompt('URL', previousUrl)
  if (url === null) return
  if (url === '') {
    editor.value?.chain().focus().extendMarkRange('link').unsetLink().run()
    return
  }
  editor.value?.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
}

function unlink() {
  editor.value?.chain().focus().unsetLink().run()
}

function addImage() {
  const url = window.prompt('Enter image URL:')
  if (url) {
    const caption = window.prompt('Enter image caption (optional):')
    if (caption) {
      editor.value?.commands.insertContent(
        `<p><img src="${url}" class="blog-image" /></p><p class="image-caption">${caption}</p><p></p>`
      )
    } else {
      editor.value?.chain().focus().setImage({ src: url }).run()
    }
  }
}

function validateEditor(isValid: boolean) {
  if (isValid) {
    editor.value?.setOptions({ editorProps: { attributes: { class: 'editor-style error-border' } } })
  } else {
    editor.value?.setOptions({ editorProps: { attributes: { class: 'editor-style valid-border' } } })
  }
}

function setContent(value: string) {
  editor.value?.commands.setContent(value, false)
}

defineExpose({ setContent })
</script>

<style lang="scss" scoped>
:deep(.valid-border) {
  border: 0 !important;
}

:deep(.error-border) {
  border: 2px solid #ef4444 !important;
}

:deep(.ProseMirror) {
  padding: 16px 18px;
  min-height: 220px;
  outline: none;
  white-space: pre-wrap;

  p {
    margin: 0;
    padding: 0;
    white-space: pre-wrap;
    line-height: 1.8;
  }

  p:empty::before {
    content: '\00a0';
    display: inline-block;
  }
}

:deep(.tiptap) {
  > * + * { margin-top: 0.75em; }

  h1 { font-size: 2em; font-weight: bold; margin: 0.67em 0; }
  h2 { font-size: 1.5em; font-weight: bold; margin: 0.83em 0; }
  h3 { font-size: 1.17em; font-weight: bold; margin: 1em 0; }

  code {
    background-color: var(--site-surface-2);
    color: var(--site-accent);
    padding: 2px 6px;
    border-radius: 3px;
    font-family: 'Courier New', Courier, monospace;
    font-size: 0.9em;
  }

  pre {
    background-color: #282c34;
    color: #abb2bf;
    padding: 16px;
    border-radius: 6px;
    overflow-x: auto;
    margin: 1em 0;
    code { background-color: transparent; color: inherit; padding: 0; border-radius: 0; }
  }

  .hljs {
    background-color: #282c34;
    color: #abb2bf;
    padding: 16px;
    border-radius: 6px;
    overflow-x: auto;
    font-family: 'Courier New', Courier, monospace;
  }

  ol, ul {
    padding-left: 40px !important;
    li { padding-top: 12px; }
  }

  a { color: #3b82f6; cursor: pointer; }
}

.editor-shell {
  border: 1px solid var(--site-border-strong);
  border-radius: 0.5rem;
  overflow: hidden;
  background: var(--site-bg);
  transition: border-color 0.15s ease;

  &:focus-within {
    border-color: var(--site-accent);
  }
}

.html-editor {
  border-bottom: 1px solid var(--site-border-strong);
  background: var(--site-surface-2);
}

.menu-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 0.375rem;
  color: var(--site-muted);
  transition: background-color 0.15s ease, color 0.15s ease;

  &:hover {
    background: var(--site-border-strong);
    color: var(--site-text);
  }

  &.is-active {
    background: rgb(var(--site-accent-rgb) / 0.18);
    color: var(--site-accent);
  }
}
</style>
