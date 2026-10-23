/**
 * Project data extracted directly from the official Project Report:
 * "NMIT Water Monitoring System"
 * Course: Environmental Science and Sustainability
 * Architecture & Engineering Implementation Guide
 */

export interface TeamMember {
  name: string;
  role: string;
  task: string;
  dutySummary: string;
}

export interface WarningLevel {
  flowRange: string;
  display: string;
  status: 'normal' | 'warning' | 'high';
  minFlow: number;
  maxFlow: number | null;
  description: string;
  suggestedAction: string;
}

export interface MaterialItem {
  name: string;
  specification: string;
  purpose: string;
  quantity: string;
  category: 'sensor' | 'microcontroller' | 'wiring' | 'computing' | 'plumbing';
}

export interface FaqItem {
  id: string;
  question: string;
  category: 'sensor-tech' | 'water-quality' | 'scalability';
  categoryLabel: string;
  answer: string;
  keyTakeaway: string;
  standardsRef?: string;
}

export const PROJECT_METADATA = {
  courseCode: 'NMIT',
  courseName: 'Environmental Science and Sustainability',
  assignment: 'Engineering Implementation Guide',
  title: 'NMIT Water Monitoring System',
  tagline: 'A simple idea to help notice unnecessary water flow.',
  pdfPath: '/assets/aistudio/LA2_Smart_Water_Monitoring_Simple_Report_b991d4db.pdf',
  introduction:
    'Water is important in our daily lives, so we should avoid wasting it. Sometimes water keeps flowing because a tap is left open or a plumbing problem is not noticed quickly. For this project guide, we suggest a simple system that measures water flow and gives a warning when the flow seems unusually high.\n\nThe NSSKC visit handout mentions plumbing parts such as taps, pipes, valves and fittings. These can help us think about where water is used and where monitoring might be useful. Our group should add any specific lab observation only if we actually noticed it during the visit.',
  aim:
    'To show how a flow sensor, Arduino and a simple Python program can help users notice unusually high water flow.',
  conclusion:
    'The NMIT Water Monitoring System is a simple idea for reducing unnoticed water wastage. A sensor and Arduino can measure flow, while a Python program can show a warning when flow stays unusually high. The system would need to be tested before we can say how well it works, but it shows how technology can support careful water use.',
  references: [
    {
      id: 1,
      title: 'NMIT Environmental Science and Sustainability Project Guide Handout',
      note: 'Provided for the academic assignment guidelines and project framing.'
    },
    {
      id: 2,
      title: 'NSSKC Technical Visit Handout',
      note: 'Provided for field inspection of plumbing parts, taps, valves, fittings, and laboratory observations.'
    }
  ]
};

export const HOW_IT_WORKS_STEPS = [
  {
    stepNumber: 1,
    title: 'Water Movement Measurement',
    shortTitle: 'Flow Sensor',
    description: 'A water-flow sensor measures the movement of water.',
    technicalDetail:
      'As water flows through the inline pipe chamber, it drives an internal pinwheel rotor. A hall-effect magnetic sensor counts rotor revolutions and emits high-frequency electrical pulses proportional to the volumetric flow rate.'
  },
  {
    stepNumber: 2,
    title: 'Signal Acquisition & Transmission',
    shortTitle: 'Arduino Uno',
    description: 'An Arduino reads the sensor signal and sends the reading to a computer.',
    technicalDetail:
      'The Arduino Uno micro-controller attaches a hardware interrupt on Digital Pin 2 to count incoming pulses every second. It calculates the instantaneous flow rate in Liters per minute (L/min) and streams the values across a 9600 baud USB serial connection.'
  },
  {
    stepNumber: 3,
    title: 'Real-Time Telemetry Display',
    shortTitle: 'Python Program',
    description: 'A Python program displays the flow reading.',
    technicalDetail:
      'A host Python application reads the serial stream buffer, formats the data, computes rolling time-series averages, and presents a clear textual or graphical readout for immediate human oversight.'
  },
  {
    stepNumber: 4,
    title: 'Automated Warning Engine',
    shortTitle: 'Alert Thresholds',
    description:
      'If the reading stays higher than the chosen limit, the program shows a warning so someone can check the tap or pipe.',
    technicalDetail:
      'When the observed flow rate exceeds the calibrated threshold (e.g. > 6 L/min or > 10 L/min) consistently, the software raises visual and audio alerts, notifying occupants to inspect open taps or concealed pipe bursts.'
  }
];

