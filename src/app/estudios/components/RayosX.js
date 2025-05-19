// components/RayosX.js
import { BookOpenCheck } from 'lucide-react'

export default function RayosX() {
  return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', fontSize: '2rem', height: '100vh'}}>
      <BookOpenCheck size={64} />
      <span>Rayos X Demo</span>
    </div>
  )
}
