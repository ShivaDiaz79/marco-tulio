'use client'
import { Syringe } from 'lucide-react'

function Vacunas() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center">
      <Syringe size={80} className="text-orange-600 mb-4" />
      <h2 className="text-2xl font-bold">Vacunas</h2>
    </div>
  )
}

export default Vacunas
