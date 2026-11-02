import { StationComponent } from '../types';

export const STATION_COMPONENTS: StationComponent[] = [
  {
    id: 'main_enclosure',
    name: 'Industrial Weather-Resistant Enclosure',
    subname: 'Dual-Chamber Thermally Isolated Chassis',
    category: 'mechanical',
    tag: 'ENC-IP67',
    modelNumber: 'ENC-AL6061-IP67',
    shortDesc: 'UV-resistant ASA polymer front cowl and die-cast marine-grade aluminum backplate with dual latch clamps.',
    fullDesc: 'Engineered for extreme outdoor construction site environments (hot sun, heavy rain, dust storms, diesel fumes). Features dual internal thermal zones isolating power heat dissipation from sensitive electrochemical and optical sensors. Includes continuous silicone perimeter sealing gasket, stainless-steel quick-release tension latches, and an upper radiation sunshield.',
    workingPrinciple: 'Dual-chamber thermal chimney effect passively exhausts internal heat through a baffled top sunshield while maintaining a hermetic IP67 barrier against water ingress, concrete dust, and particulate infiltration.',
    constructionImportance: 'Construction sites expose equipment to airborne silica dust, vibration from heavy compaction machinery, water jets, and corrosive diesel exhaust. This ruggedized enclosure guarantees 24/7 continuous operation without internal contamination.',
    measuredParameters: [
      { parameter: 'Ingress Protection', range: 'IP67 / NEMA 4X', resolution: 'Dust-tight & 1m immersion', accuracy: 'IEC 60529 certified' },
      { parameter: 'Operating Temperature', range: '-30°C to +70°C', resolution: 'N/A', accuracy: 'Thermal barrier ΔT < 4°C' }
    ],
    electricalInterface: {
      protocol: 'Passive Chassis / Grounding Lug',
      operatingVoltage: 'N/A',
      powerConsumption: '0 W',
      pinoutNotes: 'Equipotential earth bonding stud (M6 brass bolt) connected to grounding mast'
    },
    physicalSpecs: {
      dimensions: '340 mm × 260 mm × 160 mm',
      weight: '4.8 kg (assembled chassis)',
      materials: 'Die-cast AlSi12 aluminum, UV-stabilized ASA polymer, 316 stainless hardware',
      ipRating: 'IP67'
    },
    explodedOffset: [0, 0, 1.8],
    connections: [
      { targetId: 'mounting_mast', type: 'mechanical', label: 'Heavy-Duty U-Bolt Saddle Clamp' },
      { targetId: 'sampling_inlet', type: 'gas', label: 'Sealed Bulkhead Pneumatic Fitting' },
      { targetId: 'control_pcb', type: 'mechanical', label: 'Vibration-Damped Standoffs (M3)' },
      { targetId: 'power_system', type: 'mechanical', label: 'Lower Thermal Bay Retaining Bracket' }
    ],
    colorAccent: '#94a3b8',
    badge: 'IP67 Housing'
  },
  {
    id: 'sampling_inlet',
    name: 'Omnidirectional Sampling Inlet & Heated De-Fogger',
    subname: 'Aspirated Rain-Cap with Anti-Condensation Heater',
    category: 'mechanical',
    tag: 'INL-HEATED',
    modelNumber: 'INL-AERO-40H',
    shortDesc: 'Aerodynamic omnidirectional air sampling head with integrated low-power heating element for humidity correction.',
    fullDesc: 'Positions sampling entry away from boundary layer turbulence. Houses a miniature 12V 4W PTC pulse-width modulated heater that raises sampled air temperature 2°C to 4°C above dew point, evaporating water mists and preventing hygroscopic growth of sulfate/nitrate particulates before optical sizing.',
    workingPrinciple: 'Aerodynamic deceleration nozzle separates large splashing droplets (>100µm) via gravitational inertial impaction while drawing fine aerosols and ambient gases isokinetically at 1.2 L/min into the analytical manifold.',
    constructionImportance: 'Water droplets from construction dust suppression misting cannons and heavy rains cause severe over-counting in optical particle sensors. The heated inlet eliminates droplet false alarms.',
    measuredParameters: [
      { parameter: 'Sample Flow Rate', range: '0.8 to 2.0 L/min', resolution: '0.05 L/min', accuracy: '±3% regulated' },
      { parameter: 'Sample RH Conditioning', range: '10% to 99% RH input', resolution: '< 70% RH conditioned output', accuracy: 'Dew point +3°C' }
    ],
    electricalInterface: {
      protocol: 'PWM Control from Main PCB',
      operatingVoltage: '12V DC',
      powerConsumption: '3.5 W (active heating)',
      pinoutNotes: 'V+, GND, NTC Temp thermistor sense'
    },
    physicalSpecs: {
      dimensions: '110 mm diameter × 180 mm height',
      weight: '320 g',
      materials: 'Anodized 6061-T6 aluminum, conductive PTFE liner to prevent electrostatic particle loss',
      ipRating: 'IP65'
    },
    explodedOffset: [0, 1.6, 0.4],
    connections: [
      { targetId: 'pm_sensor', type: 'gas', label: 'Conductive Anti-Static Silicone Tubing' },
      { targetId: 'control_pcb', type: 'power', label: '12V PWM Heater Power & Thermistor' }
    ],
    colorAccent: '#0ea5e9',
    badge: 'Aero Inlet'
  },
  {
    id: 'pm_sensor',
    name: 'Laser Optical Particle Counter (PM1, PM2.5, PM10)',
    subname: 'Dual-Laser 90° Light Scattering Nephelometer',
    category: 'sensing',
    tag: 'OPC-PM-LAB',
    modelNumber: 'OPC-N4-CONSTRUCTION',
    shortDesc: 'Continuous laser spectrometer measuring real-time PM1.0, PM2.5, and PM10 particulate mass concentrations.',
    fullDesc: 'Utilizes a 650nm Class 3R 50mW laser diode focused across a 0.5 mm³ sensing volume. A miniature precision brushless centrifugal blower draws sample air enclosed in a clean sheath air boundary layer. Scattered light from passing dust particles is collected at 90° by an elliptical mirror onto a high-speed PIN photodiode and processed via 16-channel pulse height classification.',
    workingPrinciple: 'Mie Scattering Theory: As airborne dust particles traverse the focused laser beam, the intensity of scattered light is proportional to the square of particle diameter. High-speed analog circuitry counts pulses and computes size bins from 0.35 µm to 40 µm.',
    constructionImportance: 'Construction site activities (excavation, concrete cutting, blasting, diesel hauling) generate hazardous respirable crystalline silica (PM2.5) and coarse dust (PM10). Critical for compliance with OSHA 29 CFR 1926.1153 silica safety standards.',
    measuredParameters: [
      { parameter: 'PM1.0 Concentration', range: '0 to 2,000 µg/m³', resolution: '0.1 µg/m³', accuracy: '±10% of reading', standardLimit: 'WHO: 15 µg/m³ 24h' },
      { parameter: 'PM2.5 Concentration', range: '0 to 2,500 µg/m³', resolution: '0.1 µg/m³', accuracy: '±8% of reading', standardLimit: 'EPA: 35 µg/m³, OSHA silica: 50 µg/m³' },
      { parameter: 'PM10 Concentration', range: '0 to 5,000 µg/m³', resolution: '0.1 µg/m³', accuracy: '±10% of reading', standardLimit: 'EPA: 150 µg/m³ 24h' }
    ],
    electricalInterface: {
      protocol: 'UART / SPI Serial (115200 baud)',
      operatingVoltage: '5.0V DC regulated',
      powerConsumption: '1.1 W (nominal)',
      pinoutNotes: 'VCC (5V), GND, TX, RX, RESET, FAN_PWM'
    },
    physicalSpecs: {
      dimensions: '75 mm × 60 mm × 45 mm',
      weight: '165 g',
      materials: 'Solid CNC milled black-anodized aluminum optical cavity, optical glass collimator',
      ipRating: 'IP50 internal'
    },
    explodedOffset: [0.9, 0.4, 0.6],
    connections: [
      { targetId: 'sampling_inlet', type: 'gas', label: '1.2 L/min Sample Air Tube' },
      { targetId: 'control_pcb', type: 'data', label: 'UART Serial & 5V Regulated Bus' },
      { targetId: 'gas_no2', type: 'gas', label: 'Series Manifold Exhaust Route' }
    ],
    colorAccent: '#ef4444',
    badge: 'PM1 / PM2.5 / PM10',
    hasMicroSimulation: true,
    microSimType: 'pm',
    tourStepIndex: 1
  },
  {
    id: 'gas_no2',
    name: 'Nitrogen Dioxide (NO₂) Sensor Module',
    subname: '4-Electrode Amperometric Toxic Gas Cell',
    category: 'sensing',
    tag: 'GAS-NO2',
    modelNumber: 'NO2-A43F-ISB',
    shortDesc: 'Ultra-low ppb resolution electrochemical sensor detecting diesel exhaust emissions from site machinery.',
    fullDesc: 'Equipped with 4 electrodes: Working (catalytic precious metal), Reference, Counter, and an Auxiliary baseline electrode that provides real-time thermal zero-offset compensation. Placed in a high-grade Delrin manifold block with PTFE diffusion barrier.',
    workingPrinciple: 'Amperometric Reduction: NO₂ molecules diffuse through a porous membrane and are reduced at the working electrode (NO₂ + 2H⁺ + 2e⁻ → NO + H₂O). The generated nanoampere current is directly proportional to NO₂ concentration.',
    constructionImportance: 'Heavy diesel equipment (excavators, bulldozers, generators, haul trucks) emits massive NO₂ quantities. NO₂ causes severe respiratory inflammation and reacts to form ground-level ozone and toxic photochemical smog.',
    measuredParameters: [
      { parameter: 'NO₂ Gas Concentration', range: '0 to 5,000 ppb (5 ppm)', resolution: '1.5 ppb', accuracy: '±5 ppb or ±5% reading', standardLimit: 'EPA NAAQS: 100 ppb (1-hour avg)' }
    ],
    electricalInterface: {
      protocol: 'Precision Analog to 24-bit ADC / I2C AFE',
      operatingVoltage: '3.3V DC (AFE supply)',
      powerConsumption: '35 mW',
      pinoutNotes: 'Working, Auxiliary, Reference, Counter pins to Potentiostat circuit'
    },
    physicalSpecs: {
      dimensions: '20 mm diameter × 16.5 mm height',
      weight: '18 g',
      materials: 'Polycarbonate body, platinum-black electrode catalyst, aqueous electrolyte',
      ipRating: 'IP65 with PTFE membrane'
    },
    explodedOffset: [-0.9, 0.4, 0.6],
    connections: [
      { targetId: 'control_pcb', type: 'data', label: 'Differential Analog Nanoamp Signal' },
      { targetId: 'gas_co', type: 'gas', label: 'Shared Gas Manifold Rail' }
    ],
    colorAccent: '#f59e0b',
    badge: 'NO₂ Gas',
    hasMicroSimulation: true,
    microSimType: 'gas',
    tourStepIndex: 2
  },
  {
    id: 'gas_co',
    name: 'Carbon Monoxide (CO) Sensor Module',
    subname: '4-Electrode Electrochemical Safety Cell',
    category: 'sensing',
    tag: 'GAS-CO',
    modelNumber: 'CO-A4-HEAVY',
    shortDesc: 'Electrochemical sensor detecting incomplete combustion from diesel engines, heaters, and generators.',
    fullDesc: 'High-stability potentiostatic 4-electrode cell designed to withstand high concentration transients without saturation. Features a catalytic chemical filter that strips hydrogen (H₂) and alcohol cross-interferences.',
    workingPrinciple: 'Amperometric Oxidation: Carbon monoxide gas molecules diffuse across the liquid-solid phase boundary and oxidize into carbon dioxide at the anode: CO + H₂O → CO₂ + 2H⁺ + 2e⁻. Current flows to the cathode, driving an ultra-low drift signal.',
    constructionImportance: 'CO is an odorless, colorless lethal hazard emitted in large volumes by enclosed excavation trenching, tunneling, stationary generators, and unventilated concrete curing propane heaters.',
    measuredParameters: [
      { parameter: 'CO Concentration', range: '0 to 500 ppm', resolution: '0.05 ppm', accuracy: '±2% reading', standardLimit: 'OSHA PEL: 50 ppm, EPA: 9 ppm (8h)' }
    ],
    electricalInterface: {
      protocol: 'Analog Potentiostat to 24-bit ADC',
      operatingVoltage: '3.3V DC',
      powerConsumption: '28 mW',
      pinoutNotes: 'WE, AE, RE, CE connections'
    },
    physicalSpecs: {
      dimensions: '20 mm diameter × 16.5 mm height',
      weight: '18 g',
      materials: 'Polycarbonate, gold/platinum black catalyst',
      ipRating: 'IP65 with hydrophobic membrane'
    },
    explodedOffset: [-0.7, 0.4, 0.8],
    connections: [
      { targetId: 'control_pcb', type: 'data', label: 'Analog to 24-Bit Sigma-Delta ADC' }
    ],
    colorAccent: '#f97316',
    badge: 'CO Gas',
    tourStepIndex: 3
  },
  {
    id: 'gas_so2',
    name: 'Sulfur Dioxide (SO₂) Sensor Module',
    subname: 'Low-ppb Electrochemical Acid Gas Detector',
    category: 'sensing',
    tag: 'GAS-SO2',
    modelNumber: 'SO2-B4-IND',
    shortDesc: 'Detects sulfur emissions originating from heavy crude fuels, asphalt paving, and batch plant operations.',
    fullDesc: 'Specially biased electrochemical cell optimized for sulfur dioxide detection down to single-digit ppb levels. Incorporates an internal acid-resistant electrolyte reservoir and high-capacity activated carbon scrubbers for ozone/NO2 rejection.',
    workingPrinciple: 'Electrochemical oxidation of SO₂: SO₂ + 2H₂O → H₂SO₄ + 2H⁺ + 2e⁻ producing an electrical current proportional to partial gas pressure.',
    constructionImportance: 'Road paving, asphalt laydown, and diesel generators using low-spec fuel emit high SO₂. Causes acid rain, corrosive wear on construction rebar, and acute respiratory distress in workers.',
    measuredParameters: [
      { parameter: 'SO₂ Concentration', range: '0 to 2,000 ppb (2 ppm)', resolution: '2 ppb', accuracy: '±5% reading', standardLimit: 'EPA 1-Hour: 75 ppb' }
    ],
    electricalInterface: {
      protocol: 'Analog Potentiostat via I2C AFE',
      operatingVoltage: '3.3V DC',
      powerConsumption: '30 mW',
      pinoutNotes: '4-Pin ISB format'
    },
    physicalSpecs: {
      dimensions: '20 mm diameter × 16.5 mm height',
      weight: '19 g',
      materials: 'Chemical-resistant fluoropolymer casing',
      ipRating: 'IP65'
    },
    explodedOffset: [-0.5, 0.4, 1.0],
    connections: [
      { targetId: 'control_pcb', type: 'data', label: 'Low-Noise Analog Channel' }
    ],
    colorAccent: '#eab308',
    badge: 'SO₂ Gas',
    tourStepIndex: 4
  },
  {
    id: 'gas_o3',
    name: 'Ground-Level Ozone (O₃) Sensor Module',
    subname: 'Low-ppb Photochemical Smog Detector',
    category: 'sensing',
    tag: 'GAS-O3',
    modelNumber: 'OX-A431-HIGH-SENS',
    shortDesc: 'Monitors secondary photochemical oxidant formation produced when construction emissions bake in sunlight.',
    fullDesc: 'Ultra-sensitive 4-electrode cell with an integrated selective catalytic internal scrubber to eliminate NO₂ cross-sensitivity, providing pure ground-level tropospheric ozone measurement.',
    workingPrinciple: 'Catalytic reduction of ozone molecules at the gas-liquid triple-point interface: O₃ + 2H⁺ + 2e⁻ → O₂ + H₂O, driving an electron flow quantified via ultra-high input impedance operational amplifiers.',
    constructionImportance: 'Construction VOCs (paints, solvents, waterproofing membranes) and diesel NOx react in ambient UV sunlight to form toxic ozone plumes, posing extreme health risks to perimeter communities.',
    measuredParameters: [
      { parameter: 'Ozone (O₃) Concentration', range: '0 to 2,000 ppb (2 ppm)', resolution: '2 ppb', accuracy: '±5 ppb or 5%', standardLimit: 'EPA 8-Hour: 70 ppb' }
    ],
    electricalInterface: {
      protocol: 'Analog to 24-bit ADC',
      operatingVoltage: '3.3V DC',
      powerConsumption: '32 mW',
      pinoutNotes: 'Standard 4-pin cluster'
    },
    physicalSpecs: {
      dimensions: '20 mm diameter × 16.5 mm height',
      weight: '18 g',
      materials: 'Delrin housing with micro-perforated gold mesh',
      ipRating: 'IP65'
    },
    explodedOffset: [-0.3, 0.4, 1.2],
    connections: [
      { targetId: 'control_pcb', type: 'data', label: 'AFE Potentiostat Channel 4' }
    ],
    colorAccent: '#a855f7',
    badge: 'O₃ Ozone',
    tourStepIndex: 5
  },
  {
    id: 'env_temp_rh',
    name: 'Temperature & Humidity Sensor Probe',
    subname: 'Digital SHT4x in Solar Radiation Screen',
    category: 'environmental',
    tag: 'ENV-SHT',
    modelNumber: 'SHT45-IP67-SHIELD',
    shortDesc: 'Calibrated environmental probe housed inside an 8-plate naturally aspirated solar radiation shield.',
    fullDesc: 'Features a CMOSens microchip with a capacitive polymer relative humidity sensor and silicon bandgap temperature sensor protected by a sintered porous 316 stainless-steel filter cap (5µm pore size). The outer multi-plate radiation screen prevents direct solar heating bias.',
    workingPrinciple: 'Capacitive dielectric change: Ambient water vapor penetrates a porous polymer dielectric, modifying the capacitor plate capacitance proportionally to Relative Humidity. An on-chip precision bandgap PTAT circuit measures thermodynamic temperature.',
    constructionImportance: 'Essential for dynamic mathematical correction of PM optical sensors (hygroscopic particle growth factor f(RH)) and electrochemical gas sensor baseline temperature compensation algorithms.',
    measuredParameters: [
      { parameter: 'Ambient Temperature', range: '-40°C to +85°C', resolution: '0.01°C', accuracy: '±0.1°C' },
      { parameter: 'Relative Humidity', range: '0% to 100% RH', resolution: '0.01% RH', accuracy: '±1.0% RH' }
    ],
    electricalInterface: {
      protocol: 'I2C Bus (Fast Mode Plus 1 MHz)',
      operatingVoltage: '3.3V DC',
      powerConsumption: '0.4 mW (periodic sampling)',
      pinoutNotes: 'VCC, GND, SDA, SCL with 4.7k pullups'
    },
    physicalSpecs: {
      dimensions: '85 mm diameter × 140 mm height',
      weight: '210 g',
      materials: 'UV-reflective white ASA thermoplastic plates, 316 stainless probe',
      ipRating: 'IP67'
    },
    explodedOffset: [1.2, -0.6, 0.3],
    connections: [
      { targetId: 'control_pcb', type: 'data', label: 'I2C Digital Bus (Address 0x44)' },
      { targetId: 'mounting_mast', type: 'mechanical', label: 'Stand-off Arm Bracket' }
    ],
    colorAccent: '#06b6d4',
    badge: 'Temp & RH',
    hasMicroSimulation: true,
    microSimType: 'temp',
    tourStepIndex: 6
  },
  {
    id: 'baro_pressure',
    name: 'Atmospheric Pressure Sensor (Barometer)',
    subname: 'MEMS Piezoresistive Digital Pressure Module',
    category: 'environmental',
    tag: 'BARO-MEMS',
    modelNumber: 'BMP390-PRECISION',
    shortDesc: 'Ultra-low noise barometric pressure sensor for atmospheric density calculations and altitude normalization.',
    fullDesc: 'Miniaturized MEMS pressure transducer mounted directly on the motherboard with a dedicated breathing hole to the ambient chamber. Delivers 24-bit pressure readings with negligible temperature drift.',
    workingPrinciple: 'Piezoresistive Wheatstone Bridge: Atmospheric pressure deforms an etched silicon diaphragm containing integrated piezoresistors. The stress changes electrical resistance, digitized by an ultra-low-noise internal delta-sigma ADC.',
    constructionImportance: 'Atmospheric pressure governs gas molar volume and volumetric-to-standard mass conversion (mg/m³ vs ppm) required by EPA Clean Air Act reporting. Also tracks approaching weather fronts and thermal inversion layers.',
    measuredParameters: [
      { parameter: 'Barometric Pressure', range: '300 to 1,250 hPa', resolution: '0.01 hPa (0.08 m height)', accuracy: '±0.5 hPa' }
    ],
    electricalInterface: {
      protocol: 'I2C / SPI (Address 0x77)',
      operatingVoltage: '3.3V DC',
      powerConsumption: '3.2 µA at 1 Hz',
      pinoutNotes: 'Directly SMD soldered on Motherboard PCB'
    },
    physicalSpecs: {
      dimensions: '2.0 mm × 2.0 mm × 0.75 mm',
      weight: '< 0.05 g',
      materials: 'Silicon die, LGA ceramic package with stainless lid',
      ipRating: 'Protected in chassis'
    },
    explodedOffset: [0.1, 0.1, 0.7],
    connections: [
      { targetId: 'control_pcb', type: 'data', label: 'Direct PCB I2C Bus' }
    ],
    colorAccent: '#60a5fa',
    badge: 'Barometer',
    tourStepIndex: 7
  },
  {
    id: 'wind_anemometer',
    name: '3-Cup Rotary Anemometer (Wind Speed)',
    subname: 'Low-Threshold Optical/Magnetic Wind Sensor',
    category: 'sensing',
    tag: 'WIND-SPD',
    modelNumber: 'ANEMO-PRO-CUP3',
    shortDesc: 'Aerodynamic rotor with 3 conical cups mounted on stainless precision miniature bearings for wind velocity.',
    fullDesc: 'Positioned on the topmost mast arm away from aerodynamic turbulence. Features low-mass conical cups with beaded rims that offer minimal inertia and a low starting threshold (< 0.4 m/s). An internal optical slotted chopper disc produces high-frequency pulses.',
    workingPrinciple: 'Aerodynamic Drag Differential: Concave cup faces experience greater wind drag than convex backs, causing rotation whose angular velocity is strictly linear with horizontal wind speed (v = k × ω).',
    constructionImportance: 'Construction sites must cease crane lifting operations, earthmoving, and demolition when wind speed exceeds safety thresholds (typically > 12 m/s or 27 mph) due to fugitive dust dispersion and structural crane risks.',
    measuredParameters: [
      { parameter: 'Wind Speed', range: '0.3 to 55 m/s (1.1 to 198 km/h)', resolution: '0.05 m/s', accuracy: '±2% or ±0.2 m/s' }
    ],
    electricalInterface: {
      protocol: 'Pulse Frequency Output (Square Wave) to MCU Timer',
      operatingVoltage: '5V DC',
      powerConsumption: '12 mW',
      pinoutNotes: 'VCC, GND, FREQ_OUT'
    },
    physicalSpecs: {
      dimensions: '180 mm rotor diameter × 150 mm height',
      weight: '280 g',
      materials: 'Carbon-fiber reinforced polycarbonate cups, 316 stainless spindle, dual shielded bearings',
      ipRating: 'IP66'
    },
    explodedOffset: [-1.4, 1.8, 0],
    connections: [
      { targetId: 'control_pcb', type: 'data', label: 'Timer/Counter Input Channel 1' },
      { targetId: 'mounting_mast', type: 'mechanical', label: 'Top Crossarm Mounting Bracket' }
    ],
    colorAccent: '#38bdf8',
    badge: 'Wind Speed',
    hasMicroSimulation: true,
    microSimType: 'wind',
    tourStepIndex: 8
  },
  {
    id: 'wind_vane',
    name: 'Aerodynamic Wind Vane (Wind Direction)',
    subname: 'Contactless 12-Bit Magnetic Angle Encoder',
    category: 'sensing',
    tag: 'WIND-DIR',
    modelNumber: 'VANE-MAG-360',
    shortDesc: 'Precision balanced wind vane with aerofoil tail and counterweight delivering continuous 360° azimuth angle.',
    fullDesc: 'Features a low-drag NACA aerodynamic fin tail balanced by a solid brass nose counterweight. A diametrically magnetized neodymium magnet on the shaft is read by an AS5600 12-bit contactless Hall-effect rotary sensor with zero physical wiper wear and zero deadband.',
    workingPrinciple: 'Aerodynamic Self-Alignment: When the vane misaligns with wind flow, asymmetric lift and drag force the tail into the downwind direction, pointing the nose directly into the oncoming wind vector. The magnetic angle sensor reads the absolute azimuth orientation.',
    constructionImportance: 'Crucial for pollution plume dispersion modeling. Identifies whether dust clouds and toxic gases are migrating toward nearby residential neighborhoods or sensitive ecological zones.',
    measuredParameters: [
      { parameter: 'Wind Direction Azimuth', range: '0° to 359.9° (Continuous)', resolution: '0.1°', accuracy: '±1.5°', standardLimit: 'WMO Meteorological Standard' }
    ],
    electricalInterface: {
      protocol: 'I2C / 12-bit Analog Voltage (0-3.3V)',
      operatingVoltage: '3.3V DC',
      powerConsumption: '15 mW',
      pinoutNotes: 'VCC, GND, SDA, SCL'
    },
    physicalSpecs: {
      dimensions: '240 mm fin length × 190 mm height',
      weight: '310 g',
      materials: 'Aircraft-grade anodized aluminum tail, turned brass counterweight, stainless shaft',
      ipRating: 'IP66'
    },
    explodedOffset: [1.4, 1.8, 0],
    connections: [
      { targetId: 'control_pcb', type: 'data', label: 'I2C Absolute Magnetic Angle Stream' },
      { targetId: 'mounting_mast', type: 'mechanical', label: 'Top Crossarm Mounting Bracket' }
    ],
    colorAccent: '#22d3ee',
    badge: 'Wind Direction',
    tourStepIndex: 9
  },
  {
    id: 'control_pcb',
    name: 'Main Electronic Control Board (Motherboard)',
    subname: 'Dual-Core Industrial 32-Bit ARM / ESP32-S3 Board',
    category: 'computing',
    tag: 'MAIN-BOARD',
    modelNumber: 'AS-PCB-REV4.2',
    shortDesc: 'Conformal-coated 4-layer FR4 industrial motherboard with low-noise 24-bit analog front-end and watchdog.',
    fullDesc: 'The computing brain of the station. Hosts a 240 MHz dual-core microcontroller, multi-channel 24-bit delta-sigma ADCs with ultra-low noise references (< 1µV RMS), transient voltage suppressor (TVS) diodes, hardware watchdog timer, screw terminal blocks, and real-time clock with coin cell backup. Protected by military-grade polyurethane conformal coating against humidity and dust.',
    workingPrinciple: 'Executes synchronized sampling algorithms, digital filtering (Kalman filters), gas temperature-compensation matrices, PM hygroscopic correction algorithms, edge validation, and encrypts telemetry payloads via TLS/MQTT.',
    constructionImportance: 'Performs robust on-site edge analytics, local SD data logging (guaranteeing zero data loss during cellular network dropouts), and power management.',
    measuredParameters: [
      { parameter: 'Processing Clock', range: '240 MHz Dual-Core', resolution: '32-Bit Floating Point', accuracy: '10 ppm Quartz' },
      { parameter: 'Analog Front-End (AFE)', range: '4 Channels Electrochemical', resolution: '24-Bit (0.1 nA sensitivity)', accuracy: '±0.05% FS' }
    ],
    electricalInterface: {
      protocol: 'CAN / RS-485 Modbus / UART / I2C / SPI',
      operatingVoltage: '3.3V & 5.0V (from internal buck regulators)',
      powerConsumption: '480 mW (nominal processing)',
      pinoutNotes: 'Pluggable industrial screw terminal headers'
    },
    physicalSpecs: {
      dimensions: '160 mm × 120 mm × 18 mm',
      weight: '145 g',
      materials: 'High-TG FR4 4-layer PCB, 2oz copper, lead-free HASL, Humiseal 1B31 coating',
      ipRating: 'Conformal Coated (MIL-I-46058C)'
    },
    explodedOffset: [0, 0, 0.4],
    connections: [
      { targetId: 'pm_sensor', type: 'data', label: 'UART Serial Bus' },
      { targetId: 'gas_no2', type: 'data', label: 'Low-Noise AFE Channel 1' },
      { targetId: 'gas_co', type: 'data', label: 'Low-Noise AFE Channel 2' },
      { targetId: 'gas_so2', type: 'data', label: 'Low-Noise AFE Channel 3' },
      { targetId: 'gas_o3', type: 'data', label: 'Low-Noise AFE Channel 4' },
      { targetId: 'env_temp_rh', type: 'data', label: 'Isolated I2C Bus' },
      { targetId: 'baro_pressure', type: 'data', label: 'Internal I2C' },
      { targetId: 'wind_anemometer', type: 'data', label: 'Pulse Frequency Counter' },
      { targetId: 'wind_vane', type: 'data', label: 'I2C Angle Stream' },
      { targetId: 'gps_module', type: 'data', label: 'UART NMEA Stream (9600 baud)' },
      { targetId: 'cellular_modem', type: 'data', label: 'High-Speed UART AT/PPP (921600 baud)' },
      { targetId: 'power_system', type: 'power', label: 'Main 12V DC Regulated Infeed' }
    ],
    colorAccent: '#10b981',
    badge: 'Main MCU Board',
    tourStepIndex: 11
  },
  {
    id: 'gps_module',
    name: 'Multi-Constellation GNSS / GPS Module',
    subname: 'High-Precision Positioning & Microsecond PPS Timebase',
    category: 'computing',
    tag: 'GNSS-PRECISION',
    modelNumber: 'GNSS-M9N-CERAMIC',
    shortDesc: 'Multi-system satellite receiver with 25x25mm active ceramic patch antenna for location and time stamping.',
    fullDesc: 'Receives signals from GPS, GLONASS, Galileo, and BeiDou simultaneously. Provides sub-meter location tracking to ensure all particulate and gas measurements are georeferenced, and generates a 1-pulse-per-second (1PPS) precision timing strobe for microsecond sensor synchronization.',
    workingPrinciple: 'Trilateration: Calculates pseudoranges from minimum 8 visible satellites using carrier-phase tracking to establish 3D coordinates and nanosecond-accurate UTC time.',
    constructionImportance: 'Construction site layouts change rapidly. Earthmoving equipment relocates stations, and legal compliance requires legally indisputable GPS geofencing and synchronized time-stamping.',
    measuredParameters: [
      { parameter: 'Horizontal Accuracy', range: '2.0 m CEP (Autonomous)', resolution: '0.000001° Lat/Lon', accuracy: 'DGPS / SBAS: 1.5 m' },
      { parameter: 'Timebase Sync', range: '1 PPS Hardware Strobe', resolution: '30 ns jitter', accuracy: 'UTC Synchronized' }
    ],
    electricalInterface: {
      protocol: 'UART (NMEA 0183 & UBX binary)',
      operatingVoltage: '3.3V DC',
      powerConsumption: '65 mW',
      pinoutNotes: 'VCC, GND, TX, RX, 1PPS Strobe'
    },
    physicalSpecs: {
      dimensions: '28 mm × 28 mm × 8.5 mm',
      weight: '24 g',
      materials: 'Ceramic dielectric patch, tin-plated RF shield, U.FL RF pigtail',
      ipRating: 'Internal'
    },
    explodedOffset: [0.6, 0.8, 0.4],
    connections: [
      { targetId: 'control_pcb', type: 'data', label: 'UART NMEA & 1PPS Interrupt Line' }
    ],
    colorAccent: '#14b8a6',
    badge: 'GPS / GNSS',
    tourStepIndex: 10
  },
  {
    id: 'cellular_modem',
    name: 'Industrial 4G LTE-M / NB-IoT Modem & Antenna',
    subname: 'Secure IoT Cellular Gateway with Fallback',
    category: 'computing',
    tag: 'COM-LTE',
    modelNumber: 'IOT-LTE-CATM1-PRO',
    shortDesc: 'Low-power wide-area cellular transceiver with external IP67 fiberglass omnidirectional whip antenna.',
    fullDesc: 'Ruggedized industrial cellular modem supporting LTE Cat-M1, NB-IoT, and 2G EGPRS fallback. Features an embedded hardware cryptographic security element (eSIM + Micro-SIM slot), SMA-female RF connector, and a 3dBi gain fiberglass omnidirectional antenna mounted to the top chassis.',
    workingPrinciple: 'Establishes secure encrypted TLS 1.3 tunnels to transmit JSON/Protobuf telemetry packets via MQTT over TCP/IP to centralized site safety management cloud servers.',
    constructionImportance: 'Construction sites frequently lack permanent Wi-Fi or Ethernet infrastructure. Cellular IoT provides instant autonomous connectivity across miles of excavation and infrastructure projects.',
    measuredParameters: [
      { parameter: 'Cellular Bands', range: 'B1, B2, B3, B4, B5, B8, B12, B20, B28', resolution: 'LTE Cat-M1 (375 kbps)', accuracy: 'Sensitivity -107 dBm' },
      { parameter: 'Transmission Protocol', range: 'MQTT over TLS 1.3 / HTTPS', resolution: 'Packet interval 10s-300s', accuracy: 'Zero-loss auto retransmission' }
    ],
    electricalInterface: {
      protocol: 'High-Speed UART / USB 2.0 AT Command Interface',
      operatingVoltage: '3.8V to 4.2V DC (Dedicated switching regulator)',
      powerConsumption: '0.8 W (burst transmit), 15 mW (sleep)',
      pinoutNotes: 'UART TX/RX, RTS/CTS, PWRKEY, STATUS, NETLIGHT'
    },
    physicalSpecs: {
      dimensions: 'Modem: 40 × 35 × 5 mm; Antenna: 220 mm × 20 mm dia.',
      weight: '120 g (modem + antenna assembly)',
      materials: 'Die-cast shield, fiberglass UV-stable antenna radome, gold SMA',
      ipRating: 'Antenna IP67 / Modem internal'
    },
    explodedOffset: [0.8, 1.4, 0.2],
    connections: [
      { targetId: 'control_pcb', type: 'data', label: 'UART AT Command & Data Stream' },
      { targetId: 'power_system', type: 'power', label: 'Regulated 3.8V High-Current Rail' }
    ],
    colorAccent: '#8b5cf6',
    badge: '4G LTE / NB-IoT',
    tourStepIndex: 12
  },
  {
    id: 'power_system',
    name: 'LiFePO4 Battery & MPPT Power Management Unit',
    subname: '12.8V 20Ah Deep-Cycle Pack with Synchronous MPPT',
    category: 'power',
    tag: 'PWR-LIFEPO4',
    modelNumber: 'PWR-BMS-256WH',
    shortDesc: 'High-safety Lithium Iron Phosphate battery pack with integrated hardware BMS and 98% efficiency MPPT charger.',
    fullDesc: 'Houses 4 prismatic LiFePO4 cells configured in 4S1P (12.8V nominal, 256 Wh). Chemistry offers 3,000+ deep discharge cycles and inherent thermal safety (zero thermal runaway risk up to 250°C). Combined with a military-spec Synchronous Buck MPPT solar charge controller that extracts maximum power from the solar panel.',
    workingPrinciple: 'Maximum Power Point Tracking (Perturb and Observe algorithm): Continuously calculates solar array voltage and current to operate at maximum P_max curve, down-converting voltage to charge the battery pack with 98% conversion efficiency.',
    constructionImportance: 'Construction sites often cut utility power at night or lack grid hookups. This energy storage system provides 7 days of complete autonomous operation even during heavy overcast rain and zero solar harvest.',
    measuredParameters: [
      { parameter: 'Nominal Capacity', range: '20 Ah (256 Wh storage)', resolution: '0.01 Ah gas gauge', accuracy: 'Coulomb counting ±1%' },
      { parameter: 'Autonomy Duration', range: '168 hours (7 days without sun)', resolution: 'N/A', accuracy: 'Continuous full load' },
      { parameter: 'MPPT Efficiency', range: '98.2% peak efficiency', resolution: '0.1%', accuracy: 'Fast tracking < 1s' }
    ],
    electricalInterface: {
      protocol: 'SMBus / I2C Smart Battery Gauge & Modbus MPPT telemetry',
      operatingVoltage: 'Battery: 10.0V to 14.6V; Solar input: 15V to 30V DC',
      powerConsumption: 'Self-consumption < 8 mA',
      pinoutNotes: 'Anderson Powerpole connectors, fused output (10A)'
    },
    physicalSpecs: {
      dimensions: '180 mm × 100 mm × 95 mm',
      weight: '2.6 kg',
      materials: 'Flame-retardant ABS enclosure (UL94 V-0), aluminum heatsink baseplate',
      ipRating: 'IP65'
    },
    explodedOffset: [0, -1.2, 0.8],
    connections: [
      { targetId: 'solar_panel', type: 'power', label: 'Solar PV DC Input (18V-24V)' },
      { targetId: 'control_pcb', type: 'power', label: 'Primary 12V DC Regulated Rail' },
      { targetId: 'main_enclosure', type: 'mechanical', label: 'Lower Vibration Isolator Tray' }
    ],
    colorAccent: '#22c55e',
    badge: 'LiFePO4 & MPPT',
    tourStepIndex: 13
  },
  {
    id: 'solar_panel',
    name: 'High-Efficiency Monocrystalline Solar Panel',
    subname: '40W Photovoltaic Module with Adjustable Tilt Bracket',
    category: 'power',
    tag: 'SOLAR-PV-40W',
    modelNumber: 'PV-MONO-40W-ADJ',
    shortDesc: 'Heavy-duty monocrystalline solar PV module with tempered anti-reflective glass and 15° to 45° latitude tilt.',
    fullDesc: 'High-transmission 3.2mm tempered solar glass front with textured hydrophobic anti-soiling coating (resists construction cement dust adherence). Heavy-gauge anodized aluminum extrusion frame with slotted channel tracks and stainless swivel tilt arm allowing angle tuning to match construction site latitude for optimal year-round solar capture.',
    workingPrinciple: 'Photovoltaic Effect: Solar photons striking the P-N junction of high-purity monocrystalline silicon cells liberate electron-hole pairs, establishing a continuous direct current (DC) flow collected by silver surface fingers and busbars.',
    constructionImportance: 'Enables 100% self-powered off-grid installation anywhere on the construction perimeter without running hazardous 110V/240V utility extension cables across heavy equipment vehicle tracks.',
    measuredParameters: [
      { parameter: 'Peak Power (Pmax)', range: '40 Watts', resolution: '0.1 W', accuracy: '±3% power tolerance' },
      { parameter: 'Open Circuit Voltage (Voc)', range: '22.4 V', resolution: '0.1 V', accuracy: 'STC Standard' },
      { parameter: 'Short Circuit Current (Isc)', range: '2.35 A', resolution: '0.01 A', accuracy: 'STC Standard' }
    ],
    electricalInterface: {
      protocol: 'DC Power via UV-Resistant Solar Cable',
      operatingVoltage: '18.2 V Vmp (Maximum Power Voltage)',
      powerConsumption: 'Power Generator (+40W Peak)',
      pinoutNotes: 'IP68 Junction box with bypass diodes & MC4 connectors'
    },
    physicalSpecs: {
      dimensions: '540 mm × 460 mm × 30 mm',
      weight: '3.4 kg',
      materials: 'Low-iron tempered glass, anodized aluminum frame, EVA encapsulant, Tedlar backsheet',
      ipRating: 'IP68'
    },
    explodedOffset: [0, 1.4, -1.8],
    connections: [
      { targetId: 'power_system', type: 'power', label: 'UV-Rated 2.5mm² Solar Cable to MPPT' },
      { targetId: 'mounting_mast', type: 'mechanical', label: 'Adjustable Elevation Tilt Arm' }
    ],
    colorAccent: '#facc15',
    badge: '40W Solar PV'
  },
  {
    id: 'mounting_mast',
    name: 'Heavy-Duty Structural Pole & Mounting Assembly',
    subname: 'Galvanized Structural Steel Mast with Isolators & Grounding',
    category: 'mechanical',
    tag: 'MAST-STRUCT',
    modelNumber: 'MAST-GALV-50MM-3M',
    shortDesc: '2-inch hot-dip galvanized schedule 40 steel pole with vibration isolation saddles and earthing lug.',
    fullDesc: 'Engineered to withstand construction site wind gusts up to 140 km/h (Category 1 hurricane equivalent). Features dual 316 stainless-steel U-bolt mounting clamps lined with vibration-damping neoprene rubber sleeves to isolate sensitive optical particle sensors from heavy compaction roller vibrations. Equipped with an M8 copper grounding stud for lightning protection.',
    workingPrinciple: 'Rigid cantilevered structural support elevates meteorological instruments to 2-3 meters above ground level, avoiding localized vehicle wake turbulence while providing stable mechanical anchoring.',
    constructionImportance: 'Construction sites feature massive ground vibration from vibratory rollers, pile drivers, and bulldozers. Without isolation dampers, optical sensors experience false particle vibration counts.',
    measuredParameters: [
      { parameter: 'Mast Outer Diameter', range: '50.8 mm (2.00 inch Schedule 40)', resolution: 'Nominal', accuracy: 'ASTM A53' },
      { parameter: 'Max Wind Load Rating', range: '140 km/h with 40W solar panel', resolution: 'N/A', accuracy: 'Safety factor 2.5×' }
    ],
    electricalInterface: {
      protocol: 'Earth Grounding Bond',
      operatingVoltage: '0V (Ground Potential)',
      powerConsumption: '0 W',
      pinoutNotes: 'Direct copper braid connection to site earthing ground rod'
    },
    physicalSpecs: {
      dimensions: '50.8 mm diameter × 1,800 mm assembled length',
      weight: '7.2 kg',
      materials: 'Hot-dip galvanized structural steel (ISO 1461), neoprene dampers, 316 stainless U-bolts',
      ipRating: 'Weather-Proof'
    },
    explodedOffset: [0, -1.8, -0.6],
    connections: [
      { targetId: 'main_enclosure', type: 'mechanical', label: 'Dual U-Bolt Bracket Clamp' },
      { targetId: 'solar_panel', type: 'mechanical', label: 'Cantilever Tilt Mount Arm' },
      { targetId: 'wind_anemometer', type: 'mechanical', label: 'Top Mast T-Crossarm' },
      { targetId: 'wind_vane', type: 'mechanical', label: 'Top Mast T-Crossarm' }
    ],
    colorAccent: '#64748b',
    badge: 'Mast & Mount'
  },
  {
    id: 'ventilation_mesh',
    name: 'Hydrophobic Vent Plugs & Exhaust Louvers',
    subname: 'Gore-Tex ePTFE Breather & 50-Mesh Insect Screen',
    category: 'mechanical',
    tag: 'VENT-PROTECT',
    modelNumber: 'VENT-EPTFE-M12-SS',
    shortDesc: 'Engineered protective vents allowing pressure equalization and internal air exhaust while barring moisture.',
    fullDesc: 'Comprises an M12 hydrophobic and oleophobic expanded polytetrafluoroethylene (ePTFE) breathable membrane plug in the upper chassis, plus a downward-sloped bottom exhaust cowl protected by a 316 stainless-steel 50-mesh insect and splash screen (0.3 mm apertures).',
    workingPrinciple: 'Gas Diffusion & Vapor Permeability: The ePTFE membrane contains billions of micro-pores per cm² that are 20,000× smaller than a water droplet, but 700× larger than a water vapor molecule. Air flows freely, balancing internal barometric pressure and preventing vacuum suction of moisture during rapid evening cooling.',
    constructionImportance: 'Rapid temperature drops in humid outdoor air cause internal condensation that shorts out sensitive 24-bit electronics. The breather prevents internal vacuum formation while stopping concrete dust and insects from nesting inside.',
    measuredParameters: [
      { parameter: 'Air Permeability', range: '> 1,200 ml/min at 70 mbar', resolution: 'N/A', accuracy: 'Continuous flow' },
      { parameter: 'Water Entry Pressure (WEP)', range: '> 60 kPa (> 6.0 m water head)', resolution: 'N/A', accuracy: 'IP67 / IP68' }
    ],
    electricalInterface: {
      protocol: 'Passive Mechanical Filter',
      operatingVoltage: 'N/A',
      powerConsumption: '0 W',
      pinoutNotes: 'N/A'
    },
    physicalSpecs: {
      dimensions: 'Vent Plug: M12 × 1.5 thread; Louver: 60 × 40 mm',
      weight: '45 g',
      materials: 'ePTFE membrane, 316L stainless steel body, silicone O-ring',
      ipRating: 'IP67 / IP68'
    },
    explodedOffset: [0, -1.5, 0.4],
    connections: [
      { targetId: 'main_enclosure', type: 'mechanical', label: 'Threaded Bulkhead O-Ring Seal' },
      { targetId: 'pm_sensor', type: 'gas', label: 'Internal Exhaust Path Discharge' }
    ],
    colorAccent: '#a1a1aa',
    badge: 'ePTFE Vent'
  }
];

