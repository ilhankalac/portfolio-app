<template>
  <div class="text-black">
    <v-container v-if="!isDataLoaded">
      <v-row class="d-flex flex-column ga-3">
        <v-col>
          <v-skeleton-loader
            color="primary"
            class="mx-auto mb-10"
            type="heading"
            :min-width="smAndDown ? '100px' : '700px'"
          >
          </v-skeleton-loader>
          <v-skeleton-loader
            color="primary"
            class="mx-auto border"
            type="article"
            :min-width="smAndDown ? '100px' : '700px'"
          />
        </v-col>
      </v-row>
    </v-container>
    <v-container v-else>
      <div :class="smAndDown ? 'text-h6' : 'text-h5'">
        {{ blog.title }}
      </div>
      <div class="font-weight-light font-italic mt-1">
        <span style="opacity: 0.6">Piše</span> {{ blog.author }}, 
        <span style="opacity: 0.6">objavljeno</span> {{ blog.date }}
      </div>
      <v-divider class="mb-6" />
      <div class="blog-content text-black" v-html="blog.html"></div>
    </v-container>
  </div>
</template>

<script setup>
import { getVal } from "@/services/DataService";
import { ref, onMounted, watch, nextTick } from "vue";
import { useRouter } from "vue-router";
import { useDisplay } from "vuetify";
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import python from 'highlight.js/lib/languages/python';
import java from 'highlight.js/lib/languages/java';
import css from 'highlight.js/lib/languages/css';
import html from 'highlight.js/lib/languages/xml';
import json from 'highlight.js/lib/languages/json';
import bash from 'highlight.js/lib/languages/bash';
import vue from 'highlight.js/lib/languages/xml'; // Vue uses XML highlighting

// Register languages
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('python', python);
hljs.registerLanguage('java', java);
hljs.registerLanguage('css', css);
hljs.registerLanguage('html', html);
hljs.registerLanguage('xml', html);
hljs.registerLanguage('json', json);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('vue', vue);

const { smAndDown } = useDisplay();

const router = useRouter();

const key = ref("");
const blog = ref({});
const isDataLoaded = ref(false);

const getBlog = () => {
  isDataLoaded.value = false;
  const key = router.currentRoute.value.params.id.split("key=")[1];
  getVal("blog/posts/").then((val) => {
    if (val) {
      let htmlContent = val[key].html;

      // Replace empty paragraphs with line breaks for proper spacing
      htmlContent = htmlContent.replace(/<p><\/p>/g, '<br/>');
      htmlContent = htmlContent.replace(/<p>\s*<\/p>/g, '<br/>');

      // Preserve leading/trailing spaces in paragraphs by converting to &nbsp;
      htmlContent = htmlContent.replace(/<p>(\s+)/g, (match, spaces) => {
        return '<p>' + spaces.replace(/ /g, '&nbsp;');
      });
      htmlContent = htmlContent.replace(/(\s+)<\/p>/g, (match, spaces) => {
        return spaces.replace(/ /g, '&nbsp;') + '</p>';
      });

      blog.value = {
        ...val[key],
        html: htmlContent
      };
      isDataLoaded.value = true;

      // Apply syntax highlighting after DOM update
      nextTick(() => {
        document.querySelectorAll('.blog-content pre code').forEach((block) => {
          hljs.highlightElement(block);
        });
      });
    }
  });
};

onMounted(() => {
  key.value = router.currentRoute.value.params.id;
  getBlog();
});
watch(() => router.currentRoute.value.params.id, getBlog);
</script>

<style>
@import 'highlight.js/styles/atom-one-dark.css';

.blog-content ul {
  list-style-type: disc !important;
  padding-left: 40px !important;
  margin: 1em 0 !important;
}

.blog-content ul li {
  display: list-item !important;
  list-style-type: disc !important;
  margin-bottom: 0.5em !important;
}

.blog-content ul li p {
  display: inline !important;
  margin: 0 !important;
}

.blog-content ol {
  list-style-type: decimal !important;
  padding-left: 40px !important;
  margin: 1em 0 !important;
}

.blog-content ol li {
  display: list-item !important;
  list-style-type: decimal !important;
  margin-bottom: 0.5em !important;
}

.blog-content ol li p {
  display: inline !important;
  margin: 0 !important;
}
</style>

<style scoped>
:deep(.htmlImage img) {
  width: 100% !important;
  height: 100%;
  object-fit: cover;
  margin: 10px 0;
}

.blog-content {
  line-height: 1.8;
  font-size: 1.05rem;
  opacity: 0.9;
  word-wrap: break-word;
  overflow-x: hidden;

  :deep(h1) {
    font-size: 2em;
    font-weight: bold;
    margin-top: 1.2em;
    margin-bottom: 0.6em;
    line-height: 1.3;
  }

  :deep(h2) {
    font-size: 1.5em;
    font-weight: bold;
    margin-top: 1em;
    margin-bottom: 0.5em;
    line-height: 1.3;
  }

  :deep(h3) {
    font-size: 1.17em;
    font-weight: bold;
    margin-top: 0.8em;
    margin-bottom: 0.4em;
    line-height: 1.3;
  }

  :deep(p) {
    margin: 0.5em 0;
    white-space: pre-wrap;
    line-height: 1.8;
  }

  :deep(br) {
    display: block;
    margin: 0.5em 0;
    line-height: 1.8;
  }

  :deep(code) {
    background-color: rgba(255, 255, 255, 0.1);
    color: #ffa7c4;
    padding: 2px 6px;
    border-radius: 3px;
    font-family: 'Courier New', Courier, monospace;
    font-size: 0.9em;
  }

  :deep(pre) {
    background-color: #282c34 !important;
    padding: 16px !important;
    border-radius: 6px !important;
    overflow-x: auto;
    margin: 1.5em 0 !important;

    code {
      background-color: transparent !important;
      padding: 0 !important;
      border-radius: 0 !important;
      font-size: 0.95em;
      font-family: 'Courier New', Courier, monospace;
      display: block;
      line-height: 1.5;
    }
  }

  :deep(ul) {
    list-style-type: disc !important;
    margin-left: 0 !important;
    padding-left: 40px !important;
    margin-top: 1em !important;
    margin-bottom: 1em !important;
  }

  :deep(ul li) {
    display: list-item !important;
    list-style-type: disc !important;
    margin-left: 0 !important;
    padding-left: 0 !important;
    margin-bottom: 0.5em !important;
  }

  :deep(ul li p) {
    display: inline !important;
    margin: 0 !important;
    padding: 0 !important;
  }

  :deep(ol) {
    list-style-type: decimal !important;
    margin-left: 0 !important;
    padding-left: 40px !important;
    margin-top: 1em !important;
    margin-bottom: 1em !important;
  }

  :deep(ol li) {
    display: list-item !important;
    list-style-type: decimal !important;
    margin-left: 0 !important;
    padding-left: 0 !important;
    margin-bottom: 0.5em !important;
  }

  :deep(ol li p) {
    display: inline !important;
    margin: 0 !important;
    padding: 0 !important;
  }

  :deep(a) {
    color: rgb(var(--v-theme-info));
    text-decoration: underline;
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
  }

  :deep(blockquote) {
    border-left: 4px solid rgba(255, 255, 255, 0.3);
    padding-left: 1em;
    margin: 1em 0;
    font-style: italic;
    opacity: 0.9;
  }

  :deep(hr) {
    border: none;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    margin: 2em 0;
  }

  :deep(strong) {
    font-weight: bold;
  }

  :deep(em) {
    font-style: italic;
  }

  :deep(u) {
    text-decoration: underline;
  }
}
</style>