import styles from "./Pagination.module.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  disabled = false,
}: PaginationProps) => {
  const handlePrevious = () => {
    if (currentPage > 1 && !disabled) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages && !disabled) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    if (!disabled) {
      onPageChange(page);
    }
  };

  // 生成頁碼陣列（顯示當前頁前後各2頁）
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      // 總頁數少，全部顯示
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // 總頁數多，顯示部分
      if (currentPage <= 3) {
        // 靠近開頭
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // 靠近結尾
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        // 中間
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  if (totalPages <= 1) {
    return null; // 只有一頁或沒有資料時不顯示分頁
  }

  return (
    <div className={styles.pagination}>
      <button
        className={styles.pageButton}
        onClick={handlePrevious}
        disabled={currentPage === 1 || disabled}
      >
        Previous
      </button>

      <div className={styles.pageNumbers}>
        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            className={`${styles.pageButton} ${
              page === currentPage ? styles.active : ""
            } ${page === "..." ? styles.dots : ""}`}
            onClick={() => typeof page === "number" && handlePageClick(page)}
            disabled={page === "..." || disabled}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        className={styles.pageButton}
        onClick={handleNext}
        disabled={currentPage === totalPages || disabled}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
