'use client'
import { Stethoscope } from 'lucide-react'

function ConsultaGeneral() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center">
      <Stethoscope size={80} className="text-green-600 mb-4" />
      <h2 className="text-2xl font-bold">Consulta General</h2>
    </div>
  )
}

export default ConsultaGeneral
