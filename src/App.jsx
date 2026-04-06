import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Header from "./components/Header";
import { fetchTransactions } from "./redux/transactionSlice";
import Dashboard from "./components/Dashboard";
import { useEffect, useState } from "react";
import Table from "./components/Table";
import Insights from "./components/Insights";

const App = () => {
  const [model, setModel] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTransactions());
  }, []);

  const { error, loading, items } = useSelector((store) => store.transactions);

  return (
    <div
      onClick={() => {
        model && setModel(false);
      }}
    >
      <Header />
      {loading ? (
        <p>loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <main>
          {/* <Dashboard transactionsData={items} /> */}

          {/* <Table transactionsData={items} model={model} setModel={setModel} /> */}

          <Insights transactionsData={items} />
        </main>
      )}
    </div>
  );
};

export default App;
