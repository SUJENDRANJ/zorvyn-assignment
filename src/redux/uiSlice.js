import { createSlice } from "@reduxjs/toolkit";

const getInitialTheme = () => {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.documentElement.classList.add("dark");

    return savedTheme;
  }
  return "light";
};
const getInitialRole = () => {
  const role = localStorage.getItem("role");
  if (role) return role;

  return "admin";
};

const uiSlice = createSlice({
  name: "ui",
  initialState: { theme: getInitialTheme(), role: getInitialRole() },
  reducers: {
    toggleTheme: (state, action) => {
      state.theme = state.theme === "light" ? "dark" : "light";
      localStorage.setItem("theme", state.theme);
      document.documentElement.classList.toggle("dark");
    },
    setRole: (state, action) => {
      state.role = action.payload;
      localStorage.setItem("role", state.role);
    },
  },
});

export const { toggleTheme, setRole } = uiSlice.actions;
export default uiSlice.reducer;
