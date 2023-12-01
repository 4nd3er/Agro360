import { useEffect, useState, createContext, useContext } from "react";
import { RolesRequest, getRoleRequest, getRoleTopicsRequest } from "../api/roles";
import { TopicsRequest, createTopicRequest, getTopicFormsRequest, getTopicRequest } from "../api/topics";
import { ContextErrors } from "./Alerts";

// Create the role context
export const RolesContext = createContext()

export const useRoles = () => {
    const context = useContext(RolesContext)
    if (!context) throw new Error("debe usarse dentro de un AuthoProvider")
    return context;
}

export const RolesProvider = ({ children }) => {
    const [roles, setRoles] = useState([]) // Roles
    const [topics, setTopics] = useState([]) // Topics
    const [modalTopicForm, setModalTopicForm] = useState(false)
    const [loading, setLoading] = useState(true)
    const [errors, setErrors] = useState([])

    // Roles
    useEffect(() => {
        const getRoles = async () => {
            try {
                const res = await RolesRequest();
                setRoles(res.data)
                setLoading(false)
            } catch (error) {
                ContextErrors(error, setErrors)
            }
        }
        getRoles();
    }, [])

    // Get Role
    const getRole = async id => {
        try {
            const res = await getRoleRequest(id);
            return res.data
        } catch (error) {
            ContextErrors(error, setErrors)
        }
    };

    // Get Role Topics
    const getRoleTopics = async id => {
        try {
            const res = await getRoleTopicsRequest(id);
            return res.data;  // Return the thematic obtained
        } catch (error) {
            ContextErrors(error, setErrors)
        }
    };

    // Topics
    useEffect(() => {
        const getTopics = async () => {
            try {
                const res = await TopicsRequest();
                setTopics(res.data)
                setLoading(false)
            } catch (error) {
                ContextErrors(error, setErrors)
            }
        }
        getTopics();
    }, [])

    // Get Topic
    const getTopic = async idtopic => {
        try {
            const res = await getTopicRequest(idtopic);
            return res.data
        } catch (error) {
            ContextErrors(error, setErrors)
        }
    }

    // Get Topic Forms
    const getTopicForms = async idtopic => {
        try {
            const res = await getTopicFormsRequest(idtopic);
            return res.data; // Return the forms obtained
        } catch (error) {
            ContextErrors(error, setErrors)
        }
    }

    // Create topic
    const createTopic = async topic => {
        try {
            const res = await createTopicRequest(topic);
            return res.data
        } catch (error) {
            ContextErrors(error, setErrors)
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
                topics,
                modalTopicForm,
                errors,
                loading,
                getRole,
                getRoleTopics,
                getTopic,
                getTopicForms,
                createTopic,
                handleModalTopic
            }}
        >
            {children}
        </RolesContext.Provider>
    );
};

export default RolesContext;