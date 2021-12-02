import React, { useState, useEffect } from "react"
import { useParams, useHistory } from "react-router-dom"
import { Button } from "@windmill/react-ui"
import Select from 'react-select'
import axios from "axios"

import { BreadCrumb } from "../../components/BreadCrumbs/BreadCrumb"
import { Title } from "../../components/Typography/Title"
import { ErrorView } from "../../components/Typography/ErrorView"
import { ToggleButton } from "../../components/Fields/ToggleButton"
import { Alert } from "../../components/notifications/Alert"

import { validateForm } from "../../validations/UserCreate.form.validations"

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
            Alert({
                action: 'Error',
                message: "La data relacionada no ha podido ser recopilada."
            })
        })
    }, [])

    const handleChange = event => {
        const { name, value } = event.target

        setUser(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleChangeSelect2 = (name, event) => {
        setUser(prevState => ({
            ...prevState,
            [name]: event ? event.value : null
        }))
    }

    const handleToggle = name => {
        setUser(prevState => ({
            ...prevState,
            [name]: !prevState[name]
        }))
    }

    const handleSubmit = event => {
        event.preventDefault()
    
        const errors = validateForm(user)
    
        setErrors(errors)
    
        if (!Object.keys(errors).length) {
            let values = Object.assign({} , user)

            if (id) {
                values["_method"] = "PUT"
                values["id"] = id
            }

            submitForm(values)
        } else {
            Alert({
                action: 'Error',
                message: "Es necesario agregar los datos requeridos."
            })
        }
    }

    const submitForm = values => {
        let baseURL = id ? `/api/users/${id}` : '/api/users'
        let successful = id ? constants.edit : constants.create
        let failed = id ? constants.failedEdit : constants.failedCreate

        axios.post(baseURL, values)
            .then(response => {
                if (response.status == 200) {
                    if (!id) {
                        history.push(`/usuarios/${response.data.userId}/editar`)
                    }

                    Alert(successful)
                }
            })
            .catch(error => {
                Alert(failed)
            })
    }

    const actionText = id ? "GUARDAR" : "CREAR"
    const optionSelected = user.SalesRep_id ? represents.find(option => option.value == user.SalesRep_id) : null

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

                            <input type="text" name="name" id="name" value={user.name} onChange={handleChange} autoComplete="off" placeholder="Nombre" className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-100 focus:border-gray-300 text-sm" />

                            {errors["name"] && <ErrorView message={errors["name"]} />}
                        </div>

                        <div className="col-span-6 sm:col-span-3 space-y-2">
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                Nombre de usuario
                            </label>

                            <input type="text" name="username" id="username" value={user.username} onChange={handleChange} autoComplete="off" placeholder="Nombre de usuario" className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-100 focus:border-gray-300 text-sm" />

                            {errors["username"] && <ErrorView message={errors["username"]} />}
                        </div>

                        <div className="col-span-6 sm:col-span-3 space-y-2">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Correo electrónico
                            </label>

                            <input type="email" name="email" id="email" value={user.email} onChange={handleChange} autoComplete="off" placeholder="Correo electrónico" className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-100 focus:border-gray-300 text-sm" />
                        
                            {errors["email"] && <ErrorView message={errors["email"]} />}
                        </div>

                        <div className="col-span-6 sm:col-span-3 space-y-2">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Contraseña
                            </label>

                            <input type="password" name="password" id="password" value={user.password} onChange={handleChange} autoComplete="off" placeholder="Contraseña" className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-100 focus:border-gray-300 text-sm" />
                        
                            {errors["password"] && <ErrorView message={errors["password"]} />}
                        </div>

                        <div className="col-span-6 sm:col-span-3 space-y-2">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Vendedor
                            </label>

                            <Select
                                isClearable
                                styles={{ menu: base => ({ ...base, fontSize: '0.875rem' }) }}
                                className="block max-w-lg w-full shadow-sm text-sm"
                                menuPortalTarget={document.body} 
                                menuPosition="fixed"
                                isSearchable={true}
                                menuShouldBlockScroll={true}
                                name="SalesRep_id"
                                value={optionSelected}
                                placeholder="Seleccionar"
                                noOptionsMessage={inputValue =>  "No se encuentran opciones"}
                                onChange={event => handleChangeSelect2("SalesRep_id", event)}
                                options={represents}
                                theme={theme => ({
                                    ...theme,
                                    fontSize: 8,
                                    borderRadius: 7,
                                    colors: {
                                        ...theme.colors,
                                        primary: '#A3A3A3',
                                        primary25: 'skyblue'
                                    },
                                })}
                            />
                        </div>

                        <div className="col-span-6 sm:col-span-3 space-y-2">
                            <ToggleButton 
                                canSee={true}
                                name="type_user"
                                value={user.type_user}
                                text="Administrador"
                                onClick={handleToggle}
                            />
                        </div>

                        <div className="col-span-6 sm:col-span-3 space-y-2">
                            <ToggleButton 
                                canSee={true}
                                name="enter_price"
                                value={user.enter_price}
                                text="Digitar precio"
                                onClick={handleToggle}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserCreate