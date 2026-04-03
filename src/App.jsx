import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { setRole, toggleTheme } from "./redux/uiSlice";
import { useEffect, useState } from "react";
import {
  addTransaction,
  deleteTransaction,
  editTransaction,
  fetchTransactions,
} from "./redux/transactionSlice";

const App = () => {
  const [value, setValue] = useState("");
  const [edit, setEdit] = useState(null);

  const dispatch = useDispatch();

  const { items, error, loading } = useSelector((store) => store.transactions);

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;

  if (error) return <p>{error}</p>;

  return (
    <div className="dark:text-amber-600">
      <button
        onClick={() => {
          dispatch(toggleTheme());
          dispatch(setRole("viewer"));
        }}
      >
        mode
      </button>

      {edit && (
        <div>
          <input
            type="text"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            className="border"
          />
          <button
            onClick={() => {
              const obj = {
                ...edit,
                title: value,
              };

              dispatch(editTransaction(obj));
            }}
          >
            Edit
          </button>
        </div>
      )}

      {items &&
        items.map((item) => (
          <div key={item.id}>
            {item.title}

            <button
              className="border p-2"
              onClick={() => {
                setEdit(item);
              }}
            >
              Edit
            </button>
            <button
              className="border p-2"
              onClick={() => {
                dispatch(deleteTransaction(item.id));
              }}
            >
              Delete
            </button>
          </div>
        ))}

      <button
        onClick={() => {
          dispatch(addTransaction({ id: Date.now(), title: "Suje" }));
        }}
      >
        Add
      </button>
    </div>
  );
  // <RouterProvider router={router} />;
};

export default App;
