import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 searchTerm: ''
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchTerm: (state, {payload}) => {
      state.searchTerm = payload
    },
  },
});

export const { setSearchTerm } = searchSlice.actions;
export const getSearchTerm = (state) => state.search.searchTerm;
export default searchSlice.reducer;