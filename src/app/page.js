'use client'
import styles from './page.module.scss'
import ZoomParallax from '../components/ZoomParallax/index';
import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis'
import Iconos from '@/components/Iconos';

export default function Home() {

    useEffect(() => {
        const lenis = new Lenis()

        function raf(time) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)
    }, [])

    return (

        <div className='bg-black'>
            <h1 className='text-3xl text-center pt-40 text-white'>PROYECTO SALÓN DE BELLEZA MARCO TULIO</h1>


            <main className={styles.main}>
                <ZoomParallax />
            </main>

            <p className='text-xl text-white p-3'>
                <br />El sitio web contaría con las siguientes secciones:<br />




                •	<br />Inicio:<br />
                	<br />Presentación: Una sección atractiva que destaca la esencia y estilo del salón.<br />

                	<br />Promociones Destacadas: <br />Espacio para destacar ofertas especiales, descuentos o eventos.
                •	<br />Servicios:<br />Una galería organizada de los servicios ofrecidos, con descripciones detalladas. (estética, peluquería, uñas, depilación, maquillaje.), esta división es solo un ejemplo.
                •	<br />Equipo de trabajo:<br /> Perfiles individuales del equipo, destacando habilidades y experiencia.
                •	<br />Testimonios:<br /> Sección para comentarios positivos de clientes satisfechos.
                •	<br />Blog:<br />
                	<br />Consejos de bellezas <br />
                	<br />Eventos y noticias.<br />
                •	<br />Contacto: número de teléfono y formulario de contacto.<br />
                •	<br />Ubicación: Integración de un mapa interactivo para facilitar la ubicación del salón y las sucursales.<br />
                •	<br />Reservas de citas online: Implementación de una herramienta para que los clientes reserven citas sin problemas.<br />
                •	<br />Integración de redes sociales: vinculación en el sitio web con sus redes sociales.
                <br />La página web del salón Marcos Tulio con lenguajes de programación React.js Next.js Tailwinds y con lenguajes de programacion de animaciones gsap, framer motion y three tecnologías que: Netflix, WhatsApp, Twitch, Uber, Twitter, Nike, TikTok, entre otras, con un lenguaje de programación NEXT JS.
                Requisitos necesarios para la creación del sitio web:
                •	<br />Manual de Marcas.
                •	<br />Información sobre el salón.
                •	<br />Sucursales con dirección y fotos de fachada (4 fotos por sucursales).
                •	<br />Fotos de los servicios (2 foto por servicio con su respectiva descripción).
                •	<br />Información de servicios promocionales.
            </p>
            <div>
                <Iconos/>
            </div>

        </div>
    )
}
