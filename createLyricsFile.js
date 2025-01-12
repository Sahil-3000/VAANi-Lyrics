
const fs = require('fs');
const path = require('path');

// Import the playlist from dataBase.js
const { dataBase } = require('./js files/dataBase.js');

// Define the base path to the lyrics folder
const lyricsFolder = path.join(__dirname, 'lyrics/artists');
// Define the base path to the covers folder
const coversFolder = path.join(__dirname, 'covers/artists');

// Create the lyrics folder if it doesn't exist
if (!fs.existsSync(lyricsFolder)) {
    fs.mkdirSync(lyricsFolder, { recursive: true });
    console.log(`Created lyrics folder: ${lyricsFolder}`);
}
// Create the covers folder if it doesn't exist
if (!fs.existsSync(coversFolder)) {
    fs.mkdirSync(coversFolder, { recursive: true });
    console.log(`Created covers folder: ${coversFolder}`);
}

// Create a text file for each song in the playlist
dataBase.forEach(song => {
    const artistFolderLyrics = path.join(lyricsFolder, song.artist.trim());
    const albumOrSingleFolderLyrics = path.join(artistFolderLyrics, song.album ? `albums/${song.album.trim()}` : 'singles');

    const artistFolderCovers = path.join(coversFolder, song.artist.trim());
    const albumOrSingleFolderCovers = path.join(artistFolderCovers, song.album ? `albums/${song.album.trim()}` : 'singles');
    
    // Create the artist and album/single folders if they don't exist in lyrics
    if (!fs.existsSync(artistFolderLyrics)) {
        fs.mkdirSync(artistFolderLyrics, { recursive: true });
        
    }
    if (!fs.existsSync(albumOrSingleFolderLyrics)) {
        fs.mkdirSync(albumOrSingleFolderLyrics, { recursive: true });
        
    }

    // Create the artist and album/single folders if they don't exist in covers
    if (!fs.existsSync(artistFolderCovers)) {
        fs.mkdirSync(artistFolderCovers, { recursive: true });
        
    }
    if (!fs.existsSync(albumOrSingleFolderCovers)) {
        fs.mkdirSync(albumOrSingleFolderCovers, { recursive: true });
        
    }

    const filePath = path.join(albumOrSingleFolderLyrics, `${song.lyrics.trim()}.txt`);
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, song.lyrics);
        console.log(`Created ${filePath}`);
    } else {
        console.log(`${filePath} already exists, skipping...`);
    }
});