import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { date: "Jan", balance: 4000 },
  { date: "Feb", balance: 3000 },
  { date: "Mar", balance: 5000 },
  { date: "Apr", balance: 4500 },
  { date: "May", balance: 6000 },
];

export default function BalanceTrend({ data: transactionsData }) {
  return (
    <div className="w-full h-[300px] bg-gray-900">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4CAF50" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#4CAF50" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="date" />
          <YAxis />

          <Tooltip />

          <Area
            type="monotone"
            dataKey="balance"
            fillOpacity={0.1}
            fill="white"
            stroke="red"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
