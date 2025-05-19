'use client';
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateCalendar, TimeClock } from "@mui/x-date-pickers";

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

  const handleSubmit = async () => {
    if (!selectedDoctor || !selectedDate || selectedHour === null || selectedMinutes === null) return;

    const fullDate = new Date(selectedDate);
    fullDate.setHours(selectedHour.getHours());
    fullDate.setMinutes(selectedMinutes.getMinutes());

    const timestamp = fullDate.toISOString();

    console.log("Reservado:", {
      doctor: selectedDoctor.name,
      fecha: timestamp,
    });

    // Aquí deberías enviar a Firebase tu objeto con doctor y fecha

    // Reset
    setStep(1);
    setSelectedDoctor(null);
    setSelectedDate(null);
    setSelectedHour(null);
    setSelectedMinutes(null);
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
                    onChange={(newTime) => setSelectedHour(newTime)}
                    views={['hours']}
                    ampm={false}
                  />
                </div>
                <div>
                  <h3 className="text-center mb-1 font-medium">Minutos</h3>
                  <TimeClock
                    value={selectedMinutes}
                    onChange={(newTime) => setSelectedMinutes(newTime)}
                    views={['minutes']}
                    ampm={false}
                  />
                </div>
              </div>
              <div className="flex justify-center mt-6">
                <Button
                  variant="contained"
                  color="primary"
                  disabled={!selectedHour || !selectedMinutes}
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
