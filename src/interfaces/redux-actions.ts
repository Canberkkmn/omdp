export interface SearchResult {
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
}
