import { Moon, Sun } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setRole, toggleTheme } from "../redux/uiSlice";

const Header = () => {
  const dispatch = useDispatch();

  const { theme, role } = useSelector((store) => store.ui);

  function handleToggleTheme() {
    dispatch(toggleTheme());
  }
  function handleSetRole(e) {
    dispatch(setRole(e.target.value));
  }

  return (
    <header className="mb-8 flex max-sm:flex-col justify-between items-center bg-white dark:bg-gray-900 p-6 shadow-sm border border-gray-100 dark:border-gray-800 gap-4">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Dashboard
        </h1>
      </div>

      <div className="flex items-center gap-6">
        <button
          onClick={handleToggleTheme}
          className="p-2.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700  dark:border-gray-700"
        >
          {theme === "light" ? (
            <Moon className="w-5 h-5" />
          ) : (
            <Sun className="w-5 h-5" />
          )}
        </button>

        {/* <div className="h-8 w-px bg-gray-200 dark:bg-gray-800 hidden sm:block"></div> */}

        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-gray-400">Role:</span>
          <select
            value={role}
            onChange={handleSetRole}
            className="px-4 py-2 bg-gray-100 dark:bg-gray-800 border-none rounded-md text-sm font-semibold text-gray-700 dark:text-gray-200 cursor-pointer outline-none"
          >
            <option value="admin">Admin</option>
            <option value="viewer">Viewer</option>
          </select>
        </div>
      </div>
    </header>
  );
};

export default Header;
