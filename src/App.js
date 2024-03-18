import React from "react";
import "./App.css"; // Import your CSS file for styling
import FileContentReader from "./expected";
import APIReader from "./api";

function App() {
  return (
    <div>
      <h1>API result validator</h1>
      <div className="container">
        <div>
          <APIReader></APIReader>
        </div>
        <div>
          <FileContentReader></FileContentReader>
        </div>
      </div>
    </div>
  );
}

export default App;
