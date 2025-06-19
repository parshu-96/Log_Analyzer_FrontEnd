import React, { useState } from "react";
import LogUploader from "../components/LogUploader";
import userdashlogog from "../assets/UserDashboardLogo.png";
import axios from "axios";
import { FunnelIcon } from "@heroicons/react/24/solid";

const UserPage = () => {
  const [showAnalyzeButton, setShowAnalyzeButton] = useState(false);
  const [rcaData, setRcaData] = useState([]);
  const [showRcaTable, setShowRcaTable] = useState(false);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [logLevel, setLogLevel] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  // ✅ Move this up before handleFilter
  const formatDate = (inputDate) => {
    if (!inputDate) return "";
    const parts = inputDate.split("-");
    return `${parts[2]}-${parts[1]}-${parts[0]}`; // dd-mm-yyyy
  };

  const handleFileUploadSuccess = () => {
    setShowAnalyzeButton(true);
    setShowRcaTable(false);
    setRcaData([]);
  };

  const handleAnalyzeClick = () => {
    setShowRcaTable(true);
  };

  const handleFilter = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/analyze/filter", {
        startDate: formatDate(startDate),
        endDate: formatDate(endDate),
        logLevel: logLevel.toLowerCase(),
      });
      setFilteredData(res.data.matchedLines || []);
    } catch (err) {
      console.error("Error filtering log data:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-gray-950 text-white p-6">
      <div className="flex items-center gap-4 mb-8">
        <div className="bg-sky-600 rounded-full p-3">
          <img
            src={userdashlogog}
            alt="Logo"
            className="h-10 w-10 object-contain"
          />
        </div>
        <h1 className="text-4xl font-extrabold text-white">User Dashboard</h1>
      </div>

      <div className="mb-10">
        <LogUploader
          onSuccess={handleFileUploadSuccess}
          onUploadComplete={setRcaData}
        />
      </div>

      {showAnalyzeButton && (
        <div className="mb-10 flex justify-center">
          <button
            onClick={handleAnalyzeClick}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-semibold transition"
          >
            Analyze Log
          </button>
        </div>
      )}

      {/* Analyze Section */}
      {showRcaTable && (
        <div className="mb-10 bg-slate-800 p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4 text-sky-400">
            Analyzed Log Data
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left text-white">
              <thead className="bg-slate-700 text-sky-300">
                <tr>
                  <th className="px-4 py-3">Matched Log Line</th>
                  <th className="px-4 py-3">Possible RCA</th>
                  <th className="px-4 py-3">Log Count</th>
                </tr>
              </thead>
              <tbody>
                {rcaData.map((entry, idx) => (
                  <tr key={idx} className="hover:bg-slate-700">
                    <td className="px-4 py-2 border-t border-slate-600">
                      {entry.matchLine}
                    </td>
                    <td className="px-4 py-2 border-t border-slate-600">
                      {entry.resolutionSteps}
                    </td>
                    <td className="px-4 py-2 border-t border-slate-600">
                      {entry.count}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Filter Section */}
      {showAnalyzeButton && (
        <div className="mb-10 bg-slate-800 p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4 text-sky-400">
            Filter Logs
          </h3>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="p-2 rounded text-black"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="p-2 rounded text-black"
            />
            <select
              value={logLevel}
              onChange={(e) => setLogLevel(e.target.value)}
              className="p-2 rounded text-black"
            >
              <option value="">All</option>
              <option value="[INFO">Info</option>
              <option value="[DEBUG">Debug</option>
              <option value="[ERROR">Error</option>
            </select>
            <button
              onClick={handleFilter}
              className="flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold"
            >
              <FunnelIcon className="h-5 w-5" />
            </button>
          </div>

          {filteredData.length > 0 && (
            <div className="overflow-x-auto mt-4">
              <table className="min-w-full text-sm text-left text-white">
                <thead className="bg-slate-700 text-sky-300">
                  <tr>
                    <th className="px-4 py-3">Log Line</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((line, idx) => (
                    <tr key={idx} className="hover:bg-slate-700">
                      <td className="px-4 py-2 border-t border-slate-600">
                        {line}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserPage;
