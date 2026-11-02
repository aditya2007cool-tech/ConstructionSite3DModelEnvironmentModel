export type VisualizationSection = 
  | 'overview'
  | 'exploded'
  | 'xray'
  | 'cross-section'
  | 'technical'
  | 'airflow'
  | 'inspection'
  | 'electronics'
  | 'tour';

export type ComponentCategory = 'sensing' | 'computing' | 'power' | 'mechanical' | 'environmental';

export interface ParameterSpec {
  parameter: string;
  range: string;
  resolution: string;
  accuracy: string;
  standardLimit?: string;
}

export interface ElectricalSpec {
  protocol: string;
  operatingVoltage: string;
  powerConsumption: string;
  pinoutNotes: string;
}

export interface PhysicalSpec {
  dimensions: string;
  weight: string;
  materials: string;
  ipRating?: string;
}

export interface ConnectionLink {
  targetId: string;
  type: 'power' | 'data' | 'gas' | 'mechanical';
  label: string;
  voltageOrProtocol?: string;
}

export interface StationComponent {
  id: string;
  name: string;
  subname: string;
  category: ComponentCategory;
  tag: string;
  modelNumber: string;
  shortDesc: string;
  fullDesc: string;
  workingPrinciple: string;
  constructionImportance: string;
  measuredParameters: ParameterSpec[];
  electricalInterface: ElectricalSpec;
  physicalSpecs: PhysicalSpec;
  explodedOffset: [number, number, number];
  connections: ConnectionLink[];
  colorAccent: string;
  badge: string;
  hasMicroSimulation?: boolean;
  microSimType?: 'pm' | 'gas' | 'wind' | 'temp';
  tourStepIndex?: number;
}

export type CameraPreset = 'front' | 'rear' | 'left' | 'right' | 'top' | 'bottom' | 'iso';

export type CuttingAxis = 'x' | 'y' | 'z';

export interface TourStep {
  stepNumber: number;
  componentId: string;
  title: string;
  subtitle: string;
  cameraPosition: [number, number, number];
  cameraTarget: [number, number, number];
  focalPointName: string;
  narrative: string;
  howItWorks: string;
  constructionSignificance: string;
  regulatoryStandard: string;
  microSimType?: 'pm' | 'gas' | 'wind' | 'temp';
}

export type LightingPreset = 'studio' | 'sunset' | 'cad-white' | 'cyberpunk';

