import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./uiSlice";
import transactionsReducer from "./transactionSlice";

const store = configureStore({
  reducer: {
    ui: uiReducer,
    transactions: transactionsReducer,
  },
});

export default store;
