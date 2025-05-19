'use client'

import { createContext, useContext, useState } from 'react'


const EstudioContext = createContext()

export function EstudioProvider({ children }) {
  const [estudio, setEstudio] = useState(null)

  return (
    <EstudioContext.Provider value={{ estudio, setEstudio }}>
      {children}
    </EstudioContext.Provider>
  )
}

export function useEstudio() {
  const context = useContext(EstudioContext)
  if (!context) {
    throw new Error('useEstudio debe usarse dentro de un EstudioProvider')
  }
  return context
}