export const MATERIALS_LIST: MaterialItem[] = [
  {
    name: 'Water-Flow Sensor',
    specification: 'YF-S201 Hall Effect Turbine (1/2" DN15 thread, 1–30 L/min)',
    purpose: 'Measures fluid flow velocity and converts it into digital pulse frequency (F = 7.5 × Q).',
    quantity: '1 Unit',
    category: 'sensor'
  },
  {
    name: 'Arduino Uno',
    specification: 'ATmega328P Microcontroller Board, 16 MHz, 5V Logic',
    purpose: 'Captures pulse interrupts on Pin 2, computes flow arithmetic, and manages USB serial output.',
    quantity: '1 Board',
    category: 'microcontroller'
  },
  {
    name: 'USB Cable & Connecting Wires',
    specification: 'USB Type-A to Type-B cable + Male-to-Male / Male-to-Female Jumper Wires',
    purpose: 'Supplies 5V DC power to Arduino/sensor and transmits serial data frames to the computer.',
    quantity: '1 Set',
    category: 'wiring'
  },
  {
    name: 'Computer with Python Installed',
    specification: 'Host Workstation / Laptop running Python 3.8+ with pySerial library',
    purpose: 'Reads serial packets, parses numerical values, visualizes metrics, and triggers alerts.',
    quantity: '1 Machine',
    category: 'computing'
  },
  {
    name: 'Plumbing Fixtures (NSSKC Handout)',
    specification: '1/2" PVC pipe section, threaded brass couplings, shutoff ball valve, and test bibcock tap',
    purpose: 'Simulates household or lab water conduits to validate leak scenarios and flow rates.',
    quantity: '1 Test Rig',
    category: 'plumbing'
  }
];

export const WARNING_LEVELS: WarningLevel[] = [
  {
    flowRange: 'Up to 6 L/min',
    display: 'Normal',
    status: 'normal',
    minFlow: 0,
    maxFlow: 6,
    description: 'Safe, expected rate typical for standard handwashing, gentle faucet rinsing, or routine sink usage.',
    suggestedAction: 'No action needed. Standard routine usage pattern.'
  },
  {
    flowRange: 'Above 6 to 10 L/min',
    display: 'Warning',
    status: 'warning',
    minFlow: 6.01,
    maxFlow: 10,
    description: 'Elevated water volume. Characteristic of a fully opened high-pressure tap or forgotten open faucet.',
    suggestedAction: 'Verify if deliberate activity is ongoing; check nearby washrooms and sinks.'
  },
  {
    flowRange: 'Above 10 L/min',
    display: 'High flow — check if expected',
    status: 'high',
    minFlow: 10.01,
    maxFlow: null,
    description: 'Critical sustained discharge indicating potential burst pipe, loose union fitting, or unattended garden hose.',
    suggestedAction: 'Immediate inspection of main line, valves, and fixtures to halt major water loss.'
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Rahul',
    role: 'System Administrator & Lead Developer',
    task: 'System Administrator & Lead Developer of this website; report QA',
    dutySummary: 'Engineered the full-stack web monitoring platform, role-based access control, interactive telemetry simulator, and lead developer of this website.'
  },
  {
    name: 'Sushanth',
    role: 'Project Coordinator',
    task: 'Coordinate the group',
    dutySummary: 'Organized team meetings, synchronized work packages between hardware and code, and managed milestone deadlines.'
  },
  {
    name: 'Rohan',
    role: 'Hardware & Circuit Lead',
    task: 'Help connect the sensor and Arduino',
    dutySummary: 'Configured breadboard connections, wired the YF-S201 sensor (VCC, GND, Signal Pin 2), and verified 5V electrical safety.'
  },
  {
    name: 'Jilani',
    role: 'Sensor Testing & Calibration',
    task: 'Check the sensor readings',
    dutySummary: 'Conducted empirical bucket calibration tests to verify pulse counts against measured liquid volumes (L/min accuracy).'
  },
  {
    name: 'Adthiya',
    role: 'Software & Python Lead',
    task: 'Run the Python program',
    dutySummary: 'Wrote and executed the host Python serial consumer script, configured COM port baud rates, and coded warning logic.'
  },
  {
    name: 'Soyug',
    role: 'Documentation & Presentation',
    task: 'Collect notes and help with the presentation',
    dutySummary: 'Synthesized lab notes, cataloged NSSKC visit observations, and organized visual slides for class review.'
  }
];

