import React, { useState } from 'react'
import axios from 'axios'

import { withLayout } from './Layout'

const ForgotPassword = () => {
    const [email, setEmail] =  useState("")
    const [errors, setErrors] = useState({})

    const handleSubmit = event => {
        event.preventDefault()

        // const errors = validate(email)

        // setErrors(errors)

        // if (!Object.keys(errors).length) {
            axios.post("/admin/forgot-password", { email })
                .then(response => {
                    alert("Se envió un enlace a su correo.")
                })
                .catch(error => {
                   console.log(error)
                })
        // }
    }

    return (
        <>
            <div className="space-y-1">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Correo electrónico
                </label>

                <input type="email" name="email" id="email" onChange={({target}) => setEmail(target.value)} placeholder="Correo electrónico" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-gray-100 focus:border-red-500 focus:z-10 sm:text-sm" />
            </div>

            <div className="flex items-right justify-end">
                <div className="text-sm">
                    <a href="/admin/login" className="font-medium text-red-700 hover:text-red-900 font-medium">
                        Inicio de sesión
                    </a>
                </div>
            </div>

            <button type="submit" onClick={handleSubmit} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-700 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                Enviar enlace de verificación
            </button>
        </>
    )
}

export default withLayout(ForgotPassword)