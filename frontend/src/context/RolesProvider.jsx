import { useEffect, useState, createContext } from "react";
import agro360Axios from "../config/agro360Axios";
import { useNavigate } from "react-router-dom"

// Crear el contexto de los roles
const RolesContext = createContext()

const RolesProvider = ({ children }) => {
    return (
        <RolesContext.Provider
        // value={}
        >
            {children}
        </RolesContext.Provider>
    )
} 

export {
    RolesProvider
}
export default RolesContext