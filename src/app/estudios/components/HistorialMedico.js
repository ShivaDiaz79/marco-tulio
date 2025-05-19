// components/HistorialMedico.js
import { Folder } from 'lucide-react'

export default function HistorialMedico() {
  return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', fontSize: '2rem', height: '100vh'}}>
      <Folder size={64} />
      <span>Historial Médico Demo</span>
    </div>
  )
}
