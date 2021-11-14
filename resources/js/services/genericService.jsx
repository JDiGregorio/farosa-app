   
import axios, { AxiosPromise } from "axios"

import ServiceInterface from "../interfaces/serviceInterface"

export const genericService = ({ url, method, params,data, headers }) => {
    const urlComplete = `/api${url}`
    
    return axios.request({ url: urlComplete, params, data, method, headers })
}