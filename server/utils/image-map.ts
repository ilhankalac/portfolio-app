const imageMap: Record<string, string> = {
  // Company logos
  'https://itkonekt.com/media/2022/09/Comtrade_transparent.png': '/images/logos/comtrade_logo.webp',
  'https://codeus.me/img/codeus_logo.png': '/images/logos/codeus_logo.svg',
  'https://galilej.com/wp-content/uploads/2022/08/galilei-en-300x87-1-200x58.png': '/images/logos/galilei_logo.webp',

  // Project screenshots
  'https://i.ibb.co/dsTPST3/Screenshot-from-2024-03-01-21-31-07.png': '/images/projects/covid19_tracker.webp',
  'https://i.ibb.co/tZzdHZf/Screenshot-from-2024-03-02-18-59-29.png': '/images/projects/trash_points.webp',
  'https://i.ibb.co/K05P98m/Screenshot-from-2024-03-03-14-59-39.png': '/images/projects/personal_portfolio.webp',

  // Avatars
  'https://avatars.githubusercontent.com/u/41993408?v=4': '/images/avatars/andreja_bicanin.webp',
  'https://avatars.githubusercontent.com/u/74052766?v=4': '/images/avatars/omar_decevic.webp',
  'https://avatars.githubusercontent.com/u/37368378?v=4': '/images/avatars/igor_marjanovic.webp',
  'https://i.ibb.co/0sQG5PC/Capture.png': '/images/avatars/jovan_vasiljevic.webp',
  'https://i.ibb.co/RpsDQ9vB/image.png': '/images/avatars/dimitrije_gerencic.webp',
  'https://lh3.googleusercontent.com/a/ACg8ocI-SKsHoNuO1XPtAjuc8YxQ24bUt1sokIKUqFUvresBQ15dfg_q=s288-c-no': '/images/avatars/andjela.webp',
}

// LinkedIn URLs use expiring query params, so match by path prefix
const linkedinMap: [string, string][] = [
  ['D4D03AQEf5Bgo2yadFg', '/images/avatars/nikolina.webp'],
  ['D4D03AQGus7MZ6Khfhg', '/images/avatars/stefan.webp'],
]

const avatarByName: Record<string, string> = {
  'andjela': '/images/avatars/andjela.webp',
}

export function mapAvatarByName(name: string | undefined): string | undefined {
  if (!name) return undefined
  const normalized = name.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[đ]/g, 'dj').replace(/[Đ]/g, 'Dj')
  for (const [key, path] of Object.entries(avatarByName)) {
    if (normalized.includes(key)) return path
  }
  return undefined
}

export function mapImageUrl(url: string | undefined): string | undefined {
  if (!url) return url
  if (imageMap[url]) return imageMap[url]
  for (const [fragment, local] of linkedinMap) {
    if (url.includes(fragment)) return local
  }
  return url
}
