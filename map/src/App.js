import React from 'react';
import { Canvas } from '@react-three/fiber';
import ClusterMap from './components/ClusterMap';

function App() {
  return (
    <div className="App">
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <ClusterMap />
      </Canvas>
    </div>
  );
}

export default App;