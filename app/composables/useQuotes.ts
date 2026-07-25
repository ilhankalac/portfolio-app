import type { IQuote } from '~/types/models'

/** Monogram tints — kept in the same cool range as the rest of the site. */
export const QUOTE_TONES = ['indigo', 'violet', 'sky', 'teal', 'amber', 'rose'] as const
export type QuoteTone = typeof QUOTE_TONES[number]

const NAMED_ENTITIES: Record<string, string> = {
  nbsp: ' ',
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: '\'',
  hellip: '…',
  mdash: '—',
  ndash: '–',
  laquo: '«',
  raquo: '»',
  ldquo: '“',
  rdquo: '”',
  bdquo: '„',
  lsquo: '‘',
  rsquo: '’',
}

export function useQuotes() {
  const toast = useToast()

  /** Quotes are stored as rich text; the grid renders plain text so cards stay uniform. */
  const stripHtml = (html = ''): string => {
    return html
      .replace(/<br\s*\/?>/gi, ' ')
      .replace(/<\/(p|div|li|h[1-6]|blockquote)>/gi, ' ')
      .replace(/<[^>]*>/g, '')
      .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
      .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
      .replace(/&([a-z]+);/gi, (match, name) => NAMED_ENTITIES[name.toLowerCase()] ?? match)
      .replace(/\s+/g, ' ')
      .trim()
  }

  /** Sources like "Rashomon (1950)" or "Betty Blue (1986) - film" are screen quotes, not thinkers. */
  const isScreenSource = (author?: string): boolean => {
    if (!author) return false
    return /\(\d{4}\)/.test(author) || /\bfilm\b/i.test(author)
  }

  const authorName = (author?: string): string => {
    const clean = (author ?? '').replace(/\s*-\s*film\s*$/i, '').trim()
    return clean || 'Unknown'
  }

  const authorInitials = (author?: string): string => {
    const words = authorName(author)
      .replace(/\(\d{4}\)/g, '')
      .split(/\s+/)
      .filter(word => /\p{L}/u.test(word))
    const letters = words.slice(0, 2).map(word => [...word][0] ?? '')
    return letters.join('').toUpperCase() || '?'
  }

  const authorTone = (author?: string): QuoteTone => {
    const name = authorName(author)
    let hash = 0
    for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) >>> 0
    return QUOTE_TONES[hash % QUOTE_TONES.length]!
  }

  /** Secondary attribution line: the work / source a quote comes from. */
  const quoteWork = (quote?: IQuote): string => {
    return (quote?.work || quote?.source || quote?.quote_source || '').trim()
  }

  const quoteLink = (quote?: IQuote): string => {
    const origin = import.meta.client ? window.location.origin : 'https://ilhan.io'
    return `${origin}/favorite-quotes/${quote?.key ?? ''}`
  }

  const copyQuoteText = async (quote?: IQuote) => {
    const author = quote?.author ? ` — ${authorName(quote.author)}` : ''
    await writeClipboard(`“${stripHtml(quote?.text)}”${author}`, 'Quote copied to clipboard.')
  }

  const copyQuoteLink = async (quote?: IQuote) => {
    await writeClipboard(quoteLink(quote), 'Link to this quote copied to clipboard.')
  }

  const writeClipboard = async (value: string, message: string) => {
    try {
      await navigator.clipboard.writeText(value)
      toast.add({ title: message, icon: 'i-mdi-check-circle-outline' })
    } catch (error) {
      console.error('Failed to copy to clipboard:', error)
      toast.add({ title: 'Could not copy — your browser blocked clipboard access.', icon: 'i-mdi-alert-circle-outline', color: 'error' })
    }
  }

  return {
    stripHtml,
    isScreenSource,
    authorName,
    authorInitials,
    authorTone,
    quoteWork,
    quoteLink,
    copyQuoteText,
    copyQuoteLink,
  }
}
