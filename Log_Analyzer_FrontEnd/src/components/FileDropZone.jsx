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
      className={`border-2 border-dashed rounded-xl p-6 mb-4 text-center cursor-pointer transition-all duration-200 
      ${
        isDragActive
          ? "bg-blue-100 border-blue-400 dark:bg-blue-900 dark:border-blue-500"
          : "bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-600"
      }`}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p className="text-blue-600 dark:text-blue-300 font-medium">
          Drop the file here...
        </p>
      ) : (
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          Drag & drop a `.log` or `.txt` file here, or click to select
        </p>
      )}
    </div>
  );
};

export default FileDropZone;
