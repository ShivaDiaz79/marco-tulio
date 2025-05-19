import { motion } from "framer-motion";
import Image from "next/image";

export default function FramerImagenTexto() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between py-20 px-6 gap-10 bg-gray-100">
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="md:w-1/2 text-center md:text-left"
      >
        <h2 className="text-3xl font-bold mb-4">Tu bienestar es nuestra prioridad</h2>
        <p className="text-lg text-gray-700">
          En Clínica DEMO contamos con tecnología de punta y profesionales altamente calificados para garantizar tu salud y comodidad.
        </p>
      </motion.div>

      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="md:w-1/2"
      >
        <Image
          src="/images/demo/sala.webp"
          alt="Clínica CEMO"
          width={500}
          height={300}
          className="rounded-xl shadow-xl"
        />
      </motion.div>
    </section>
  );
}
