import { createContext, useContext, useEffect, useState } from "react";
import { ResponsesRequest } from "../api/responses";
import { CleanErrors, ContextErrors } from "./Error";

export const ResponsesContext = createContext();

export const useResponses = () => {
    const context = useContext(ResponsesContext);
    if (!context) throw new Error("useReponses debe estar dentro del proveedor ResponseContext");
    return context;
}

export const ResponsesProvider = ({ children }) => {
    const [responses, setResponses] = useState([]);
    const [errors, setErrors] = useState([]);

    CleanErrors(errors, setErrors);

    //* Responses

    // Responses
    useEffect(() => {
        const getResponses = async () => {
            try {
                const res = await ResponsesRequest();
                setResponses(res.data);
            } catch (error) {
                ContextErrors(error, setErrors);
            }
        }
        getResponses();
    }, [])

    // Get Response
    const getReponse = async (id) => {
        try {
            const res = await ResponsesRequest(id);
            return res.data;
        } catch (error) {
            ContextErrors(error, setErrors);
        }
    }

    // Get

    return (
        <ResponsesContext.Provider
            value={{
                responses,
                getReponse,
                errors
            }}>
            {children}
        </ResponsesContext.Provider>
    );
}

export default ResponsesContext;