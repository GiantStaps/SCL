import React from 'react';

function Tree(props) {
  return (
    <mesh {...props}>
      {/* Cylinder for tree trunk */}
      <cylinderGeometry args={[0.1, 0.1, 0.5, 32]} />
      <meshStandardMaterial color="saddlebrown" />
      {/* Sphere for tree foliage */}
      <mesh position={[0, 0.4, 0]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color="green" />
      </mesh>
    </mesh>
  );
}

export default Tree;