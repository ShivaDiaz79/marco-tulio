'use client';
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateCalendar, TimeClock } from "@mui/x-date-pickers";
import { collection, getDocs, addDoc, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase/config";

const doctors = [
  { name: "Dr. Juan Pérez" },
  { name: "Dra. Ana López" },
  { name: "Dr. Carlos Gómez" },
  { name: "Dra. Laura Méndez" },
];

export default function BannerFormulario() {
  const [step, setStep] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedHour, setSelectedHour] = useState(null);
  const [selectedMinutes, setSelectedMinutes] = useState(null);
  const [reservedSlots, setReservedSlots] = useState([]);

  // Nuevos campos del formulario
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [observaciones, setObservaciones] = useState("");

  const loadReservedSlots = async () => {
    if (!selectedDoctor || !selectedDate) return;

    const startOfDay = new Date(selectedDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(startOfDay);
    endOfDay.setDate(endOfDay.getDate() + 1);

    const q = query(
      collection(db, "turnos"),
      where("doctor", "==", selectedDoctor.name),
      where("fecha", ">=", startOfDay.toISOString()),
      where("fecha", "<", endOfDay.toISOString())
    );

    const snapshot = await getDocs(q);
    const takenTimes = snapshot.docs.map(doc => {
      const date = new Date(doc.data().fecha);
      return `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
    });

    setReservedSlots(takenTimes);
  };

  useEffect(() => {
    loadReservedSlots();
  }, [selectedDoctor, selectedDate]);

  const isSlotTaken = () => {
    if (!selectedHour || !selectedMinutes) return false;
    const h = selectedHour.getHours().toString().padStart(2, "0");
    const m = selectedMinutes.getMinutes().toString().padStart(2, "0");
    return reservedSlots.includes(`${h}:${m}`);
  };

  const handleSubmit = async () => {
    if (!selectedDoctor || !selectedDate || !selectedHour || !selectedMinutes || !nombre || !telefono) {
      alert("Por favor completa todos los campos obligatorios.");
      return;
    }

    const fullDate = new Date(selectedDate);
    fullDate.setHours(selectedHour.getHours());
    fullDate.setMinutes(selectedMinutes.getMinutes());

    const h = fullDate.getHours().toString().padStart(2, "0");
    const m = fullDate.getMinutes().toString().padStart(2, "0");

    if (reservedSlots.includes(`${h}:${m}`)) {
      alert("Este horario ya está reservado.");
      return;
    }

    await addDoc(collection(db, "turnos"), {
      doctor: selectedDoctor.name,
      fecha: fullDate.toISOString(),
      nombre,
      telefono,
      observaciones
    });

    alert("Turno reservado correctamente.");

    // Reset
    setStep(1);
    setSelectedDoctor(null);
    setSelectedDate(null);
    setSelectedHour(null);
    setSelectedMinutes(null);
    setNombre("");
    setTelefono("");
    setObservaciones("");
  };

  const isHourAllowed = (hour) => hour >= 8 && hour <= 19;

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
                    className={`border rounded-xl py-3 px-4 font-medium transition hover:bg-blue-100 ${
                      selectedDoctor?.name === doc.name ? "bg-blue-200 border-blue-500" : ""
                    }`}
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
                  setStep(3);
                }}
              />
            </>
          )}

          {step === 3 && (
            <>
              <h2 className="text-xl font-semibold mb-2 mt-4">Selecciona la hora:</h2>
              <div className="flex justify-center gap-4 flex-wrap">
                <div>
                  <h3 className="text-center mb-1 font-medium">Hora</h3>
                  <TimeClock
                    value={selectedHour}
                    onChange={(newTime) => {
                      if (isHourAllowed(newTime.getHours())) {
                        setSelectedHour(newTime);
                      } else {
                        alert("Solo se permiten turnos entre 8:00 y 20:00.");
                      }
                    }}
                    views={["hours"]}
                    ampm={false}
                  />
                </div>
                <div>
                  <h3 className="text-center mb-1 font-medium">Minutos</h3>
                  <TimeClock
                    value={selectedMinutes}
                    onChange={(newTime) => setSelectedMinutes(newTime)}
                    views={["minutes"]}
                    ampm={false}
                  />
                </div>
              </div>
              <div className="text-center text-red-500 mt-2">
                {isSlotTaken() && "Este horario ya está ocupado."}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <TextField
                  label="Nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  fullWidth
                />
                <TextField
                  label="Teléfono"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  fullWidth
                />
                <TextField
                  label="Observaciones"
                  value={observaciones}
                  onChange={(e) => setObservaciones(e.target.value)}
                  fullWidth
                  multiline
                  rows={2}
                />
              </div>

              <div className="flex justify-center mt-6">
                <Button
                  variant="contained"
                  color="primary"
                  disabled={!selectedHour || !selectedMinutes || isSlotTaken()}
                  onClick={handleSubmit}
                >
                  Confirmar Reserva
                </Button>
              </div>
            </>
          )}
        </LocalizationProvider>
      </motion.div>
    </div>
  );
}
