import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Receipt,
  BarChart3,
  Sun,
  Moon,
  UserCircle,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme, setRole } from "../store/uiSlice";

const Navigation = () => {
  const dispatch = useDispatch();
  const { theme, role } = useSelector((state) => state.ui);

  const navItems = [
    { to: "/", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/transactions", icon: Receipt, label: "Transactions" },
    { to: "/insights", icon: BarChart3, label: "Insights" },
  ];

  return (
    <>
      {/* Sidebar - Desktop */}
      <aside className="fixed left-0 top-0 h-screen w-64 hidden md:flex flex-col bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-50">
        <div className="p-8 flex items-center gap-3">
          <div className="w-8 h-8 bg-slate-900 dark:bg-blue-600 rounded flex items-center justify-center text-white font-bold text-lg">
            $
          </div>
          <h1 className="heading-1 !text-base">FinanceApp</h1>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium ${
                  isActive
                    ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white"
                    : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                }`
              }
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-4">
          {/* Role Switcher */}
          <div className="px-3 py-2 bg-slate-50 dark:bg-slate-800/40 rounded-md border border-slate-200 dark:border-slate-700/50">
            <div className="flex items-center gap-2 mb-1">
              <UserCircle className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-[10px] font-bold text-slate-400 uppercase">
                Account Role
              </span>
            </div>
            <select
              value={role}
              onChange={(e) => dispatch(setRole(e.target.value))}
              className="w-full bg-transparent border-none p-0 text-xs font-bold text-blue-500 cursor-pointer outline-none"
            >
              <option value="admin">Administrator</option>
              <option value="viewer">Viewer Only</option>
            </select>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={() => dispatch(toggleTheme())}
            className="w-full btn btn-secondary !justify-start !px-3 !py-2 !text-xs !rounded-md"
          >
            {theme === "light" ? (
              <Moon className="w-4 h-4" />
            ) : (
              <Sun className="w-4 h-4" />
            )}
            <span>
              {theme === "light" ? "Appearance: Dark" : "Appearance: Light"}
            </span>
          </button>
        </div>
      </aside>

      {/* Bottom Bar - Mobile */}
      <nav className="fixed bottom-0 left-0 right-0 h-16 md:hidden bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center justify-around px-2 z-50">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 p-2 ${
                isActive
                  ? "text-slate-900 dark:text-white"
                  : "text-slate-400 dark:text-slate-500"
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="text-[9px] font-bold uppercase ">
              {item.label}
            </span>
          </NavLink>
        ))}

        <button
          onClick={() =>
            dispatch(setRole(role === "admin" ? "viewer" : "admin"))
          }
          className="flex flex-col items-center gap-1 p-2 text-slate-400 dark:text-slate-500"
        >
          <UserCircle className="w-5 h-5" />
          <span className="text-[9px] font-bold uppercase ">{role}</span>
        </button>

        <button
          onClick={() => dispatch(toggleTheme())}
          className="flex flex-col items-center gap-1 p-2 text-slate-400 dark:text-slate-500"
        >
          {theme === "light" ? (
            <Moon className="w-5 h-5" />
          ) : (
            <Sun className="w-5 h-5" />
          )}
          <span className="text-[9px] font-bold uppercase ">Mode</span>
        </button>
      </nav>
    </>
  );
};

export default Navigation;
