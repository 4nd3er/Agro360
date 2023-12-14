import React, { useState } from 'react';
import { imgEncuesta } from '../assets/Assets';


const Survey = ({ title, imageSrc, color, isActive }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const h2Style = {
        marginLeft: "1px",
        fontSize: "14px",
        fontFamily: "Arial, sans-serif",
        color: "black",
        margin: "3px 0",
        backgroundColor: "white",
        marginBottom: "12px",
        borderRadius: "5px",
    };

    const menuStyle = {
        fontSize: "19px",
        fontWeight: "bold",
        fontFamily: "Verdana, sans-serif",
        color: "black",
    };

    const menuItemsStyle = {
        marginRight: "10px",
        fontSize: "10px",
        fontWeight: "normal",
        fontFamily: "Verdana, sans-serif",
        color: "black",
        padding: "1px",
        borderRadius: "5px",
        border: `2px solid ${color}`,
    };

    const cardStyle = {
        border: `3px solid ${color}`,
        borderRadius: "5px",
        width: "130px",
        height: "160px",
        backgroundColor: color,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: "10px",
        margin: "60px 20px 0",
        marginRight: "30px",

    };


    const activoinactivo = {
        borderRadius: "5px",
        width: "60px",
        height: "30px",
        backgroundColor: "white",
        fontSize: "10px",
        fontFamily: "Verdana, sans-serif",
        border: `2px solid ${color}`,
        color: isActive ? "black" : "gray",
        margin: "-5px 0 0 -90px",
    };



    return (
        <div className="card" style={cardStyle}>
            <div style={activoinactivo}>
                {isActive ? "Activo" : "Inactivo"}
            </div>
            <img src={imageSrc} alt={title} style={{ width: "105px", height: "80px" }} />
            <h2 style={h2Style}>{title}
                <div className="menu" style={menuStyle}>
                    <button onClick={toggleMenu}>...</button>
                    {isMenuOpen && (
                        <ul style={menuStyle}>
                            <li style={menuItemsStyle}>Ver</li>
                            <li style={menuItemsStyle}>Editar</li>

                        </ul>
                    )}
                </div></h2>
        </div>
    );
}



const SurveyList = () => {
    const surveys = [
        { title: "Encuesta pedagógica", imageSrc: { imgEncuesta }, color: "#82DEF0", isActive: true },
        { title: "Encuesta de actitudinal", imageSrc: { imgEncuesta }, color: "#2EA84A", isActive: false },
        { title: "Encuesta de calidad", imageSrc: { imgEncuesta }, color: "#CB7766", isActive: true },
        { title: "Encuesta de satisfacción", imageSrc: { imgEncuesta }, color: "#2EA84A", isActive: false },
        { title: "Encuesta pedagógica", imageSrc: { imgEncuesta }, color: "#82DEF0", isActive: true },
    ];
    const titleStyle = {
        fontSize: "24px",
        fontWeight: "bold",
        fontFamily: "Arial, sans-serif",
        color: "#2EA84A",
        textShadow: "1px 1px 1px #257B39",
        margin: "-20px 0",
        textAlign: "center",
    };

    return (
        <div>
            <h1 style={titleStyle}>ENCUESTAS RECIENTES</h1>
            <div style={{ display: "flex" }}>
                {surveys.map((survey, index) => (
                    <Survey
                        key={index}
                        title={survey.title}
                        imageSrc={survey.imageSrc}
                        color={survey.color}
                        isActive={survey.isActive}
                    />
                ))}
            </div>
        </div>
    );
};

export default SurveyList;
Survey