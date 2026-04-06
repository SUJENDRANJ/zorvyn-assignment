import { createSlice } from '@reduxjs/toolkit';

const getInitialTheme = () => {
  if (typeof window !== 'undefined') {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
};

const getInitialRole = () => {
  if (typeof window !== 'undefined') {
    const savedRole = localStorage.getItem('role');
    return savedRole || 'admin';
  }
  return 'admin';
};

const initialState = {
  theme: getInitialTheme(),
  role: getInitialRole(),
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', state.theme);
      if (state.theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },
    setRole: (state, action) => {
      state.role = action.payload;
      localStorage.setItem('role', state.role);
    },
  },
});

export const { toggleTheme, setRole } = uiSlice.actions;
export default uiSlice.reducer;
