import { useEffect, useState, createContext } from "react";
import agro360Axios from "../config/agro360Axios";
import { useNavigate } from "react-router-dom"

// Crear el contexto de los roles
const RolesContext = createContext()

const RolesProvider = ({children}) => {
    const [modalTopicForm, setModalTopicForm] = useState(false)

    // Open and close the Topic Modal
    const handleModalTopic = () => {
        setModalTopicForm(!modalTopicForm)
    };

    return (
        <RolesContext.Provider
           value={{
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