import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import {
  VisualizationSection,
  CameraPreset,
  LightingPreset,
  CuttingAxis,
  StationComponent,
} from './types';
import { STATION_COMPONENTS } from './data/stationComponents';
import { TOUR_STEPS } from './data/tourSteps';

// 3D Components
import { AeroStation3D } from './components/3d/AeroStation3D';
import { CameraController } from './components/3d/CameraController';
import { StudioEnvironment } from './components/3d/StudioEnvironment';
import { AirflowSimulation } from './components/3d/AirflowSimulation';
import { ElectronicsWiring3D } from './components/3d/ElectronicsWiring3D';
import { EngineeringDimensions3D } from './components/3d/EngineeringDimensions3D';
import { CuttingPlaneVisualizer } from './components/3d/CuttingPlaneVisualizer';

// UI Components
import { Navbar } from './components/ui/Navbar';
import { ComponentInfoDrawer } from './components/ui/ComponentInfoDrawer';
import { OverviewControls } from './components/ui/OverviewControls';
import { ExplodedControls } from './components/ui/ExplodedControls';
import { CrossSectionControls } from './components/ui/CrossSectionControls';
import { XRayControls } from './components/ui/XRayControls';
import { TechnicalControls } from './components/ui/TechnicalControls';
import { AirflowControls } from './components/ui/AirflowControls';
import { GuidedTourOverlay } from './components/ui/GuidedTourOverlay';
import { ElectronicsControls } from './components/ui/ElectronicsControls';
import { PartsCatalogSidebar } from './components/ui/PartsCatalogSidebar';
import { SchematicModal } from './components/ui/SchematicModal';
import { MicroSimModal } from './components/ui/MicroSimModal';
import { TelemetryHUD } from './components/ui/TelemetryHUD';

