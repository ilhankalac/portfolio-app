<template>
  <!--
    UApp is Nuxt UI's root provider: it mounts the toaster (so useToast() renders)
    and the overlay/tooltip providers.

    scroll-body="false" stops Reka UI from padding <body> to compensate for the
    scrollbar it hides while a modal is open. Our :root already reserves the gutter
    with `scrollbar-gutter: stable`, so that compensation only shifts the page
    sideways for as long as the modal is open.
  -->
  <UApp :scroll-body="false">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
