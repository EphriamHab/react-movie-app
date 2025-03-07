/* eslint-disable react-hooks/rules-of-hooks */
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useMovieContext } from "../contexts/MovieContext";
import "../css/MovieDetails.css"; // Import the new CSS file

function MovieDetails() {
    const { state } = useLocation();
    const { addToFavorites, rateMovie, getRating, removeFromFavorites, isFavorite } = useMovieContext();

  if (!state || !state.movie) {
    return <p className="error-message">No movie data available. Please go back and select a movie.</p>;
  }

  const movie = state.movie;
 const [rating, setRating] = useState(getRating(movie.id));

  const favorite = isFavorite(movie.id);

  const onFavouriteClick = (e) => {
    e.preventDefault();
    if (favorite) removeFromFavorites(movie.id);
    else addToFavorites(movie);
  };

  const handleRating = (newRating) => {
    setRating(newRating);
    rateMovie(movie.id, newRating);
  };

  return (
    <div className="movie-details">
      <div className="backdrop">
        <img src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`} alt={movie.title} />
      </div>

      <div className="movie-content">
        <div className="poster">
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
        </div>

        <div className="details">
          <h2>{movie.title}</h2>
          <p className="original-title">{movie.original_title} ({movie.original_language.toUpperCase()})</p>

          <p className="overview">{movie.overview}</p>

          <p><strong>Release Date:</strong> {movie.release_date}</p>
          <p><strong>Adult:</strong> {movie.adult ? "Yes 🔞" : "No ✅"}</p>

          <p><strong>Genres:</strong> {movie.genre_ids.map(id => `#${id} `)}</p>

          <p><strong>Popularity:</strong> {movie.popularity}</p>
          <p><strong>Votes:</strong> {movie.vote_count} (⭐ {movie.vote_average})</p>

          <div className="rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} className={star <= rating ? "star filled" : "star"} onClick={() => handleRating(star)}>
                ★
              </span>
            ))}
          </div>

          <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={onFavouriteClick}>
            {favorite ? "❤️" : "🤍"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
