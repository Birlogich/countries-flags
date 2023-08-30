import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadCountryByName = createAsyncThunk(
  "@@details/load-country-by-name",
  (name, { extra: { client, api } }) => {
    return client.get(api.searchByCountry(name));
  }
);

const initialState = {
  currentCountry: null,
  neighbours: [],
  status: "idle",
  error: null,
};

export const loadNeighboursByBorder = createAsyncThunk(
  "@@details/load-neighbours",
  (borders, { extra: { client, api } }) => {
    return client.get(api.filterByCode(borders));
  }
);

const detailsSlice = createSlice({
  name: "@@details",
  initialState,
  reducers: {
    clearDetails: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCountryByName.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loadCountryByName.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload || action.meta.error;
      })
      .addCase(loadCountryByName.fulfilled, (state, action) => {
        state.status = "idle";
        state.error = null;
        state.currentCountry = action.payload.data[0];
      })
      .addCase(loadNeighboursByBorder.fulfilled, (state, action) => {
        state.neighbours = action.payload.data.map((country) => country.name);
      });
  },
});

export const { clearDetails } = detailsSlice.actions;
export const detailsReducer = detailsSlice.reducer;

export const selectCurrentCountry = (state) => state.details.currentCounty;
export const selectDetails = (state) => state.details;
export const selectNeighbours = (state) => state.details.neighbours;