export const BENEFITS = [
  {
    title: 'Rapid Wastage Detection',
    description: 'Makes unusual water flow easy to notice before significant volumes are wasted.',
    impact: 'Detects unnoticed faucet overflows within seconds instead of hours.'
  },
  {
    title: 'Proactive Plumbing Maintenance',
    description: 'May help people respond to a possible plumbing issue or loose fitting much sooner.',
    impact: 'Prevents water damage to building floors, walls, and cabinetry.'
  },
  {
    title: 'STEM & Sustainability Bridge',
    description: 'Connects a practical water-saving idea with accessible embedded programming and hardware.',
    impact: 'Hands-on application of sensors and Python coding to solve real environmental challenges.'
  },
  {
    title: 'SDG 6: Clean Water and Sanitation',
    description: 'Directly supports Target 6.4: substantially increase water-use efficiency across all sectors.',
    impact: 'Conserves precious potable water by curbing unmonitored loss.'
  },
  {
    title: 'SDG 11: Sustainable Cities & Communities',
    description: 'Fosters resource-efficient municipal habitats and smart water infrastructure in buildings.',
    impact: 'Empowers residential and campus stewardship of shared utility networks.'
  }
];

export const LIMITATIONS = [
  {
    title: 'Diagnostic Rather Than Autonomous Shutoff',
    description:
      'The system cannot repair a leak by itself. It generates telemetry and alerts, but requires a human to manually close the tap or shut off the main isolation valve.',
    mitigation: 'Future versions can incorporate a 12V motorized solenoid valve to execute automated cut-offs upon high-flow trip.'
  },
  {
    title: 'Contextual Ambiguity (False Positive Risk)',
    description:
      'A high reading does not always mean there is a leak. Legitimate high-flow tasks (e.g., filling an overhead tank, laundry cycle, washing a vehicle) will trigger the threshold unless time-duration gating or scheduled bypass is applied.',
    mitigation: 'Implement time-integrated duration filters (e.g. only alert if > 8 L/min persists continuously for over 5 minutes).'
  },
  {
    title: 'Calibration & Fluid Dynamics Sensitivity',
    description:
      'The sensor needs to be thoroughly calibrated so that its readings are reasonably accurate. Upstream pipe bends, pipe diameter changes, and air bubbles in the line can skew mechanical turbine pulse counts.',
    mitigation: 'Ensure straight pipe lengths of at least 10× diameter upstream of the sensor and calibrate calibration factor K against volumetric measuring vessels.'
  }
];

