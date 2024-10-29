import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import Tree from './Tree';
import Building from './Building';
import Factory from './Factory';

function ClusterMap() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/clustered_minimal.csv')
      .then(response => response.text())
      .then(csvText => {
        Papa.parse(csvText, {
          header: true,
          complete: (result) => {
            const filteredData = result.data.map(row => ({
              X: parseFloat(row.X) || 0,
              Y: parseFloat(row.Y) || 0,
              Radius: parseFloat(row.Radius) || 1,
              Cluster: row.Cluster ? String(row.Cluster) : 'unknown'
            }));
            setData(filteredData);
          }
        });
      })
      .catch(error => console.error('Error loading CSV:', error));
  }, []);

  return (
    <>
      {data.map((row, index) => {
        const { X, Y, Radius, Cluster } = row;
        const position = [X, Y, 0];
        const scale = [Radius, Radius, Radius];

        if (Cluster === '0') {
          return <Tree key={index} position={position} scale={scale} />;
        } else if (Cluster === '1') {
          return <Building key={index} position={position} scale={scale} />;
        } else if (Cluster === '2') {
          return <Factory key={index} position={position} scale={scale} />;
        } else {
          return null;
        }
      })}
    </>
  );
}

export default ClusterMap;