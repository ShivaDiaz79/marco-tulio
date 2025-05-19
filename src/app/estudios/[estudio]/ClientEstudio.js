'use client'

import dynamic from 'next/dynamic'
import { useMemo } from 'react'

export default function ClientEstudio({ estudio }) {
  // Mapa de componentes dinámicos
  const Componente = useMemo(() => {
    const mapa = {
      'rayos-x': dynamic(() => import('../components/RayosX')),
      'ecografias': dynamic(() => import('../components/Ecografias')),
      'analisis-clinico': dynamic(() => import('../components/AnalisisClinico')),
      'pruebas-rapidas': dynamic(() => import('../components/PruebasRapidas')),
      'historial-medico': dynamic(() => import('../components/HistorialMedico')),
    }
    return mapa[estudio] || (() => <p className="p-4">Selecciona un estudio del menú.</p>)
  }, [estudio])

  return (
    <div className="p-4 bg-white">
      <h1 className="text-2xl font-bold mb-4 text-green-700">
        {estudio ? `Estudio: ${estudio.replace(/-/g, ' ')}` : 'Estudios'}
      </h1>
      <Componente />
    </div>
  )
}
