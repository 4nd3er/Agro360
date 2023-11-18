import { useEffect, useState, createContext } from "react";
import agro360Axios from "../config/agro360Axios";
import { useNavigate } from "react-router-dom"

// Crear el contexto de los roles
const RolesContext = createContext()

const RolesProvider = ({ children }) => {
    const [roles, setRoles] = useState([]) // Roles
    const [topic, setTopic] = useState({})
    const [modalTopicForm, setModalTopicForm] = useState(false)

    useEffect(() => {
        const obtainRoles = async () => {
            try {
                const { data } = await agro360Axios('/roles')
                setRoles(data)
            } catch (error) {
                console.log(error)
            }
        }
        obtainRoles()
        return () => {
            // Limpieza del efecto si el componente es desmontado
        };
    },[])

    const obtainTopic = async id => {
        try {
            const { data } = await agro360Axios(`/roles/${id}/topics`)
            console.log(data)
        } catch (error) {
            if (error.response.status === 404) {
                console.log("No se encontraron temas para el rol.");
              } else {
                console.error("Error al traer las temáticas por rol:", error.response || error);
              }
        }
    }

    // Open and close the Topic Modal
    const handleModalTopic = () => {
        setModalTopicForm(!modalTopicForm)
    };

    return (
        <RolesContext.Provider
            value={{
                roles,
                obtainTopic,
                modalTopicForm,
                handleModalTopic    
            }}
        >
            {children}
        </RolesContext.Provider>
    );
};

export {
    RolesProvider
}
export default RolesContext