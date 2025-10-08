import { MovieCard } from "../components/MovieCard";
import apiClient from "../apiClient";
import { useState, useEffect } from "react";
import type { Movie } from "../types/movieResponse";
import styles from "./HomePage.module.css";

export const HomePage = () => {
  const [movies, setMovies] = useState<Movie[] | null>(null);

  useEffect(() => {
    const queryParams = {
      page: 1,
      language: "zh-TW",
    };
    async function getPopularMovies() {
      try {
        const response = await apiClient.get("/movies/popular",{params: queryParams});
        console.log(response.data.results);
        setMovies(response.data.results);
      } catch (error) {
        console.error("Failed to fetch popular movies:", error);
      }
    }
    getPopularMovies();
  }, []);
  
  if (!movies) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p className={styles.loadingText}>Loading popular movies...</p>
      </div>
    );
  }

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.heroSection}>
        <h1 className={styles.heroTitle}>Popular Movies</h1>
        <p className={styles.heroSubtitle}>Discover the most popular movies right now</p>
      </div>
      <div className={styles.homePageContainer}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
