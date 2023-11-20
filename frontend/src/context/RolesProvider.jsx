import { useEffect, useState, createContext } from "react";
import agro360Axios from "../config/agro360Axios";
import { useNavigate } from "react-router-dom"

// Create the role context
const RolesContext = createContext()

const RolesProvider = ({ children }) => {
    const [roles, setRoles] = useState([]) // Roles
    const [role, setRole] = useState()
    const [topic, setTopic] = useState({})
    const [modalTopicForm, setModalTopicForm] = useState(false)
    const [errors, setErrors] = useState([])

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
    }, [])

    // Obtain rol
    const obtainRol = async id => {
        try {
            const { data } = await agro360Axios(`/roles/${id}`);
            return(data)
        } catch (error) {
            console.log(error);
            return[]
        }
    };

    // Obtain name topic
    const obtainTopic = async idtopic => {
        try {
            const { data } = await agro360Axios(`/topics/${idtopic}`);
            return(data)
        } catch (error) {
            console.log(error);
            return[]
        }
    }

    // Obtain topics by rol
    const obtainTopics = async id => {
        try {
            const { data } = await agro360Axios(`/roles/${id}/topics`);
            return data;  // Return the thematic obtained
        } catch (error) {
            console.error("Error al traer las temáticas por rol:", error.response || error);
            return [];  // Return an empty array in case of error
        }
    };

    // Obtain forms by topic
    const obtainForm = async idtopic => {
        try {
            const { data } = await agro360Axios(`/topics/${idtopic}/forms`)
            return data; // Return the forms obtained
        } catch (error) {
            console.error("Error al traer los formularios por temática:", error.response || error);
            return []; // Return an empty array in case of error
        }
    }

    // Create topic
    const createTopic = async topic => {
        try {
            const { data } = await agro360Axios.post('/topics', topic);
            setModalTopicForm(false);
        } catch (error) {
            console.log("Error al crear la tematica");
            setErrors(error.response.data.error)
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
                obtainTopics,
                obtainForm,
                obtainRol,
                obtainTopic,
                createTopic,
                modalTopicForm,
                handleModalTopic,
                errors
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