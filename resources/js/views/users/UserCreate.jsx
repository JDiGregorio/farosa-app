import React, { useState, useEffect } from "react"
import { useParams, useHistory } from "react-router-dom"
import { Button } from "@windmill/react-ui"
import axios from "axios"

import { BreadCrumb } from "../../components/BreadCrumbs/BreadCrumb"
import { Title } from "../../components/Typography/Title"
import { ErrorView } from "../../components/Typography/ErrorView"

import * as constants from "../../constants/User"

const UserCreate = () => {
    const [represents, setRepresents] = useState([])
    const [user, setUser] = useState(constants.initialUser)
    const [errors, setErrors] = useState({})

    const history = useHistory()
    const { id } = useParams()

    useEffect(() => {
        axios.get('/api/users/related-data', {
            params: {
                userId: id ? id : null
            }
        })
        .then(response => {
            setRepresents(response.data.representantes)

            if (response.data.hasOwnProperty('user')) {
                Object.entries(response.data.user).map(([key, value]) => {
                    setUser(prevState => {
                        return {
                            ...prevState,
                            [key]: value,
                        }
                    })
                })
            }
        })
        .catch(error => {
            console.log(error)
            // agregar notificacion error
        })
    }, [])

    const handleChange = event => {
        const { name, value } = event.target

        setUser((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit = event => {
        event.preventDefault()

        // agregar validaciones
    
        // const errors = validateForm(user)
    
        // setErrors(errors)
    
        // if (!Object.keys(errors).length) {
    
            let values = Object.assign({} , user)

            if (id) {
                values["_method"] = "PUT"
                values["id"] = id
            }

            submitForm(values)
    
        // } else {
          // alerta de datos vacios...
          // agregar notificacion errores vacios
        // }
    }

    const submitForm = values => {
        let baseURL = id ? `/api/users/${id}` : '/api/users'

        axios.post(baseURL, values)
            .then(response => {
                if (response.status == 200) {
                    // agregar notificacion success

                    if (!id) {
                        history.push(`/usuarios/${response.data.userId}/editar`)
                    }
                }
            })
            .catch(error => {
                console.log(error)
                // agregar notificacion error
            })
    }

    const actionText = id ? "GUARDAR" : "CREAR"

    return (
        <>
            <BreadCrumb 
                links={[
                    { path: '/usuarios', name: 'Lista de usuarios' },
                    { path: '', name: `${id ? 'Editar' : 'Crear'}` }
                ]}
            />

            <div className="flex justify-between mb-4">
                <Title>
                    Usuario
                </Title>
                
                <Button onClick={handleSubmit}>
                    {actionText}
                </Button>
            </div>

            <div className="my-6 p-6 flex flex-col bg-white shadow-lg rounded-lg space-y-2">
                <div className="md:mt-0 md:col-span-2">
                    <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3 space-y-2">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Nombre
                            </label>

                            <input type="text" name="name" id="name" value={user.name} onChange={handleChange} autoComplete="off" placeholder="Nombre" className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-100 focus:border-gray-300 sm:text-sm" />

                            {errors["name"] && <ErrorView message={errors["name"]} />}
                        </div>

                        <div className="col-span-6 sm:col-span-3 space-y-2">
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                Nombre de usuario
                            </label>

                            <input type="text" name="username" id="username" value={user.username} onChange={handleChange} autoComplete="off" placeholder="Nombre de usuario" className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-100 focus:border-gray-300 sm:text-sm" />

                            {errors["username"] && <ErrorView message={errors["username"]} />}
                        </div>

                        <div className="col-span-6 sm:col-span-3 space-y-2">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Correo electrónico
                            </label>

                            <input type="email" name="email" id="email" value={user.email} onChange={handleChange} autoComplete="off" placeholder="Correo electrónico" className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-100 focus:border-gray-300 sm:text-sm" />
                        
                            {errors["email"] && <ErrorView message={errors["email"]} />}
                        </div>

                        <div className="col-span-6 sm:col-span-3 space-y-2">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Contraseña
                            </label>

                            <input type="password" name="password" id="password" value={user.password} onChange={handleChange} autoComplete="off" placeholder="Contraseña" className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-100 focus:border-gray-300 sm:text-sm" />
                        
                            {errors["password"] && <ErrorView message={errors["password"]} />}
                        </div>

                        {/* AGREGAR SELECT SALES REP */}

                        {/* AGREGAR CHECKBOX TYPE USER */}

                        {/* AGREGAR CHECKBOX DIGITAR PRECIO */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserCreate