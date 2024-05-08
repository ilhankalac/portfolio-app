<template>
  <div class="px-2">
    <div class="font-weight-light text-white" :class="smAndDown ? 'text-h6' : 'text-h5'">
      The list of my favorite quotes
    </div>
    <div class="font-weight-light text-white" style="opacity: 0.6">
      I maintain a collection of my favorite quotes, arranged by the emotional impact they evoke upon reflection. 
    </div>
    <v-autocomplete 
      v-model="search"
      :items="authors"
      label="Search by reference, author or keyword"
      variant="outlined"
      hide-details
      color="white"
      bg-color="primary"
      class="mt-4"
      block
      clearable
      @input="handleSearchInput"
      @keydown.enter="handleEnter"
      @update:modelValue="searchQuotes(search)"
    >
      <template #no-data>
        <div class="pl-2">
          No authors found. Please try another search criteria.
        </div>
      </template>
    </v-autocomplete>
    <v-container fluid>
      <v-row v-if="!isDataLoaded">
        <v-col class="d-flex flex-column ga-3">
          <v-skeleton-loader
            v-for="index in 5"
            color="primary"
            type="article"
          />
        </v-col>
      </v-row>
    </v-container>
    <div class="font-weight-light text-white mb-2" style="opacity: 0.6">Currently there are <strong> {{ quotes.length }}</strong> quotes in the collection.</div>
    <div style="max-height: 80vh; overflow-y: auto;" class="pr-2">
      <div
        v-for="(quote, key) in quotes"
        :key="quote.id"
        class="text-justify font-weight-light text-white"
        :style="origin === 'admin-panel' ? 'cursor: pointer' : ''"
        @click="origin === 'admin-panel' ? emitEditQuote(quote) : null"
      >
        <blockquote
          class="otro-blockquote font-weight-light mb-8 mt-4"
          :style="
            smAndDown ? 'padding-left: 3em' : 'padding:1.2em 30px 1.2em 75px;'
          "
        >
          <div  style="font-style: italic" v-html="quote.text"></div>
          <div class="d-flex justify-space-between align-center">
            <div class="pa-0 mt-5 d-flex align-center">
              <!-- <v-avatar size="30" color="white">
                <v-img :src="quote.imageSrc" alt="avatar" />
              </v-avatar> -->
              <div class="d-flex flex-column">
                <div class="font-weight-regular"> ― &nbsp;{{ quote.author ? quote.author : 'Uknown author' }}</div>
              </div>
            </div>
          </div>
        </blockquote>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useDisplay } from "vuetify";
import { onMounted, Ref, ref, watch } from "vue";
const { smAndDown } = useDisplay();
import { getVal, getValLive } from "@/services/DataService";

const quotes: Ref<any> = ref([]);
const tempQuotes: Ref<any> = ref([]);
const isDataLoaded = ref(false);
const authors = ref([])
const search = ref(null);

const props = defineProps<{
  origin: string;
  changedQuote: any;
}>();

const emit = defineEmits(["edit-quote"]);

const getData = () => {
  const path = "blog/favorite-quotes";
  const unsubscribe = getValLive(path, (fetchedData) => {
    if (fetchedData) {
      let result: any = [];
      Object.keys(fetchedData).forEach((key, index) => {
        result.unshift({ ...fetchedData[key], key });
      });
      quotes.value = result;
      tempQuotes.value = result;
      authors.value = extractAuthors();
      isDataLoaded.value = true;
    } else {
      console.error("Error fetching data from Firebase.");
    }
  });
  return unsubscribe;
};

const emitEditQuote = (quote: any) => {
  emit("edit-quote", quote);
};

const handleSearchInput = (input: any) => {
  searchQuotes(input.target.value.toLowerCase());
};

const handleEnter = (event: any) => {
  search.value = event.target.value;
  event.target.blur()
}

const searchQuotes = (searchCriteria: any) => {
  searchCriteria = searchCriteria ? searchCriteria.toLowerCase() : '';
  let result = tempQuotes.value.filter((quote: any) => {
    return (
      quote?.text?.toLowerCase().includes(searchCriteria) || quote?.author?.toLowerCase().includes(searchCriteria)
    );
  });
  quotes.value = result;
}

const extractAuthors = () => {
  let authors = quotes.value.map((quote: any) => {
    return quote.author;
  });
  authors = authors.filter((author: any) => {
    return author !== undefined;
  });
  authors = authors.filter((author: any, index: any) => {
    return authors.indexOf(author) === index;
  });
  return authors;
};

onMounted(async () => {
  await getData();
  window.scrollTo(0, 0);
});
</script>

<style lang="scss" scoped>
.otro-blockquote span{
  display:block;
  color: white;
  font-style: italic;
  font-weight: bold;
  margin-top:1em;
}


.otro-blockquote::before{
  font-family:Arial;
  content: "\201C";
  color:white;
  font-size:4em;
  position: absolute;
  left: 10px;
  top:-10px;
}

.otro-blockquote{
  color: rgb(var(--v-theme-greyText));
  border-left: 4px solid rgb(var(--v-theme-greyText));
  line-height:1.6;
  position: relative;
  background: rgb(var(--v-theme-primary));
}

::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: rgb(var(--v-theme-secondary)); 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(var(--v-theme-greyText)); 
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555; 
}

</style>
