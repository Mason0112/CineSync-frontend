import { MovieCard } from "../components/MovieCard";
import apiClient from "../apiClient";
import { useState, useEffect } from "react";
import type { Movie } from "../types/popularMovieResponse";
import styles from "./HomePage.module.css";


export function HomePage() {
  const [movies, setMovies] = useState<Movie[] | null>(null);

  useEffect(() => {
    async function getPopularMovies() {
      try {
        const response = await apiClient.get("/movies/popular");
        console.log(response.data.results);
        setMovies(response.data.results);
      } catch (error) {
        console.error("Failed to fetch popular movies:", error);
      }
    }
    getPopularMovies();
  }, []);
  if (!movies) {
    return <div>Loading popular movies... ✨</div>;
  }

  console.log("HomePage styles object:", styles); // <--- 在這裡添加這行
  return (
    <div className={styles.homePageContainer}> 
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}