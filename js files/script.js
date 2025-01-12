document.addEventListener('DOMContentLoaded', function() {
    // Function to load lyrics content
    function loadLyrics(artist, albumOrSingle, title) {
        const lyricsContent = document.getElementById('lyrics-content');
        let filePath;

        if (albumOrSingle) {
            filePath = `./lyrics/artists/${artist}/albums/${albumOrSingle}/${title}.txt`;
        } else {
            filePath = `./lyrics/artists/${artist}/singles/${title}.txt`;
        }

        console.log(`Loading lyrics from: ${filePath}`); // Debugging line

        fetch(filePath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                return response.text();
            })
            .then(data => {
                lyricsContent.innerHTML = `<pre>${data}</pre>`;
            })
            .catch(error => {
                lyricsContent.innerHTML = `<p>Error loading lyrics: ${error.message}</p>`;
            });
    }

    document.getElementById('search-button').addEventListener('click', function() {
        const searchString = document.getElementById('search-input').value.toLowerCase();

        if (searchString) {
            const results = dataBase.filter(song =>
                (song.title?.toLowerCase() || "").includes(searchString) ||
                (song.artist?.toLowerCase() || "").includes(searchString) ||
                (song.album?.toLowerCase() || "").includes(searchString) ||
                (song.lyrics?.toLowerCase() || "").includes(searchString) ||
                (song.searchString?.toLowerCase() || "").includes(searchString)
            );
            displayResults(results);
        }
    });

    function displayResults(results) {
        const lyricsContent = document.getElementById('lyrics-content');
        lyricsContent.innerHTML = '';
        if (results.length === 0) {
            lyricsContent.innerHTML = '<p>No results found.</p>';
        } else {
            for (const song of results) {
                const songElement = document.createElement('div');
                songElement.classList.add('song');
                songElement.innerHTML = `
                    <h3>${song.title}</h3>
                    <p><strong>Artist:</strong> ${song.artist}</p>
                    <p><strong>Album:</strong> ${song.album}</p>
                    <button class="load-lyrics-button" data-artist="${song.artist}" data-albumOrSingle="${song.album}" data-title="${song.title}">Load Lyrics</button>
                `;
                lyricsContent.appendChild(songElement);
            }

            document.querySelectorAll('.load-lyrics-button').forEach(button => {
                button.addEventListener('click', function() {
                    const artist = this.getAttribute('data-artist');
                    const albumOrSingle = this.getAttribute('data-albumOrSingle');
                    const title = this.getAttribute('data-title');
                   
                    loadLyrics(artist, albumOrSingle, title);
                });
            });
        }
    }
});





