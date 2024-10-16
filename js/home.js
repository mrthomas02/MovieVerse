document.addEventListener('DOMContentLoaded', () => {
    fetchMovies();

    const searchButton = document.getElementById('searchButton');
    searchButton.addEventListener('click', () => {
        const query = document.getElementById('searchInput').value;
        searchMovies(query);
    });
});

function fetchMovies() {
    const apiUrl = 'https://api.themoviedb.org/3/movie/popular?api_key=a21b75befa31a30c49917733dc60eea9&language=en-US&page=1';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayMovies(data.results);
        })
        .catch(error => console.error('Error fetching movies:', error));
}

function displayMovies(movies) {
    const moviesGrid = document.getElementById('moviesGrid');
    moviesGrid.innerHTML = '';
    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');
        movieCard.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <button class="add-to-favorites">Add to Favorites</button>
        `;

        movieCard.addEventListener('click', (e) => {
            if (e.target.classList.contains('add-to-favorites')) return;
            window.location.href = `pages/movie.html?movieId=${movie.id}`;
        });

        const favoriteButton = movieCard.querySelector('.add-to-favorites');
        favoriteButton.addEventListener('click', () => addToFavorites(movie));

        moviesGrid.appendChild(movieCard);
    });
}

function addToFavorites(movie) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    console.log('Current favorites before adding:', favorites);

    if (!favorites.some(favMovie => favMovie.id === movie.id)) {
        favorites.push(movie);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert(`${movie.title} has been added to favorites!`);
        console.log('Added to favorites:', movie);
    } else {
        alert(`${movie.title} is already in your favorites.`);
    }
}

function searchMovies(query) {
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=a21b75befa31a30c49917733dc60eea9&query=${query}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displaySearchResults(data.results);
        })
        .catch(error => console.error('Error searching for movies:', error));
}

function displaySearchResults(movies) {
    const moviesGrid = document.getElementById('moviesGrid');
    moviesGrid.innerHTML = '';
    if (movies.length === 0) {
        moviesGrid.innerHTML = '<p>No results found.</p>';
        return;
    }

    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');
        movieCard.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <button class="add-to-favorites">Add to Favorites</button>
        `;

        movieCard.addEventListener('click', (e) => {
            if (e.target.classList.contains('add-to-favorites')) return;
            window.location.href = `pages/movie.html?movieId=${movie.id}`;
        });

        const favoriteButton = movieCard.querySelector('.add-to-favorites');
        favoriteButton.addEventListener('click', () => addToFavorites(movie));

        moviesGrid.appendChild(movieCard);
    });
}
