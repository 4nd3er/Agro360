import { useEffect, useState, createContext } from "react";
import agro360Axios from "../config/agro360Axios";

const ResponsesContext = createContext();

const ResponsesProvider = ({ children }) => {  
    const sendCode = async email => {
        try {
            const { data } = await agro360Axios(`/forms/v/:form?email=${email}`)
        } catch (error) {
            console.log('Error al enviar el correo del usuario: ' + error.response)
        }
    }
    return (
        <ResponsesContext.Provider
            value={{
                sendCode
            }}
        >
            {children}
        </ResponsesContext.Provider>
    )
}

export {
    ResponsesProvider
}
export default ResponsesContext