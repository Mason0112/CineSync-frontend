import { type Movie } from "../types/movieResponse";
import styles from "./MovieCard.module.css";
import { useNavigate } from "react-router-dom";

interface MovieProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieProps) {
  const navigate = useNavigate();

  const handleCardClick = (movieId: number) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <div className={styles.card} onClick={() => handleCardClick(movie.id)}>
      <img
        src={`${movie.posterPath}`}
        alt={`Poster of ${movie.title}`}
        className={styles.poster}
      />
      <h3 className={styles.title}>{movie.title}</h3>
      <p className={styles.info}>Release Date: {movie.releaseDate}</p>
      <p className={styles.info}>⭐ Rating: {movie.voteAverage} / 10</p>
    </div>
  );
}
