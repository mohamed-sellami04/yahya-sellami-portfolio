import { useState } from 'react';
import { Cpu, Smartphone, PanelsTopLeft, Server, Database, Waves, ArrowUpRight } from 'lucide-react';

const layers = {
  interface: { number: '01', label: 'Apps for setup and management', detail: 'The Flutter app sends Wi-Fi settings directly to the controller over local Wi-Fi and REST during setup. Afterward, the mobile app and React dashboard use the backend.' },
  service: { number: '02', label: 'The services', detail: 'Spring Boot and PostgreSQL connect the apps to the device. REST serves app communication; MQTT carries controller state and commands.' },
  device: { number: '03', label: 'The embedded controller', detail: 'ESP32-S3 firmware provides a local TFT interface, Wi-Fi onboarding, MQTT synchronization, and integration with pump, valve, and sensor logic.' },
};

export default function SystemDiagram({ compact = false }) {
  const [active, setActive] = useState('device');
  return <div className={`system-diagram ${compact ? 'system-diagram--compact' : ''}`}>
    <div className="diagram-top"><span className="mono">BLUEBOX / SYSTEM OVERVIEW</span><span className="diagram-cross" aria-hidden="true">+</span></div>
    <div className="diagram-content">
      <div className="diagram-rails" aria-hidden="true"><span /><span /><span /></div>
      <button type="button" className={`diagram-layer interface-layer ${active === 'interface' ? 'is-selected' : ''}`} onClick={() => setActive('interface')} aria-pressed={active === 'interface'} aria-label="Explore application layer">
        <span className="diagram-node"><Smartphone size={21} /><span><strong>Mobile app</strong><small>FLUTTER</small></span></span><span className="node-divider" /><span className="diagram-node"><PanelsTopLeft size={21} /><span><strong>Dashboard</strong><small>REACT</small></span></span>
      </button>
      <div className="diagram-connector"><span /> <p>REST API</p> <span /></div>
      <button type="button" className={`diagram-layer service-layer ${active === 'service' ? 'is-selected' : ''}`} onClick={() => setActive('service')} aria-pressed={active === 'service'} aria-label="Explore backend services">
        <span className="diagram-node"><Server size={22} /><span><strong>Connected services</strong><small>SPRING BOOT / POSTGRESQL</small></span></span><Database className="diagram-side-icon" size={22} />
      </button>
      <div className="diagram-connector"><span /> <p>MQTT OVER WI-FI</p> <span /></div>
      <button type="button" className={`diagram-layer device-layer ${active === 'device' ? 'is-selected' : ''}`} onClick={() => setActive('device')} aria-pressed={active === 'device'} aria-label="Explore embedded controller">
        <span className="chip-icon"><Cpu size={31} /></span><span className="device-label"><small>EMBEDDED CONTROLLER</small><strong>ESP32-S3</strong><span>C / C++ · TFT / LCD</span></span><ArrowUpRight size={19} className="layer-arrow" />
      </button>
      <div className="diagram-output"><span className="output-line" /><Waves size={18} /><span>Pump · valves · sensors</span></div>
    </div>
    <div className="diagram-insight" aria-live="polite" aria-atomic="true"><span className="insight-number">{layers[active].number}</span><p><strong>{layers[active].label}</strong>{layers[active].detail}</p></div>
    <div className="diagram-bottom"><span>Simplified architecture</span><span className="mono">HARDWARE ↔ SOFTWARE</span></div>
  </div>;
}
