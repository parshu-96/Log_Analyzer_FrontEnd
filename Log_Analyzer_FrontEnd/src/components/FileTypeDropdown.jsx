import React from "react";

const FileTypeDropdown = ({
  fileTypes,
  selectedType,
  setSelectedType,
  setFile,
  setMessage,
  onFileTypeChange,
}) => {
  if (!fileTypes || fileTypes.length === 0) {
    return (
      <p className="text-red-500 dark:text-red-400 text-sm text-center">
        No backend data available.
      </p>
    );
  }

  return (
    <div className="mb-4">
      {/* <label
        htmlFor="fileType"
        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
      >
        Select Log File Type
      </label> */}
      <select
        id="fileType"
        value={selectedType}
        onChange={(e) => {
          setSelectedType(e.target.value);
          setFile(null);
          setMessage("");
          if (typeof onFileTypeChange === "function") {
            onFileTypeChange(); // reset everything in parent
          }
        }}
        className="w-full px-4 py-2 bg-white dark:bg-slate-800 text-gray-800 dark:text-white border border-gray-300 dark:border-slate-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value=""> Select a log file type </option>
        {fileTypes.map((type, index) => (
          <option key={index} value={type.name}>
            {type.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FileTypeDropdown;
