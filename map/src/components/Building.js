import React from 'react';

function Building(props) {
  return (
    <mesh {...props}>
      <boxGeometry args={[1, 1, 3]} /> {/* Adjust dimensions as needed */}
      <meshStandardMaterial color="gray" />
    </mesh>
  );
}

export default Building;