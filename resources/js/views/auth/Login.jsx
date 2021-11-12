import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { withLayout } from './Layout'

const Login = () => {
    const [usuario, setUsuario] = useState({ username: '', password: '' })
    const [errors, setErrors] = useState({})

    useEffect(() => {
        axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

        let token = document.head.querySelector('meta[name="csrf-token"]')

        if (token) {
            axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content
        } else {
            console.error('Token CSRF no válido o inexistente')
        }
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

        // const errors = validateForm(usuario)

        // setErrors(errors)

        // if (!Object.keys(errors).length) {
            const formData = new FormData()

            Object.entries(usuario).forEach(([key, value]) => {
                formData.append(key, value)
            })

            submitForm(formData)
        // }
    }

    const submitForm = formData => {
        axios.post("/admin/login", formData)
            .then(response => {
                if (response.status == 200) {
                    window.location.href = response.request.responseURL
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <>
            <div className="space-y-1">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                    Nombre de usuario
                </label>

                <input type="text" name="username" id="username" onChange={handleChangeInput} placeholder="Nombre de usuario" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-100 focus:border-gray-300 sm:text-sm" />
            </div>

            <div className="space-y-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Contraseña
                </label>

                <input type="password" name="password" id="password" onChange={handleChangeInput} placeholder="Contraseña" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-100 focus:border-gray-300 sm:text-sm" />
            </div>

            <div className="flex items-right justify-end">
                <div className="text-sm">
                    <a href="/admin/forgot-password" className="font-medium text-red-700 hover:text-red-900 font-medium">
                        ¿Olvidó su contraseña?
                    </a>
                </div>
            </div>
            
            <button type="submit" onClick={handleSubmit} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-700 hover:bg-indigo-800 focus:outline-none">
                Ingresar
            </button>
        </>
    )
}

export default withLayout(Login)