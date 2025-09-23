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
