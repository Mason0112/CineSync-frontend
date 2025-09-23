import { type Movie } from "../types/popularMovieResponse";
import styles from "./MovieCard.module.css";

// The interface for the component's props, which you already had.
interface MovieProps {
  movie: Movie;
}

// The completed MovieCard component.
export function MovieCard({ movie }: MovieProps) {
  return (
    // 使用 styles 物件中的 class 名稱
    <div className={styles.card}>
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