import React, { useEffect, useState } from "react";
import axios from "axios";
import FileTypeDropdown from "./FileTypeDropDown";
import FileDropZone from "./FileDropZone";

const LogUploader = () => {
  const [fileTypes, setFileTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [matchedPatterns, setMatchedPatterns] = useState([]); // NEW

  useEffect(() => {
    const fetchFileTypes = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/logfiles/filenames"
        );
        setFileTypes(res.data.filenames || []);
      } catch (err) {
        console.error("Failed to fetch file types:", err);
        setFileTypes([]);
      }
    };
    fetchFileTypes();
  }, []);

  const handleUpload = async () => {
    if (!selectedType || !file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("logFileType", selectedType);

    setUploading(true);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/analyze",
        formData
      );
      const data = res.data;

      if (Array.isArray(data)) {
        setMatchedPatterns(data); // response is expected array
        setMessage("Upload successful and matches found!");
      } else {
        setMatchedPatterns([]);
        setMessage(data.message || "Upload successful but no matches found.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Upload failed. Please try again.");
      setMatchedPatterns([]);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 mt-10 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 shadow-xl rounded-2xl">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white text-center">
        Upload Log File
      </h2>

      <FileTypeDropdown
        fileTypes={fileTypes}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        setFile={setFile}
        setMessage={setMessage}
      />

      {selectedType && (
        <div className="mt-6">
          <FileDropZone setFile={setFile} />

          {file && (
            <div className="mt-4 text-green-600 dark:text-green-400 font-medium text-sm">
              Selected File: <span className="font-semibold">{file.name}</span>
            </div>
          )}

          <button
            onClick={handleUpload}
            disabled={!file || uploading}
            className={`mt-6 w-full px-4 py-3 text-sm font-semibold rounded-lg transition-all duration-300 shadow ${
              uploading || !file
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </div>
      )}

      {message && (
        <div
          className={`mt-6 text-sm text-center font-medium ${
            message.includes("failed")
              ? "text-red-500"
              : "text-blue-600 dark:text-blue-400"
          }`}
        >
          {message}
        </div>
      )}

      {/* Matched Patterns Section */}
      {matchedPatterns.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Matched Patterns
          </h3>
          <div className="border rounded-lg overflow-hidden shadow-sm">
            <table className="min-w-full text-sm text-left text-gray-600">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2">Matched Line</th>
                  <th className="px-4 py-2">Resolution</th>
                  <th className="px-4 py-2">Count</th>
                </tr>
              </thead>
              <tbody>
                {matchedPatterns.map((pattern, idx) => (
                  <tr key={idx} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-2">{pattern.matchLine}</td>
                    <td className="px-4 py-2">{pattern.resolutionSteps}</td>
                    <td className="px-4 py-2">{pattern.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogUploader;
