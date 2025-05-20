"use client";
import styles from "./page.module.scss";
import ZoomParallax from "../components/ZoomParallax/index";
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import Iconos from "@/components/Iconos";
import ImageGallery from "@/components/ImageGallery";

import ServiciosAnimados from "@/components/ServiciosAnimados";
import FramerImagenTexto from "@/components/FramerImagenTexto";
import InfoContactoProfesional from "@/components/InfoContactoProfesional";
;
import TurnosReservaFormV2 from "@/components/TurnosReservaFormV2";
import TurnoReserva from "@/components/TurnosReserva";


export default function Home() {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <div className="bg-black h-screen">
      
      <TurnosReservaFormV2 />
      <TurnoReserva />
      <ServiciosAnimados />
      <FramerImagenTexto />
      <InfoContactoProfesional />
  

      {/* <main className={styles.main}>
        <ZoomParallax />
      </main> */}

      
      <div>
        <Iconos />
      </div>
      <h1>Visualizador de Imágenes y Videos</h1>
      {/* <div>
        <h1>Visualizador de Imágenes y Videos</h1>
        <ImageGallery />
      </div> */}
    </div>
    
  );
}
