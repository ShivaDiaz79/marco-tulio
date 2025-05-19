// components/PruebasRapidas.js
import { TestTube2 } from 'lucide-react'

export default function PruebasRapidas() {
  return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', fontSize: '2rem', height: '100vh'}}>
      <TestTube2 size={64} />
      <span>Pruebas Rápidas Demo</span>
    </div>
  )
}
