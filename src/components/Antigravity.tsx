import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticlesProps {
  count: number;
  color: string;
}

function Particles({ count, color }: ParticlesProps) {
  const mesh = useRef<THREE.Points>(null!);
  const { positions, originals } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const originals = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 12;
      const z = (Math.random() - 0.5) * 8;
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      originals[i * 3] = x;
      originals[i * 3 + 1] = y;
      originals[i * 3 + 2] = z;
    }
    return { positions, originals };
  }, [count]);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const pos = mesh.current.geometry.attributes.position.array as Float32Array;
    const t = clock.getElapsedTime();
    for (let i = 0; i < count; i++) {
      const ix = i * 3, iy = i * 3 + 1, iz = i * 3 + 2;
      // drift gently
      pos[ix] = originals[ix] + Math.sin(t * 0.3 + i * 0.7) * 0.4;
      pos[iy] = originals[iy] + Math.cos(t * 0.2 + i * 0.5) * 0.3;
      pos[iz] = originals[iz] + Math.sin(t * 0.15 + i * 0.3) * 0.2;
    }
    mesh.current.geometry.attributes.position.needsUpdate = true;
    mesh.current.rotation.y = t * 0.02;
  });

  const colorObj = useMemo(() => new THREE.Color(color), [color]);

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color={colorObj}
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

interface AntigravityProps {
  count?: number;
  color?: string;
}

export default function Antigravity({ count = 60, color = '#00d4ff' }: AntigravityProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 60 }}
      style={{ width: '100%', height: '100%' }}
      gl={{ antialias: false, alpha: true }}
      dpr={[1, 1.5]}
    >
      <Particles count={count} color={color} />
    </Canvas>
  );
}
