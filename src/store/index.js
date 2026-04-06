import { configureStore } from '@reduxjs/toolkit';
import transactionsReducer from './transactionsSlice';
import uiReducer from './uiSlice';

const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    ui: uiReducer,
  },
});

export default store;