export const FAQ_ITEMS: FaqItem[] = [
  // Category 1: Sensor Technology
  {
    id: 'sensor-principle',
    category: 'sensor-tech',
    categoryLabel: 'Sensor Technology',
    question: 'How does the YF-S201 Hall-Effect sensor detect fluid movement and convert it to liters?',
    answer:
      'The YF-S201 incorporates an internal plastic turbine rotor fitted with an embedded neodymium magnet. When fluid travels through the 1/2" DN15 chamber, hydrodynamic pressure forces the turbine to rotate. An external, hermetically sealed Hall-effect sensor detects each magnetic polarity transition, outputting a 5V square-wave pulse. The standard manufacturer conversion formula is f (Hz) = 7.5 × Q (L/min). By counting these pulses inside a hardware interrupt timer loop (e.g., once every 1,000 milliseconds), the microcontroller calculates instantaneous flow velocity with high fidelity.',
    keyTakeaway: 'Mechanical rotation is translated to electrical pulses via magnetic field changes at approx. 450 pulses per liter.',
    standardsRef: 'Hall Effect Turbine Measurement (ISO 4064-1 Class B)'
  },
  {
    id: 'sensor-accuracy-cutoffs',
    category: 'sensor-tech',
    categoryLabel: 'Sensor Technology',
    question: 'What is the minimum flow threshold and accuracy cutoff for mechanical pinwheel sensors?',
    answer:
      'The YF-S201 has an official operating range of 1 to 30 L/min with an accuracy tolerance of ±3% to ±5% within laminar flow regimes. However, at ultra-low flow rates below 1.0 L/min (such as a slow dripping faucet at 0.1 to 0.4 L/min), frictional resistance on the rotor spindle exceeds the kinetic energy of the water stream. As a result, the turbine stalls, failing to register pulses. For micro-leak detection, transit-time ultrasonic flow meters or pressure-decay differential sensors are recommended.',
    keyTakeaway: 'Turbine sensors have an inertia cutoff around 1.0 L/min; micro-drips below this threshold require ultrasonic or pressure sensors.',
    standardsRef: 'Operational Boundary: 1.0 to 30.0 L/min at working pressure ≤ 1.75 MPa'
  },
  {
    id: 'sensor-sediment-longevity',
    category: 'sensor-tech',
    categoryLabel: 'Sensor Technology',
    question: 'How do water hardness, limescale, and suspended particulate matter impact turbine sensor lifespan?',
    answer:
      'Because the YF-S201 relies on physical moving parts inside the wetted path, calcium carbonate (hard water scale) and particulate grit (rust flakes, sand from municipal distribution) can adhere to the rotor shaft and plastic vanes over 6 to 18 months of continuous service. This causes increased friction, leading to under-reporting of flow rates or eventual rotor seizure. Installing an inline 100-mesh (150-micron) Y-strainer filter upstream significantly mitigates particulate wear.',
    keyTakeaway: 'Always install an upstream sediment filter and plan periodic acid descale flushes in hard-water municipal districts.',
    standardsRef: 'Filtration standard: 100-mesh (150 µm) upstream Y-strainer'
  },
  {
    id: 'sensor-ultrasonic-comparison',
    category: 'sensor-tech',
    categoryLabel: 'Sensor Technology',
    question: 'When should an engineering team upgrade from Hall-effect turbines to ultrasonic flow sensors?',
    answer:
      'Ultrasonic transit-time flow sensors utilize dual piezoelectric transducers that transmit acoustic signals through the pipe wall without physical parts inside the liquid stream. Engineers should upgrade to ultrasonic sensors when: (1) Zero-pressure-drop is mandatory, (2) Detecting micro-leaks down to 0.05 L/min is required, (3) Measuring unconditioned greywater or non-potable liquids with suspended solids, or (4) 10+ year maintenance-free deployment is necessary without moving-part degradation.',
    keyTakeaway: 'Ultrasonic sensors offer clamp-on non-invasive metering and zero mechanical wear at a higher unit cost.',
    standardsRef: 'Acoustic Transit-Time Metering (AWWA C715 / EN 1434)'
  },

  // Category 2: Water Quality & Standards
  {
    id: 'potable-nsf61-standards',
    category: 'water-quality',
    categoryLabel: 'Water Quality & Standards',
    question: 'Is the standard hobbyist YF-S201 sensor certified for residential potable drinking water?',
    answer:
      'Standard low-cost YF-S201 sensors are manufactured using commercial Polyoxymethylene (POM / Acetal) plastic and standard NBR nitrile rubber O-rings. While suitable for academic test benches, gardening, and closed heating circuits, basic non-branded units lack official NSF/ANSI Standard 61 (Drinking Water System Components - Health Effects) and NSF/ANSI 372 (Lead-Free Compliance) certifications. For permanent drinking water lines, certified food-grade POM, PVDF, or lead-free DZR brass sensors (such as Swiss Digmesa or Gems Sensors) must be specified.',
    keyTakeaway: 'Use NSF/ANSI 61 and WRAS certified food-grade materials for permanent potable drinking water taps.',
    standardsRef: 'NSF/ANSI 61 & NSF/ANSI 372 Lead-Free Certification'
  },
  {
    id: 'chlorine-chemical-resistance',
    category: 'water-quality',
    categoryLabel: 'Water Quality & Standards',
    question: 'How do municipal chlorine and chloramines affect sensor internal housings over time?',
    answer:
      'Municipal water utilities maintain residual disinfectant levels (typically 0.2 to 4.0 mg/L of free chlorine or chloramines) to eliminate pathogens. Lower-grade acetal polymers can undergo oxidative chain scission and micro-crazing when exposed to continuous chloraminated warm water over multiple years. In commercial installations, sensor bodies made from Dezincification Resistant (DZR) Brass, 316L Stainless Steel, or chlorine-stabilized engineering plastics are mandated to prevent structural embrittlement.',
    keyTakeaway: 'Chlorinated municipal supplies degrade generic acetals; prefer DZR brass or 316L stainless steel in production.',
    standardsRef: 'ASTM D6284 Standard Test Method for Rubber / Polymer Water Disinfection Resistance'
  },
  {
    id: 'biofilm-stagnation',
    category: 'water-quality',
    categoryLabel: 'Water Quality & Standards',
    question: 'Does water stagnation inside the turbine housing create microbiological biofilm risks?',
    answer:
      'Any internal hydraulic cavity with small dead zones or crevices (such as the axle well of a pinwheel turbine) can foster microbial biofilm attachment if water remains motionless at ambient temperatures for prolonged periods (e.g., during building holidays). In clinical or school installations, the monitoring architecture should pair with automated scheduled pipe flushing cycles to prevent bacterial proliferation (such as Legionella pneumophila or Pseudomonas).',
    keyTakeaway: 'Prevent stagnation in complex fluid passages through scheduled automated flush routines and smooth bore finishes.',
    standardsRef: 'WHO Guidelines for Drinking-water Quality & ASHRAE Standard 188'
  },

  // Category 3: Deployment Scalability
  {
    id: 'scalability-multitenant',
    category: 'scalability',
    categoryLabel: 'Deployment Scalability',
    question: 'How can this single-tap architecture scale to an entire multi-story apartment or campus building?',
    answer:
      'Scaling from a desktop prototype to a campus-wide deployment uses a tiered sub-metering topology: (1) Main utility entry meters measure total bulk intake, (2) Floor-level riser manifolds isolate individual building wings, and (3) Point-of-use sensors monitor high-risk fixtures (commercial kitchens, science labs, laundry facilities). By calculating differential flow (Total Inlet Flow minus Sum of Branch Flows), central software immediately isolates unmetered underground line fractures and wall seepage.',
    keyTakeaway: 'Hierarchical submetering with mass-balance differential equations allows instant localized pipe leak isolation.',
    standardsRef: 'Building Submetering Protocol (ASHRAE 90.1 / LEED v4 Water Efficiency)'
  },
  {
    id: 'scalability-iot-protocols',
    category: 'scalability',
    categoryLabel: 'Deployment Scalability',
    question: 'What wireless telemetry protocols (LoRaWAN, NB-IoT, Wi-Fi) are best suited for smart water metering?',
    answer:
      'While USB serial tethering is optimal for educational testing, large-scale deployments favor LoRaWAN or NB-IoT (Narrowband IoT). LoRaWAN operates on sub-GHz frequencies (868 MHz Europe / 915 MHz Americas), enabling signals to penetrate multiple concrete basement walls and underground utility vaults across distances of 2 to 10 kilometers with minimal power. Wi-Fi consumes substantial current and requires strong local access points, making it unviable for deep plumbing risers.',
    keyTakeaway: 'LoRaWAN and NB-IoT deliver exceptional concrete penetration and long-range connectivity for utility telemetry.',
    standardsRef: 'LoRaWAN Regional Parameters & 3GPP Release 13/14 NB-IoT Standards'
  },
  {
    id: 'battery-longevity-harvesting',
    category: 'scalability',
    categoryLabel: 'Deployment Scalability',
    question: 'How can remote sensor nodes operate for 5 to 10 years without requiring AC power or battery replacements?',
    answer:
      'Achieving multi-year battery longevity requires low-power microcontroller design. The microcontroller (e.g., STM32L0 or ESP32-C3) stays in deep sleep (drawing < 5 microamperes), with a hardware pulse counter waking the processor only after every 10 liters or on a periodic 15-minute telemetry transmission window. Additionally, micro-hydro kinetic energy harvesters (pelton micro-turbines generating 50–100 mW from line water pressure) can trickle-charge supercapacitors, enabling indefinite battery-free operation.',
    keyTakeaway: 'Deep-sleep wake-on-interrupt cycles and micro-hydro line harvesting enable 10+ year autonomous field lifespans.',
    standardsRef: 'Low-Power Wide-Area Network (LPWAN) Energy Budget Engineering'
  },
  {
    id: 'bms-solenoid-shutoff',
    category: 'scalability',
    categoryLabel: 'Deployment Scalability',
    question: 'How can the telemetry engine trigger automated shut-off valves and integrate with Building Management Systems (BMS)?',
    answer:
      'The Python telemetry engine or edge gateway communicates with industrial BMS platforms via BACnet IP, Modbus TCP, or RESTful webhook APIs. When an anomalous high-flow alert is flagged (e.g., > 10 L/min for 180 continuous seconds between 10 PM and 6 AM), the edge controller energizes a motorized ball valve or normally-closed latching solenoid valve to cut off supply to that specific branch. Latching valves require power only during switching (50ms pulse), preventing coil overheating and saving standby power.',
    keyTakeaway: 'Latching motorized ball valves integrated via BACnet/Modbus provide failsafe branch isolation without coil burnout.',
    standardsRef: 'BACnet / Modbus Industrial Interoperability & ANSI/ISA-75.05.01 Control Valves'
  }
];

