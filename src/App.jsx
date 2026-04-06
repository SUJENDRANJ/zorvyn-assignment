import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { fetchTransactions } from "./store/transactionsSlice";
import Layout from "./components/Layout";
import DashboardOverview from "./components/DashboardOverview";
import Transactions from "./components/Transactions";
import Insights from "./components/Insights";

function App() {
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transactions.items);
  const loading = useSelector((state) => state.transactions.loading);
  const { role } = useSelector((state) => state.ui);

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="w-12 h-12 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin mb-4"></div>
        <p className="text-slate-500 dark:text-slate-400 font-medium">
          Loading your dashboard...
        </p>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={<DashboardOverview transactions={transactions} />}
        />
        <Route
          path="transactions"
          element={<Transactions transactions={transactions} role={role} />}
        />
        <Route
          path="insights"
          element={<Insights transactions={transactions} />}
        />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
