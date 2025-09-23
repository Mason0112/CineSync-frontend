import { MovieCard } from "../components/MovieCard";
import apiClient from "../apiClient";
import { useState, useEffect } from "react";
import type { Movie } from "../types/popularMovieResponse";

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
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap", // Allows cards to wrap to the next line
        justifyContent: "center", // Centers the cards horizontally
        gap: "16px", // Adds space between cards
        padding: "20px",
      }}
    >
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}