"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateCalendar } from "@mui/x-date-pickers";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";

const doctors = [
  { name: "Dr. Juan Pérez", type: "clínico" },
  { name: "Dra. Ana López", type: "pediatra" },
  { name: "Dr. Carlos Gómez", type: "ginecólogo" },
  { name: "Dra. Laura Méndez", type: "cardiólogo" },
  { name: "Dr. Ramón Ruiz", type: "odontólogo" },
];

const hours = Array.from({ length: 13 }, (_, i) => `${i + 8}:00`);

export default function TurnoReserva() {
  const [step, setStep] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [usedHours, setUsedHours] = useState([]);
  const [selectedHour, setSelectedHour] = useState(null);
  const [form, setForm] = useState({ nombre: "", telefono: "", motivo: "", servicio: "", seguro: "" });

  const loadUsedHours = async (doctor, date) => {
    const ref = doc(db, "demoturnos", `${doctor.name}_${date}`);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      setUsedHours(snap.data().horas || []);
    } else {
      setUsedHours([]);
    }
  };

  const saveTurn = async () => {
    const key = `${selectedDoctor.name}_${selectedDate.toDateString()}`;
    const ref = doc(db, "demoturnos", key);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      await updateDoc(ref, { horas: [...snap.data().horas, selectedHour] });
    } else {
      await setDoc(ref, { horas: [selectedHour] });
    }
  };

  const handleSubmit = async () => {
    await saveTurn();
    alert("Turno reservado exitosamente");
    setStep(1);
    setSelectedDoctor(null);
    setSelectedDate(null);
    setSelectedHour(null);
    setForm({ nombre: "", telefono: "", motivo: "", servicio: "", seguro: "" });
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
                    {doc.name}
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
                  loadUsedHours(selectedDoctor, newDate.toDateString());
                  setStep(3);
                }}
              />
            </>
          )}

          {step === 3 && (
            <>
              <h2 className="text-xl font-semibold mb-2 mt-4">Selecciona la hora:</h2>
              <div className="flex flex-wrap gap-2 justify-center">
                {hours.map((hour) => (
                  <button
                    key={hour}
                    disabled={usedHours.includes(hour)}
                    onClick={() => setSelectedHour(hour)}
                    className={`py-2 px-4 rounded-md ${usedHours.includes(hour) ? "bg-black text-white cursor-not-allowed" : selectedHour === hour ? "bg-blue-500 text-white" : "bg-blue-200"}`}
                  >
                    {hour}
                  </button>
                ))}
              </div>
              <Button
                className="mt-4"
                variant="contained"
                disabled={!selectedHour}
                onClick={() => setStep(4)}
              >
                Continuar
              </Button>
            </>
          )}

          {step === 4 && (
            <>
              <h2 className="text-xl font-semibold mb-4 mt-2">Completa tus datos:</h2>
              <input
                className="border rounded w-full mb-2 p-2"
                placeholder="Nombre"
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
              />
              <input
                className="border rounded w-full mb-2 p-2"
                placeholder="Teléfono"
                value={form.telefono}
                onChange={(e) => setForm({ ...form, telefono: e.target.value })}
              />
              <textarea
                className="border rounded w-full mb-2 p-2"
                placeholder={`Motivo de la consulta (${selectedDoctor?.type})`}
                value={form.motivo}
                onChange={(e) => setForm({ ...form, motivo: e.target.value })}
              />
              <input
                className="border rounded w-full mb-2 p-2"
                placeholder="Servicio relacionado"
                value={form.servicio}
                onChange={(e) => setForm({ ...form, servicio: e.target.value })}
              />
              <select
                className="border rounded w-full mb-2 p-2"
                value={form.seguro}
                onChange={(e) => setForm({ ...form, seguro: e.target.value })}
              >
                <option value="">¿Tiene seguro?</option>
                <option value="privado">Atención privada</option>
                <option value="seguro1">Seguro Sura</option>
                <option value="seguro2">Seguro Bisa</option>
                <option value="seguro3">Otro</option>
              </select>
              <Button
                className="mt-4"
                variant="contained"
                onClick={handleSubmit}
              >
                Confirmar Turno
              </Button>
            </>
          )}
        </LocalizationProvider>
      </motion.div>
    </div>
  );
}
