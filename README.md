# AeroSentinel-3D: Interactive Engineering Visualization

A premium, photorealistic, and fully interactive 3D engineering visualization of an **IoT-Based Outdoor Air Quality Monitoring Station (Model AS-4000-AQM)** engineered for harsh construction site environments (earthmoving dust, concrete silica particles, diesel exhaust plumes, and perimeter compliance monitoring).

Built strictly with **React, Three.js, React Three Fiber, Drei, and Tailwind CSS**.

---

## 🏗️ 9 Dedicated Engineering Sections

The application features 9 separate, purpose-built visualization sections, each with independent camera setups, operational controls, and deep technical data:

### 1. Device Overview (Complete Assembled 3D View)
- Fully assembled station with realistic PBR materials (die-cast AlSi12 aluminum chassis, UV-stabilized ASA polymer front cowl, tempered low-iron solar glass, brass connectors, and hot-dip galvanized structural steel).
- **Interactions:** Full 360° orbit, smooth zoom and pan, standard engineering viewpoints (`Front`, `Rear`, `Left`, `Right`, `Top`, `Bottom`, `Isometric`), turntable auto-rotation, raycasted hover & click selection, reset camera, and full-screen presentation mode.

### 2. Exploded Assembly View
- Every major structural element separates along its logical assembly vector while preserving true alignment.
- **Interactions:** Continuous 0% to 100% explosion slider, quick preset buttons (`Assembled 0%`, `Half 50%`, `Full 100%`), individual component focus tags, animated restore button.

### 3. X-Ray / Internal View
- Outer enclosure transforms into a semi-transparent shell with subtle edge rim glow, revealing the internal layout.
- Fully exposes the internal 4-layer FR4 motherboard, dual-core MCU, laser particle counter, 4-electrode electrochemical gas manifold, LiFePO4 battery pack, MPPT controller, GPS patch, and pneumatic air tubes.
- **Interactions:** Enclosure opacity slider (`Ghost 8%`, `Glass 25%`, `Frosted 50%`), internal module focus pills.

### 4. Cross-Section / Cutaway View
- Genuine real-time OpenGL 3D geometry clipping using `THREE.ClippingPlane` (`localClippingEnabled = true`).
- **Interactions:** Sagittal ($X$), Horizontal ($Y$), and Coronal ($Z$) cutting axes, cut offset slider (-0.5m to +0.5m), invert cutting normal, and one-click presets (`Airway Cut`, `PCB Cut`, `Battery Cut`).

### 5. Orthographic / Technical Engineering View
- CAD blueprint visual style with an engineering measurement grid.
- **Interactions:** Dimension lines with scaled illustrative annotations (720mm enclosure height, 520mm width, 900mm solar panel, 1100mm crossarm span, 1800mm mast), numbered balloon callouts (1–15), orthographic vs. perspective projection toggle, and viewpoint presets.

### 6. Airflow and Sampling Path View
- Fluid dynamics particle streamlines showing the continuous path of ambient air:
  1. Omnidirectional rain-deflecting aspirating cap & heated anti-condensation de-fogger.
  2. Isokinetic deceleration chamber.
  3. Continuous 1.2 L/min draw through the optical PM laser sensing volume.
  4. Manifold distribution over the electrochemical gas diffusion barrier (NO₂, CO, SO₂, O₃).
  5. Downward discharge through the bottom exhaust louver with 50-mesh stainless insect screen.
- **Interactions:** Play/pause, speed controls (0.5x, 1.0x, 2.0x), individual flow stage isolation, streamline visibility, particle density.

### 7. Component Inspection / Parts Catalogue
- Engineering parts directory categorizing all 16 physical modules (Sensing, Computing, Power, Mechanical, Weather).
- **Interactions:** Search filter, studio pedestal isolation, 360° turntable orbit, deep technical specifications, physical dimensions, electrical interfaces, and "Restore to Assembly".

### 8. Internal Connection / Electronics View
- 3D wiring harnesses and power/signal conduits with traveling energy pulses:
  - Solar PV Infeed (18V–24V DC).
  - LiFePO4 Battery Bus (12.8V DC).
  - Regulated Motherboard Power Rails (12V, 5V, 3.3V).
  - High-Speed UART (PM sensor, GNSS, 4G LTE modem).
  - Low-Noise 24-bit Analog Front-End (AFE) for microamp gas cells.
  - I2C Fast-Mode bus (SHT45 Temp/RH probe, BMP390 Barometer, AS5600 Magnetic Angle).
- **Interactions:** Power and data bus toggles, node tracing, and an interactive **2D Schematic Block Diagram Modal**.

### 9. Guided Sensor Tour
- 13-stage automated engineering tour with smooth cinematic camera transitions to each sensor:
  1. Optical Particle Counter (PM1.0, PM2.5, PM10.0)
  2. Nitrogen Dioxide (NO₂) Electrochemical Sensor
  3. Carbon Monoxide (CO) Toxic Gas Sensor
  4. Sulfur Dioxide (SO₂) Acid Gas Sensor
  5. Ground-Level Ozone (O₃) Photochemical Sensor
  6. Temperature & Humidity Probe (SHT45 in radiation shield)
  7. MEMS Barometric Pressure Sensor (BMP390)
  8. 3-Cup Rotary Anemometer (Wind Speed)
  9. Aerodynamic Counterweighted Wind Vane (Wind Direction)
  10. Multi-Constellation GNSS / GPS Module
  11. Main Industrial Electronic Control Board (MCU)
  12. Industrial 4G LTE-M / NB-IoT Modem & Antenna
  13. LiFePO4 Battery & MPPT Solar Power System
- For every component: What it is, location, what it measures, working principle, construction site safety significance, and regulatory limits (OSHA 29 CFR 1926.1153, EPA NAAQS, WHO, WMO).
- Controls: Next, Prev, Auto-play with progress bar, step selector, and direct micro-simulation launcher.

---

## 🔬 Sensor Working Animations (3D Physics Micro-Simulations)
Dedicated interactive 3D simulations accessible from the tour and inspection drawer:
- **Optical PM Sensor:** 650nm red laser beam, particles tumbling through laser focus, 90° Mie light scattering cones, PIN photodiode collection, pulse-height sizing graph.
- **Electrochemical Gas Sensor:** Gas diffusion through hydrophobic ePTFE membrane, Redox reaction at catalytic working electrode, electron flow to counter electrode, and nanoamp current generation.
- **Wind Speed & Direction:** Aerodynamic drag differential spinning 3-cup rotor, aerofoil tail self-aligning into wind vector with 12-bit contactless magnetic encoder.
- **Temp & Humidity Sensor:** Ambient water vapor absorption into porous polymer altering dielectric capacitance, plus silicon bandgap temperature circuit.

---

## 🛠️ Tech Stack & Architecture

- **React 18** (TypeScript)
- **Vite** (High-performance build tooling)
- **Three.js** (WebGL 3D graphics & local clipping)
- **@react-three/fiber & @react-three/drei** (Declarative 3D scene graph, OrbitControls, contact shadows, procedural materials)
- **Tailwind CSS** (Clean industrial UI design)
- **Lucide React** (Vector engineering iconography)

---

## 🚀 Running Locally

```bash
# Install dependencies
npm install

# Start Vite development server
npm run dev

# Build for production
npm run build
```

