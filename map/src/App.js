import React from 'react';
import { Canvas } from '@react-three/fiber';
import ClusterMap from './components/ClusterMap'; // Assuming your ClusterMap component renders the objects

function App() {
  return (
    <div className="App">
      <Canvas>
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        {/* Render ClusterMap component */}
        <ClusterMap />
      </Canvas>
    </div>
  );
}

export default App;