import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  addTransaction,
  deleteTransaction,
  editTransaction,
} from "../redux/transactionSlice";

const Table = ({ transactionsData, model, setModel }) => {
  const [filteredData, setFilteredData] = useState(
    transactionsData ? transactionsData : [],
  );

  useEffect(() => {
    setFilteredData(transactionsData || []);
  }, [transactionsData]);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [search, setSearch] = useState("");

  const [error, setError] = useState("");

  const [editId, setEditId] = useState("");

  const dispatch = useDispatch();

  function handleAdd(e) {
    e.preventDefault();

    if (!title.trim() || !amount || !date || !type.trim() || !category.trim()) {
      setError("Fields are missing");
      return;
    }

    if (editId) {
      dispatch(
        editTransaction({
          id: editId,
          title,
          amount,
          date,
          type,
          category,
        }),
      );
    } else {
      dispatch(
        addTransaction({
          title,
          amount,
          date,
          type,
          category,
        }),
      );
    }

    setError("");
    setTitle("");
    setAmount(0);
    setType("");
    setDate("");
    setEditId("");
    setCategory("");

    setModel(false);
  }

  function handleEdit(e, elem) {
    e.preventDefault();
    setModel(true);

    const { id, title, amount, date, category, type } = elem;

    setTitle(title);
    setAmount(amount);
    setDate(date);
    setType(type);
    setCategory(category);

    setEditId(id);
  }

  function handleDelete(e, id) {
    e.preventDefault();
    dispatch(deleteTransaction(id));
  }

  if (!filteredData || !filteredData.length) {
    return (
      <div>
        {/* model */}
        {model && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="border w-100 h-60"
          >
            {error && <p>{error}</p>}
            <form>
              <input
                type="text"
                name=""
                id=""
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                placeholder="title"
              />

              <input
                type="text"
                name=""
                id=""
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
                placeholder="category"
              />

              <br />
              <br />
              <select
                value={type}
                onChange={(e) => {
                  setType(e.target.value);
                }}
              >
                <option value="income">income</option>
                <option value="expense">expense</option>
              </select>
              <br />
              <br />
              <input
                type="number"
                name=""
                id=""
                min={1}
                placeholder="amount"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
              />
              <br />
              <br />
              <input
                type="date"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                }}
              />
              <br />
              <br />

              <button onClick={handleAdd}>{editId ? "edit" : "add"}</button>
            </form>
          </div>
        )}

        <p>No data !</p>
        <br />

        <button onClick={() => setModel(true)}>Add New</button>
      </div>
    );
  }

  function handleGroupBy(e) {
    if (e.target.value === "category") {
      const obj = {};

      filteredData.forEach((elem) => {
        const category = elem.category;

        if (obj[category]) {
          obj[category].push(elem);
        } else obj[category] = [elem];
      });
    }

    if (e.target.value === "month") {
      const obj = {};
      filteredData.forEach((elem) => {
        const date = new Date(elem.date).toLocaleString("en-IN", {
          month: "short",
          year: "numeric",
        });

        if (obj[date]) obj[date].push(elem);
        else obj[date] = [elem];
      });
      console.log(obj);
    }
  }

  useEffect(() => {
    dateFilter();
  }, [startDate, endDate]);

  function dateFilter() {
    let data = filteredData;

    if (startDate) {
      const start = new Date(startDate).getTime();
      data = data.filter((d) => new Date(d.date).getTime() >= start);
    }

    if (endDate) {
      const end = new Date(endDate).getTime();
      data = data.filter((d) => new Date(d.date).getTime() <= end);
    }

    setFilteredData(data);
  }

  function handleSearch(e) {
    console.log(e.target.value);

    setFilteredData(
      transactionsData.filter((elem) =>
        elem.title.toLowerCase().includes(e.target.value.toLowerCase()),
      ),
    );

    setSearch(e.target.value);
  }

  return (
    <div>
      {/* model */}

      {model && (
        <div onClick={(e) => e.stopPropagation()} className="border w-100 h-60">
          {error && <p>{error}</p>}
          <form>
            <input
              type="text"
              name=""
              id=""
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              placeholder="title"
            />

            <input
              type="text"
              name=""
              id=""
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="category"
            />

            <br />
            <br />
            <select
              value={type}
              onChange={(e) => {
                setType(e.target.value);
              }}
            >
              <option value="income">income</option>
              <option value="expense">expense</option>
            </select>
            <br />
            <br />
            <input
              type="number"
              name=""
              id=""
              min={1}
              placeholder="amount"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
              }}
            />
            <br />
            <br />
            <input
              type="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
            />
            <br />
            <br />

            <button onClick={handleAdd}>{editId ? "edit" : "add"}</button>
          </form>
        </div>
      )}

      <input
        type="text"
        className="border"
        placeholder="search"
        value={search}
        onChange={handleSearch}
      />
      <button onClick={handleSearch}>Seach</button>

      {filteredData.length && (
        <select name="" id="">
          {filteredData.map(({ category, id }) => (
            <option key={id} value="">
              {category}
            </option>
          ))}
        </select>
      )}

      <select onChange={handleGroupBy} name="group by" id="">
        <option value="month">month</option>
        <option value="category">category</option>
      </select>

      <input
        type="date"
        name=""
        id=""
        value={startDate}
        onChange={(e) => {
          setStartDate(e.target.value);
        }}
      />
      <input
        type="date"
        name=""
        id=""
        value={endDate}
        onChange={(e) => {
          setEndDate(e.target.value);
        }}
      />

      <button onClick={() => setModel(true)}>Add</button>

      <table width={1000} className="border">
        <thead></thead>

        <tbody>
          <tr>
            <td>S.No</td>
            <td
              onClick={() => {
                setFilteredData(
                  [...filteredData].sort((a, b) =>
                    a.title.localeCompare(b.title),
                  ),
                );
              }}
            >
              Title
            </td>
            <td>category</td>
            <td
              onClick={() => {
                setFilteredData(
                  [...filteredData].sort(
                    (a, b) =>
                      new Date(a.date).getTime() - new Date(b.date).getTime(),
                  ),
                );
              }}
            >
              Date
            </td>
            <td
              onClick={() => {
                setFilteredData(
                  [...filteredData].sort((a, b) => a.amount - b.amount),
                );
              }}
            >
              Amount
            </td>
            <td>type</td>
          </tr>
          {filteredData?.map((elem, index) => (
            <tr key={elem.id}>
              <td>{index + 1}</td>
              <td>{elem.title}</td>
              <td>{elem.category}</td>
              <td>{elem.date}</td>
              <td>{elem.amount}</td>
              <td>{elem.type}</td>
              <td onClick={(e) => handleEdit(e, elem)}>edit</td>
              <td onClick={(e) => handleDelete(e, elem.id)}>delete</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
