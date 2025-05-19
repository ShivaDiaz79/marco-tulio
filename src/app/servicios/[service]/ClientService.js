'use client'

import dynamic from 'next/dynamic'
import { useMemo } from 'react'

export default function ClientService({ service }) {
  
  const Componente = useMemo(() => {
    const mapa = {
      'consulta-general': dynamic(() => import('../components/ConsultaGeneral')),
      'cardiologia': dynamic(() => import('../components/Cardiologia')),
      'neurologia': dynamic(() => import('../components/Neurologia')),
      'laboratorio': dynamic(() => import('../components/Laboratorio')),
      'vacunas': dynamic(() => import('../components/Vacunas')),
    }

    // Si no encuentra el componente, devuelve uno por defecto
    return mapa[service] || (() => <p className="p-4">Servicio no encontrado.</p>)
  }, [service])

  return (
  <div className="p-4 bg-white h-screen">
      <h1 className="text-2xl font-bold mb-4 text-green-700">
        {service ? `Servicio: ${service.replace(/-/g, ' ')}` : 'Servicios'}
      </h1>
      <Componente />
    </div>
  )
}
