import {
  ArrowDownCircle,
  ArrowUpCircle,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { useEffect, useMemo } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import BalanceTrend from "./chart";

//    {
//       "id": 1,
//       "title": "Salary",
//       "amount": 50000,
//       "type": "income",
//       "category": "Job",
//       "date": "2026-04-01"
//     },

const Dashboard = ({ transactionsData }) => {
  //   const stats = useMemo(() => {
  //     const income = transactionsData
  //       .filter((t) => t.type === "income")
  //       .reduce((sum, t) => sum + t.amount, 0);
  //     const expenses = transactionsData
  //       .filter((t) => t.type === "expense")
  //       .reduce((sum, t) => sum + t.amount, 0);
  //     const balance = income - expenses;

  //     return { income, expenses, balance };
  //   }, [transactionsData]);

  const totalExpense = transactionsData.reduce((acc, elem) => {
    elem.type === "expense" && (acc += elem.amount);
    return acc;
  }, 0);

  const totalIncome = transactionsData.reduce((acc, elem) => {
    elem.type === "income" && (acc += elem.amount);
    return acc;
  }, 0);

  const totalBalance = totalIncome - totalExpense;

  const stats = {
    balance: totalBalance,
    expense: totalExpense,
    income: totalIncome,
  };

  // charts
  // 1
  const categoryData = transactionsData
    .filter((elem) => elem.type === "expense")
    .reduce((acc, elem) => {
      const obj = {};
      obj.name = elem.title;
      obj.value = elem.amount;

      acc.push(obj);
      return acc;
    }, []);

  // 2
  const sorted = [...transactionsData].sort(
    (a, b) => new Date(a.date) - new Date(b.date),
  );

  let bal = 0;
  let trendData = [];
  let lastDate = "";
  sorted.forEach((elem) => {
    bal = elem.type === "income" ? bal + elem.amount : bal - elem.amount;

    const formattedDate = new Date(elem.date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
    });

    if (formattedDate === lastDate) {
      trendData[trendData.length - 1].balance = bal;
    } else {
      trendData.push({ date: formattedDate, balance: bal });
      lastDate = formattedDate;
    }
  });


  const COLORS = ["#4CAF50", "#2196F3", "#FFC107", "#FF5722", "#9C27B0"];

  return (
    <div>
      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 m-10">
        {/* Balance Card */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 group hover:shadow-md transition-all text-black">
          <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-5 bg-white/20 rounded-xl backdrop-blur-md ">
                <Wallet className="w-6 h-6 text-blue-500  rounded-md" />
              </div>
              <h3 className="text-slate-500 dark:text-slate-400 font-medium uppercase text-xs tracking-wider">
                Total Balance
              </h3>
            </div>
            <p className="text-black dark:text-slate-400 font-bold uppercase text-3xl tracking-wider">
              &#8377; {stats.balance}
            </p>
            <div className="mt-4 flex items-center gap-2"></div>
          </div>
        </div>

        {/* Income Card */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 group hover:shadow-md transition-all">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl">
              <ArrowUpCircle className="w-6 h-6 text-emerald-500" />
            </div>
            <h3 className="text-slate-500 dark:text-slate-400 font-medium uppercase text-xs tracking-wider">
              Total Income
            </h3>
          </div>
          <p className="text-3xl font-bold text-slate-800 dark:text-white tracking-tight">
            &#8377; {stats.income}
          </p>
        </div>

        {/* Expenses Card */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 group hover:shadow-md transition-all">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-rose-50 dark:bg-rose-500/10 rounded-xl">
              <ArrowDownCircle className="w-6 h-6 text-rose-500" />
            </div>
            <h3 className="text-slate-500 dark:text-slate-400 font-medium uppercase text-xs tracking-wider">
              Total Expenses
            </h3>
          </div>
          <p className="text-3xl font-bold text-slate-800 dark:text-white tracking-tight">
            &#8377; {stats.expense}
          </p>
        </div>
      </div>

      {/* charts */}

      <div className="flex gap-3 m-10 ">
        <div className="w-1/2 h-100 bg-gray-200 dark:bg-gray-800 p-5">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={100}
                outerRadius={130}
                paddingAngle={3}
                cornerRadius={10}
                stroke="none"
              >
                {categoryData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>

              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="h-100 w-1/2  bg-gray-200 dark:bg-gray-800 p-3">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData}>
              <XAxis dataKey="date" />
              <YAxis dataKey="balance" />
              <CartesianGrid horizontal={false} />
              <Area dataKey="balance" type="monotone" />

              <Tooltip />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
