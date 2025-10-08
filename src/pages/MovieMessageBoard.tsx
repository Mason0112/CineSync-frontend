import { useParams } from "react-router-dom";
import apiClient from "../apiClient";
import { useEffect, useState } from "react";
import { MovieDetailCard } from "../components/MovieDetailCard";
import type { MovieDetail } from "../types/movieResponse";
import type { Comment } from "../types/comment";
import type { Page } from "../types/page";
import Pagination from "../components/Pagination";
import CommentList from "../components/CommentList";
import CommentTypingCard from "../components/CommentTypingCard";
import styles from "./MovieMessageBoard.module.css";
import { useAuthStore } from "../stores/authStore";
import axios from "axios";

export const MovieMessageBoard = () => {
  const { movieId } = useParams();
  const { isLoggedIn } = useAuthStore();
  console.log("Movie ID:", movieId);
  const [movieDetail, setMovieDetail] = useState<MovieDetail | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [emptyMessage, setEmptyMessage] = useState<string>(
    "No comments yet. Be the first to comment!",
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [commentContent, setCommentContent] = useState<string>("");
  const [isCommenting, setIsCommenting] = useState<boolean>(false);

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
    if (movieId) {
      fetchMovieDetail(movieId);
      fetchCommentsByMovieId(movieId, 0); // 初始載入第一頁評論
    }
  }, [movieId]);

  const fetchCommentsByMovieId = async (id: string, page: number = 0) => {
    setIsLoading(true);
    try {
      const response = await apiClient.get<Page<Comment>>(
        `/comments/movie/${id}`,
        {
          params: {
            page: page,
            pageSize: 5,
          },
        },
      );
      if (response.data.totalElements === 0) {
        setEmptyMessage("No comments yet. Be the first to comment!");
      }
      setIsLoading(false);
      setComments(response.data.content || []);
      setTotalPages(response.data.totalPages || 1);
      console.log("Comments:", response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchCommentsByMovieId(movieId!, page - 1);
  };
  const handleCommentSubmit = async () => {
    if (!commentContent.trim()) return;
    setIsCommenting(true);
    try {
      const response = await apiClient.post("/comments", {
        movieId: movieId,
        content: commentContent.trim(),
      });
      console.log("Comment submitted successfully:", response);
      setCommentContent("");
      fetchCommentsByMovieId(movieId!, currentPage - 1);
    } catch (error) {
      console.error("Error submitting comment:", error);
      // 檢查錯誤詳情
      if (axios.isAxiosError(error)) {
        console.error("Response status:", error.response?.status);
        console.error("Response data:", error.response?.data);
      }
    } finally {
      setIsCommenting(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        {movieDetail && (
          <>
            <div className={styles.movieSection}>
              <MovieDetailCard key={movieId} movieDetail={movieDetail} />
            </div>

            <div className={styles.commentsSection}>
              <h2 className={styles.sectionTitle}>Comments</h2>
              <CommentList
                commentList={comments}
                isLoading={isLoading}
                emptyMessage={emptyMessage}
              />
            </div>

            <div className={styles.paginationWrapper}>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                disabled={isLoading}
              />
            </div>

            <div className={styles.commentInputSection}>
              <h3 className={styles.inputTitle}>Leave a Comment</h3>
              <CommentTypingCard
                commentContent={commentContent}
                onContentChange={setCommentContent}
                onSubmit={handleCommentSubmit}
                disabled={isCommenting || !isLoggedIn}
                placeholder={
                  isLoggedIn
                    ? "Write your comment..."
                    : "Please login to leave a comment"
                }
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
