const SITE_URL = 'https://ilhan.io'

const escapeXml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')

export default defineEventHandler(async (event) => {
  const posts = await queryCollection(event, 'blogs')
    .select('title', 'description', 'publishedAt', 'path', 'lang', 'author')
    .order('publishedAt', 'DESC')
    .all()

  // Keep primary-language posts only, matching the blog listing.
  const items = posts
    .filter(post => post.lang !== 'en')
    .map((post) => {
      const url = `${SITE_URL}${post.path}`
      const pubDate = post.publishedAt ? new Date(post.publishedAt).toUTCString() : ''
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      ${post.description ? `<description>${escapeXml(post.description)}</description>` : ''}
      ${pubDate ? `<pubDate>${pubDate}</pubDate>` : ''}
    </item>`
    })
    .join('\n')

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Ilhan Kalač — Blog</title>
    <link>${SITE_URL}/blogs</link>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <description>Collection of thoughts and knowledge shared by Ilhan Kalač — Software Engineer.</description>
    <language>en</language>
${items}
  </channel>
</rss>`

  setHeader(event, 'content-type', 'application/rss+xml; charset=utf-8')
  return rss
})
