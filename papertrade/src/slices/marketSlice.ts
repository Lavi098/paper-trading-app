import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedIndex: 'NIFTY', // default
};

const marketSlice = createSlice({
  name: 'market',
  initialState,
  reducers: {
    setSelectedIndex: (state, action) => {
      state.selectedIndex = action.payload;
    },
  },
});

export const { setSelectedIndex } = marketSlice.actions;
export default marketSlice.reducer;
