import { type MovieDetail } from "../types/movieResponse";
import styles from "./MovieDetailCard.module.css";

interface MovieDetailProps {
  movieDetail: MovieDetail;
}

export const MovieDetailCard = ({ movieDetail }: MovieDetailProps) => {
  // 格式化預算為貨幣格式 (例如：$100,000,000)
  // 注意：您的 interface 中 budget 拼寫為 bugdet，這裡保持一致
  const formattedBudget =
    movieDetail.budget > 0
      ? new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 0,
        }).format(movieDetail.budget)
      : "未公開";

  return (
    <div className={styles.cardContainer}>
      {/* 1. 最上方的 Backdrop 圖片 */}
      {movieDetail.backdropPath && (
        <img
          src={`${movieDetail.backdropPath}`}
          alt={`${movieDetail.title} backdrop`}
          className={styles.backdropImage}
        />
      )}

      {/* 2. 下方的詳細資料 */}
      <div className={styles.detailsContainer}>
        <h1 className={styles.title}>{movieDetail.title}</h1>

        <div className={styles.metaInfo}>
          <span>上映日期：{movieDetail.releaseDate}</span>
          <span>預算：{formattedBudget}</span>
        </div>

        <div className={styles.genres}>
          {movieDetail.genres.map((genre) => (
            <span key={genre.id} className={styles.genreTag}>
              {genre.name}
            </span>
          ))}
        </div>

        <div className={styles.overviewSection}>
          <h2>劇情簡介</h2>
          <p className={styles.overviewText}>{movieDetail.overview}</p>
        </div>

        <div className={styles.productionSection}>
          <h2>製作公司</h2>
          {/* 檢查是否有製作公司資料 */}
          {movieDetail.productionCompanies &&
            movieDetail.productionCompanies.length > 0 && (
              <p className={styles.companyText}>
                {
                  movieDetail.productionCompanies
                    .map((company) => company.name)
                    .join(", ")
                }
              </p>
            )}
        </div>
      </div>
    </div>
  );
};
