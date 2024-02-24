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
        slidesToShow: 5,
        slidesToScroll: 1,
        centerMode: true,
    };

    // Datos de las imágenes y nombres de instructores
    const images = [
        { src: 'src/img/instructores/AnaLucia.jpg', name: 'Ana Lucía' },
        { src: 'src/img/instructores/DiegoMarin.jpg', name: 'Diego Marín' },
        { src: 'src/img/instructores/Daniel.jpg', name: 'Daniel' },
        { src: 'src/img/instructores/MartaLucia.jpg', name: 'Marta Lucia' },
        { src: 'src/img/instructores/mauricioahumada.jpg', name: 'Mauricio Ahumada' },
        { src: 'src/img/instructores/MoisesVargas.jpg', name: 'Moises Vargas' },
        { src: 'src/img/instructores/nose.jpg', name: 'Llanet Liliana' },
        { src: 'src/img/instructores/EdwinDavid.jpg', name: 'Edwin David' },
        { src: 'src/img/instructores/CristianFelipe.jpg', name: 'Cristian Felipe' },
        { src: 'src/img/instructores/KarenElizabeth.jpg', name: 'Karen Elizabeth' },
        { src: 'src/img/instructores/ManuelVicente.png', name: 'Manuel Vicente' },
        
    ];
    // Función para manejar la selección de la calificación
    const handleRatingSelect = (value) => {
        setRating(value);
    };

    // Función para cambiar la imagen y reiniciar la calificación
    const goToNextImage = () => {
        setRating(null);
    };

    //Manejo de API

    return (
        <div className='container d-flex justify-content-center align-items-center vh-100'>
            <div className='p-4 text-center border rounded-md shadow-lg'>
                <h1 className='text-4xl font-bold'>"Título de la Encuesta"</h1>
                <h1 className='text-2xl'>Descripcion de la encuesta</h1>
                <h1 className='text-xl text-green-600'>Tematica de la encuesta</h1>
            </div>

            <div className='p-4 text-center mt-4 border rounded-md shadow-lg'>
                <Slider {...settings}>
                    {images.map((item, index) => (
                        <div
                            key={index}
                            className={`image-container ${item.src !== selectedImage ? 'blur' : ''}`}
                            onClick={() => {
                                setSelectedImage(item.src);
                                goToNextImage();
                            }}
                        >
                            <img
                                src={item.src}
                                alt={`Image ${index + 1}`}
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    borderRadius: '8px',
                                    border: '1px solid transparent',
                                }}
                            />
                            <p className="image-name">{item.name}</p>
                        </div>
                    ))}
                </Slider>
            </div>

            {selectedImage && (
                <div className='p-4 text-center mt-4 border rounded-md shadow-lg'>
                    <p>¿El instructor maneja material de apoyo para dar a entender los temas?</p>
                    <div className='flex items-center justify-center'>
                        {[1, 2, 3, 4, 5].map((value) => (
                            <div
                                key={value}
                                onClick={() => handleRatingSelect(value)}
                                className={`cursor-pointer p-4 m-2 transition duration-300 border rounded-full ${rating === value ? 'bg-green-500' : 'hover:bg-green-400'
                                }`}
                            >
                                {value}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Answers;