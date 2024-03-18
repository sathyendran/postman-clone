import React, { useState } from 'react';

function APIReader() {
  const [apiUrl, setApiUrl] = useState('');
  const [requestMethod, setRequestMethod] = useState('GET');
  const [requestData, setRequestData] = useState('');
  const [headers, setHeaders] = useState([{ key: '', value: '' }]);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const requestOptions = {
        method: requestMethod,
        headers: Object.fromEntries(headers.filter(header => header.key.trim() !== '').map(header => [header.key, header.value])),
      };

      if (requestMethod !== 'GET') {
        requestOptions.body = JSON.stringify(requestData);
      }

      const response = await fetch(apiUrl, requestOptions);

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddHeader = () => {
    setHeaders([...headers, { key: '', value: '' }]);
  };

  const handleHeaderChange = (index, key, value) => {
    const newHeaders = [...headers];
    newHeaders[index] = { key, value };
    setHeaders(newHeaders);
  };

  return (
    <div>
      <input
        type="text"
        value={apiUrl}
        onChange={(e) => setApiUrl(e.target.value)}
        placeholder="Enter API URL"
      />
      <select value={requestMethod} onChange={(e) => setRequestMethod(e.target.value)}>
        <option value="GET">GET</option>
        <option value="POST">POST</option>
        <option value="PUT">PUT</option>
        <option value="DELETE">DELETE</option>
        {/* Add more options for other request methods */}
      </select>
      {requestMethod !== 'GET' && (
        <input
          type="text"
          value={requestData}
          onChange={(e) => setRequestData(e.target.value)}
          placeholder="Enter request data"
        />
      )}
      <div>
        <h3>Headers</h3>
        {headers.map((header, index) => (
          <div key={index}>
            <input
              type="text"
              value={header.key}
              onChange={(e) => handleHeaderChange(index, e.target.value, header.value)}
              placeholder="Enter header key"
            />
            <input
              type="text"
              value={header.value}
              onChange={(e) => handleHeaderChange(index, header.key, e.target.value)}
              placeholder="Enter header value"
            />
          </div>
        ))}
        <button onClick={handleAddHeader}>Add Header</button>
      </div>
      <button onClick={fetchData}>Fetch Data</button>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {data && (
        <div>
          <h1>API Data</h1>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default APIReader;
