
"use client"

import React, { useState } from 'react';
import { Input, Button } from '../UI';
import axios from 'axios';

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      alert('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('/api/users', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        alert('File uploaded successfully.');
      } else {
        alert('Failed to upload file.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('An error occurred while uploading the file.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="file"
        placeholder="Select File"
        onChange={handleFileChange}
      />
      <Button type="submit">Upload</Button>
    </form>
  );
};

export default FileUpload;