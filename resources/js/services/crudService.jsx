import axios, { AxiosPromise } from "axios"

import CrudServiceInterface from "../interfaces/crudServiceInterface"
import { genericService } from "./genericService"

const CrudService = (endpoint) => ({
    getResourceById(id) {
        return genericService({ url: `/${endpoint}/${id}`, method: 'get' })
    },

    getAllResources(queryParams = "") {
        return genericService({ url: `/${endpoint}?${queryParams}`, method: 'GET' })
    },

    getAllResourceDependencies() {
        return genericService({ url: `/${endpoint}/get-all-dependencies`, method: "GET" })
    },

    createResource(data) {
        return genericService({
            url: `/${endpoint}`, method: 'POST', data, headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },

    updateResource(data, id) {
        return genericService({
            url: `/${endpoint}/${id}`, method: 'POST', data, headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },

    deleteResource(id) {
        return genericService({ url: `/${endpoint}/${id}`, method: 'DELETE' })
    },

    deleteResources(data) {
        return axios.delete(`${process.env.MIX_APP_API_URL}/${endpoint}/bulk-delete`, { data })
    },

    updateProfile(data) {
        return genericService({
            url: `/${endpoint}`, method: 'POST', data, headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
})

export default CrudService