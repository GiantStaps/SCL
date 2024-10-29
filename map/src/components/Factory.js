import React from 'react';

function Factory(props) {
  return (
    <mesh {...props}>
      <boxGeometry args={[1.5, 1, 1]} /> {/* Factory base */}
      <meshStandardMaterial color="darkgray" />
      {/* Add more shapes for chimneys or other features */}
      <mesh position={[0.5, 0.5, 1]}>
        <cylinderGeometry args={[0.1, 0.1, 0.5, 32]} />
        <meshStandardMaterial color="gray" />
      </mesh>
    </mesh>
  );
}

export default Factory;