import { useContext } from "react";
import RolesContext from "../context/RolesProvider";

const useRoles = () =>{
    return useContext(RolesContext)
}
export default useRoles