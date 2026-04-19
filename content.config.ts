import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    blogs: defineCollection({
      type: 'page',
      source: 'blogs/*.md',
      schema: z.object({
        title: z.string(),
        date: z.string().optional(),
        publishedAt: z.string().optional(),
        author: z.string().optional(),
        image: z.string().optional(),
        description: z.string().optional(),
        readingTime: z.number().optional(),
        slug: z.string().optional(),
      }),
    }),
  },
})
