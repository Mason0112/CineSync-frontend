import { useParams } from "react-router-dom";
import apiClient from "../apiClient";
import { useEffect, useState } from "react";
import { MovieDetailCard } from "../components/MovieDetailCard";
import type { MovieDetail } from "../types/movieResponse";
import type { Comment } from "../types/comment";
import Pagination from "../components/Pagination";
import CommentList from "../components/CommentList";
import CommentTypingCard from "../components/CommentTypingCard";

export const MovieMessageBoard = () => {
  const { movieId } = useParams();
  console.log("Movie ID:", movieId);
  const [movieDetail, setMovieDetail] = useState<MovieDetail | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [emptyMessage, setEmptyMessage] = useState<string>(
    "No comments yet. Be the first to comment!",
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

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

  const fetchCommentsByMovieId = async (id: string, page: number = 0) => {
    try {
      const response = await apiClient.get<Comment[]>(`/comments/movie/${id}`, {
        params: {
          page: page, // 0-based for backend
          pageSize: 5,
        },
      });
      setComments(response.data);
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
          <CommentList
            commentList={comments}
            isLoading={isLoading}
            emptyMessage={emptyMessage}
          />
          <Pagination />
          <CommentTypingCard />
        </>
      )}
    </div>
  );
};
