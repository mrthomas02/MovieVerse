const params = new URLSearchParams(window.location.search);
const movieId = params.get('movieId');

if (movieId) {
    loadMovieDetails(movieId);
}

function loadMovieDetails(id) {
    const apiKey = 'a21b75befa31a30c49917733dc60eea9';
    const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`;
    const movieVideosUrl = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}`;

    // Fetch movie details
    fetch(movieDetailsUrl)
        .then(response => response.json())
        .then(movie => {
            displayMovieDetails(movie);
        })
        .catch(error => console.error('Error fetching movie details:', error));

    // Fetch movie trailers (videos)
    fetch(movieVideosUrl)
        .then(response => response.json())
        .then(data => {
            const trailers = data.results.filter(video => video.type === 'Trailer' && video.site === 'YouTube');
            if (trailers.length > 0) {
                displayMovieTrailer(trailers[0]); // Display the first available trailer
            }
        })
        .catch(error => console.error('Error fetching movie trailers:', error));
}

function displayMovieDetails(movie) {
    const movieDetailsSection = document.getElementById('movieDetails');

    movieDetailsSection.innerHTML = `
        <h1>${movie.title}</h1>
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
        <div class="movie-detail">
            <span class="detail-label"><strong>Overview:</strong></span>
            <span class="detail-content">${movie.overview}</span>
        </div>
        <div class="movie-detail">
            <span class="detail-label"><strong>Release Date:</strong></span>
            <span class="detail-content">${movie.release_date}</span>
        </div>
        <div class="movie-detail">
            <span class="detail-label"><strong>Rating:</strong></span>
            <span class="detail-content">${movie.vote_average}</span>
        </div>
        <div class="movie-detail">
            <span class="detail-label"><strong>Genres:</strong></span>
            <span class="detail-content">${movie.genres.map(genre => genre.name).join(', ')}</span>
        </div>
    `;
}

function displayMovieTrailer(trailer) {
    const movieDetailsSection = document.getElementById('movieDetails');

    const trailerSection = document.createElement('div');
    trailerSection.classList.add('movie-detail');
    trailerSection.innerHTML = `
        <h2>Watch Trailer</h2>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/${trailer.key}" 
            title="Movie Trailer" frameborder="0" allow="accelerometer; autoplay; clipboard-write; 
            encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    `;

    // Append the trailer section to the movie details section
    movieDetailsSection.appendChild(trailerSection);
}
