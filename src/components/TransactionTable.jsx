import React from "react";
import { ArrowUpDown, Pencil, Trash2, Tag, Layers } from "lucide-react";

const TransactionTable = ({
  transactions,
  isGrouped,
  sortConfig,
  handleSort,
  handleEdit,
  handleDelete,
  role,
}) => {
  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      return (
        <ArrowUpDown
          className={`w-3.5 h-3.5 ml-1 inline-block ${sortConfig.direction === "asc" ? "text-blue-600" : "text-blue-600 rotate-180"}`}
        />
      );
    }
    return (
      <ArrowUpDown className="w-3.5 h-3.5 ml-1 inline-block text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const renderTransactionRow = (txn) => (
    <tr
      key={txn.id}
      className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors group border-b border-slate-100 dark:border-slate-800/60 last:border-0"
    >
      <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-500 font-medium">
        {formatDate(txn.date)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-slate-200 font-semibold text-left">
        {txn.title}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-right sm:text-left">
        <span
          className={
            txn.type === "income"
              ? "text-emerald-600"
              : "text-slate-900 dark:text-slate-100"
          }
        >
          {txn.type === "income" ? "+" : ""}
          {formatAmount(txn.amount)}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-500 hidden md:table-cell">
        <span className="inline-flex items-center px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
          {txn.category}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-xs hidden sm:table-cell">
        <div
          className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold tracking-tight border ${
            txn.type === "income"
              ? "bg-emerald-50 dark:bg-emerald-900/10 text-emerald-700 border-emerald-100 dark:border-emerald-900/30"
              : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700"
          }`}
        >
          {txn.type.toUpperCase()}
        </div>
      </td>
      {role === "admin" && (
        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
          <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => handleEdit(txn)}
              className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors"
              title="Edit"
            >
              <Pencil className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => handleDelete(txn.id)}
              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors"
              title="Delete"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </td>
      )}
    </tr>
  );

  const renderTransactionCard = (txn) => (
    <div key={txn.id} className="card p-4 space-y-3">
      <div className="flex justify-between items-start">
        <div className="space-y-0.5">
          <p className="label-caps tracking-tighter !text-[9px]">
            {formatDate(txn.date)}
          </p>
          <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
            {txn.title}
          </h4>
        </div>
        <div
          className={`px-2 py-0.5 rounded text-[9px] font-bold tracking-tight border ${
            txn.type === "income"
              ? "bg-emerald-50 dark:bg-emerald-900/10 text-emerald-700 border-emerald-100 dark:border-emerald-900/30"
              : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700"
          }`}
        >
          {txn.type.toUpperCase()}
        </div>
      </div>

      <div className="flex justify-between items-center pt-1">
        <div className="flex items-center gap-1.5">
          <Tag className="w-3 h-3 text-slate-400" />
          <span className="text-xs font-medium text-slate-500">
            {txn.category}
          </span>
        </div>
        <p
          className={`text-lg font-bold ${txn.type === "income" ? "text-emerald-600" : "text-slate-900 dark:text-white"}`}
        >
          {txn.type === "income" ? "+" : ""}
          {formatAmount(txn.amount)}
        </p>
      </div>

      {role === "admin" && (
        <div className="flex gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={() => handleEdit(txn)}
            className="flex-1 btn btn-secondary !py-1.5 !text-[10px] !font-bold"
          >
            <Pencil className="w-3 h-3" /> Edit
          </button>
          <button
            onClick={() => handleDelete(txn.id)}
            className="flex-1 btn btn-secondary !py-1.5 !text-[10px] !font-bold !text-rose-500"
          >
            <Trash2 className="w-3 h-3" /> Delete
          </button>
        </div>
      )}
    </div>
  );

  const renderGroupedContent = () => {
    return Object.entries(transactions).map(([groupName, groupTxns]) => (
      <div key={groupName} className="mb-8 last:mb-0">
        <div className="flex items-center gap-2 mb-3">
          <h1 className="label-caps !tracking-widest flex items-center gap-2 text-slate-500">
            <Layers className="w-3.5 h-3.5" /> {groupName}
          </h1>
          <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800"></div>
          <span className="text-[10px] font-bold text-slate-400">
            {groupTxns.length} items
          </span>
        </div>

        {/* Mobile View */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:hidden">
          {groupTxns.map(renderTransactionCard)}
        </div>

        {/* Desktop View */}
        <div className="hidden lg:block overflow-hidden card">
          <table className="w-full text-left border-collapse">
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {groupTxns.map(renderTransactionRow)}
            </tbody>
          </table>
        </div>
      </div>
    ));
  };

  const renderFlatContent = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:hidden">
        {transactions.map(renderTransactionCard)}
      </div>

      <div className="hidden lg:block overflow-hidden card">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800">
              <th
                className="px-6 py-3 cursor-pointer group hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border  p-2 w-20 bg-gray-200"
                onClick={() => handleSort("date")}
              >
                <div className="flex items-center label-caps ">
                  Date {getSortIcon("date")}
                </div>
              </th>
              <th className="px-6 py-3 label-caps">Title</th>
              <th
                className="px-6 py-3 cursor-pointer group hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border bg-gray-200"
                onClick={() => handleSort("amount")}
              >
                <div className="flex items-center label-caps">
                  Amount {getSortIcon("amount")}
                </div>
              </th>
              <th className="px-6 py-3 label-caps hidden md:table-cell">
                Category
              </th>
              <th className="px-6 py-3 label-caps hidden sm:table-cell">
                Type
              </th>
              {role === "admin" && (
                <th className="px-6 py-3 label-caps text-right">Actions</th>
              )}
            </tr>
          </thead>
          <tbody>{transactions.map(renderTransactionRow)}</tbody>
        </table>
      </div>
    </>
  );

  if (Object.keys(transactions).length === 0) {
    return (
      <div className="text-center py-12 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-lg">
        <p className="text-slate-400 font-semibold text-base">
          No results found
        </p>
        <p className="text-slate-400 text-xs mt-1">
          Try adjusting your filters
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {isGrouped ? renderGroupedContent() : renderFlatContent()}
    </div>
  );
};

export default TransactionTable;
