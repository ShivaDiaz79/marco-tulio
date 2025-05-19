import { motion } from "framer-motion";
import { HeartPulse, Stethoscope, Syringe, Scan } from "lucide-react";

const services = [
  { icon: <HeartPulse size={40} />, title: "Cardiología", desc: "Diagnóstico y tratamiento especializado del corazón." },
  { icon: <Stethoscope size={40} />, title: "Medicina General", desc: "Atención médica integral para todas las edades." },
  { icon: <Syringe size={40} />, title: "Vacunación", desc: "Cobertura completa de vacunas para tu familia." },
  { icon: <Scan size={40} />, title: "Diagnóstico por Imagen", desc: "Tecnología avanzada para estudios precisos." },
];

export default function ServiciosAnimados() {
  return (
    <section className="bg-white py-20 px-6 text-center">
      <h2 className="text-3xl font-bold mb-10">Nuestros Servicios</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {services.map((service, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gray-100 p-6 rounded-xl shadow-lg"
          >
            <div className="text-blue-600 mb-4">{service.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
            <p className="text-gray-700">{service.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
