import { type Comment } from "../types/comment";
import styles from "./CommentCard.module.css";

interface CommentProps {
  comment: Comment;
}

const CommentCard = ({ comment }: CommentProps) => {
  return (
    <div className={styles.commentCard}>
      <div className={styles.commentHeader}>
        <span className={styles.commentUser}>{comment.userId}</span>
        <span className={styles.commentDate}>
          {comment.createdAt.toLocaleString()}
        </span>
      </div>
      <div className={styles.commentBody}>
        <p>{comment.content}</p>
      </div>
    </div>
  );
};

export default CommentCard;
