// components/AnalisisClinico.js
import { FlaskConical } from 'lucide-react'

export default function AnalisisClinico() {
  return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', fontSize: '2rem', height: '100vh'}}>
      <FlaskConical size={64} />
      <span>Análisis Clínico Demo</span>
    </div>
  )
}
