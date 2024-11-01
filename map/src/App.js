import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import D3Visualization from './components/D3Visualization';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/clustered_minimal.csv')
      .then(response => response.text())
      .then(csvText => {
        Papa.parse(csvText, {
          header: true,
          complete: (result) => {
            const parsedData = result.data.map(row => ({
              X: parseFloat(row.X) || 0,
              Y: parseFloat(row.Y) || 0,
              Radius: parseFloat(row.Radius) || 10,
              Cluster: row.Cluster || '0',
              Entity: row.Entity || '',
              Website: row.Website || '#',
              Contact: row.Contact || '',
              "Contact Email": row["Contact Email"] || ''
            }));
            setData(parsedData);
          }
        });
      })
      .catch(error => console.error('Error loading CSV:', error));
  }, []);

  return (
    <div className="App">
      <h1>SCI Partner Landscape</h1>
      <D3Visualization data={data} />
    </div>
  );
}

export default App;