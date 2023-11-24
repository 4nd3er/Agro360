import { useContext } from "react";
import ResponsesContext from "../context/ResponsesProvider";

const useResponses = () => {
    return useContext(ResponsesContext)
}
export default useResponses