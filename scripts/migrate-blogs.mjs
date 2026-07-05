#!/usr/bin/env node
import { config as loadEnv } from 'dotenv'
import { initializeApp } from 'firebase/app'
import { getDatabase, ref, get } from 'firebase/database'
import TurndownService from 'turndown'
import { mkdir, writeFile } from 'node:fs/promises'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

loadEnv()

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const BACKUP_PATH = resolve(ROOT, 'scripts/blog-backup.json')
const CONTENT_DIR = resolve(ROOT, 'content/blogs')

const firebaseConfig = {
  apiKey: process.env.NUXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NUXT_PUBLIC_FIREBASE_PROJECT_ID,
  databaseURL: process.env.NUXT_PUBLIC_FIREBASE_DATABASE_URL,
}

if (!firebaseConfig.databaseURL) {
  console.error('Missing NUXT_PUBLIC_FIREBASE_DATABASE_URL in .env')
  process.exit(1)
}

const app = initializeApp(firebaseConfig)
const db = getDatabase(app)

const turndown = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  bulletListMarker: '-',
  emDelimiter: '_',
})

turndown.addRule('preserveImageCaption', {
  filter: (node) => node.nodeName === 'P' && node.classList?.contains('image-caption'),
  replacement: (content) => `\n\n*${content.trim()}*\n\n`,
})

turndown.addRule('codeBlockWithLang', {
  filter: (node) => {
    return node.nodeName === 'PRE' && node.firstChild && node.firstChild.nodeName === 'CODE'
  },
  replacement: (_content, node) => {
    const codeNode = node.firstChild
    const className = codeNode.getAttribute('class') || ''
    const langMatch = className.match(/language-(\w+)/)
    const lang = langMatch ? langMatch[1] : ''
    const text = codeNode.textContent || ''
    return `\n\n\`\`\`${lang}\n${text.replace(/\n$/, '')}\n\`\`\`\n\n`
  },
})

const escapeYaml = (value) => {
  if (value == null) return ''
  const str = String(value).replace(/"/g, '\\"')
  return `"${str}"`
}

const toIsoDate = (rawDate) => {
  if (!rawDate) return ''
  const s = String(rawDate).trim()
  const mdY = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/)
  if (mdY) {
    const [, m, d, y] = mdY
    return `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`
  }
  const parsed = new Date(s)
  if (!Number.isNaN(parsed.getTime())) {
    return parsed.toISOString().slice(0, 10)
  }
  return s
}

const buildDescription = (markdown) => {
  const text = markdown
    .replace(/```[\s\S]*?```/g, '')
    .replace(/!\[[^\]]*\]\([^)]+\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[#_*`>~-]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
  if (!text) return ''
  return text.length > 160 ? text.slice(0, 157) + '...' : text
}

const buildReadingTime = (markdown) => {
  const text = markdown.replace(/```[\s\S]*?```/g, '').replace(/[#_*`>~-]/g, '').trim()
  if (!text) return 0
  const words = text.split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}

const buildFrontmatter = (post, slug, markdown) => {
  const lines = ['---']
  lines.push(`title: ${escapeYaml(post.title || slug)}`)
  if (post.date) lines.push(`date: ${escapeYaml(post.date)}`)
  const iso = toIsoDate(post.created_at || post.date)
  if (iso) lines.push(`publishedAt: ${escapeYaml(iso)}`)
  if (post.author) lines.push(`author: ${escapeYaml(post.author)}`)
  if (post.image) lines.push(`image: ${escapeYaml(post.image)}`)
  const desc = buildDescription(markdown)
  if (desc) lines.push(`description: ${escapeYaml(desc)}`)
  const rt = buildReadingTime(markdown)
  if (rt) lines.push(`readingTime: ${rt}`)
  lines.push(`slug: ${escapeYaml(slug)}`)
  lines.push('---', '')
  return lines.join('\n')
}

const main = async () => {
  console.log('Fetching blog posts from Firebase...')
  const snapshot = await get(ref(db, 'blog/posts'))
  const val = snapshot.val()

  if (!val) {
    console.log('No blog posts found. Nothing to migrate.')
    process.exit(0)
  }

  console.log(`Found ${Object.keys(val).length} post(s). Writing backup...`)
  await writeFile(BACKUP_PATH, JSON.stringify(val, null, 2), 'utf8')
  console.log(`  backup -> ${BACKUP_PATH}`)

  await mkdir(CONTENT_DIR, { recursive: true })

  let count = 0
  for (const [key, post] of Object.entries(val)) {
    const slug = post.slug || key
    const html = post.html || post.content || ''
    const markdown = html ? turndown.turndown(html) : ''
    const frontmatter = buildFrontmatter(post, slug, markdown)
    const fileContents = `${frontmatter}${markdown}\n`
    const filePath = resolve(CONTENT_DIR, `${slug}.md`)
    await writeFile(filePath, fileContents, 'utf8')
    console.log(`  wrote -> content/blogs/${slug}.md`)
    count++
  }

  console.log(`\nDone. Migrated ${count} post(s).`)
  process.exit(0)
}

main().catch((err) => {
  console.error('Migration failed:', err)
  process.exit(1)
})
