import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiKey, apiUrl } from "../../constants/const";
import { ApiCallPayload, ApiResponse } from "../../interfaces/redux-actions";

export const fetchData = createAsyncThunk(
  "api/fetchData",
  async (payload: ApiCallPayload) => {
    let url = `${apiUrl}?r=json&apikey=${apiKey}`;

    if (payload.title !== "") {
      url += `&s=${payload.title}`;
    }

    if (payload.page !== 0) {
      url += `&page=${payload.page}`;
    }

    if (payload.year !== 0) {
      url += `&y=${payload.year}`;
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

        window.scrollTo({ top: 0, behavior: "smooth" });
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .addCase(fetchData.rejected, (state, _action) => {
        state.apiData = null;
        state.loading = false;
        state.error = "An error occurred while fetching data.";

        window.scrollTo({ top: 0, behavior: "smooth" });
      });
  },
});

export default apiSlice.reducer;
