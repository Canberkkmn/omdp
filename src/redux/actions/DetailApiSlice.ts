import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiKey, apiUrl } from "../../constants/const";
import {
  DetailApiCallPayload,
  DetailApiResponse,
} from "../../interfaces/redux-actions";

export const fetchData = createAsyncThunk(
  "api/fetchData",
  async (payload: DetailApiCallPayload) => {
    const url = `${apiUrl}?r=json&apikey=${apiKey}&i=${payload.imdbID}`;

    const response = await fetch(url);
    const data: DetailApiResponse = await response.json();

    return data;
  }
);

const detailApiSlice = createSlice({
  name: "detailApi",
  initialState: {
    detailData: null as DetailApiResponse | null,
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.detailData = action.payload;
        state.loading = false;
        state.error = null;
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .addCase(fetchData.rejected, (state, _action) => {
        state.detailData = null;
        state.loading = false;
        state.error = "An error occurred while fetching data.";
      });
  },
});

export default detailApiSlice.reducer;
