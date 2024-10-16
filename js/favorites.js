document.addEventListener('DOMContentLoaded', () => {
    displayFavorites();
});

function displayFavorites() {
    const favoritesSection = document.getElementById('favoritesSection');
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    console.log('Favorites from localStorage:', favorites);

    if (favorites.length === 0) {
        favoritesSection.innerHTML = '<p>No favorite movies added yet.</p>';
        return;
    }

    favoritesSection.innerHTML = '';

    favorites.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');
        movieCard.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <button class="remove-favorite">Remove from Favorites</button>
        `;

        movieCard.addEventListener('click', () => {
            window.location.href = `../pages/movie.html?movieId=${movie.id}`;
        });

        movieCard.querySelector('.remove-favorite').addEventListener('click', (event) => {
            event.stopPropagation();
            if (confirm(`Are you sure you want to remove "${movie.title}" from favorites?`)) {
                removeFromFavorites(movie.id);
                displayFavorites();
            }
        });

        favoritesSection.appendChild(movieCard);

        console.log('Movie card added to favorites section:', movieCard);
    });
}

function removeFromFavorites(movieId) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    favorites = favorites.filter(movie => movie.id !== movieId);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    
    alert(`Movie has been removed from favorites!`);
    console.log(`Movie with ID ${movieId} removed from favorites`);
}
