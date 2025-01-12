document.addEventListener('DOMContentLoaded', function() {
    // Function to load lyrics content
    function loadLyrics(artist, type, albumOrSingle, title) {
        const lyricsContent = document.getElementById('lyrics-content');
        let filePath;

        if (type === 'albums') {
            filePath = `lyrics/artists/${artist}/albums/${albumOrSingle}/${title}.txt`;
        } else if (type === 'singles') {
            filePath = `lyrics/artists/${artist}/singles/${title}.txt`;
        }

        fetch(filePath)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
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

    // Example usage: Load lyrics for a specific song
    // Replace 'artistName', 'albums' or 'singles', 'albumName' (if applicable), and 'songTitle' with actual values
    loadLyrics('Hustinder', 'singles', '', 'Sara Pind Mittran Da'); // For album song
    // loadLyrics('arjan', 'singles', '', 'greatest'); // For single song
});





