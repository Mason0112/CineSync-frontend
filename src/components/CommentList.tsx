import { type Comment } from "../types/comment";
import CommentCard from "./CommentCard";
import styles from "./CommentList.module.css";

interface CommentListProps {
  commentList: Comment[];
  isLoading?: boolean;
  emptyMessage?: string;
}

const CommentList = ({
  commentList,
  isLoading = false,
  emptyMessage = "No comments yet. Be the first to comment!",
}: CommentListProps) => {
  if (isLoading) {
    return <div className={styles.loading}>Loading comments...</div>;
  }

  if (commentList.length === 0) {
    return <div className={styles.empty}>{emptyMessage}</div>;
  }

  return (
    <div className={styles.commentList}>
      {commentList.map((comment) => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default CommentList;
