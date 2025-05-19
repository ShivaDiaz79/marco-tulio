'use client'
import { HeartPulse } from 'lucide-react'

function Cardiologia() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center">
      <HeartPulse size={80} className="text-red-600 mb-4" />
      <h2 className="text-2xl font-bold">Cardiología</h2>
    </div>
  )
}

export default Cardiologia
