import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const LogFileUploader = ({ onFileSelected }) => {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];
    console.log("File selected:", file);
    onFileSelected(file);
  }, [onFileSelected]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: { 'text/*': ['.log', '.txt'] }
  });

  return (
    <div {...getRootProps()} style={styles.dropzone}>
      <input {...getInputProps()} />
      <p>Click or drag log file here to upload</p>
    </div>
  );
};

const styles = {
  dropzone: {
    border: '2px dashed #888',
    padding: '20px',
    borderRadius: '10px',
    cursor: 'pointer',
    textAlign: 'center',
    marginTop: '20px'
  }
};

export default LogFileUploader;
