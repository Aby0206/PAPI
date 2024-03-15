import React, { useState, useRef, ChangeEvent } from 'react';
import { StyledUpload , StyledButton } from './styledComponents';

interface FileUploadProps {
  fileMessage: string;
}

const FileUploadComponent: React.FC<FileUploadProps> = ({ fileMessage }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.size <= 5 * 1024 * 1024) {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
    }
  };

  const handleBrowseClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <StyledUpload>
      {selectedFile ? (
        <div className='file-name'>{selectedFile.name}</div>
      ) : (
        <div className='file-name'>{fileMessage}</div>
      )}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
        accept=".jpg, .jpeg, .png, .gif, .pdf" 
      />
      <StyledButton onClick={handleBrowseClick} >
        Browse File
      </StyledButton>
    </StyledUpload>
  );
};

export default FileUploadComponent;