import React, { useState, useRef } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

function FileContentReader() {
  const [fileContent, setFileContent] = useState('');
  const fileInputRef = useRef(null); // Corrected definition

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    const fileReader = new FileReader();

    fileReader.onload = () => {
      const content = fileReader.result;
      setFileContent(content);
    };

    fileReader.readAsText(file);
  };



  const handleClearClick = () => {
    setFileContent('');
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; 
    }
  };

  return (
    <div>
      <input
        type="file"
        onChange={handleFileInputChange}
        accept=".json" 
        ref={fileInputRef} 
      />
      <button onClick={handleClearClick}>Clear</button>
      <SyntaxHighlighter language="json" style={tomorrow} customStyle={{ width: '100%', height: '300px' }}>
        {fileContent}
      </SyntaxHighlighter>
    </div>
  );
}

export default FileContentReader;
