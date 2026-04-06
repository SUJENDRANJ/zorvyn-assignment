import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const getInitialTransactions = () => {
  const savedTransactions = localStorage.getItem("transactions");
  if (savedTransactions) return JSON.parse(savedTransactions);
  return [
    {
      id: "1",
      title: "Salary",
      amount: 5000,
      category: "Income",
      type: "income",
      date: new Date().toISOString().split("T")[0],
    },
    {
      id: "2",
      title: "Groceries",
      amount: 150,
      category: "Food",
      type: "expense",
      date: new Date().toISOString().split("T")[0],
    },
    {
      id: "3",
      title: "Internet Bill",
      amount: 60,
      category: "Utilities",
      type: "expense",
      date: new Date(new Date().setMonth(new Date().getMonth() - 1))
        .toISOString()
        .split("T")[0],
    },
  ];
};

const initialState = {
  items: getInitialTransactions(),
  loading: false,
  error: null,
};

// Mock API thunk for simulation
export const fetchTransactions = createAsyncThunk(
  "transactions/fetchTransactions",
  async (_, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 800)); // Simulating 800ms delay
      return getInitialTransactions();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      state.items.unshift({
        ...action.payload,
        id: Math.random().toString(36).substr(2, 9),
      });
      localStorage.setItem("transactions", JSON.stringify(state.items));
    },
    editTransaction: (state, action) => {
      const { id, ...updatedTxn } = action.payload;
      const index = state.items.findIndex((t) => t.id === id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...updatedTxn };
        localStorage.setItem("transactions", JSON.stringify(state.items));
      }
    },
    deleteTransaction: (state, action) => {
      state.items = state.items.filter((t) => t.id !== action.payload);
      localStorage.setItem("transactions", JSON.stringify(state.items));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addTransaction, editTransaction, deleteTransaction } =
  transactionsSlice.actions;
export default transactionsSlice.reducer;