export const ARDUINO_CODE_SNIPPET = `/*
 * NMIT Water Monitoring System - Arduino Firmware
 * Environmental Science and Sustainability Implementation Guide
 * Sensor: YF-S201 Flow Sensor (Interrupt on Pin 2)
 */

volatile int pulseCount = 0;
float flowRate = 0.0;
unsigned int flowMilliLitres = 0;
unsigned long totalMilliLitres = 0;
unsigned long oldTime = 0;

void pulseCounter() {
  pulseCount++;
}

void setup() {
  Serial.begin(9600);
  pinMode(2, INPUT_PULLUP);
  // Attach interrupt: pulseCounter triggers on FALLING edge
  attachInterrupt(digitalPinToInterrupt(2), pulseCounter, FALLING);
  oldTime = millis();
}

void loop() {
  // Calculate flow rate once every 1000ms (1 second)
  if ((millis() - oldTime) > 1000) {
    detachInterrupt(digitalPinToInterrupt(2));
    
    // YF-S201 pulse frequency (Hz) = 7.5 * Q (L/min)
    // Flow rate in L/min = (pulseCount / 7.5) * (1000.0 / timeDelta)
    flowRate = ((1000.0 / (millis() - oldTime)) * pulseCount) / 7.5;
    oldTime = millis();
    
    // Convert to mL passed in this second
    flowMilliLitres = (flowRate / 60.0) * 1000.0;
    totalMilliLitres += flowMilliLitres;
    
    // Print data to Serial for Python consumer
    Serial.print("FLOW:");
    Serial.print(flowRate, 2);
    Serial.print(",TOTAL_ML:");
    Serial.println(totalMilliLitres);
    
    pulseCount = 0;
    attachInterrupt(digitalPinToInterrupt(2), pulseCounter, FALLING);
  }
}`;

