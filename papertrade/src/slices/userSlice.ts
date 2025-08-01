// src/slices/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  availableMargin: number;     // ₹ cash left
}

const initialState: UserState = { availableMargin: 1_000_000 }; // ₹10 lakh demo

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    adjustMargin: (state, action: PayloadAction<number>) => {
      // action.payload can be +ve or –ve
      state.availableMargin += action.payload;
    },
  },
});

export const { adjustMargin } = userSlice.actions;
export default userSlice.reducer;
