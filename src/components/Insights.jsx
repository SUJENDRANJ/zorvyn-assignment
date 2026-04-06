import React, { useMemo } from "react";
import {
  TrendingUp,
  TrendingDown,
  Target,
  Zap,
  AlertCircle,
} from "lucide-react";

const Insights = ({ transactions }) => {
  const insightsData = useMemo(() => {
    if (transactions.length === 0) return null;

    const expenses = transactions.filter(
      (t) => t.type.toLowerCase() === "expense",
    );
    const income = transactions.filter(
      (t) => t.type.toLowerCase() === "income",
    );

    // 1. Highest Spending Category (FIXED)
    const categoryTotals = {};

    expenses.forEach((e) => {
      categoryTotals[e.category] = (categoryTotals[e.category] || 0) + e.amount;
    });

    let highestCategory = { name: "N/A", amount: 0 };

    for (let category in categoryTotals) {
      if (categoryTotals[category] > highestCategory.amount) {
        highestCategory = {
          name: category,
          amount: categoryTotals[category],
        };
      }
    }

    // 2. Monthly Comparison
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    let currentMonthExpenses = 0;
    let lastMonthExpenses = 0;

    expenses.forEach((t) => {
      const d = new Date(t.date);
      const month = d.getMonth();
      const year = d.getFullYear();

      // current month
      if (month === currentMonth && year === currentYear) {
        currentMonthExpenses += t.amount;
      }

      // last month (handles January)
      if (
        (currentMonth === 0 && month === 11 && year === currentYear - 1) ||
        (month === currentMonth - 1 && year === currentYear)
      ) {
        lastMonthExpenses += t.amount;
      }
    });

    // calculate change (FIXED)
    let expenseChange = null;

    if (lastMonthExpenses !== 0) {
      expenseChange =
        ((currentMonthExpenses - lastMonthExpenses) / lastMonthExpenses) * 100;
    }

    // 3. Observations (better priority)
    const totalIncome = income.reduce((sum, t) => sum + t.amount, 0);
    const totalExpenses = expenses.reduce((sum, t) => sum + t.amount, 0);

    let observation = {
      text: "Keep tracking your spending.",
      icon: <Zap className="w-4 h-4 text-blue-500" />,
    };

    if (totalExpenses > totalIncome) {
      observation = {
        text: "Expenses exceed income.",
        icon: <AlertCircle className="w-4 h-4 text-amber-500" />,
      };
    } else if (expenseChange !== null && expenseChange < 0) {
      observation = {
        text: `Spent ${Math.abs(expenseChange).toFixed(0)}% less than last month.`,
        icon: <TrendingDown className="w-4 h-4 text-emerald-500" />,
      };
    } else {
      const savingsRate =
        totalIncome > 0
          ? ((totalIncome - totalExpenses) / totalIncome) * 100
          : 0;

      if (savingsRate > 20) {
        observation = {
          text: `Savings rate is ${savingsRate.toFixed(0)}%.`,
          icon: <Target className="w-4 h-4 text-emerald-500" />,
        };
      }
    }

    return {
      highestCategory,
      expenseChange,
      currentMonthExpenses,
      observation,
    };
  }, [transactions]);

  if (!insightsData) return null;

  const { highestCategory, expenseChange, currentMonthExpenses, observation } =
    insightsData;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {/* Top Expense */}
      <div className="card p-5">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-4 h-4 text-rose-500" />
          <h3 className="label-caps">Top Expense</h3>
        </div>
        <p className="text-xl font-bold text-slate-900 dark:text-white">
          {highestCategory.name}
        </p>
        <p className="text-xs font-semibold text-slate-400 mt-1">
          ${highestCategory.amount.toLocaleString()}
        </p>
      </div>

      {/* Monthly Trend */}
      <div className="card p-5">
        <div className="flex items-center gap-2 mb-3">
          {expenseChange !== null && expenseChange <= 0 ? (
            <TrendingDown className="w-4 h-4 text-emerald-500" />
          ) : (
            <TrendingUp className="w-4 h-4 text-rose-500" />
          )}
          <h3 className="label-caps">Monthly Trend</h3>
        </div>

        <div className="flex items-baseline gap-2">
          <p
            className={`text-xl font-bold ${
              expenseChange !== null && expenseChange <= 0
                ? "text-emerald-600"
                : "text-rose-600"
            }`}
          >
            {expenseChange === null
              ? "N/A"
              : `${expenseChange > 0 ? "+" : ""}${expenseChange.toFixed(0)}%`}
          </p>

          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
            vs last month
          </span>
        </div>

        <p className="text-xs font-semibold text-slate-400 mt-1">
          ${currentMonthExpenses.toLocaleString()} total
        </p>
      </div>

      {/* Observation */}
      <div className="card p-5">
        <div className="flex items-center gap-2 mb-3">
          {observation.icon}
          <h3 className="label-caps">Observation</h3>
        </div>
        <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
          {observation.text}
        </p>
      </div>
    </div>
  );
};

export default Insights;
