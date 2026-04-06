# Professional Finance Dashboard

A production-ready, highly responsive financial management application built with **React**, **Redux Toolkit**, and **Tailwind CSS**. This dashboard provides a experience for tracking transactions, analyzing trends, and managing personal or business finances across all devices.

## 🚀 Quick Start

Follow these steps to get the project running locally on your machine:

1. **Clone and Install**
   ```bash
   # Navigate to the project directory
   cd "zorvyn-assignment"

   # Install dependencies
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Access the App**
   Open your browser and navigate to `http://localhost:5173`.

---

## ✨ Core Features

### 1. Advanced Data Management
- **Redux Toolkit Integration**: A robust, centralized state management system for transactions, UI settings, and filters.
- **LocalStorage Persistence**: Your dashboard settings and financial data are automatically saved and restored on page refresh.
- **Mock API Simulation**: Realistic asynchronous data fetching with a built-in loading spinner for a premium app feel.

### 2. Powerful Filtering & Grouping
- **Advanced Filters**: Filter by Date Range, Category (Food, Transport, etc.), and Transaction Type (Income/Expense).
- **Intelligent Grouping**: Toggle between "Group by Category" or "Group by Month" to reveal hidden spending patterns.
- **Dynamic Search**: Instant results as you type across all transaction fields.

### 3. Mobile-First Responsive Design
- **Card View Architecture**: A custom layout that automatically replaces the desktop table on smaller screens (Mobile/Tablet) for maximum readability.
- **Adaptive UI**: The entire dashboard—including insights and charts—adjusts beautifully from widescreen monitors to handheld smartphones.

### 4. Professional UX & Aesthetics
- **Framer Motion Animations**: Smooth layout transitions, modal entries, and interactive micro-animations.
- **Dark Mode Support**: A sleek, persistent dark theme for late-night financial tracking.
- **Role-Based UI**: Simulate "Admin" (CRUD access) and "Viewer" (Read-only) roles to see how permissions affect the interface.

---

## 🛠️ Technical Approach

### Modular Architecture
The application is built using a strict modular pattern, separating logic into four main layers:
- **`src/components`**: Pure UI components like `TransactionTable`, `Insights`, and `EmptyState`.
- **`src/store`**: Redux slices handling business logic and data persistence.
- **`src/hooks` (if applicable)**: Custom logic for themes and responsiveness.

### State Management
We use **Redux Toolkit** to ensure a single source of truth. Asynchronous operations are handled via `createAsyncThunk` to simulate a real backend, providing a scalable foundation for future API integration.

### Responsive Strategy
Instead of simple overflow scrolling, we use **Tailwind breakpoints** (md, lg, xl) to completely swap the UI implementation (Table vs. Cards) on small devices. This ensures a "App-like" feel on mobile rather than a scaled-down desktop site.

---

## 📦 Tech Stack
- **Framework**: [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **State**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
