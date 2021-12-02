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

import { validateForm } from "../../validations/OrderCreate.form.validations"

import * as constants from "../../constants/Order"

const OrderCreate = () => {
    const [data, setData] = useState(constants.data)
    const [order, setOrder] = useState(constants.initialOrder)

    const history = useHistory()
    const { id } = useParams()

    useEffect(() => {
        axios.get('/api/transactions/related-data', {
            params: {
                userId: id ? id : null
            }
        })
        .then(response => {
            console.log(response.data)

            setData(prevState => ({
                ...prevState,
                customers: response.data.customers
            }))

            /*if (response.data.hasOwnProperty('user')) {
                Object.entries(response.data.user).map(([key, value]) => {
                    setUser(prevState => {
                        return {
                            ...prevState,
                            [key]: value,
                        }
                    })
                })
            }*/
        })
        .catch(error => {
            Alert({
                action: 'Error',
                message: "La data relacionada no ha podido ser recopilada."
            })
        })
    }, [])

    const handleChangeSelect2 = (name, event) => {
        setOrder(prevState => ({
            ...prevState,
            [name]: event ? event.value : null
        }))
    }

    const actionText = id ? "GUARDAR" : "CREAR"
    const optionSelected = order.CustomerID ? data.customers.find(option => option.value == order.CustomerID) : null

    return (
        <>
            <BreadCrumb
                links={[
                    { path: '/pedidos', name: 'Lista de pedidos' },
                    { path: '', name: `${id ? 'Editar' : 'Crear'}` }
                ]}
            />

            <div className="flex justify-between mb-4">
                <Title>
                    Pedidos
                </Title>
                
                <Button onClick={() => {}}>
                    {actionText}
                </Button>
            </div>

            <div className="my-6 p-6 flex flex-col bg-white shadow-lg rounded-lg space-y-2">
                <div className="md:mt-0 md:col-span-2">
                    <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3 space-y-2">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Cliente
                            </label>

                            <Select
                                isClearable
                                styles={{ menu: base => ({ ...base, fontSize: '0.875rem' }) }}
                                className="block max-w-lg w-full shadow-sm text-sm"
                                menuPortalTarget={document.body} 
                                menuPosition="fixed"
                                isSearchable={true}
                                menuShouldBlockScroll={true}
                                name="CustomerID"
                                value={optionSelected}
                                placeholder="Seleccionar"
                                noOptionsMessage={inputValue =>  "No se encuentran opciones"}
                                onChange={event => handleChangeSelect2("CustomerID", event)}
                                options={data.customers}
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

                        {/* TOOGLE FORMA DE PAGO */}

                        {/* INPUT CREDITO DISPONIBLE, SI FORMA DE PAGO ES CREDITO */}

                        {/* TABLA DE PRODUCTOS, MUESTRA BOTON PARA AGREGAR PRODUCTOS Y TABLA VACIA */}
                                {/* AQUI HAY UN MODAL CON VARIOS STEPS */}

                        {/* INPUT TOTAL PEDIDO */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrderCreate