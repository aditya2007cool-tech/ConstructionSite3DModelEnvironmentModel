import React, { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import type { OrbitControls as OrbitControlsType } from 'three-stdlib';
import * as THREE from 'three';
import { CameraPreset, TourStep } from '../../types';

interface CameraControllerProps {
  preset: CameraPreset;
  tourStep?: TourStep | null;
  isTouring: boolean;
  autoRotate: boolean;
}

export const CameraController: React.FC<CameraControllerProps> = ({
  preset,
  tourStep,
  isTouring,
  autoRotate,
}) => {
  const { camera } = useThree();
  const controlsRef = useRef<OrbitControlsType>(null);

  // Target vectors for lerping
  const targetPos = useRef(new THREE.Vector3(2.4, 1.8, 2.6));
  const targetLookAt = useRef(new THREE.Vector3(0, 0.1, 0));
  const isTransitioning = useRef(true);

  // Update target coordinates when preset or tour step updates
  useEffect(() => {
    isTransitioning.current = true;

    if (isTouring && tourStep) {
      targetPos.current.set(...tourStep.cameraPosition);
      targetLookAt.current.set(...tourStep.cameraTarget);
      return;
    }

    switch (preset) {
      case 'front':
        targetPos.current.set(0, 0.1, 3.0);
        targetLookAt.current.set(0, 0.1, 0);
        break;
      case 'rear':
        targetPos.current.set(0, 0.1, -3.0);
        targetLookAt.current.set(0, 0.1, -0.2);
        break;
      case 'left':
        targetPos.current.set(-3.0, 0.1, 0);
        targetLookAt.current.set(0, 0.1, 0);
        break;
      case 'right':
        targetPos.current.set(3.0, 0.1, 0);
        targetLookAt.current.set(0, 0.1, 0);
        break;
      case 'top':
        targetPos.current.set(0, 3.8, 0.01);
        targetLookAt.current.set(0, 0.1, 0);
        break;
      case 'bottom':
        targetPos.current.set(0, -3.8, 0.01);
        targetLookAt.current.set(0, 0.1, 0);
        break;
      case 'iso':
      default:
        targetPos.current.set(2.4, 1.8, 2.6);
        targetLookAt.current.set(0, 0.1, 0);
        break;
    }
  }, [preset, tourStep, isTouring]);

  // Frame loop for smooth interpolation
  useFrame((_, delta) => {
    if (!controlsRef.current) return;

    if (isTransitioning.current) {
      const lerpSpeed = Math.min(delta * 4.5, 1.0);
      camera.position.lerp(targetPos.current, lerpSpeed);
      controlsRef.current.target.lerp(targetLookAt.current, lerpSpeed);
      controlsRef.current.update();

      // If close enough, disable transition so user can freely orbit
      if (
        camera.position.distanceTo(targetPos.current) < 0.02 &&
        controlsRef.current.target.distanceTo(targetLookAt.current) < 0.02
      ) {
        isTransitioning.current = false;
      }
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.08}
      minDistance={0.5}
      maxDistance={9.0}
      autoRotate={autoRotate}
      autoRotateSpeed={0.9}
      onStart={() => {
        isTransitioning.current = false;
      }}
    />
  );
};
