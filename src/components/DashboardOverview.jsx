import React, { useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Wallet, ArrowUpCircle, ArrowDownCircle } from "lucide-react";

const DashboardOverview = ({ transactions }) => {
  const stats = useMemo(() => {
    const income = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);
    const expenses = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);
    const balance = income - expenses;

    return { income, expenses, balance };
  }, [transactions]);

  const trendData = useMemo(() => {
    const sorted = [...transactions].sort(
      (a, b) => new Date(a.date) - new Date(b.date),
    );

    let balance = 0;
    let lastDate = "";
    const result = [];

    sorted.forEach((t) => {
      balance += t.type === "income" ? t.amount : -t.amount;

      const date = new Date(t.date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
      });

      if (date === lastDate) {
        result[result.length - 1].balance = balance;
      } else {
        result.push({ date, balance });
        lastDate = date;
      }
    });

    return result;
  }, [transactions]);

  const categoryData = useMemo(() => {
    const categories = transactions
      .filter((t) => t.type === "expense")
      .reduce((acc, t) => {
        const existing = acc.find((item) => item.name === t.category);

        if (existing) {
          existing.value += t.amount;
        } else {
          acc.push({ name: t.category, value: t.amount });
        }

        return acc;
      }, []);

    return categories;
  }, [transactions]);

  const COLORS = [
    "#2563eb",
    "#059669",
    "#d97706",
    "#dc2626",
    "#7c3aed",
    "#db2777",
  ];

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Balance Card */}
        <div className="card border-l-4 border-l-blue-600 dark:border-l-blue-400 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <Wallet className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="">Available Balance</h3>
          </div>
          <p className="text-3xl font-bold text-slate-900 dark:text-white ">
            ${stats.balance.toLocaleString()}
          </p>
        </div>

        {/* Income Card */}
        <div className="card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-emerald-50 dark:bg-emerald-500/10 rounded-lg">
              <ArrowUpCircle className="w-5 h-5 text-emerald-600" />
            </div>
            <h3 className="">Total Income</h3>
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white ">
            ${stats.income.toLocaleString()}
          </p>
        </div>

        {/* Expenses Card */}
        <div className="card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-rose-50 dark:bg-rose-500/10 rounded-lg">
              <ArrowDownCircle className="w-5 h-5 text-rose-600" />
            </div>
            <h3 className="">Total Expenses</h3>
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white ">
            ${stats.expenses.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trend Chart */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-8">
            <h1 className="heading-2">Balance History</h1>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="date" />
                <YAxis dataKey="balance" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="balance"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  fill="#3b82f6"
                  fillOpacity={0.05}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Categorical Breakdown */}
        <div className="card p-6">
          <h1 className="heading-2 mb-8">Spending by Category</h1>
          <div className="h-64 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="40%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  stroke={0}
                  cornerRadius={5}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute top-[45%] left-[40%] -translate-x-1/2 -translate-y-1/2 text-center">
              <p className="text-[10px]">Total</p>
              <p className="text-base font-bold text-slate-900 dark:text-white">
                ${stats.expenses}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
