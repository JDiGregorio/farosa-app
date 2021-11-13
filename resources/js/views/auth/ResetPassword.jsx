import React, { useState } from 'react'
import axios from 'axios'

import { withLayout } from './Layout'

const token = window.location.href.split('/')[5]

const queryString = window.location.search

const urlParams = new URLSearchParams(queryString);
const name = urlParams.get('name')
const email = urlParams.get('email')

const ResetPassword = () => {
    const [data, setData] =  useState<Data>(constants.resetPassword)
    const [errors, setErrors] = useState({})

    const handleChangeInput = event => {
        const { name, value } = event.target

        setData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit = event => {
        event.preventDefault()

        // const errors = validate(data)

        // setErrors(errors)

        // if (!Object.keys(errors).length && email) {
            const formData = new FormData()

            formData.append('token', token.split("?")[0])
            formData.append('password', data.password)
            formData.append('password_confirmation', data.password_confirmation)
            formData.append('email', email)

            submitForm(formData)
        // }
    }

    const submitForm  = formData => {
        axios.post("/admin/reset-password ", formData)
            .then(response => {
                alert("Se ha restablecido su contraseña con éxito.")

                window.location.href = '/login'
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <>
            <div className="space-y-1">
                <h1 className="block text-2xl font-medium text-gray-700">
                    Hola <span className="font-semibold text-gray-800">{name}</span>
                </h1>
            </div>

            <div className="space-y-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Contraseña
                </label>

                <input type="password" name="password" id="password" onChange={handleChangeInput}  required placeholder="Contraseña" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm" />
            </div>

            <div className="space-y-1">
                <label htmlFor="password-confirm" className="block text-sm font-medium text-gray-700">
                    Confirmar contraseña
                </label>

                <input type="password" name="password_confirmation" id="password-confirm" onChange={handleChangeInput} required placeholder="Confirmar contraseña" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm" />
            </div>

            <button type="submit" onClick={handleSubmit} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-700 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                Cambiar contraseña
            </button>
        </>
    )
}

export default withLayout(ResetPassword)