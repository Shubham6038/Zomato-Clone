import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filters',
  initialState: {
    city: 'Delhi NCR',
    searchQuery: '',
    activeCategory: 'delivery',
    pureVegOnly: false,
  },
  reducers: {
    setCity: (state, action) => {
      state.city = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setActiveCategory: (state, action) => {
      state.activeCategory = action.payload;
    },
    togglePureVeg: (state) => {
      state.pureVegOnly = !state.pureVegOnly;
    },
  },
});

export const { setCity, setSearchQuery, setActiveCategory, togglePureVeg } = filterSlice.actions;
export default filterSlice.reducer;