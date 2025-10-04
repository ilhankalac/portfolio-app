/**
 * FILM DATA MERGER SCRIPT - STEP BY STEP GUIDE
 * 
 * This script extracts film data from a Letterboxd API response and merges it with existing Firebase data.
 * 
 * STEP-BY-STEP INSTRUCTIONS:
 * 
 * 1. PREPARE NEW FILMS DATA:
 *    - Make a request in Postman to get new films data from Letterboxd API
 *    - Copy the response JSON from Postman
 *    - Paste it into the 'new-films.json' file in the project root
 *    - Make sure the JSON structure contains a 'ratings' array with film objects
 * 
 * 2. PREPARE FIREBASE EXPORT:
 *    - Export your latest Firebase Realtime Database data
 *    - Download the export file (usually named something like 'portfolio-app-xxx-export.json')
 *    - Place the exported file in a known location (e.g., Downloads folder)
 * 
 * 3. UPDATE FILE REFERENCES:
 *    - In this script, update the 'existingFilmsPath' variable below to point to your Firebase export file
 *    - Make sure the path is correct and the file exists
 * 
 * 4. RUN THE SCRIPT:
 *    - Execute this script using: npm run merge-films
 *    - Or directly: node scripts/merge-film-data.js
 *    - The script will:
 *      a) Read existing films from your Firebase export
 *      b) Read new films from new-films.json
 *      c) Compare and identify duplicates (by title and year)
 *      d) Add only new films to avoid duplicates
 *      e) Save the updated data back to the Firebase export file
 * 
 * 5. RESULTS:
 *    - The script will show a summary of added and skipped films
 *    - Your Firebase export file will be updated with the new films
 *    - You can then import this updated file back to Firebase if needed
 * 
 * NOTE: Make sure to backup your Firebase export before running this script!
 */

const fs = require('fs');
const path = require('path');

// Configuration - Update these paths as needed
const CONFIG = {
  newFilmsPath: path.join(__dirname, '../new-films.json'),
  existingFilmsPath: '/Users/vizija/Downloads/portfolio-app-2b6e1-default-rtdb-export copy.json',
  outputPath: null // Will use existingFilmsPath if null
};

/**
 * Validates if required files exist
 */
function validateFiles() {
  if (!fs.existsSync(CONFIG.newFilmsPath)) {
    console.error(`❌ New films file not found: ${CONFIG.newFilmsPath}`);
    process.exit(1);
  }
  
  if (!fs.existsSync(CONFIG.existingFilmsPath)) {
    console.error(`❌ Existing films file not found: ${CONFIG.existingFilmsPath}`);
    process.exit(1);
  }
}

/**
 * Loads existing films data from Firebase export
 */
function loadExistingFilms() {
  try {
    const existingData = JSON.parse(fs.readFileSync(CONFIG.existingFilmsPath, 'utf8'));
    
    // Ensure listOfSeenfilms exists as an array
    if (!existingData.listOfSeenfilms || !Array.isArray(existingData.listOfSeenfilms)) {
      existingData.listOfSeenfilms = [];
    }
    
    console.log(`📂 Loaded existing JSON with ${existingData.listOfSeenfilms.length} films`);
    return existingData;
  } catch (error) {
    console.error(`❌ Error loading existing films: ${error.message}`);
    process.exit(1);
  }
}

/**
 * Loads new films data from Letterboxd API response
 */
function loadNewFilms() {
  try {
    const newFilmsData = JSON.parse(fs.readFileSync(CONFIG.newFilmsPath, 'utf8'));
    
    if (!newFilmsData.ratings || !Array.isArray(newFilmsData.ratings)) {
      console.error(`❌ Invalid new films data structure. Expected 'ratings' array.`);
      process.exit(1);
    }
    
    console.log(`🎬 Processing ${newFilmsData.ratings.length} ratings from new-films.json`);
    return newFilmsData;
  } catch (error) {
    console.error(`❌ Error loading new films: ${error.message}`);
    process.exit(1);
  }
}

/**
 * Converts Letterboxd film format to Firebase format
 */
function convertFilmFormat(rating) {
  const film = rating.film;
  
  // Convert directors array from objects to strings
  const directors = film.directors ? film.directors.map(director => director.name || director) : [];
  
  // Use still_url from stills.retina or fallback to still_url
  const stillUrl = film.stills?.retina || film.still_url || '';
  
  return {
    still_url: stillUrl,
    overall: rating.overall || 0,
    duration: film.duration || 0,
    title: film.title || '',
    directors: directors,
    historic_countries: film.historic_countries || [],
    year: film.year || 0,
    short_synopsis: film.short_synopsis || '',
    created_at: rating.created_at || rating.updated_at || ''
  };
}

/**
 * Checks if a film already exists in the collection
 */
function filmExists(existingFilms, newFilm) {
  return existingFilms.find(existingFilm => 
    existingFilm.title === newFilm.title && existingFilm.year === newFilm.year
  );
}

/**
 * Main function to merge film data
 */
function mergeFilmData() {
  console.log('🎬 Starting film data merger...\n');
  
  // Validate files
  validateFiles();
  
  // Load data
  const existingData = loadExistingFilms();
  const newFilmsData = loadNewFilms();
  
  let addedFilmsCount = 0;
  let skippedFilmsCount = 0;
  
  // Process each new film
  newFilmsData.ratings.forEach((rating, index) => {
    if (rating.film && rating.film.title) {
      const film = rating.film;
      
      console.log(`\n${index + 1}. Checking film: ${film.title} (${film.year})`);
      
      // Check if film already exists
      const existingFilm = filmExists(existingData.listOfSeenfilms, film);
      
      if (existingFilm) {
        console.log(`⚠️  Film already exists: ${film.title} (${film.year})`);
        skippedFilmsCount++;
        return;
      }
      
      // Convert and add new film
      const convertedFilm = convertFilmFormat(rating);
      existingData.listOfSeenfilms.push(convertedFilm);
      addedFilmsCount++;
      console.log(`✅ Added new film: ${film.title} (${film.year})`);
    }
  });
  
  // Save updated data
  if (addedFilmsCount > 0) {
    const outputPath = CONFIG.outputPath || CONFIG.existingFilmsPath;
    fs.writeFileSync(outputPath, JSON.stringify(existingData, null, 2), 'utf8');
    console.log(`📂 Output saved to: ${outputPath}`);
    console.log(`📊 New file size: ${(fs.statSync(outputPath).size / 1024 / 1024).toFixed(2)} MB`);
  } else {
    console.log(`📝 No need to save - no new films added`);
  }
  
  // Display results
  const totalFilms = existingData.listOfSeenfilms.length;
  const processedFilmsCount = newFilmsData.ratings.length;
  
  console.log(`\n📊 RESULTS:`);
  console.log(`✅ Successfully added: ${addedFilmsCount} new films`);
  console.log(`⚠️  Skipped (already exists): ${skippedFilmsCount} films`);
  console.log(`🔄 Total processed: ${processedFilmsCount} films`);
  console.log(`🎬 Total films in main JSON file: ${totalFilms}`);
}

// Run the script
if (require.main === module) {
  mergeFilmData();
}

module.exports = { mergeFilmData };