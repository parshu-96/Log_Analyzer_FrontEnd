import React, { useState } from "react";
import admindashlogo from "./../assets/AdminDashboardLogo.png"; // Adjust the path as necessary

const AdminDashboard = () => {
  const [logTypes, setLogTypes] = useState([
    "Authentication Logs",
    "System Errors",
  ]);
  const [showLogTypeForm, setShowLogTypeForm] = useState(false);
  const [newLogType, setNewLogType] = useState("");
  const [selectedLogType, setSelectedLogType] = useState(null);
  const [entries, setEntries] = useState({
    "Authentication Logs": [
      {
        logLine: "Failed login attempt for user 'admin'",
        solution: "Check credentials and unlock account.",
      },
    ],
    "System Errors": [],
  });
  const [logLine, setLogLine] = useState("");
  const [solution, setSolution] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const handleAddLogType = () => {
    if (!newLogType.trim()) return;
    if (logTypes.includes(newLogType)) return alert("Log type already exists.");
    setLogTypes([...logTypes, newLogType]);
    setEntries({ ...entries, [newLogType]: [] });
    setNewLogType("");
    setShowLogTypeForm(false);
  };

  const handleBlockClick = (type) => {
    setSelectedLogType(type);
    setLogLine("");
    setSolution("");
    setEditIndex(null);
    setShowLogTypeForm(false);
  };

  const handleDeleteLogType = (type) => {
    if (window.confirm(`Delete log type "${type}"?`)) {
      const updatedTypes = logTypes.filter((t) => t !== type);
      const updatedEntries = { ...entries };
      delete updatedEntries[type];
      setLogTypes(updatedTypes);
      setEntries(updatedEntries);
      if (selectedLogType === type) {
        setSelectedLogType(null);
      }
    }
  };

  const handleAddEntry = () => {
    if (!logLine.trim() || !solution.trim()) return;
    const newEntry = { logLine, solution };
    const updated = [...(entries[selectedLogType] || [])];

    if (editIndex !== null) {
      updated[editIndex] = newEntry;
    } else {
      updated.push(newEntry);
    }

    setEntries({ ...entries, [selectedLogType]: updated });
    setLogLine("");
    setSolution("");
    setEditIndex(null);
  };

  const handleDelete = (index) => {
    const updated = entries[selectedLogType].filter((_, i) => i !== index);
    setEntries({ ...entries, [selectedLogType]: updated });
  };

  const handleEdit = (index) => {
    const entry = entries[selectedLogType][index];
    setLogLine(entry.logLine);
    setSolution(entry.solution);
    setEditIndex(index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-gray-950 text-white p-6">
      {/* Logo / Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="bg-sky-600 rounded-full p-3">
          <img
            src={admindashlogo}
            alt="Logo"
            className="h-10 w-10 object-contain"
          />
        </div>
        <h1 className="text-4xl font-extrabold text-white">
          Log Admin Dashboard
        </h1>
      </div>

      {/* Add Log Type */}
      <div className="mb-6 flex items-center gap-4">
        <button
          onClick={() => {
            setShowLogTypeForm(!showLogTypeForm);
            setSelectedLogType(null);
          }}
          className="bg-sky-600 hover:bg-sky-500 transition text-white px-4 py-2 rounded-md shadow-md"
        >
          + Add Log Type
        </button>

        {showLogTypeForm && (
          <div className="flex gap-2 items-center">
            <input
              type="text"
              placeholder="New log type name"
              value={newLogType}
              onChange={(e) => setNewLogType(e.target.value)}
              className="px-3 py-2 bg-slate-800 text-white border border-slate-600 rounded-md w-64 focus:outline-none"
            />
            <button
              onClick={handleAddLogType}
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-md"
            >
              Submit
            </button>
          </div>
        )}
      </div>

      {/* Log Type Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {logTypes.map((type, idx) => (
          <div
            key={idx}
            className={`bg-slate-800 transition rounded-lg p-5 shadow-md border-2 cursor-pointer ${
              selectedLogType === type
                ? "border-sky-500"
                : "border-slate-700 hover:bg-slate-700"
            }`}
            onClick={() => handleBlockClick(type)}
          >
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">{type}</h2>
              {selectedLogType === type && (
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBlockClick(type);
                    }}
                    className="bg-sky-600 text-white text-xs px-3 py-1 rounded hover:bg-sky-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteLogType(type);
                    }}
                    className="bg-rose-600 text-white text-xs px-3 py-1 rounded hover:bg-rose-500"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Log Entry Form */}
      {selectedLogType && (
        <div className="bg-slate-800 rounded-lg p-6 mb-8 shadow-md max-w-2xl">
          <h2 className="text-xl font-semibold mb-4 text-sky-400">
            Add Entry for <span className="text-white">{selectedLogType}</span>
          </h2>
          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Log Line"
              value={logLine}
              onChange={(e) => setLogLine(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-white px-4 py-2 rounded focus:outline-none"
            />
            <input
              type="text"
              placeholder="Probable Solution"
              value={solution}
              onChange={(e) => setSolution(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-white px-4 py-2 rounded focus:outline-none"
            />
            <button
              onClick={handleAddEntry}
              className="bg-sky-600 hover:bg-sky-500 text-white px-4 py-2 rounded-md w-max mt-2"
            >
              {editIndex !== null ? "Update Entry" : "Submit Entry"}
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      {selectedLogType && entries[selectedLogType]?.length > 0 && (
        <div className="overflow-x-auto max-w-4xl bg-slate-800 rounded-lg shadow-md">
          <table className="min-w-full text-sm text-white">
            <thead className="bg-slate-700">
              <tr>
                <th className="px-4 py-3 border border-slate-700">#</th>
                <th className="px-4 py-3 border border-slate-700">Log Line</th>
                <th className="px-4 py-3 border border-slate-700">
                  Probable Solution
                </th>
                <th className="px-4 py-3 border border-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {entries[selectedLogType].map((entry, idx) => (
                <tr key={idx} className="hover:bg-slate-700">
                  <td className="px-4 py-2 border border-slate-700">
                    {idx + 1}
                  </td>
                  <td className="px-4 py-2 border border-slate-700">
                    {entry.logLine}
                  </td>
                  <td className="px-4 py-2 border border-slate-700">
                    {entry.solution}
                  </td>
                  <td className="px-4 py-2 border border-slate-700 space-x-2">
                    <button
                      onClick={() => handleEdit(idx)}
                      className="text-sky-400 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(idx)}
                      className="text-rose-400 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
