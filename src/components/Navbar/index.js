
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Menu, X, Stethoscope, HeartPulse, Brain, Microscope, Syringe,
  BookOpenCheck, GraduationCap, FlaskConical, TestTube2, Folder, LogIn
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useEstudio } from '@/context/EstudioContext'
import { useServicio } from '@/context/ServicioContext'

const service = [
  { name: 'Consulta General', icon: <Stethoscope size={18} />, key: 'consulta-general' },
  { name: 'Cardiología', icon: <HeartPulse size={18} />, key: 'cardiologia' },
  { name: 'Neurología', icon: <Brain size={18} />, key: 'neurologia' },
  { name: 'Laboratorio', icon: <Microscope size={18} />, key: 'laboratorio' },
  { name: 'Vacunas', icon: <Syringe size={18} />, key: 'vacunas' }
]

const studies = [
  { name: 'Rayos X', icon: <BookOpenCheck size={18} />, key: 'rayos-x' },
  { name: 'Ecografías', icon: <GraduationCap size={18} />, key: 'ecografias' },
  { name: 'Análisis Clínico', icon: <FlaskConical size={18} />, key: 'analisis-clinico' },
  { name: 'Pruebas Rápidas', icon: <TestTube2 size={18} />, key: 'pruebas-rapidas' },
  { name: 'Historial Médico', icon: <Folder size={18} />, key: 'historial-medico' }
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const { setEstudio } = useEstudio()
  const { setServicio } = useServicio()

  const toggleMenu = () => setOpen(!open)
  const toggleLogin = () => setShowLogin(!showLogin)

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-green-700 flex items-center gap-2">
          <span>🌿</span> DEMOCLÍNICA
        </Link>

        <nav className="hidden md:flex gap-6 text-gray-800 font-medium items-center">
          <Link href="/about" className="hover:text-green-600">About</Link>
          <Dropdown title="Servicios" items={service} onClick={(item) => setServicio(item.key)} />
          <Dropdown title="Estudios" items={studies} onClick={(item) => setEstudio(item.key)} />
          <button
            onClick={toggleLogin}
            className="flex items-center gap-1 text-sm px-3 py-1 border rounded text-green-700 border-green-600 hover:bg-green-50 transition"
          >
            <LogIn size={16} /> Login
          </button>
        </nav>

        <button onClick={toggleMenu} className="md:hidden">
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="md:hidden bg-white overflow-hidden border-t border-gray-200"
          >
            <div className="flex flex-col px-4 py-2 space-y-2">
              <Link href="/about" className="text-gray-800 py-1" onClick={toggleMenu}>About</Link>
              <MobileDropdown title="Servicios" items={service} onClick={(item) => {
                setServicio(item.key)
                setOpen(false)
              }} />
              <MobileDropdown title="Estudios" items={studies} onClick={(item) => {
                setEstudio(item.key)
                setOpen(false)
              }} />
              <button
                onClick={toggleLogin}
                className="flex gap-2 items-center text-green-700 border border-green-600 px-3 py-1 rounded text-sm"
              >
                <LogIn size={16} /> Login
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {showLogin && <LoginForm close={toggleLogin} />}
    </header>
  )
}

function Dropdown({ title, items, onClick }) {
  return (
    <div className="group relative cursor-pointer">
      <span className="hover:text-green-600">{title}</span>
      <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 transition-all duration-200 z-20">
        {items.map((item, i) => (
          <Link
            href={`/${title.toLowerCase()}/${item.key}`}
            key={i}
            onClick={() => onClick(item)}
            className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 text-gray-700"
          >
            {item.icon} {item.name}
          </Link>
        ))}
      </div>
    </div>
  )
}

function MobileDropdown({ title, items, onClick }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-t pt-2">
      <button onClick={() => setOpen(!open)} className="w-full flex justify-between items-center text-gray-800 py-1">
        {title}
        <span>{open ? '-' : '+'}</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="overflow-hidden pl-4"
          >
            {items.map((item, i) => (
              <Link
                href={`/${title.toLowerCase()}/${item.key}`}
                key={i}
                onClick={() => onClick(item)}
                className="flex items-center gap-2 py-1 text-sm text-gray-700"
              >
                {item.icon} {item.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function LoginForm({ close }) {
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = (e) => {
    e.preventDefault()
    if (user === 'demo' && pass === '123') {
      alert('Login exitoso!')
      close()
      router.push('/login')
    } else {
      setError('Usuario o contraseña incorrectos')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-[999]"
    >
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm relative">
        <button className="absolute top-2 right-3 text-gray-400 hover:text-red-500" onClick={close}>
          <X size={20} />
        </button>
        <h3 className="text-lg font-semibold mb-4 text-center">Iniciar Sesión</h3>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Usuario"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            className="border p-2 rounded"
          />
          {error && <p className="text-sm text-red-500 text-center">{error}</p>}
          <button
            type="submit"
            className="bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Acceder
          </button>
        </form>
      </div>
    </motion.div>
  )
}
