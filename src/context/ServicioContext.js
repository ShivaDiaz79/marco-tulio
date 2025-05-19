'use client'

import { createContext, useContext, useState } from 'react'

const ServiceContext = createContext()

export function ServicioProvider({ children }) {
  const [Servicio, setServicio] = useState(null)

  return (
    <ServiceContext.Provider value={{ Servicio, setServicio }}>
      {children}
    </ServiceContext.Provider>
  )
}

export function useServicio() {
  const context = useContext(ServiceContext)
  if (!context) {
    throw new Error('useServicio debe usarse dentro de un ServicioProvider')
  }
  return context
}