export const App: React.FC = () => {
  // Master Section State
  const [section, setSection] = useState<VisualizationSection>('overview');

  // Component Selection & Hover State
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);
  const [hoveredComponentId, setHoveredComponentId] = useState<string | null>(null);
  const [isIsolated, setIsIsolated] = useState<boolean>(false);

  // Global Camera & Environment State
  const [cameraPreset, setCameraPreset] = useState<CameraPreset>('iso');
  const [lightingPreset, setLightingPreset] = useState<LightingPreset>('studio');
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Exploded View State
  const [explodedProgress, setExplodedProgress] = useState<number>(0.65);

  // X-Ray View State
  const [xrayOpacity, setXrayOpacity] = useState<number>(0.2);

  // Cross-Section View State
  const [cuttingAxis, setCuttingAxis] = useState<CuttingAxis>('x');
  const [cutOffset, setCutOffset] = useState<number>(0.0);
  const [isCutInverted, setIsCutInverted] = useState<boolean>(false);
  const [showPlaneVisualizer, setShowPlaneVisualizer] = useState<boolean>(true);

  // Technical CAD View State
  const [isOrthographic, setIsOrthographic] = useState<boolean>(false);
  const [showDimensions, setShowDimensions] = useState<boolean>(true);
  const [showLabels, setShowLabels] = useState<boolean>(true);
  const [showGrid, setShowGrid] = useState<boolean>(true);

  // Airflow Simulation State
  const [isAirflowPlaying, setIsAirflowPlaying] = useState<boolean>(true);
  const [airflowSpeed, setAirflowSpeed] = useState<number>(1.0);
  const [activeFlowStage, setActiveFlowStage] = useState<'all' | 'inlet' | 'pm' | 'gas' | 'exhaust'>('all');
  const [showStreamlines, setShowStreamlines] = useState<boolean>(true);
  const [particleDensity, setParticleDensity] = useState<number>(140);

  // Electronics View State
  const [showPowerBuses, setShowPowerBuses] = useState<boolean>(true);
  const [showDataBuses, setShowDataBuses] = useState<boolean>(true);
  const [isSchematicOpen, setIsSchematicOpen] = useState<boolean>(false);

  // Guided Tour State
  const [currentTourStepIndex, setCurrentTourStepIndex] = useState<number>(0);
  const [isTourAutoPlaying, setIsTourAutoPlaying] = useState<boolean>(false);

  // Micro-Simulation Modal State
  const [activeMicroSimType, setActiveMicroSimType] = useState<'pm' | 'gas' | 'wind' | 'temp' | null>(null);

  // Compute 3D Clipping Planes for Cross-Section Cutaway
  const clippingPlanes = useMemo(() => {
    if (section !== 'cross-section') return [];

    let normal = new THREE.Vector3(1, 0, 0);
    if (cuttingAxis === 'y') normal = new THREE.Vector3(0, 1, 0);
    if (cuttingAxis === 'z') normal = new THREE.Vector3(0, 0, 1);

    if (isCutInverted) {
      normal.negate();
    }

    return [new THREE.Plane(normal, cutOffset)];
  }, [section, cuttingAxis, cutOffset, isCutInverted]);

  // Selected Component Object
  const selectedComponent = useMemo(() => {
    return STATION_COMPONENTS.find((c) => c.id === selectedComponentId) || null;
  }, [selectedComponentId]);

  // Current Tour Step Object
  const currentTourStep = useMemo(() => {
    return TOUR_STEPS[currentTourStepIndex];
  }, [currentTourStepIndex]);

  // Tour Auto-Play Timer
  useEffect(() => {
    let timer: any;
    if (section === 'tour' && isTourAutoPlaying) {
      timer = setInterval(() => {
        setCurrentTourStepIndex((prev) => {
          if (prev < TOUR_STEPS.length - 1) {
            return prev + 1;
          }
          setIsTourAutoPlaying(false);
          return 0;
        });
      }, 8500);
    }
    return () => clearInterval(timer);
  }, [section, isTourAutoPlaying]);

  // Sync selected component when in tour mode
  useEffect(() => {
    if (section === 'tour' && currentTourStep) {
      setSelectedComponentId(currentTourStep.componentId);
    }
  }, [section, currentTourStep]);

  // Reset Isolation when changing sections
  useEffect(() => {
    if (section !== 'inspection') {
      setIsIsolated(false);
    }
    if (section === 'tour') {
      setIsTourAutoPlaying(true);
    } else {
      setIsTourAutoPlaying(false);
    }
  }, [section]);

  // Keyboard Shortcuts (1-9 for sections, Esc to close drawers/modals, Space for play)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (e.key) {
        case '1': setSection('overview'); break;
        case '2': setSection('exploded'); break;
        case '3': setSection('xray'); break;
        case '4': setSection('cross-section'); break;
        case '5': setSection('technical'); break;
        case '6': setSection('airflow'); break;
        case '7': setSection('inspection'); break;
        case '8': setSection('electronics'); break;
        case '9': setSection('tour'); break;
        case 'Escape':
          if (activeMicroSimType) setActiveMicroSimType(null);
          else if (isSchematicOpen) setIsSchematicOpen(false);
          else if (selectedComponentId) setSelectedComponentId(null);
          break;
        case ' ':
          if (section === 'tour') {
            setIsTourAutoPlaying((prev) => !prev);
          } else if (section === 'airflow') {
            setIsAirflowPlaying((prev) => !prev);
          } else {
            setIsAutoRotating((prev) => !prev);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [section, activeMicroSimType, isSchematicOpen, selectedComponentId]);

  // Screenshot Capture Handler
  const handleTakeScreenshot = useCallback(() => {
    const canvas = document.querySelector('canvas');
    if (!canvas) return;

    try {
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `AeroSentinel-3D-${section}-${new Date().toISOString().slice(0, 10)}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Screenshot failed:', err);
    }
  }, [section]);

  // Fullscreen Handler
  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  // Reset Camera Handler
  const handleResetCamera = () => {
    setCameraPreset('iso');
    setIsAutoRotating(false);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-gradient-to-b from-[#090e18] via-[#060a12] to-[#04060b] text-slate-100 select-none">
      {/* 1. Master Top Navigation Bar */}
      <Navbar
        currentSection={section}
        onSelectSection={(sec) => {
          setSection(sec);
          setCameraPreset(sec === 'technical' ? 'front' : 'iso');
        }}
        lightingPreset={lightingPreset}
        onChangeLighting={setLightingPreset}
        onResetCamera={handleResetCamera}
        onTakeScreenshot={handleTakeScreenshot}
        onToggleFullscreen={handleToggleFullscreen}
        isFullscreen={isFullscreen}
      />

      {/* 2. Live Telemetry HUD Widget (Top Left) */}
      <TelemetryHUD />

      {/* 3. Central 3D Canvas Viewport */}
      <div className={`w-full h-full ${section === 'technical' ? 'cad-grid-bg' : ''}`}>
        <Canvas
          shadows
          gl={{
            localClippingEnabled: true,
            antialias: true,
            preserveDrawingBuffer: true,
            powerPreference: 'high-performance',
          }}
          camera={{
            position: [2.4, 1.8, 2.6],
            fov: isOrthographic ? 28 : 45,
            near: 0.1,
            far: 35,
          }}
        >
          {/* Camera Controller & OrbitControls */}
          <CameraController
            preset={cameraPreset}
            tourStep={section === 'tour' ? currentTourStep : null}
            isTouring={section === 'tour'}
            autoRotate={isAutoRotating}
          />

          {/* Studio Lighting & Ground Shadows with Atmospheric Dust */}
          <StudioEnvironment
            preset={lightingPreset}
            showGrid={showGrid && section !== 'airflow'}
            isAirflowMode={section === 'airflow'}
          />

          {/* Master 3D Monitoring Station Model */}
          <AeroStation3D
            section={section}
            explodedProgress={explodedProgress}
            xrayOpacity={xrayOpacity}
            clippingPlanes={clippingPlanes}
            selectedComponentId={selectedComponentId}
            hoveredComponentId={hoveredComponentId}
            onSelectComponent={(id) => {
              setSelectedComponentId(id);
              if (section === 'tour') {
                const stepIdx = TOUR_STEPS.findIndex((s) => s.componentId === id);
                if (stepIdx !== -1) setCurrentTourStepIndex(stepIdx);
              }
            }}
            onHoverComponent={setHoveredComponentId}
            isolatedComponentId={isIsolated ? selectedComponentId : null}
            windSpeedFactor={section === 'airflow' ? airflowSpeed : 1.0}
          />

          {/* Cross-Section Visual Cutting Blade Sheet */}
          <CuttingPlaneVisualizer
            axis={cuttingAxis}
            offset={cutOffset}
            isInverted={isCutInverted}
            visible={section === 'cross-section' && showPlaneVisualizer}
          />

          {/* Section 6: Airflow Simulation Streamlines & Particles */}
          {section === 'airflow' && (
            <AirflowSimulation
              isPlaying={isAirflowPlaying}
              flowSpeed={airflowSpeed}
              activeStage={activeFlowStage}
              showStreamlines={showStreamlines}
              particleDensity={particleDensity}
            />
          )}

          {/* Section 8: Internal Electronics Wiring Harnesses */}
          {(section === 'electronics' || section === 'xray') && (
            <ElectronicsWiring3D
              selectedComponentId={selectedComponentId}
              showPowerBuses={showPowerBuses}
              showDataBuses={showDataBuses}
            />
          )}

          {/* Section 5: Technical Engineering Dimensions & Callout Balloons */}
          {section === 'technical' && (
            <EngineeringDimensions3D
              showDimensions={showDimensions}
              showLabels={showLabels}
              onSelectComponent={setSelectedComponentId}
              selectedComponentId={selectedComponentId}
            />
          )}
        </Canvas>
      </div>

      {/* 4. Section-Specific Floating Control Docks */}
      {section === 'overview' && (
        <OverviewControls
          currentPreset={cameraPreset}
          onSelectPreset={setCameraPreset}
          isAutoRotating={isAutoRotating}
          onToggleAutoRotate={() => setIsAutoRotating((prev) => !prev)}
          onResetCamera={handleResetCamera}
        />
      )}

      {section === 'exploded' && (
        <ExplodedControls
          progress={explodedProgress}
          onChangeProgress={setExplodedProgress}
          onReset={() => setExplodedProgress(0)}
          onSelectComponent={setSelectedComponentId}
          selectedComponentId={selectedComponentId}
        />
      )}

      {section === 'xray' && (
        <XRayControls
          opacity={xrayOpacity}
          onChangeOpacity={setXrayOpacity}
          selectedComponentId={selectedComponentId}
          onSelectComponent={setSelectedComponentId}
        />
      )}

      {section === 'cross-section' && (
        <CrossSectionControls
          axis={cuttingAxis}
          onChangeAxis={setCuttingAxis}
          offset={cutOffset}
          onChangeOffset={setCutOffset}
          isInverted={isCutInverted}
          onToggleInvert={() => setIsCutInverted((prev) => !prev)}
          onReset={() => {
            setCutOffset(0);
            setIsCutInverted(false);
          }}
          onApplyPreset={(preset) => {
            if (preset === 'airway') {
              setCuttingAxis('x');
              setCutOffset(-0.15);
              setIsCutInverted(false);
            } else if (preset === 'pcb') {
              setCuttingAxis('z');
              setCutOffset(0.02);
              setIsCutInverted(false);
            } else if (preset === 'power') {
              setCuttingAxis('y');
              setCutOffset(-0.24);
              setIsCutInverted(false);
            }
          }}
          showPlaneVisualizer={showPlaneVisualizer}
          onTogglePlaneVisualizer={() => setShowPlaneVisualizer(!showPlaneVisualizer)}
        />
      )}

      {section === 'technical' && (
        <TechnicalControls
          currentPreset={cameraPreset}
          onSelectPreset={setCameraPreset}
          showDimensions={showDimensions}
          onToggleDimensions={() => setShowDimensions((prev) => !prev)}
          showLabels={showLabels}
          onToggleLabels={() => setShowLabels((prev) => !prev)}
          isOrthographic={isOrthographic}
          onToggleOrthographic={() => setIsOrthographic((prev) => !prev)}
          showGrid={showGrid}
          onToggleGrid={() => setShowGrid((prev) => !prev)}
        />
      )}

      {section === 'airflow' && (
        <AirflowControls
          isPlaying={isAirflowPlaying}
          onTogglePlay={() => setIsAirflowPlaying((prev) => !prev)}
          speed={airflowSpeed}
          onChangeSpeed={setAirflowSpeed}
          activeStage={activeFlowStage}
          onSelectStage={setActiveFlowStage}
          showStreamlines={showStreamlines}
          onToggleStreamlines={() => setShowStreamlines((prev) => !prev)}
          density={particleDensity}
          onChangeDensity={setParticleDensity}
        />
      )}

      {section === 'inspection' && (
        <PartsCatalogSidebar
          selectedComponentId={selectedComponentId}
          onSelectComponent={setSelectedComponentId}
          isIsolated={isIsolated}
          onToggleIsolate={() => setIsIsolated((prev) => !prev)}
        />
      )}

      {section === 'electronics' && (
        <ElectronicsControls
          showPowerBuses={showPowerBuses}
          onTogglePowerBuses={() => setShowPowerBuses((prev) => !prev)}
          showDataBuses={showDataBuses}
          onToggleDataBuses={() => setShowDataBuses((prev) => !prev)}
          selectedComponentId={selectedComponentId}
          onSelectComponent={setSelectedComponentId}
          onOpenSchematic={() => setIsSchematicOpen(true)}
        />
      )}

      {section === 'tour' && (
        <GuidedTourOverlay
          currentStep={currentTourStep}
          currentStepIndex={currentTourStepIndex}
          totalSteps={TOUR_STEPS.length}
          isPlaying={isTourAutoPlaying}
          onTogglePlay={() => setIsTourAutoPlaying((prev) => !prev)}
          onNext={() => {
            if (currentTourStepIndex < TOUR_STEPS.length - 1) {
              setCurrentTourStepIndex((prev) => prev + 1);
            }
          }}
          onPrev={() => {
            if (currentTourStepIndex > 0) {
              setCurrentTourStepIndex((prev) => prev - 1);
            }
          }}
          onRestart={() => setCurrentTourStepIndex(0)}
          onSelectStepIndex={setCurrentTourStepIndex}
          onOpenMicroSim={setActiveMicroSimType}
        />
      )}

      {/* 5. Component Technical Information Drawer (Right Slide-out) */}
      <ComponentInfoDrawer
        component={selectedComponent}
        onClose={() => setSelectedComponentId(null)}
        onSelectComponent={setSelectedComponentId}
        onOpenMicroSim={setActiveMicroSimType}
        isIsolated={isIsolated}
        onToggleIsolate={() => setIsIsolated((prev) => !prev)}
        showIsolateButton={section === 'inspection'}
      />

      {/* 6. 2D Electronics Schematic Block Diagram Modal */}
      <SchematicModal
        isOpen={isSchematicOpen}
        onClose={() => setIsSchematicOpen(false)}
        onSelectComponent={setSelectedComponentId}
      />

      {/* 7. 3D Sensor Physics Micro-Simulation Modal */}
      <MicroSimModal
        type={activeMicroSimType}
        onClose={() => setActiveMicroSimType(null)}
      />

      {/* 8. Bottom Status & Construction Compliance Tag */}
      <div className="fixed bottom-2 left-4 z-10 hidden md:flex items-center gap-3 text-[10px] font-mono text-slate-500 pointer-events-none">
        <span>AEROSENTINEL MODEL: AS-4000-AQM</span>
        <span>•</span>
        <span>EPA 40 CFR / OSHA 1926.1153 COMPLIANT</span>
        <span>•</span>
        <span>IP67 DIE-CAST WEATHER-SEALED</span>
      </div>
    </div>
  );
};

export default App;
