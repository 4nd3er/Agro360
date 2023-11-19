import React, { useState } from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Componente para la flecha de siguiente
const SampleNextArrow = (props) => (
    <div
        className={props.className}
        style={{ ...props.style, display: 'block', background: 'red' }}
        onClick={props.onClick}
    />
);

// Componente para la flecha de anterior
const SamplePrevArrow = (props) => (
    <div
        className={props.className}
        style={{ ...props.style, display: 'block', background: 'green' }}
        onClick={props.onClick}
    />
);

const Answers = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [selectedImage, setSelectedImage] = useState(null);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 2,
        nextArrow: <SampleNextArrow />, // Pasar el componente de flecha de siguiente
        prevArrow: <SamplePrevArrow />, // Pasar el componente de flecha de anterior
        beforeChange: (current, next) => {
            setActiveIndex(next);
            setSelectedImage(images[next]);
        },
    };

    const images = [
        'src/img/instructores/AnaLucia.jpg',
        'src/img/instructores/DiegoMarin.jpg',
        'src/img/instructores/MartaLucia.jpg',
        'src/img/instructores/MoisesVargas.jpg',
        'src/img/instructores/mauricioahumada.jpg',
        'src/img/instructores/nose.jpg',
    ];

    return (
        <>
            <div className='p-2 py-4 text-center border-4 rounded-md flex flex-col gap-8 shadow-lg'>
                <h1 className='text-4xl font-bold'>Titulo de la Encuesta</h1>
                <h1 className='text-2xl'>Descripcion de la encuesta</h1>
                <h1 className='text-xl text-green-600'>Tematica de la encuesta</h1>
            </div>

            <div className='p-2 py-4 text-center border-4 rounded-md flex flex-col gap-8 shadow-lg'>
                <Slider {...settings}>
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className={`image-container ${image !== selectedImage ? 'blur' : ''}`}
                            onClick={() => setSelectedImage(image)}
                        >
                            <img
                                src={image}
                                alt={`Image ${index + 1}`}
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    borderRadius: '5px',
                                    border: '1px solid green',
                                }}
                            />
                        </div>
                    ))}
                </Slider>
            </div>
        </>
    );
}

export default Answers;

