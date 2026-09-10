const nodes = [
  { id: 'cyl', label: 'LPG Cylinder' },
  { id: 'sensors', label: 'Sensors' },
  { id: 'esp', label: 'ESP32' },
  { id: 'proc', label: 'Processing' },
  { id: 'display', label: 'Display' },
  { id: 'alerts', label: 'Alerts' },
];

export default function LumoraDiagram() {
  return (
    <div className="lumora-diagram" role="img" aria-label="Lumora system path from LPG cylinder through sensors, ESP32, processing, display, and alerts">
      <svg viewBox="0 0 720 160" className="lumora-diagram__svg">
        <defs>
          <linearGradient id="pipe" x1="0" x2="1">
            <stop offset="0%" stopColor="#4ee4c8" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#4ee4c8" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#4ee4c8" stopOpacity="0.15" />
          </linearGradient>
        </defs>
        <line className="lumora-diagram__line" x1="60" y1="58" x2="660" y2="58" />
        <rect className="lumora-diagram__pulse" x="60" y="54" width="80" height="8" fill="url(#pipe)" />
        {nodes.map((node, i) => {
          const x = 60 + i * 120;
          return (
            <g key={node.id} transform={`translate(${x}, 58)`}>
              <circle className="lumora-diagram__node" r="10" />
              <text x="0" y="42" textAnchor="middle">
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>
      <p className="lumora-diagram__caption">
        LPG Cylinder → Load cell + MQ sensor → ESP32 → Processing → OLED → Alarm / LED
      </p>
    </div>
  );
}
