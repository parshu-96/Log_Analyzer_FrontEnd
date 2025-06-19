import React from "react";

const FileTypeDropdown = ({
  fileTypes,
  selectedType,
  setSelectedType,
  setFile,
  setMessage,
}) => {
  if (!fileTypes || fileTypes.length === 0) {
    return <p className="text-red-500">No backend data available.</p>;
  }

  return (
    <>
      <label className="block text-gray-600 mb-2">Select Log File Type:</label>
      <select
        value={selectedType}
        onChange={(e) => {
          setSelectedType(e.target.value);
          setFile(null);
          setMessage("");
        }}
        className="w-full p-2 border rounded-lg mb-4"
      >
        <option value="">-- Select a log file type --</option>
        {fileTypes.map((type, index) => (
          <option key={index} value={type.name}>
            {type.name}
          </option>
        ))}
      </select>
    </>
  );
};

export default FileTypeDropdown;
