import { AnyAction, configureStore, ThunkAction } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import userReducer from '../slices/userSlice';
import marketReducer from '../slices/marketSlice';
import tradesReducer from '../slices/tradeSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    market: marketReducer,
    trades: tradesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, AnyAction>;


