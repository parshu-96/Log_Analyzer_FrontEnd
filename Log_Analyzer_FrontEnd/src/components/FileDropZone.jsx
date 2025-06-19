import React from "react";
import { useDropzone } from "react-dropzone";

const FileDropZone = ({ setFile }) => {
  const onDrop = (acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "text/plain": [".log", ".txt"],
    },
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-6 mb-4 cursor-pointer text-center transition ${
        isDragActive ? "bg-blue-50 border-blue-400" : "border-gray-300"
      }`}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p className="text-blue-600">Drop the file here ...</p>
      ) : (
        <p className="text-gray-500">
          Drag & drop a log file here, or click to select
        </p>
      )}
    </div>
  );
};

export default FileDropZone;
