import axios from 'axios'

const agro360Axios = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`
})
export default agro360Axios