import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { adjustMargin } from './userSlice';
import { AppThunk } from '../store/store';

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */
export interface Position {
  id: string;
  symbol: string;          // e.g. NIFTY22500CE
  strike: number;
  qty: number;
  type: 'CE' | 'PE';
  side: 'BUY' | 'SELL';
  entry: number;           // entry price
  ltp: number;             // live price
  pnl: number;             // running P&L
}

interface TradesState {
  openPositions: Position[];
  closedPositions: Position[];
}

/* ------------------------------------------------------------------ */
/*  Initial State                                                     */
/* ------------------------------------------------------------------ */
const initialState: TradesState = {
  openPositions: [],
  closedPositions: [],
};

/* ------------------------------------------------------------------ */
/*  Slice                                                             */
/* ------------------------------------------------------------------ */
const tradeSlice = createSlice({
  name: 'trades',
  initialState,
  reducers: {
    _addPosition: (state, action: PayloadAction<Position>) => {
      state.openPositions.push(action.payload);
    },

    _closePosition: (
      state,
      action: PayloadAction<{ id: string; exitPrice: number }>
    ) => {
      const idx = state.openPositions.findIndex(p => p.id === action.payload.id);
      if (idx !== -1) {
        const pos = state.openPositions[idx];
        const pnl =
          (pos.side === 'BUY'
            ? action.payload.exitPrice - pos.entry
            : pos.entry - action.payload.exitPrice) * pos.qty;

        pos.pnl = +pnl.toFixed(2);
        pos.ltp = action.payload.exitPrice;
        state.closedPositions.unshift(pos);      // push to top of history
        state.openPositions.splice(idx, 1);
      }
    },

    updateLTP: (
      state,
      action: PayloadAction<{ symbol: string; ltp: number }>
    ) => {
      const { symbol, ltp } = action.payload;
      const pos = state.openPositions.find(p => p.symbol === symbol);
      if (pos) {
        pos.ltp = ltp;
        const pnl =
          (pos.side === 'BUY' ? ltp - pos.entry : pos.entry - ltp) * pos.qty;
        pos.pnl = +pnl.toFixed(2);
      }
    },
  },
});

export const { _addPosition, _closePosition, updateLTP } = tradeSlice.actions;
export default tradeSlice.reducer;

/* ------------------------------------------------------------------ */
/*  Thunks: addPosition & closePosition                               */
/* ------------------------------------------------------------------ */
export const addPosition =
  (p: Position): AppThunk =>
  (dispatch) => {
    // simplistic margin: price * qty
    dispatch(adjustMargin(-p.entry * p.qty));
    dispatch(_addPosition(p));
  };

export const closePosition =
  (id: string, exitPrice: number): AppThunk =>
  (dispatch, getState) => {
    const state = getState();
    const pos = state.trades.openPositions.find(p => p.id === id);
    if (!pos) return;

    // margin to refund + realised P&L
    const pnl =
      (pos.side === 'BUY' ? exitPrice - pos.entry : pos.entry - exitPrice) *
      pos.qty;
    const refund = pos.entry * pos.qty + pnl;

    dispatch(adjustMargin(refund));
    dispatch(_closePosition({ id, exitPrice }));
  };
