import { Box, CardMedia, Chip, Grid, Paper, Typography } from "@mui/material";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import SplashScreen from "../../components/common/SplashScreen/SplashScreen";
import Header from "../../components/home/Header/Header";
import { notFoundPoster } from "../../constants/const";
import { fetchData } from "../../redux/actions/DetailApiSlice";
import { RootState } from "../../redux/reducers";
import { AppDispatch } from "../../redux/store/store";

const MoviePage: FC = () => {
  const movieData = useSelector(
    (state: RootState) => state.detailApi.detailData
  );
  const loading = useSelector((state: RootState) => state.detailApi.loading);
  const error = useSelector((state: RootState) => state.detailApi.error);

  // eslint-disable-next-line prefer-const
  const location = useLocation();

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(
      fetchData({
        imdbID: location.pathname.split("/")[2],
      })
    );
  }, [dispatch, location.pathname]);

  console.log(movieData);

  return (
    <>
      {loading && <SplashScreen />}

      {!loading && <Header value="OMDb Detail Page" />}

      {error && !loading && (
        <Box p={3}>
          <Typography variant="h4">Error</Typography>
          <Typography variant="body1">{error}</Typography>
        </Box>
      )}

      {movieData && !loading && (
        <Box p={3}>
          <Paper elevation={3} style={{ padding: "20px" }}>
            <Grid container spacing={3}>
              <Grid
                item
                xs={12}
                md={4}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <CardMedia
                  component="img"
                  alt={movieData.Title}
                  image={
                    movieData.Poster === "N/A"
                      ? notFoundPoster
                      : movieData.Poster
                  }
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              </Grid>
              <Grid item xs={12} md={8}>
                <Typography variant="h4">{movieData.Title}</Typography>
                <Typography variant="subtitle1">
                  Released: {movieData.Released}
                </Typography>

                {movieData.Plot && movieData.Plot !== "N/A" && (
                  <Typography variant="body1">{movieData.Plot}</Typography>
                )}

                <Box mt={3}>
                  <Typography variant="subtitle2">Details</Typography>
                  <Typography variant="body2">
                    Year: {movieData.Year}
                  </Typography>

                  {movieData.Rated && movieData.Rated !== "N/A" && (
                    <Typography variant="body2">
                      Rated: {movieData.Rated}
                    </Typography>
                  )}

                  {movieData.Runtime && movieData.Runtime !== "N/A" && (
                    <Typography variant="body2">
                      Runtime: {movieData.Runtime}
                    </Typography>
                  )}

                  <Typography variant="body2">
                    Language: {movieData.Language}
                  </Typography>
                  <Typography variant="body2">
                    Country: {movieData.Country}
                  </Typography>

                  {movieData.Awards && movieData.Awards !== "N/A" && (
                    <Typography variant="body2">
                      Awards: {movieData.Awards}
                    </Typography>
                  )}

                  <Typography variant="body2">
                    Type: {movieData.Type}
                  </Typography>

                  {movieData.DVD && movieData.DVD !== "N/A" && (
                    <Typography variant="body2">
                      DVD: {movieData.DVD}
                    </Typography>
                  )}

                  {movieData.BoxOffice && movieData.BoxOffice !== "N/A" && (
                    <Typography variant="body2">
                      Box Office: {movieData.BoxOffice}
                    </Typography>
                  )}

                  {movieData.Production && movieData.Production !== "N/A" && (
                    <Typography variant="body2">
                      Production: {movieData.Production}
                    </Typography>
                  )}

                  {movieData.Website && movieData.Website !== "N/A" && (
                    <Typography variant="body2">
                      Website: {movieData.Website}
                    </Typography>
                  )}

                  {movieData.Metascore && movieData.Metascore !== "N/A" && (
                    <Typography variant="body2">
                      Metascore: {movieData.Metascore}
                    </Typography>
                  )}

                  {movieData.imdbRating !== "N/A" && (
                    <Typography variant="body2">
                      imdbRating: {movieData.imdbRating}
                    </Typography>
                  )}

                  {movieData.imdbVotes !== "N/A" && (
                    <Typography variant="body2">
                      imdbVotes: {movieData.imdbVotes}
                    </Typography>
                  )}

                  {movieData.imdbID !== "N/A" && (
                    <Typography variant="body2">
                      imdbID: {movieData.imdbID}
                    </Typography>
                  )}

                  {movieData.totalSeasons &&
                    movieData.totalSeasons !== "N/A" && (
                      <Typography variant="body2">
                        TotalSeasons: {movieData.totalSeasons}
                      </Typography>
                    )}
                </Box>

                {movieData.Director && movieData.Director !== "N/A" && (
                  <Box mt={3}>
                    <Typography variant="subtitle2">Director</Typography>
                    <Typography variant="body2">
                      {movieData.Director}
                    </Typography>
                  </Box>
                )}

                {movieData.Writer && movieData.Writer !== "N/A" && (
                  <Box mt={3}>
                    <Typography variant="subtitle2">Writers</Typography>
                    <Typography variant="body2">{movieData.Writer}</Typography>
                  </Box>
                )}

                {movieData.Actors && movieData.Actors !== "N/A" && (
                  <Box mt={3}>
                    <Typography variant="subtitle2">Actors</Typography>
                    <Typography variant="body2">{movieData.Actors}</Typography>
                  </Box>
                )}

                <Box mt={3}>
                  <Typography variant="subtitle2">Genres</Typography>
                  {(movieData.Genre || "").split(", ").map((genre, index) => (
                    <Chip
                      key={index}
                      label={genre}
                      style={{ marginRight: "5px" }}
                    />
                  ))}
                </Box>

                {movieData.Ratings.length > 0 && (
                  <Box mt={3}>
                    <Typography variant="subtitle2">Ratings</Typography>
                    {movieData.Ratings.map((rating, index) => (
                      <div key={index}>
                        <Typography variant="body2">
                          {rating.Source}: {rating.Value}
                        </Typography>
                      </div>
                    ))}
                  </Box>
                )}
              </Grid>
            </Grid>
          </Paper>
        </Box>
      )}
    </>
  );
};

export default MoviePage;
