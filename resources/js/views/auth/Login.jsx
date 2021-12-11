import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import axios from 'axios'

import { withLayout } from './Layout'
import { Alert } from "../../components/notifications/Alert"
import { ErrorView } from "../../components/Typography/ErrorView"

import { validateForm } from "../../validations/LoginCreate.form.validations"

const Login = () => {
    const [usuario, setUsuario] = useState({ username: "", password: "" })
    const [errors, setErrors] = useState({})
    const history = useHistory()

    useEffect(() => {
        axios.get('/sanctum/csrf-cookie')
    }, [])

    const handleChangeInput = event => {
        const { name, value } = event.target

        setUsuario(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit = event => {
        event.preventDefault()

        const errors = validateForm(usuario)

        setErrors(errors)

        if (!Object.keys(errors).length) {
            const formData = new FormData()

            Object.entries(usuario).forEach(([key, value]) => {
                formData.append(key, value)
            })

            submitForm(formData)
        } else {
            Alert({
                action: "Error",
                message: "Es necesario agregar los datos requeridos."
            })
        }
    }

    const submitForm = formData => {
        axios.post("/api/login", formData)
            .then(response => {
                if (response.status == 200) {
                    axios.get('api/user').then((res) => {
                        localStorage.setItem('user', JSON.stringify(res.data.data))
                        history.push("/inicio")
                    })
                }
            })
            .catch(error => {
                if (error.response.status === 422) {
                    Alert({
                        action: "Error",
                        message: "Los datos proporcionados no son válidos. Nombre de usuario o contraseña invalido."
                    })
                }

                if (error.response.status == 429) {
                    Alert({
                        action: "Error",
                        message: "Ha realizado muchos intentos fallidos, por su seguridad debe esperar un momento."
                    })
                }

                if (error.response.status == 500) {
                    Alert({
                        action: "Error",
                        message: "Error inesperado, por favor contacte al administrador del sistema."
                    })
                }
            })
    }

    return (
        <>
            <div className="space-y-1">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                    Nombre de usuario
                </label>

                <input type="text" name="username" id="username" onChange={handleChangeInput} placeholder="Nombre de usuario" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none text-sm" />
            
                {errors["username"] && <ErrorView message={errors["username"]} />}
            </div>

            <div className="space-y-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Contraseña
                </label>

                <input type="password" name="password" id="password" onChange={handleChangeInput} placeholder="Contraseña" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none text-sm" />
            
                {errors["password"] && <ErrorView message={errors["password"]} />}
            </div>

            <hr className="my-8" />

            <button type="submit" onClick={handleSubmit} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 focus:outline-none">
                Ingresar
            </button>
        </>
    )
}

export default withLayout(Login)