import { useEffect, useState, createContext } from "react";
import agro360Axios from "../config/agro360Axios";
import { useNavigate } from "react-router-dom"

// Crear el contexto de los roles
const RolesContext = createContext()

const RolesProvider = ({ children }) => {
    const [roles, setRoles] = useState([]) // Roles
    const [topic, setTopic] = useState({})
    const [modalTopicForm, setModalTopicForm] = useState(false)

    // Obtain roles
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
            // Cleaning of the effect if the component is disassembled
        };
    }, [])

    // Obtain topics by rol
    const obtainTopic = async id => {
        try {
            const { data } = await agro360Axios(`/roles/${id}/topics`);
            return data;  // Return the thematic obtained
        } catch (error) {
            console.error("Error al traer las temáticas por rol:", error.response || error);
            return [];  // Return an empty array in case of error
        }
    };


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