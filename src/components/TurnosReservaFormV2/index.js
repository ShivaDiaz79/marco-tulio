'use client';

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { db } from "@/lib/firebase/config";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { Button } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const doctors = [
  { name: "Dr. Juan Pérez", specialty: "Clínico" },
  { name: "Dra. Ana López", specialty: "Pediatra" },
  { name: "Dr. Carlos Gómez", specialty: "Cardiólogo" },
  { name: "Dra. Laura Méndez", specialty: "Odontólogo" },
];

const availableHours = Array.from({ length: 13 }, (_, i) => `${8 + i}:00`);

export default function TurnosReservaFormV2() {
  const [step, setStep] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedHour, setSelectedHour] = useState(null);
  const [usedSlots, setUsedSlots] = useState([]);
  const [formData, setFormData] = useState({ nombre: '', telefono: '', motivo: '', seguro: '', servicio: '' });

  useEffect(() => {
    const loadUsedSlots = async () => {
      if (selectedDoctor && selectedDate) {
        const res = await getDocs(collection(db, "demoturnos"));
        const taken = res.docs
          .map(doc => doc.data())
          .filter(d => d.doctor === selectedDoctor.name && d.fecha === selectedDate.toDateString())
          .map(d => d.hora);
        setUsedSlots(taken);
      }
    };
    loadUsedSlots();
  }, [selectedDoctor, selectedDate]);

  const handleSubmit = async () => {
    if (!selectedDoctor || !selectedDate || !selectedHour) return;

    const data = {
      doctor: selectedDoctor.name,
      fecha: selectedDate.toDateString(),
      hora: selectedHour,
      ...formData,
    };

    await addDoc(collection(db, "demoturnos"), data);
    alert("Turno reservado con éxito");
    setStep(1);
    setSelectedDoctor(null);
    setSelectedDate(null);
    setSelectedHour(null);
    setFormData({ nombre: '', telefono: '', motivo: '', seguro: '', servicio: '' });
  };

  return (
    <div className="bg-gradient-to-br from-blue-600 to-cyan-500 text-white text-center py-20 px-4 min-h-screen">
      <h1 className="text-4xl font-bold mb-6">Reserva tu Cita</h1>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white text-black rounded-2xl shadow-lg p-6 max-w-3xl mx-auto mt-6"
      >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          {step === 1 && (
            <>
              <h2 className="text-xl font-semibold mb-4">Selecciona un médico:</h2>
              <div className="grid grid-cols-2 gap-4">
                {doctors.map((doc, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedDoctor(doc);
                      setStep(2);
                    }}
                    className={`border rounded-xl py-3 px-4 font-medium transition hover:bg-blue-100 ${selectedDoctor?.name === doc.name ? "bg-blue-200 border-blue-500" : ""}`}
                  >
                    {doc.name} - {doc.specialty}
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="text-xl font-semibold mb-4 mt-2">Selecciona el día:</h2>
              <DateCalendar
                value={selectedDate}
                onChange={(newDate) => {
                  setSelectedDate(newDate);
                  setStep(3);
                }}
              />
            </>
          )}

          {step === 3 && (
            <>
              <h2 className="text-xl font-semibold mb-4">Selecciona una hora:</h2>
              <div className="flex flex-wrap gap-3 justify-center">
                {availableHours.map((hour) => (
                  <button
                    key={hour}
                    disabled={usedSlots.includes(hour)}
                    onClick={() => setSelectedHour(hour)}
                    className={`px-4 py-2 rounded-lg border transition ${
                      usedSlots.includes(hour)
                        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                        : selectedHour === hour
                        ? "bg-blue-500 text-white"
                        : "bg-blue-100 hover:bg-blue-200"
                    }`}
                  >
                    {hour}
                  </button>
                ))}
              </div>
              <div className="mt-6 text-right">
                <Button variant="contained" onClick={() => setStep(4)} disabled={!selectedHour}>Continuar</Button>
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <h2 className="text-xl font-semibold mb-4">Completa tus datos:</h2>
              <input
                type="text"
                placeholder="Nombre y apellido"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                className="w-full mb-3 p-2 border rounded"
              />
              <PhoneInput
                country={'ar'}
                value={formData.telefono}
                onChange={(phone) => setFormData({ ...formData, telefono: phone })}
                containerStyle={{ marginBottom: '1rem' }}
              />
              <textarea
                placeholder={`Motivo de consulta (${selectedDoctor?.specialty})`}
                value={formData.motivo}
                onChange={(e) => setFormData({ ...formData, motivo: e.target.value })}
                className="w-full mb-3 p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Servicio específico (ej: control general, limpieza, etc.)"
                value={formData.servicio}
                onChange={(e) => setFormData({ ...formData, servicio: e.target.value })}
                className="w-full mb-3 p-2 border rounded"
              />
              <select
                className="w-full mb-3 p-2 border rounded"
                value={formData.seguro}
                onChange={(e) => setFormData({ ...formData, seguro: e.target.value })}
              >
                <option value="">Tipo de atención</option>
                <option value="Privado">Privado</option>
                <option value="Seguro A">Seguro A</option>
                <option value="Seguro B">Seguro B</option>
              </select>
              <div className="text-right">
                <Button variant="contained" onClick={handleSubmit}>Reservar</Button>
              </div>
            </>
          )}
        </LocalizationProvider>
      </motion.div>
    </div>
  );
}
