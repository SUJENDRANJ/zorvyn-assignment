import React, { useState, useEffect } from 'react';
import { X, DollarSign, Calendar, Tag, Info } from 'lucide-react';

const TransactionForm = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: '',
    type: 'expense',
    date: new Date().toISOString().split('T')[0]
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        amount: initialData.amount.toString(),
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.amount || isNaN(formData.amount) || Number(formData.amount) <= 0) {
      newErrors.amount = 'Valid amount is required';
    }
    if (!formData.category.trim()) newErrors.category = 'Category is required';
    if (!formData.date) newErrors.date = 'Date is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSave({
        ...formData,
        amount: Number(formData.amount)
      });
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
        <div>
          <h2 className="heading-2">
            {initialData ? 'Update Transaction' : 'New Transaction'}
          </h2>
          <p className="text-[10px] text-muted font-bold uppercase tracking-tight mt-0.5">Details</p>
        </div>
        <button
          onClick={onCancel}
          className="p-1.5 text-muted hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-8 flex-1 overflow-y-auto space-y-6">
        {/* Title */}
        <div className="space-y-2">
          <label className="label-caps flex items-center gap-2">
            <Info className="w-3.5 h-3.5" /> Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Monthly Grocery"
            className={`input-base ${errors.title ? 'border-rose-500 ring-rose-500/10' : ''}`}
          />
          {errors.title && <p className="text-rose-500 text-[10px] font-black uppercase tracking-widest ml-1">{errors.title}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Amount */}
          <div className="space-y-2">
            <label className="label-caps flex items-center gap-2">
              <DollarSign className="w-3.5 h-3.5" /> Amount
            </label>
            <div className="relative group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="0.00"
                step="0.01"
                className={`input-base !pl-8 ${errors.amount ? 'border-rose-500 ring-rose-500/10' : ''}`}
              />
            </div>
            {errors.amount && <p className="text-rose-500 text-[10px] font-black uppercase tracking-widest ml-1">{errors.amount}</p>}
          </div>

          {/* Date */}
          <div className="space-y-2">
            <label className="label-caps flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5" /> Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={`input-base cursor-pointer ${errors.date ? 'border-rose-500 ring-rose-500/10' : ''}`}
            />
            {errors.date && <p className="text-rose-500 text-[10px] font-black uppercase tracking-widest ml-1">{errors.date}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Category */}
          <div className="space-y-2">
            <label className="label-caps flex items-center gap-2">
              <Tag className="w-3.5 h-3.5" /> Category
            </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="e.g. Food & Drinks"
              className={`input-base ${errors.category ? 'border-rose-500 ring-rose-500/10' : ''}`}
            />
            {errors.category && <p className="text-rose-500 text-[10px] font-black uppercase tracking-widest ml-1">{errors.category}</p>}
          </div>

          {/* Transaction Type */}
          <div className="space-y-2">
            <label className="label-caps">Transaction Type</label>
            <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => handleChange({ target: { name: 'type', value: 'expense' } })}
                className={`flex-1 py-1.5 px-4 rounded text-xs font-bold uppercase tracking-tight transition-all ${
                  formData.type === 'expense'
                    ? 'bg-white dark:bg-slate-700 shadow-sm text-rose-600'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Expense
              </button>
              <button
                type="button"
                onClick={() => handleChange({ target: { name: 'type', value: 'income' } })}
                className={`flex-1 py-1.5 px-4 rounded text-xs font-bold uppercase tracking-tight transition-all ${
                  formData.type === 'income'
                    ? 'bg-white dark:bg-slate-700 shadow-sm text-emerald-600'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Income
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Footer Actions */}
      <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex flex-col-reverse sm:flex-row justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="btn btn-secondary w-full sm:w-auto justify-center"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="btn btn-primary w-full sm:w-auto justify-center rounded-lg"
        >
          {initialData ? 'Save Changes' : 'Create Transaction'}
        </button>
      </div>
    </div>
  );
};

export default TransactionForm;
