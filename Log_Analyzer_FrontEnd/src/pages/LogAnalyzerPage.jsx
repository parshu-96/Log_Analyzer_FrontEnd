import React, { useState } from "react";
import axios from "axios";
import LogFileUploader from "../components/LogFileUploader";

const LogAnalyzerPage = () => {
  const [showUploader, setShowUploader] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelected = (file) => {
    console.log("File selected:", file);
    setSelectedFile(file); // Just save it, don't upload yet
  };

  const handleFileSubmit = () => {
    if (!selectedFile) {
      alert("No file selected!");
      return;
    }
    console.log("Uploading file to backend:", selectedFile);

    const formData = new FormData();
    formData.append("file", selectedFile);

    axios
      .post("http://localhost:5000/api/analyze", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log("Response from server:", res.data);
        alert("File uploaded and processed successfully!");
        setSelectedFile(null); // clear file after upload
        setShowUploader(false); // hide uploader
      })
      .catch((err) => {
        console.error("Error uploading file:", err);
        alert("Error uploading file.");
      });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Log Analyzer</h1>
      {!showUploader && (
        <button onClick={() => setShowUploader(true)}>Upload Log File</button>
      )}
      {showUploader && (
        <>
          <LogFileUploader onFileSelected={handleFileSelected} />
          {selectedFile && (
            <div style={{ marginTop: "10px" }}>
              <p>
                <strong>Selected File:</strong> {selectedFile.name}
              </p>
              <button onClick={handleFileSubmit}>Submit</button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default LogAnalyzerPage;
