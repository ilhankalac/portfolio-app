<template>
  <div class="flex flex-col items-center bg-slate-900 p-4">
    <img
      src="~/assets/images/profile_photo.jpg"
      alt="Avatar"
      class="w-32 h-32 md:w-48 md:h-48 rounded-full object-cover my-4"
    />
    <div class="flex flex-col gap-2 text-gray-400">
      <a href="https://www.google.com/maps/place/Podgorica" target="_blank" class="flex items-center gap-3 text-sm hover:text-white transition-colors">
        <UIcon name="i-mdi-map-marker" /> Montenegro, Podgorica
      </a>
      <a href="mailto:ilhandeveloper@gmail.com" class="flex items-center gap-3 text-sm hover:text-white transition-colors">
        <UIcon name="i-mdi-email" /> ilhandeveloper@gmail.com
      </a>
      <a href="tel:+38268186196" class="flex items-center gap-3 text-sm hover:text-white transition-colors">
        <UIcon name="i-mdi-phone" /> +382 68 186 196
      </a>
      <a href="https://github.com/ilhankalac" target="_blank" class="flex items-center gap-3 text-sm hover:text-white transition-colors">
        <UIcon name="i-mdi-github" /> @ilhankalac
      </a>
      <a href="https://www.linkedin.com/in/ilhankalac/" target="_blank" class="flex items-center gap-3 text-sm hover:text-white transition-colors">
        <UIcon name="i-mdi-linkedin" /> @ilhankalac
      </a>
      <a href="https://www.instagram.com/vizija/" target="_blank" class="flex items-center gap-3 text-sm hover:text-white transition-colors">
        <UIcon name="i-mdi-instagram" /> @vizija
      </a>
      <div class="flex items-center gap-3 text-sm hover:text-white cursor-pointer transition-colors" @click="navigateTo('/blogs')">
        <UIcon name="i-mdi-post" /> Blogs
      </div>
      <div class="flex items-center gap-3 text-sm hover:text-white cursor-pointer transition-colors" @click="navigateTo('/favorite-quotes')">
        <UIcon name="i-mdi-format-quote-close" /> Favorite quotes
      </div>
      <div class="flex items-center gap-3 text-sm hover:text-white cursor-pointer transition-colors" @click="navigateTo('/list-of-seen-films')">
        <UIcon name="i-mdi-filmstrip" /> List of seen films
      </div>
    </div>
  </div>
</template>
