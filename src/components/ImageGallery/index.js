import React, { useState } from "react";
import { motion } from "framer-motion";

const images = [
  "https://res.cloudinary.com/di1v23yy0/image/upload/v1708767696/sauna_osoono_hnzmww.jpg",
  "https://res.cloudinary.com/di1v23yy0/image/upload/v1708992977/mision_aglutk.png",
  "https://res.cloudinary.com/di1v23yy0/image/upload/v1708767702/cabinaosono_apodb5.jpg"
];

const ImageGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleClick = (index) => {
    setSelectedImage(selectedImage === index ? null : index);
  };

  return (
    <div className="flex flex-wrap justify-center items-center h-screen">
      {images.map((image, index) => (
        <motion.div
          key={index}
          className="w-full md:w-1/3 p-4 relative"
          style={{
            perspective: "1000px",
            transformStyle: "preserve-3d",
            zIndex: images.length - index,
            cursor: "pointer",
            opacity: selectedImage === null || selectedImage === index ? 1 : 0.5,
            transition: "opacity 0.5s"
          }}
          onClick={() => handleClick(index)}
          whileHover={{ scale: 1.1 }} // Añadir escala al hacer hover
        >
          <motion.img
            src={image}
            alt={`Image ${index}`}
            className="w-full h-auto"
            style={{ width: "100%" }}
            initial={{ opacity: 0, y: 50 }} // Animación inicial
            animate={{ opacity: 1, y: 0 }} // Animación al hacer clic
          />
          <motion.h3
            className="text-center text-white text-xl mt-2 absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
          >
            Texto Animado
          </motion.h3>
        </motion.div>
      ))}
    </div>
  );
};

export default ImageGallery;





