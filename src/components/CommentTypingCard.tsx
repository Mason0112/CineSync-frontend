import styles from "./CommentTypingCard.module.css";

interface CommentTypingCardProps {
  commentContent: string;
  onContentChange: (content: string) => void;
  onSubmit: () => void;
  placeholder?: string;
  disabled?: boolean;
}

const CommentTypingCard = ({
  commentContent,
  onContentChange,
  onSubmit,
  placeholder = "Write your comment...",
  disabled = false,
}: CommentTypingCardProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentContent.trim()) {
      onSubmit();
    }
  };

  return (
    <form className={styles.commentTypingCard} onSubmit={handleSubmit}>
      <textarea
        className={styles.textarea}
        value={commentContent}
        onChange={(e) => onContentChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        rows={4}
      />
      <button
        type="submit"
        className={styles.submitButton}
        disabled={disabled || !commentContent.trim()}
      >
        Submit
      </button>
    </form>
  );
};

export default CommentTypingCard;
