/**
 * Single source of truth for the "Now" content.
 *
 * Both the /now page and the NOW strip in the hero read from here, so the two
 * can never drift apart. The hero uses the `short` variants; the page renders
 * the full text.
 */

export type WorkStatus = 'shipping' | 'shipped' | 'wip' | 'paused'

export interface WorkItem {
  title: string
  description: string
  status: WorkStatus
  /** Condensed line for the hero strip — the full description is too long there. */
  short?: string
}

export interface Book {
  title: string
  author: string
}

export interface Goal {
  label: string
  progress: number
}

export const lastUpdated = 'August 2026'
export const location = 'Podgorica, Montenegro'

export const workingOn: WorkItem[] = [
  {
    title: 'ViaLuxury — Luxury travel platform',
    description: 'My full-time day job (remote) — where most of my time goes. Building the customer-facing frontend in Nuxt 4 & Vue 3: booking flow, holiday-package offers, payments, accounts, and a fully multilingual (i18n) experience.',
    short: 'Building ViaLuxury and shipping frontend systems at scale.',
    status: 'shipping',
  },
  {
    title: 'Infinitydrive.lu — Premium car dealership',
    description: 'Built the web platform for a Luxembourg-based premium used-car dealership — vehicle catalogue, financing requests, and a French-localized customer experience.',
    status: 'shipped',
  },
  {
    title: 'Personal portfolio — ilhan.io',
    description: 'Maintaining and improving this site — adding new features, writing blog posts, and keeping the content fresh.',
    status: 'wip',
  },
]

export const learning: string[] = [
  'Fullstackopen.com — comprehensive modern web development course',
  'Core Web Vitals concepts and optimization techniques',
  'ASP.NET Core',
]

export const reading: Book[] = [
  { title: 'Jadnici II', author: 'Viktor Igo' },
]

export const goals: Goal[] = [
  { label: 'Read 2 books', progress: 50 },
  { label: 'Finish 5th Fullstack Open module', progress: 50 },
]

/**
 * The one field the hero asks for that no other part of the site tracks.
 * Keep it to a phrase or two — it is rendered inside a narrow column.
 */
export const thinkingAbout = 'Philosophy, human nature, and better abstractions in frontend architecture.'

/** The item the hero strip highlights under "Working". */
export const currentWork = workingOn.find(item => item.status === 'shipping') ?? workingOn[0]!