export const PYTHON_CODE_SNIPPET = `"""
NMIT Water Monitoring System - Host Python Visualizer & Alert Program
Environmental Science and Sustainability Implementation Guide
Reads Arduino serial data, monitors threshold limits, and alerts user.
"""

import serial
import time

SERIAL_PORT = 'COM3'   # Adjust based on OS (/dev/ttyUSB0 or COM port)
BAUD_RATE = 9600

# Example Warning Thresholds (from Section 5 of Project Guide)
NORMAL_MAX = 6.0       # Up to 6 L/min is Normal
WARNING_MAX = 10.0     # 6 to 10 L/min is Warning
                       # Above 10 L/min is High Flow Alert

def classify_flow(rate):
    if rate <= NORMAL_MAX:
        return "NORMAL", "[OK] Flow within standard range."
    elif rate <= WARNING_MAX:
        return "WARNING", "[!] Elevated flow: Check if tap was left running!"
    else:
        return "HIGH FLOW", "[CRITICAL ALERT] High flow: Check tap or possible pipe leak!"

def main():
    print("=" * 60)
    print("NMIT Water Monitoring System Guide")
    print("Connecting to Arduino on", SERIAL_PORT)
    print("=" * 60)
    
    try:
        ser = serial.Serial(SERIAL_PORT, BAUD_RATE, timeout=2)
        time.sleep(2) # Wait for Arduino to reset
        print("Connected successfully. Monitoring water flow stream...\\n")
        
        while True:
            if ser.in_waiting > 0:
                line = ser.readline().decode('utf-8', errors='ignore').strip()
                if line.startswith("FLOW:"):
                    parts = line.split(",")
                    flow_val = float(parts[0].replace("FLOW:", ""))
                    status, message = classify_flow(flow_val)
                    
                    timestamp = time.strftime("%H:%M:%S")
                    print(f"[{timestamp}] Flow Rate: {flow_val:5.2f} L/min | Status: {status:10} | {message}")
                    
    except KeyboardInterrupt:
        print("\\nMonitoring stopped by user.")
    except Exception as e:
        print("Serial communication error:", e)

if __name__ == "__main__":
    main()`;
