   
import axios from "axios"

export const genericService = ({ url, method, params,data, headers }) => {
    const urlComplete = `/api${url}`
    
    return axios.request({ url: urlComplete, params, data, method, headers })
}