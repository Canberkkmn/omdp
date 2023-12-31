import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiKey, apiUrl } from "../../constants/const";
import { ApiCallPayload, ApiResponse } from "../../interfaces/redux-actions";

export const fetchData = createAsyncThunk(
  "api/fetchData",
  async (payload: ApiCallPayload) => {
    let url = `${apiUrl}?r=json&apikey=${apiKey}`;

    if (payload.title && payload.title !== "") {
      url += `&s=${payload.title}`;
    }

    if (payload.page && payload.page !== 0) {
      url += `&page=${payload.page}`;
    }

    if (payload.year && payload.year !== 0) {
      url += `&y=${payload.year}`;
    }

    if (payload.type && payload.type !== "None" && payload.type !== "") {
      url += `&type=${payload.type}`;
    }

    if (payload.imdbID && payload.imdbID !== "") {
      url += `&i=${payload.imdbID}`;
    }

    const response = await fetch(url);
    const data: ApiResponse = await response.json();

    return data;
  }
);

const apiSlice = createSlice({
  name: "api",
  initialState: {
    apiData: null as ApiResponse | null,
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
        state.apiData = action.payload;
        state.loading = false;
        state.error = null;
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .addCase(fetchData.rejected, (state, _action) => {
        state.apiData = null;
        state.loading = false;
        state.error = "An error occurred while fetching data.";
      });
  },
});

export default apiSlice.reducer;
