import "../css/MovieCard.css";
import { useMovieContext } from "../contexts/MovieContext";
import { useState } from "react";
import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  const {
    addToFavorites,
    rateMovie,
    getRating,
    removeFromFavorites,
    isFavorite,
  } = useMovieContext();
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
    <div className="movie-card">
      <div className="movie-poster">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="movie-overlay">
          <button
            className={`favorite-btn ${favorite ? "active" : ""}`}
            onClick={onFavouriteClick}
          >
            {favorite ? "❤️" : "🤍"}
          </button>
        </div>
      </div>
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{movie.release_date.split("-")[0]}</p>

        <div className="bottom-section">
          <div className="rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={star <= rating ? "star filled" : "star"}
                onClick={() => handleRating(star)}
              >
                ★
              </span>
            ))}
          </div>
          <Link to={`/movie/${movie.id}`} state={{movie}}>View Details</Link>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
