import { readFileSync, writeFileSync } from 'fs'

const jsonPath = process.argv[2] || '/Users/vizija/Downloads/portfolio-app-2b6e1-default-rtdb-export (1).json'
const outputPath = process.argv[3] || '/Users/vizija/Downloads/letterboxd-import.csv'

const data = JSON.parse(readFileSync(jsonPath, 'utf-8'))
const films = data.listOfSeenfilms

if (!films || !films.length) {
  console.error('No films found in listOfSeenfilms')
  process.exit(1)
}

function escapeCsv(value) {
  if (value == null) return ''
  const str = String(value)
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '\\"')}"`
  }
  return str
}

const header = 'Title,Year,Rating,WatchedDate,Directors'
const rows = films.map(film => {
  const title = escapeCsv(film.title)
  const year = film.year || ''
  const rating = film.overall || ''
  const watchedDate = film.created_at ? film.created_at.split('T')[0] : ''
  const directors = film.directors ? escapeCsv(film.directors.join(', ')) : ''
  return `${title},${year},${rating},${watchedDate},${directors}`
})

const csv = [header, ...rows].join('\n')
writeFileSync(outputPath, csv, 'utf-8')

console.log(`Generated ${outputPath}`)
console.log(`Total films: ${rows.length}`)
