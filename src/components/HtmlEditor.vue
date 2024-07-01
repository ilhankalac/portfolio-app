
<template>
  <div v-if="editor">
    <div class="d-flex justify-space-between align-center html-editor">
      <div>
        <v-btn
          class="menu-button first"
          height="50"
          width="43"
          flat
          :color="editor.isActive('bold') ? '#D0D0D0' : ''"
          :class="{ 'is-active': editor.isActive('bold'), 'menu-button-mobile': smAndDown }"
          @click="editor.chain().focus().toggleBold().run()"
        >
          <v-icon
            icon="mdi-format-bold"
            size="16"
          />
        </v-btn>

        <v-btn
          class="menu-button"
          height="50"
          width="43"
          flat
          :color="editor.isActive('italic') ? '#D0D0D0' : ''"
          :class="{ 'is-active': editor.isActive('italic'), 'menu-button-mobile': smAndDown }"
          @click="editor.chain().focus().toggleItalic().run()"
        >
          <v-icon
            icon="mdi-format-italic"
            size="16"
          />
        </v-btn>

        <v-btn
          class="menu-button"
          height="50"
          width="43"
          flat
          :color="editor.isActive('underline') ? '#D0D0D0' : ''"
          :class="{ 'is-active': editor.isActive('underline'), 'menu-button-mobile': smAndDown }"
          @click="editor.chain().focus().toggleUnderline().run()"
        >
          <v-icon
            icon="mdi-format-underline"
            size="16"
          />
        </v-btn>

        <v-btn
          class="menu-button"
          height="50"
          width="43"
          flat
          :color="editor.isActive('bulletList') ? '#D0D0D0' : ''"
          :class="{ 'is-active': editor.isActive('bulletList'), 'menu-button-mobile': smAndDown }"
          @click="editor.chain().focus().toggleBulletList().run()"
        >
          <v-icon
            icon="mdi-format-list-bulleted"
            size="16"
          />
        </v-btn>

        <v-btn
          class="menu-button text-black"
          height="50"
          width="43"
          flat
          :class="{ 'is-active': editor.isActive('orderedList'), 'menu-button-mobile': smAndDown }"
          @click="editor.chain().focus().toggleOrderedList().run()"
        >
          <v-icon
            icon="mdi-format-list-numbered"
            size="16"
          />
        </v-btn>

        <v-btn
          class="menu-button text-black"
          height="50"
          width="43"
          flat
          :color="editor.isActive('link') ? '#D0D0D0' : ''"
          :class="{ 'is-active': editor.isActive('link'), 'menu-button-mobile': smAndDown }"
          @click="editor.isActive('link') ? unlink() : setLink()"
        >
          <v-icon
            icon="mdi-link"
            size="16"
          />
        </v-btn>

        <v-btn
          class="menu-button"
          height="50"
          width="43"
          flat
          :class="{ 'menu-button-mobile': smAndDown }"
          @click="$emit('file-upload')"
        >
          <v-icon
            icon="mdi-file-upload"
            size="16"
          />
        </v-btn>

        <v-btn
          v-if="smAndDown"
          class="menu-button last"
          height="50"
          width="43"
          flat
          :class="{ 'menu-button-mobile': smAndDown }"
          @click="$emit('fullscreen')"
        >
          <v-icon
            size="16"
            :icon="editorProps.fullscreenIcon"
          />
        </v-btn>
      </div>

      <v-btn
        v-if="!smAndDown"
        class="menu-button last"
        height="50"
        width="43"
        flat
        :class="{ 'menu-button-mobile': smAndDown }"
        @click="$emit('fullscreen')"
      >
        <v-icon
          size="16"
          :icon="editorProps.fullscreenIcon"
        />
      </v-btn>
    </div>

    <EditorContent :editor="editor" />
  </div>
</template>

<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import Mention from '@tiptap/extension-mention';
import { ref, watch } from 'vue';
import { useDisplay } from 'vuetify';

const { smAndDown } = useDisplay();

interface IProps {
  editorContent: string;
  fullscreenIcon: string;
  error: boolean;
}

interface IEmits {
  (e: 'update:editorContent', html: string, text: string): void;
  (e: 'blur'): void;
  (e: 'focus'): void;
  (e: 'file-upload'): void;
  (e: 'fullscreen'): void;
}

