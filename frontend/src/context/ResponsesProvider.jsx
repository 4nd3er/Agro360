import { useEffect, useState, createContext } from "react";
import agro360Axios from "../config/agro360Axios";

const ResponsesContext = createContext();

const ResponsesProvider = ({ children }) => {
    return (
        <ResponsesContext.Provider
            value={{

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