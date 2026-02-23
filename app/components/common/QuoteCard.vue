<template>
  <blockquote
    class="otro-blockquote mb-8 mt-4"
    :class="origin === 'quote-dialog' ? 'py-10 pr-10 md:p-[1.2em_30px_1.2em_75px]' : ''"
    style="padding: 1.2em 30px 1.2em 75px;"
  >
    <div style="font-style: italic" class="text-justify pr-7" v-html="selectedQuote?.text" />
    <div class="flex items-center justify-between p-0 mt-5 font-normal">
      <span>
        ― &nbsp;{{ selectedQuote?.author ? selectedQuote.author : 'Unknown author' }}
      </span>
      <button class="ml-2 opacity-60 hover:opacity-100 transition-opacity" @click="createLink(selectedQuote)">
        <UIcon name="i-mdi-content-copy" class="text-sm" />
      </button>
    </div>
  </blockquote>
</template>

<script lang="ts" setup>
import type { IQuote } from '~/types/models'

const toast = useToast()

const props = defineProps<{
  origin?: string
  selectedQuote?: IQuote
}>()

const createLink = (quote: IQuote = { key: '', author: '', text: '' }) => {
  const link = window.location.origin + '/favorite-quotes/' + quote.key
  navigator.clipboard.writeText(link)
    .then(() => {
      toast.add({ title: 'Link for sharing the quote has been copied to clipboard.', icon: 'i-mdi-information-outline' })
    })
    .catch((error) => {
      console.error('Failed to copy link to clipboard:', error)
    })
}
</script>

<style scoped>
.otro-blockquote span {
  display: block;
  font-style: italic;
  font-weight: bold;
  margin-top: 1em;
}

.otro-blockquote::before {
  font-family: Arial;
  content: "\201C";
  font-size: 4em;
  position: absolute;
  left: 10px;
  top: -10px;
}

.otro-blockquote {
  color: black;
  border-left: 4px solid rgb(var(--color-grey-text));
  line-height: 1.6;
  position: relative;
  background: white;
}
</style>
