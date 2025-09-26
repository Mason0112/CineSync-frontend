export interface PopularMovieResponse {
  page: number;
  results: Movie[];
  totalPages: number;
  totalResults: number;
}

export interface Movie {
  id: number;
  title: string;
  overview: string;
  posterPath: string;
  releaseDate: string;
  voteAverage: number;
}

export interface MovieDetail {
  id: number;
  backdropPath: string;
  budget: number;
  genres: Genre[];
  releaseDate: string;
  overview: string;
  title: string;
  productionCompanies: ProductionCompany[];
}

export interface Genre {
  id: number;
  name: string;
}
export interface ProductionCompany {
  id: number;
  logoPath: string | null;
  name: string;
}