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
      setMessage(res.data.message || "Upload successful!");
    } catch (err) {
      console.error(err);
      setMessage("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 mt-10 bg-white shadow-xl rounded-2xl border">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
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
        <>
          <FileDropZone setFile={setFile} />
          {file && (
            <div className="mb-4 text-green-600">
              Uploaded File: <strong>{file.name}</strong>
            </div>
          )}

          <button
            onClick={handleUpload}
            disabled={!file || uploading}
            className={`px-4 py-2 rounded-lg transition-all duration-300 ${
              uploading || !file
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </>
      )}

      {message && (
        <div className="mt-4 text-sm text-blue-700 font-medium">{message}</div>
      )}
    </div>
  );
};

export default LogUploader;
