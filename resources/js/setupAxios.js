
import { Logout } from "../services/authService"

const setupAxios = (axios) => {
  axios.interceptors.request.use(
    config => {
      config.headers.common['Content-Type'] = 'multipart/form-data'
      config.withCredentials = true
      return config
    }, err => Promise.reject(err))

  axios.interceptors.response.use(function (response) {
    return response
  }, error => {
    if (error.response.status == 401) {
      Logout().then(() => {
        localStorage.removeItem('user')
      })
    }

    return Promise.reject(error)
  })
}

export default setupAxios