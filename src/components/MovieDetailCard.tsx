import { type MovieDetail } from "../types/movieResponse";
import styles from "./MovieDetailCard.module.css";

interface MovieDetailProps {
  movieDetail: MovieDetail;
}

export const MovieDetailCard = ({ movieDetail }: MovieDetailProps) => {
  const formattedBudget =
    movieDetail.budget != null && movieDetail.budget > 0
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
        {/* 標題跨越兩欄 */}
        <h1 className={styles.title}>{movieDetail.title}</h1>

        {/* 上半部：所有基本資訊放在一行 */}
        <div className={styles.infoRow}>
          {/* 上映日期和預算 */}
          <div className={styles.metaInfo}>
            <span>📅 上映日期：{movieDetail.releaseDate}</span>
            <span>💰 預算：{formattedBudget}</span>
          </div>

          {/* 電影類型 */}
          <div className={styles.genres}>
            {movieDetail.genres.map((genre) => (
              <span key={genre.id} className={styles.genreTag}>
                {genre.name}
              </span>
            ))}
          </div>

          {/* 製作公司 */}
          <div className={styles.productionInfo}>
            <span className={styles.productionLabel}>🏢 製作公司：</span>
            {movieDetail.productionCompanies &&
              movieDetail.productionCompanies.length > 0 && (
                <span className={styles.companyText}>
                  {movieDetail.productionCompanies
                    .map((company) => company.name)
                    .join(", ")}
                </span>
              )}
          </div>
        </div>

        {/* 下半部：劇情簡介 */}
        <div className={styles.overviewSection}>
          <h2>劇情簡介</h2>
          <p className={styles.overviewText}>{movieDetail.overview}</p>
        </div>
      </div>
    </div>
  );
};
