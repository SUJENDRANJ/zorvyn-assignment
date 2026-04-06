import React from 'react';
import { SearchX, Plus, Inbox } from 'lucide-react';

const EmptyState = ({ onClear, onAdd, role, hasFilters = true }) => {
  return (
    <div className="text-center py-20 px-8 card bg-slate-50/50 dark:bg-slate-900/40 border-dashed border-2 shadow-none relative overflow-hidden">
      <div className="relative z-10 max-w-sm mx-auto">
        <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center mx-auto mb-6 border border-slate-200 dark:border-slate-700">
          {hasFilters ? (
            <SearchX className="w-8 h-8 text-slate-400" />
          ) : (
            <Inbox className="w-8 h-8 text-slate-300 dark:text-slate-600" />
          )}
        </div>
        
        <h3 className="text-xl font-bold tracking-tight mb-2 text-slate-900 dark:text-white">
          {hasFilters ? 'No results found' : 'No data yet'}
        </h3>
        <p className="text-slate-500 dark:text-slate-400 mb-8 text-xs font-medium leading-relaxed">
          {hasFilters 
            ? "We couldn't find any transactions matching your parameters. Try clarifying your search." 
            : 'Get started by creating your first transaction to see financial insights.'}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
          {hasFilters ? (
            <button
              onClick={onClear}
              className="btn btn-secondary w-full sm:w-auto !px-6 !py-2 !text-xs"
            >
              Reset filters
            </button>
          ) : (
            role === 'admin' && (
              <button
                onClick={onAdd}
                className="btn btn-primary w-full sm:w-auto !px-6 !py-2 !text-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                Add first transaction
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
