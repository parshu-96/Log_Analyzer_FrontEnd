import React, { useState } from 'react';
import axios from 'axios';
import LogFileUploader from '../components/LogFileUploader';

const LogAnalyzerPage = () => {
  const [showUploader, setShowUploader] = useState(false);

  const handleFileSelected = (file) => {
    console.log("Uploading file to backend:", file);

    const formData = new FormData();
    formData.append('file', file);

    axios.post('http://localhost:5000/api/analyze', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => {
      console.log("Response from server:", res.data);
      alert("File uploaded and processed successfully!");
    })
    .catch((err) => {
      console.error("Error uploading file:", err);
      alert("Error uploading file.");
    });
  };

  return (
    <div>
      <h1>Log Analyzer</h1>
      <button onClick={() => setShowUploader(true)}>Upload Log File</button>
      {showUploader && (
        <LogFileUploader onFileSelected={handleFileSelected} />
      )}
    </div>
  );
};

export default LogAnalyzerPage;
