/*// src/pages/UserPage.jsx
import LogUploader from "../components/LogUploader";

const UserPage = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold text-center mb-6">User Portal</h2>
      <LogUploader />
    </div>
  );
};

export default UserPage;*/
import React, { useState } from "react";
import LogUploader from "../components/LogUploader";
import userdashlogog from "../assets/UserDashboardLogo.png";

const sampleLogs = [
  "[16-06-2025] [12:59:27_427][T013508]  [ 10260 ] [INFO ]  [ PEER-MANAGER ] We know actually peer not reachable or Session Time out error occure and that is already sent to UI.",
  "[02-05-2025] [10:08:12_471][P8712][T004512][error] Error from HySecure gateway [Access denied due to user based licensing restrictions]",
  "[05-06-2025] [15:22:18_112][T033509] [ 10123 ] [DEBUG] [ SYSTEM-CORE ] Heartbeat check executed successfully.",
  "[11-06-2025] [09:45:10_003][T093001] [ 10999 ] [WARNING] [ NETWORK-MANAGER ] High latency detected in VPN connection.",
  "[12-06-2025] [18:19:33_554][T073501] [ 11021 ] [INFO ] [ USER-AUTH ] User 'testuser' successfully authenticated.",
  "[14-06-2025] [07:01:44_777][T066001] [ 10700 ] [ERROR] [ POLICY-ENGINE ] Null policy object received from controller.",
];

const parseLog = (log) => {
  const logRegex =
    /\[(.*?)\] \[(.*?)\](?:\[.*?\]){2,3}\[\s*(INFO|ERROR|DEBUG|WARNING)\s*\] \[.*?\] (.*)/i;
  const match = log.match(logRegex);
  if (match) {
    return {
      date: match[1],
      time: match[2],
      level: match[3].trim().toUpperCase(),
      message: match[4].trim(),
    };
  }
  return null;
};

const UserPage = () => {
  const [logs, setLogs] = useState(sampleLogs.map(parseLog));
  const [selectedLevels, setSelectedLevels] = useState({
    INFO: true,
    DEBUG: true,
    WARNING: true,
    ERROR: true,
  });

  const handleLevelToggle = (level) => {
    setSelectedLevels((prev) => ({ ...prev, [level]: !prev[level] }));
  };

  const filteredLogs = logs.filter((log) => log && selectedLevels[log.level]);

  return (
    // <div className="min-h-screen bg-slate-900 text-white p-6">
    //   <h2 className="text-3xl font-bold mb-6 text-center">User Portal</h2>

    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-gray-950 text-white p-6">
      {/* Logo / Header */}
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

      {/* Log Upload Section */}
      <div className="mb-10">
        <LogUploader />
      </div>

      {/* Analyze Section */}
      <div className="mb-10 bg-slate-800 p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4 text-sky-400">
          Probable Error RCA
        </h3>
        <p className="text-gray-300">
          The uploaded logs suggest potential session timeout, authentication
          failure, and policy misconfiguration issues. Please verify
          configurations, licensing, and user session status.
        </p>
      </div>

      {/* Filter Section */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-2">Filter Logs</h4>
        <div className="flex gap-4">
          {Object.keys(selectedLevels).map((level) => (
            <label key={level} className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedLevels[level]}
                onChange={() => handleLevelToggle(level)}
                className="accent-sky-500"
              />
              <span className="capitalize">{level.toLowerCase()}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Log Table */}
      <div className="overflow-x-auto bg-slate-800 rounded-lg shadow">
        <table className="min-w-full text-sm text-left text-white">
          <thead className="bg-slate-700 text-sky-300">
            <tr>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Time</th>
              <th className="px-4 py-3">Level</th>
              <th className="px-4 py-3">Message</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map((log, idx) => (
              <tr key={idx} className="hover:bg-slate-700">
                <td className="px-4 py-2 border-t border-slate-600">
                  {log.date}
                </td>
                <td className="px-4 py-2 border-t border-slate-600">
                  {log.time}
                </td>
                <td
                  className={`px-4 py-2 border-t border-slate-600 font-bold text-${
                    log.level === "ERROR"
                      ? "red"
                      : log.level === "WARNING"
                      ? "yellow"
                      : log.level === "DEBUG"
                      ? "blue"
                      : "green"
                  }-400`}
                >
                  {log.level}
                </td>
                <td className="px-4 py-2 border-t border-slate-600">
                  {log.message}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredLogs.length === 0 && (
          <p className="text-center text-gray-400 py-4">
            No logs match selected filters.
          </p>
        )}
      </div>
    </div>
  );
};

export default UserPage;
