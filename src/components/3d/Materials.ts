import * as THREE from 'three';

// Enhanced PBR Material Factory with X-Ray Glow and Dual-Sided Cross-Section Support
export function createPBRMaterials(
  clippingPlanes: THREE.Plane[] = [],
  isXRay: boolean = false,
  xrayOpacity: number = 0.2,
  isTechnical: boolean = false,
  isCrossSection: boolean = false
) {
  // In cross-section mode, ALL materials MUST be DoubleSide so cutaways reveal solid interiors
  const side = isCrossSection || isXRay ? THREE.DoubleSide : THREE.FrontSide;

  // External Enclosure Chassis Material
  const enclosureMat = new THREE.MeshStandardMaterial({
    color: isTechnical ? '#1e293b' : isXRay ? '#0284c7' : '#1e2638',
    roughness: isXRay ? 0.05 : 0.35,
    metalness: isXRay ? 0.9 : 0.25,
    transparent: isXRay,
    opacity: isXRay ? Math.max(xrayOpacity, 0.08) : 1.0,
    depthWrite: !isXRay, // Crucial: prevents z-fighting and sorting glitches in transparent X-ray!
    emissive: isXRay ? new THREE.Color('#38bdf8') : new THREE.Color('#000000'),
    emissiveIntensity: isXRay ? 0.35 : 0.0,
    clippingPlanes: clippingPlanes,
    clipShadows: true,
    wireframe: isTechnical,
    side: side,
  });

  const aluminumChassisMat = new THREE.MeshStandardMaterial({
    color: isTechnical ? '#334155' : isXRay ? '#38bdf8' : '#64748b',
    roughness: isXRay ? 0.1 : 0.3,
    metalness: isXRay ? 0.95 : 0.8,
    transparent: isXRay,
    opacity: isXRay ? Math.min(xrayOpacity * 1.6, 0.6) : 1.0,
    depthWrite: !isXRay,
    emissive: isXRay ? new THREE.Color('#0284c7') : new THREE.Color('#000000'),
    emissiveIntensity: isXRay ? 0.25 : 0.0,
    clippingPlanes: clippingPlanes,
    clipShadows: true,
    wireframe: isTechnical,
    side: THREE.DoubleSide,
  });

  const sunshieldMat = new THREE.MeshStandardMaterial({
    color: isTechnical ? '#475569' : isXRay ? '#7dd3fc' : '#f1f5f9',
    roughness: 0.25,
    metalness: 0.15,
    transparent: isXRay,
    opacity: isXRay ? xrayOpacity * 0.75 : 1.0,
    depthWrite: !isXRay,
    emissive: isXRay ? new THREE.Color('#38bdf8') : new THREE.Color('#000000'),
    emissiveIntensity: isXRay ? 0.2 : 0.0,
    clippingPlanes: clippingPlanes,
    clipShadows: true,
    wireframe: isTechnical,
    side: THREE.DoubleSide,
  });

  // PM Sensor Optical Block (CNC Milled Black Anodized Aircraft Aluminum)
  const pmBlockMat = new THREE.MeshStandardMaterial({
    color: isXRay ? '#0ea5e9' : '#0f172a',
    roughness: 0.2,
    metalness: 0.9,
    emissive: isXRay ? new THREE.Color('#0ea5e9') : new THREE.Color('#000000'),
    emissiveIntensity: isXRay ? 0.45 : 0.0,
    clippingPlanes: clippingPlanes,
    clipShadows: true,
    wireframe: isTechnical,
    side: side,
  });

  const brassLaserMat = new THREE.MeshStandardMaterial({
    color: isXRay ? '#f59e0b' : '#d97706',
    roughness: 0.15,
    metalness: 0.95,
    emissive: isXRay ? new THREE.Color('#f59e0b') : new THREE.Color('#000000'),
    emissiveIntensity: isXRay ? 0.5 : 0.0,
    clippingPlanes: clippingPlanes,
    clipShadows: true,
    side: side,
  });

  const laserBeamEmissive = new THREE.MeshBasicMaterial({
    color: '#ef4444',
  });

  // Gas Sensor Delrin Manifold Block
  const gasManifoldMat = new THREE.MeshStandardMaterial({
    color: isXRay ? '#1e293b' : '#334155',
    roughness: 0.35,
    metalness: 0.3,
    emissive: isXRay ? new THREE.Color('#38bdf8') : new THREE.Color('#000000'),
    emissiveIntensity: isXRay ? 0.3 : 0.0,
    clippingPlanes: clippingPlanes,
    clipShadows: true,
    side: side,
  });

  const gasCanisterMat = new THREE.MeshStandardMaterial({
    color: isXRay ? '#f8fafc' : '#e2e8f0',
    roughness: 0.2,
    metalness: 0.65,
    emissive: isXRay ? new THREE.Color('#38bdf8') : new THREE.Color('#000000'),
    emissiveIntensity: isXRay ? 0.4 : 0.0,
    clippingPlanes: clippingPlanes,
    clipShadows: true,
    side: side,
  });

  // Motherboard PCB (Conformal-Coated FR4)
  const pcbMat = new THREE.MeshStandardMaterial({
    color: isTechnical ? '#0f766e' : isXRay ? '#10b981' : '#064e3b',
    roughness: 0.25,
    metalness: 0.3,
    emissive: isXRay ? new THREE.Color('#10b981') : new THREE.Color('#000000'),
    emissiveIntensity: isXRay ? 0.5 : 0.0,
    clippingPlanes: clippingPlanes,
    clipShadows: true,
    side: side,
  });

  const mcuMat = new THREE.MeshStandardMaterial({
    color: isXRay ? '#38bdf8' : '#111827',
    roughness: 0.3,
    metalness: 0.7,
    emissive: isXRay ? new THREE.Color('#38bdf8') : new THREE.Color('#000000'),
    emissiveIntensity: isXRay ? 0.6 : 0.0,
    clippingPlanes: clippingPlanes,
    side: side,
  });

  const goldContactMat = new THREE.MeshStandardMaterial({
    color: '#eab308',
    roughness: 0.1,
    metalness: 0.98,
    side: side,
  });

  // Battery Pack (LiFePO4 Blue Prismatic Cells)
  const batteryMat = new THREE.MeshStandardMaterial({
    color: isXRay ? '#3b82f6' : '#1e40af',
    roughness: 0.3,
    metalness: 0.35,
    emissive: isXRay ? new THREE.Color('#2563eb') : new THREE.Color('#000000'),
    emissiveIntensity: isXRay ? 0.4 : 0.0,
    clippingPlanes: clippingPlanes,
    clipShadows: true,
    side: side,
  });

  const mpptHeatsinkMat = new THREE.MeshStandardMaterial({
    color: isXRay ? '#10b981' : '#475569',
    roughness: 0.25,
    metalness: 0.85,
    emissive: isXRay ? new THREE.Color('#10b981') : new THREE.Color('#000000'),
    emissiveIntensity: isXRay ? 0.4 : 0.0,
    clippingPlanes: clippingPlanes,
    side: side,
  });

  // Solar Panel
  const solarWaferMat = new THREE.MeshStandardMaterial({
    color: '#1e1b4b',
    roughness: 0.12,
    metalness: 0.45,
    clippingPlanes: clippingPlanes,
    side: side,
  });

  const solarGlassMat = new THREE.MeshPhysicalMaterial({
    color: '#e0f2fe',
    roughness: 0.05,
    transmission: isXRay ? 0.95 : 0.85,
    thickness: 0.5,
    transparent: true,
    opacity: isXRay ? 0.3 : 0.7,
    clippingPlanes: clippingPlanes,
    side: THREE.DoubleSide,
  });

  const frameAluMat = new THREE.MeshStandardMaterial({
    color: '#94a3b8',
    roughness: 0.25,
    metalness: 0.85,
    clippingPlanes: clippingPlanes,
    side: side,
  });

  // Mast & Steel
  const mastSteelMat = new THREE.MeshStandardMaterial({
    color: isXRay ? '#64748b' : '#94a3b8',
    roughness: 0.35,
    metalness: 0.85,
    clippingPlanes: clippingPlanes,
    side: side,
  });

  // Radiation Shield & Environmental Probe
  const radShieldMat = new THREE.MeshStandardMaterial({
    color: isXRay ? '#7dd3fc' : '#ffffff',
    roughness: 0.18,
    metalness: 0.1,
    transparent: isXRay,
    opacity: isXRay ? 0.4 : 1.0,
    clippingPlanes: clippingPlanes,
    side: THREE.DoubleSide,
  });

  const stainlessProbeMat = new THREE.MeshStandardMaterial({
    color: '#e2e8f0',
    roughness: 0.2,
    metalness: 0.9,
    clippingPlanes: clippingPlanes,
    side: side,
  });

  // Internal Sampling Tubing
  const tubingMat = new THREE.MeshPhysicalMaterial({
    color: isXRay ? '#38bdf8' : '#7dd3fc',
    roughness: 0.15,
    transmission: 0.85,
    thickness: 0.4,
    transparent: true,
    opacity: isXRay ? 0.85 : 0.6,
    emissive: isXRay ? new THREE.Color('#0284c7') : new THREE.Color('#000000'),
    emissiveIntensity: isXRay ? 0.5 : 0.0,
    clippingPlanes: clippingPlanes,
    side: THREE.DoubleSide,
  });

  // Cross-Section Cut Edge Accent Material
  const cutEdgeMat = new THREE.MeshBasicMaterial({
    color: '#f97316', // Construction orange cut boundary
    wireframe: true,
    side: THREE.DoubleSide,
  });

  return {
    enclosureMat,
    aluminumChassisMat,
    sunshieldMat,
    pmBlockMat,
    brassLaserMat,
    laserBeamEmissive,
    gasManifoldMat,
    gasCanisterMat,
    pcbMat,
    mcuMat,
    goldContactMat,
    batteryMat,
    mpptHeatsinkMat,
    solarWaferMat,
    solarGlassMat,
    frameAluMat,
    mastSteelMat,
    radShieldMat,
    stainlessProbeMat,
    tubingMat,
    cutEdgeMat,
  };
}
