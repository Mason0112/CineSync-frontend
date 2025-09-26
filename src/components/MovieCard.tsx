import { type Movie } from "../types/popularMovieResponse";
import styles from "./MovieCard.module.css";
import { useNavigate } from "react-router-dom";

// The interface for the component's props, which you already had.
interface MovieProps {
  movie: Movie;
}

// The completed MovieCard component.
export function MovieCard({ movie }: MovieProps) {
  const navigate = useNavigate();

  const handleCardClick = (movieId: number) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    // 使用 styles 物件中的 class 名稱
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
