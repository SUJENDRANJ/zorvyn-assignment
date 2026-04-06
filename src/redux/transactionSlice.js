import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

function getInitialTransactions() {
  const savedTransactions = JSON.parse(localStorage.getItem("transactions"));

  return savedTransactions ? savedTransactions : null;
}

export const fetchTransactions = createAsyncThunk(
  "transactions/fetchTransactions",
  async (_, { rejectWithValue }) => {
    try {
      const localData = getInitialTransactions();
      if (localData !== null) return localData;

      const res = await fetch("data/mockData.json");

      if (!res.ok) throw new Error("Failed to fetch data");

      const data = await res.json();

      return data.initialTransactions;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

const transactionsSlice = createSlice({
  name: "transactions",
  initialState: {
    items: getInitialTransactions(),
    loading: false,
    error: null,
  },

  reducers: {
    addTransaction: (state, action) => {
      if (!action.payload.id) action.payload.id = Date.now();

      state.items.push(action.payload);

      localStorage.setItem("transactions", JSON.stringify(state.items));
    },

    editTransaction: (state, action) => {
      const newTxn = action.payload;

      state.items = state.items.map((item) =>
        newTxn.id === item.id ? newTxn : item,
      );

      localStorage.setItem("transactions", JSON.stringify(state.items));
    },

    deleteTransaction: (state, action) => {
      const id = action.payload;

      state.items = state.items.filter((item) => id !== item.id);

      localStorage.setItem("transactions", JSON.stringify(state.items));
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { addTransaction, editTransaction, deleteTransaction } =
  transactionsSlice.actions;
export default transactionsSlice.reducer;
