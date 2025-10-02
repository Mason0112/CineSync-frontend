import { useParams } from "react-router-dom";
import apiClient from "../apiClient";
import { useEffect, useState } from "react";
import { MovieDetailCard } from "../components/MovieDetailCard";
import type { MovieDetail } from "../types/movieResponse";
import Pagination from "../components/Pagination";
import CommentList from "../components/CommentList";
import CommentTypingCard from "../components/CommentTypingCard";

export const MovieMessageBoard = () => {
  const { movieId } = useParams();
  console.log("Movie ID:", movieId);
  const [movieDetail, setMovieDetail] = useState<MovieDetail | null>(null);

  const fetchMovieDetail = async (id: string) => {
    try {
      const response = await apiClient.get<MovieDetail>(`/movies/detail/${id}`);
      setMovieDetail(response.data);
      console.log("Movie Details:", response.data);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  useEffect(() => {
    fetchMovieDetail(movieId!);
  }, [movieId]);

  const fetchCommentsByMovieId = async (id: string) => {
    try {
      const response = await apiClient.get(`/comments/movie/${id}`, {
        params: {
          page: 1,
          pageSize: 5,
        },
      });

      console.log("Comments:", response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
        paddingBottom: "2rem",
      }}
    >
      {movieDetail && (
        <>
          <MovieDetailCard key={movieId} movieDetail={movieDetail} />
          <CommentList />
          <Pagination />
          <CommentTypingCard />
        </>
      )}
    </div>
  );
};
