// components/Ecografias.js
import { GraduationCap } from 'lucide-react'

export default function Ecografias() {
  return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', fontSize: '2rem', height: '100vh'}}>
      <GraduationCap size={64} />
      <span>Ecografías Demo</span>
    </div>
  )
}
