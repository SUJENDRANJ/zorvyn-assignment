import React, { useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { Search, Plus, Filter, X } from "lucide-react";
import {
  addTransaction,
  editTransaction,
  deleteTransaction,
} from "../store/transactionsSlice";
import TransactionTable from "./TransactionTable";
import TransactionForm from "./TransactionForm";
import EmptyState from "./EmptyState";

const Transactions = ({ transactions, role }) => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [groupBy, setGroupBy] = useState("None");
  const [showFilters, setShowFilters] = useState(false);
  const [sortConfig, setSortConfig] = useState({
    key: "date",
    direction: "desc",
  });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  // Extract all categories for the filter
  const categories = useMemo(() => {
    const cats = new Set(transactions.map((t) => t.category));
    return ["All", ...Array.from(cats)].sort();
  }, [transactions]);

  // Combined Filtering and Sorting logic
  const filteredTransactions = useMemo(() => {
    let result = [...transactions];

    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(lower) ||
          t.category.toLowerCase().includes(lower),
      );
    }

    if (filterType !== "All") {
      result = result.filter(
        (t) => t.type.toLowerCase() === filterType.toLowerCase(),
      );
    }

    if (selectedCategory !== "All") {
      result = result.filter((t) => t.category === selectedCategory);
    }

    if (startDate) {
      result = result.filter((t) => new Date(t.date) >= new Date(startDate));
    }
    if (endDate) {
      result = result.filter((t) => new Date(t.date) <= new Date(endDate));
    }

    result.sort((a, b) => {
      if (sortConfig.key === "date") {
        const timeA = new Date(a.date).getTime();
        const timeB = new Date(b.date).getTime();
        return sortConfig.direction === "asc" ? timeA - timeB : timeB - timeA;
      }
      return sortConfig.direction === "asc"
        ? a.amount - b.amount
        : b.amount - a.amount;
    });

    return result;
  }, [
    transactions,
    searchTerm,
    filterType,
    selectedCategory,
    startDate,
    endDate,
    sortConfig,
  ]);

  // Grouping logic
  const processedData = useMemo(() => {
    if (groupBy === "None") return filteredTransactions;

    return filteredTransactions.reduce((acc, txn) => {
      let key =
        groupBy === "Category"
          ? txn.category
          : new Date(txn.date).toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            });

      if (!acc[key]) acc[key] = [];
      acc[key].push(txn);
      return acc;
    }, {});
  }, [filteredTransactions, groupBy]);

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "desc" ? "asc" : "desc",
    }));
  };

  const handleSave = (data) => {
    if (editingTransaction) {
      dispatch(editTransaction({ id: editingTransaction.id, ...data }));
    } else {
      dispatch(addTransaction(data));
    }
    setIsFormOpen(false);
    setEditingTransaction(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      dispatch(deleteTransaction(id));
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setFilterType("All");
    setSelectedCategory("All");
    setStartDate("");
    setEndDate("");
    setGroupBy("None");
  };

  const hasFilters =
    searchTerm ||
    filterType !== "All" ||
    selectedCategory !== "All" ||
    startDate ||
    endDate ||
    groupBy !== "None";

  return (
    <div className="card">
      {/* Header Controls */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-col xl:flex-row gap-4 justify-between items-stretch sm:items-center bg-slate-50 dark:bg-slate-900/40">
        <div className="flex-1 flex flex-col sm:flex-row items-center gap-2">
          <div className="relative flex-1 group">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Quick search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-base !pl-10 !py-2"
            />
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`btn btn-secondary !py-2 !text-xs !px-4 ${showFilters || hasFilters ? "border-blue-500 text-blue-600" : ""}`}
          >
            <Filter className="w-3.5 h-3.5" />
            <span>Options</span>
            {hasFilters && (
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
            )}
          </button>
        </div>

        <div className="flex items-center gap-2">
          {role === "admin" && (
            <button
              onClick={() => {
                setEditingTransaction(null);
                setIsFormOpen(true);
              }}
              className="btn btn-primary !py-2 !text-xs !px-6"
            >
              <Plus className="w-4 h-4" />
              <span>Add Transaction</span>
            </button>
          )}
        </div>
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-white dark:bg-slate-900/20 border-b border-slate-200 dark:border-slate-800">
          <div className="space-y-1">
            <label className="label-caps">Filter Type</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="input-base !py-1.5 !text-xs"
            >
              <option value="All">All Types</option>
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="label-caps">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="input-base !py-1.5 !text-xs"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="label-caps">Grouping</label>
            <select
              value={groupBy}
              onChange={(e) => setGroupBy(e.target.value)}
              className="input-base !py-1.5 !text-xs"
            >
              <option value="None">None</option>
              <option value="Date">Month</option>
              <option value="Category">Category</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="label-caps uppercase tracking-widest text-[9px]">
              Date Range
            </label>
            <div className="flex items-center gap-2">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="input-base !py-1.5 !px-2 !text-xs"
              />
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="input-base !py-1.5 !px-2 !text-xs"
              />
            </div>
          </div>

          <div className="col-span-full flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
            <p className="text-[10px] text-muted uppercase font-bold tracking-tight">
              Count: {filteredTransactions.length}
            </p>
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="text-[10px] font-bold text-rose-500 uppercase tracking-widest flex items-center gap-1 hover:underline"
              >
                <X className="w-3 h-3" /> Reset
              </button>
            )}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-4 sm:p-6">
        {filteredTransactions.length === 0 ? (
          <EmptyState
            hasFilters={hasFilters}
            onClear={clearFilters}
            onAdd={() => setIsFormOpen(true)}
            role={role}
          />
        ) : (
          <TransactionTable
            transactions={processedData}
            isGrouped={groupBy !== "None"}
            sortConfig={sortConfig}
            handleSort={handleSort}
            handleEdit={(txn) => {
              setEditingTransaction(txn);
              setIsFormOpen(true);
            }}
            handleDelete={handleDelete}
            role={role}
          />
        )}
      </div>

      {/* Modal Overlay */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-slate-950/40 z-[100] flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-lg shadow-2xl w-full max-w-lg overflow-hidden border border-slate-200 dark:border-slate-800">
            <TransactionForm
              initialData={editingTransaction}
              onSave={handleSave}
              onCancel={() => {
                setIsFormOpen(false);
                setEditingTransaction(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Transactions;
