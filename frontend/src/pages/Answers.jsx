import React, { useState } from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Answers = () => {
    // Estado para la imagen seleccionada en el carrusel
    const [selectedImage, setSelectedImage] = useState(null);
    
    // Estado para la calificación del instructor
    const [rating, setRating] = useState(null);

    // Configuración del carrusel utilizando la librería react-slick
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
    };

    const images = [
        'src/img/instructores/AnaLucia.jpg',
        'src/img/instructores/DiegoMarin.jpg',
        'src/img/instructores/MartaLucia.jpg',
        'src/img/instructores/MoisesVargas.jpg',
        'src/img/instructores/mauricioahumada.jpg',
        'src/img/instructores/nose.jpg',
        'src/img/instructores/nose2.jpg',
        'src/img/instructores/daniel.jpg',
        'src/img/instructores/mujer1.jpeg',
        'src/img/instructores/mujer2.jpeg',
    ];

    // esto es para selecciónar la calificación
    const handleRatingSelect = (value) => {
        setRating(value);
    };

    
    const goToNextImage = () => {
        // cambia la calificación cuando cambia  de imagen
        setRating(null);
    };

    return (
        <div className='p-2 py-4 text-center border-4 rounded-md flex flex-col gap-8 shadow-lg'>
           

            <h1 className='text-4xl font-bold'>Titulo de la Encuesta</h1>
            <h1 className='text-2xl'>Descripcion de la encuesta</h1>
            <h1 className='text-xl text-green-600'>Tematica de la encuesta</h1>

            {/* 
            carrusel */}
            <div className='p-5 py-4 text-center rounded-md flex flex-col gap-4 shadow-lg'>
                <Slider {...settings}>
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className={`image-container ${image !== selectedImage ? 'blur' : ''}`}
                            onClick={() => {
                                setSelectedImage(image);
                                goToNextImage();
                            }}
                        >
                            <img
                                src={image}
                                alt={`Image ${index + 1}`}
                                style={{
                                    width: '80%',
                                    height: 'auto',
                                    borderRadius: '5px',
                                    border: '1px solid green',
                                }}
                            />
                        </div>
                    ))}
                </Slider>
            </div>

            {/* Sección de la pregunta y la escala de calificación */}
            <div className='p-5 py-4 text-center border-2 rounded-md flex flex-col gap-8 shadow-lg'>
                {selectedImage && (
                    <div className='mt-4'>
                        <p>¿El instructor maneja material de apoyo para dar a entender los temas?</p>
                        <div className='flex items-center justify-center'>
                            {[1, 2, 3, 4, 5].map((value) => (
                                <div
                                    key={value}
                                    onClick={() => handleRatingSelect(value)}
                                    className={`cursor-pointer p-4 m-2 rounded-full transition duration-300 border ${rating === value ? 'bg-green-500' : 'hover:bg-green-400'
                                    }`}
                                >
                                    {value}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Answers;
