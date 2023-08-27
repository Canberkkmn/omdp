export interface SearchResult {
  id?: string;
  Title: string;
  Year: string;
  imdbID: string;
  Type: "movie" | "series" | "game";
  Poster: string;
}

export interface ApiResponse {
  Search: SearchResult[];
  totalResults: string;
  Response: "True" | "False";
}

export interface ApiCallPayload {
  title: string;
  page: number;
  year?: number;
  type?: string;
  imdbID?: string;
}

export interface DetailApiCallPayload {
  imdbID: string;
}

interface Rating {
  Source: string;
  Value: string;
}

export interface DetailApiResponse {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: Rating[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
  totalSeasons?: string;
}