const editorProps = defineProps<IProps>();
const emit = defineEmits<IEmits>();

const editor = useEditor({
  extensions: [
    StarterKit,
    Underline,
    Link,
    Mention.configure({
      HTMLAttributes: {
        class: 'participant-variable',
      },
      renderLabel(options: any) {
        return `${options.node.attrs.label ?? options.node.attrs.id}`;
      },
    }),
  ],
  editorProps: {
    attributes: {
      class: 'editor-style valid-border',
    },
  },
  onUpdate({ editor }) {
    emit('update:editorContent', editor.getHTML(), editor.getText());
  },
  onFocus() {
    emit('focus');
  },
  onBlur() {
    emit('blur');
  },
});

watch(
  () => editorProps.editorContent,
  (newVal: string, oldVal: string) => {
    if (newVal !== oldVal && editor.value) {
      const currentContent = editor.value.getHTML();
      if (newVal !== currentContent) {
        editor.value.commands.setContent(newVal, false); // Set false to avoid updating the history
      }
    }
  }
);

watch(
  () => editorProps.error,
  (newVal: boolean) => {
    validateEditor(newVal);
  }
);

function setLink() {
  const previousUrl: string = editor.value?.getAttributes('link').href;
  const url = window.prompt('URL', previousUrl);

  // cancelled
  if (url === null) return;

  // empty
  if (url === '') {
    editor.value?.chain().focus().extendMarkRange('link').unsetLink().run();
    return;
  }

  // update link
  editor.value?.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
}

function unlink() {
  editor.value?.chain().focus().unsetLink().run();
}

function insertVariable(variable: string) {
  editor.value?.commands.insertContent(
    `<span data-type="mention" class="participant-variable" data-id="${variable}" contenteditable="false">${variable}</span>`
  );
  editor.value?.commands.focus();
}

function validateEditor(isValid: boolean) {
  if (isValid) {
    editor.value?.setOptions({
      editorProps: {
        attributes: {
          class: 'editor-style error-border',
        },
      },
    });
  } else {
    editor.value?.setOptions({
      editorProps: {
        attributes: {
          class: 'editor-style valid-border',
        },
      },
    });
  }
}

function setContent(value: string) {
  editor.value?.commands.setContent(value, false); // Set false to avoid updating the history
}

defineExpose({
  setContent,
});
</script>

<style lang="scss" scoped>
:deep(.valid-border) {
  border: 1px solid #D0D0D0 !important;
}

:deep(.error-border) {
  border: 2px solid rgba(var(--v-theme-error)) !important;
}

:deep(.ProseMirror) {
  padding: 20px;
  min-height: 200px;
  border: 1px solid #D0D0D0;
  border-top: 0;

  .participant-variable {
    padding: 10px 20px;
    width: 200px;
    height: 38px;
    background: rgba(0, 211, 141, 0.1);
    border: 1px solid rgba(0, 211, 141, 0.5);
    border-radius: 25px;
  }
}

:deep(.tiptap) {
  > * + * {
    margin-top: 0.75em;
  }

  ol, ul {
    padding-left: 40px !important;

    li {
      padding-top: 12px;
    }
  }

  a {
    color: rgb(var(--v-theme-info));
    cursor: pointer;
  }

  .is-active {
    background-color: #666666;
  }
}

.mention {
  border: 1px solid #000;
  border-radius: 0.4rem;
  padding: 0.1rem 0.3rem;
  box-decoration-break: clone;
}

.html-editor {
  border-top: 1px solid #D0D0D0;
  border-left: 1px solid #D0D0D0;
  border-right: 1px solid #D0D0D0;

  .editor-style {
    background: #FFFFFF;
    border-radius: 0px 0px 4px 4px;
    min-height: 250px;
    padding: 30px 20px;
    outline: none;
  }

  .button-spacer {
    border: 1px solid #D0D0D0;
    border-radius: 0px !important;
    margin-left: -1px;
    height: 50px !important;
    flex-grow: 1 !important;
  }

  .menu-button {
    border-right: 1px solid #D0D0D0;
    border-radius: 0px !important;
    color: black;

    &-mobile {
      border: 0 !important;
    }

    &.last {
      border-left: 1px solid #D0D0D0;
      border-right: 0px solid #D0D0D0;
    }
  }
}
</style>