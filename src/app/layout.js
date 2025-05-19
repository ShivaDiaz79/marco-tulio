// app/layout.js o src/app/layout.js
import './globals.css'
import { EstudioProvider } from '@/context/EstudioContext'
import { ServicioProvider } from '@/context/ServicioContext'
import Navbar from '../components/Navbar'

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <EstudioProvider>
          <ServicioProvider>
            <Navbar />
            {children}
          </ServicioProvider>
        </EstudioProvider>
      </body>
    </html>
  )
}
