const Navbar = ({ role, setRole }) => {
  return (
    <div className="flex justify-between p-4 bg-white shadow">
      <h1 className="font-bold">Finance App</h1>

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="admin">Admin</option>
        <option value="viewer">Viewer</option>
      </select>
    </div>
  );
};

export default Navbar;
