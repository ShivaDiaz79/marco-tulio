export default function InfoContactoProfesional() {
  return (
    <section className="bg-blue-50 py-16 px-6 text-center md:text-left">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-blue-800">Contáctanos</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-700">
          <div>
            <h3 className="font-semibold text-lg mb-2">Dirección</h3>
            <p>Av. Las Palmas 1234, Zona Centro<br />Santa Cruz de la Sierra, Bolivia</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">Horarios de Atención</h3>
            <p>Lunes a Viernes: 07:00 - 19:00<br />Sábados: 08:00 - 13:00<br />Domingos: Cerrado</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">Contacto</h3>
            <p>Tel: +591 76543210<br />Email: contacto@clinicacemo.com<br />WhatsApp: +591 76543210</p>
          </div>
        </div>
      </div>
    </section>
  );
}
