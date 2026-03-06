export function BlobShape({ className, color = 'rgba(233,58,163,0.12)', size = 300 }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', pointerEvents: 'none' }}>
      <path d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.5,90,-16.3,88.2,-1C86.5,14.2,80.4,28.5,72.1,41.4C63.8,54.4,53.2,66,40.2,73.4C27.2,80.8,11.8,84,-4.4,84.8C-20.5,85.5,-41.1,83.8,-55.4,74.3C-69.7,64.8,-77.8,47.4,-82.4,29.8C-87,12.1,-88.2,-5.9,-83.7,-22.1C-79.2,-38.3,-69,-52.8,-55.6,-60.3C-42.2,-67.9,-25.7,-68.6,-10.1,-71.7C5.6,-74.9,30.5,-83.6,44.7,-76.4Z" transform="translate(100 100)" fill={color} />
    </svg>
  )
}

export function DotsPattern({ className, color = 'rgba(64,10,75,0.08)', rows = 5, cols = 5, gap = 20 }) {
  const dots = []
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      dots.push(<circle key={`${r}-${c}`} cx={c * gap + 5} cy={r * gap + 5} r="3" fill={color} />)
    }
  }
  return (
    <svg className={className} width={cols * gap} height={rows * gap} style={{ position: 'absolute', pointerEvents: 'none' }}>
      {dots}
    </svg>
  )
}

export function WaveLine({ className, color = 'rgba(233,58,163,0.15)', width = 400 }) {
  return (
    <svg className={className} width={width} height="60" viewBox="0 0 400 60" fill="none" style={{ position: 'absolute', pointerEvents: 'none' }}>
      <path d="M0 30C50 10 100 50 150 30C200 10 250 50 300 30C350 10 400 50 400 30" stroke={color} strokeWidth="2" />
    </svg>
  )
}

export function HalfCircle({ className, color = '#e1dceb', size = 200, direction = 'right' }) {
  const rotation = { right: 0, left: 180, up: -90, down: 90 }[direction] || 0
  return (
    <svg className={className} width={size / 2} height={size} viewBox="0 0 100 200" fill="none" style={{ position: 'absolute', pointerEvents: 'none', transform: `rotate(${rotation}deg)` }}>
      <path d="M100 0C44.8 0 0 44.8 0 100s44.8 100 100 100V0Z" fill={color} />
    </svg>
  )
}

export function GeometricGrid({ className, color = 'rgba(64,10,75,0.06)' }) {
  return (
    <svg className={className} width="200" height="200" viewBox="0 0 200 200" fill="none" style={{ position: 'absolute', pointerEvents: 'none' }}>
      <rect x="10" y="10" width="60" height="60" rx="8" stroke={color} strokeWidth="2" />
      <rect x="80" y="40" width="40" height="40" rx="6" fill={color} />
      <circle cx="160" cy="40" r="25" stroke={color} strokeWidth="2" />
      <rect x="20" y="100" width="80" height="4" rx="2" fill={color} />
      <rect x="20" y="120" width="50" height="4" rx="2" fill={color} />
      <circle cx="150" cy="140" r="40" stroke={color} strokeWidth="1.5" strokeDasharray="4 4" />
      <rect x="100" y="160" width="70" height="30" rx="8" stroke={color} strokeWidth="1.5" />
    </svg>
  )
}
