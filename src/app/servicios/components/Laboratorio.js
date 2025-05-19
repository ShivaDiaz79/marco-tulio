'use client'
import { Microscope } from 'lucide-react'

function Laboratorio() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center">
      <Microscope size={80} className="text-purple-600 mb-4" />
      <h2 className="text-2xl font-bold">Laboratorio</h2>
    </div>
  )
}

export default Laboratorio
