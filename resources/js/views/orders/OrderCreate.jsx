import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { Button } from "@windmill/react-ui"
import { PlusIcon, MinusIcon } from '@heroicons/react/solid'
import { SearchIcon } from "@heroicons/react/outline"
import Select from 'react-select'
import DataTable from 'react-data-table-component'
import Cleave from 'cleave.js/react'
import axios from "axios"

import { BreadCrumb } from "../../components/BreadCrumbs/BreadCrumb"
import { Title } from "../../components/Typography/Title"
import { ErrorView } from "../../components/Typography/ErrorView"
import { Alert } from "../../components/notifications/Alert"
import { WhithoutRecordView } from "../../components/Typography/WhithoutRecordsView"
import { Modal } from "./Modal"

import { validateForm, validateStep1, validateStep2, validateStep3 } from "../../validations/OrderCreate.form.validations"

import * as utils from "../../services/utilities"
import * as constants from "../../constants/Order"
import * as defaults from "../../constants/DefaultAlert"
import * as styles from "../../constants/TableStyles"

const OrderCreate = () => {
    const [data, setData] = useState(constants.data)
    const [order, setOrder] = useState(constants.initialOrder)
    const [errors, setErrors] = useState({})

    const [step, setStep] = useState(1)
    const [modalVisible, setModalVisible] = useState(false)
    const [search, setSearch] = useState("")
    const [productTemp, setProductTemp] = useState(constants.tempProduct)
    const [showInputPrice, setShowInputPrice] = useState(false)
    const [pressRadio, setPressRadio] = useState(constants.defaultRadio)
    const [modalErrors, setModalErrors] = useState({})

    const history = useHistory()

    const optionSelected = order.CustomerID ? data.customers.find(option => option.value === order.CustomerID) : null

    const filteredProducts = data.products.filter(item => item.Description && item.Description.toLowerCase().includes(search.toLowerCase()))

    useEffect(() => {
        axios.get('/api/transactions/related-data')
        .then(response => {
            setData(prevState => ({
                ...prevState,
                customers: response.data.customers,
                products: response.data.products,
                enterPrice: response.data.enterPrice
            }))

            setOrder(prevState => ({
                ...prevState,
                SalesRepID: response.data.SalesRepID ? parseInt(response.data.SalesRepID) : null
            }))
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
            [name]: event ? event.value : null,
            HoldComment: event ? `${event.customText2}/${event.label}/${order.paymentMethod}` : ""
        }))
    }

    const handlePaymentMethod = method => {
        setOrder(prevState => ({
            ...prevState,
            paymentMethod: method,
            HoldComment: optionSelected ? `${optionSelected.customText2}/${optionSelected.label}/${method}` : ""
        }))
    }

    const handleRowClicked = row => {
        setProductTemp(prevState => ({
            ...prevState,
            ID: row.ID,
            Description: row.Description
        }))
    }

    const decrement = () => {
        setProductTemp(prevState => ({
            ...prevState,
            QuantityPurchased: parseInt(prevState.QuantityPurchased) > 0 ? parseInt(prevState.QuantityPurchased) - 1 : 0
        }))
    }

    const handleChangeQuantity = event => {
        const { value } = event.target
        let newValue = value

        if (value != "") {
            newValue = parseInt(value)
        }

        setProductTemp(prevState => ({
            ...prevState,
            QuantityPurchased: newValue
        }))
    }

    const increment = () => {
        setProductTemp(prevState => ({
            ...prevState,
            QuantityPurchased: parseInt(prevState.QuantityPurchased) + 1 
        }))
    }

    const handleChangeRadio = event => {
        const { value, id } = event.currentTarget

        Object.entries(pressRadio).map(([key, value]) => {
            setPressRadio(prevState => ({
                ...prevState,
                [key]: key === id ? true : false
            }))
        })

        if (value === "digit") {
            setShowInputPrice(true)
        } else {
            setShowInputPrice(false)

            setProductTemp(prevState => ({
                ...prevState,
                Price: parseFloat(value),
                Total: prevState.QuantityPurchased * parseFloat(value)
            }))
        }
    }

    const handleInputPrice = event => {
        const { value } = event.target

        let price = value != "" ? parseFloat(value) : 0

        setProductTemp(prevState => ({
            ...prevState,
            Price: price,
            Total: prevState.QuantityPurchased * price
        }))
    }

    const modalViews = () => {
        switch (step) {
            case 1:
                return (
                    <div className="py-4 px-4 space-y-3">
                        <div className="relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <SearchIcon className="h-4 w-4 text-gray-400" />
                            </div>

                            <input type="text" name="search" onChange={event => setSearch(event.target.value)} placeholder="Buscar..." className="pl-10 h-9  block w-full shadow-sm text-xs rounded-md border border-gray-300" />
                        </div>

                        <div className="overflow-y-auto h-72 rounded-md shadow-md border border-gray-200">
                            <DataTable
                                responsive={true}
                                customStyles={styles.customStyle}
                                loading={false}
                                fixedHeader={true}
                                persistTableHead={true}
                                highlightOnHover={true}
                                selectableRowsHighlight
                                columns={constants.columnsProduct}
                                noDataComponent={<WhithoutRecordView text="No hay datos disponibles" />}
                                data={filteredProducts}
                                onRowClicked={handleRowClicked}
                            />
                        </div>

                        {modalErrors["selectedProduct"] && <ErrorView message={modalErrors["selectedProduct"]} />}
                    </div>
                )

            case 2: 
                return (
                    <div className="py-8 px-4 space-y-3">
                        <div className="relative">
                            <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                                <button onClick={() => decrement()} className="flex items-center justify-center bg-gray-300  h-full w-20 rounded-l cursor-pointer outline-none">
                                    <MinusIcon  className="h-5 w-5 text-white" />
                                </button>

                                <input type="number" name="QuantityPurchased" value={productTemp.QuantityPurchased} onChange={handleChangeQuantity} className="text-center w-full bg-white font-semibold text-lg text-gray-700 outline-none border-t border-b border-gray-300" />
                                
                                <button onClick={() => increment()} className="flex items-center justify-center bg-gray-300 h-full w-20 rounded-r cursor-pointer outline-none">
                                    <PlusIcon  className="h-5 w-5 text-white" />
                                </button>
                            </div>

                            {modalErrors["QuantityPurchased"] && <ErrorView message={modalErrors["QuantityPurchased"]} />}
                        </div>
                    </div>
                )

            case 3:
                const product = productTemp.ID ? data.products.find(item => item.ID === productTemp.ID) : null
                    
                return (
                    <div className="py-6 px-6 space-y-3">
                        <div className="block">
                            <div className="space-y-2">
                                <div className="flex flex-row space-x-3">
                                    <label className="w-4/6 flex items-center space-x-3">
                                        <input type="radio" name="price" id="Price" value={product ? product.Price : 0} onChange={handleChangeRadio} className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
                                        <span className="text-sm font-medium text-gray-500">
                                            Precio principal
                                        </span>
                                    </label>

                                    <div className="flex justify-between items-center w-2/6 py-1 px-2 bg-gray-50 rounded-md shadow-md border border-gray-200">
                                        <span className="text-sm font-bold text-gray-600">
                                            L.
                                        </span>
                                        <span className="text-sm font-semibold text-gray-500">
                                            {product ? product.Price : 0}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-row space-x-3">
                                    <label className="w-4/6 flex items-center space-x-3">
                                        <input type="radio" name="price" id="PriceA" value={product ? product.PriceA : 0} onChange={handleChangeRadio} className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
                                        <span className="text-sm font-medium text-gray-500">
                                            Precio A
                                        </span>
                                    </label>

                                    <div className="flex justify-between items-center w-2/6 py-1 px-2 bg-gray-50 rounded-md shadow-md border border-gray-200">
                                        <span className="text-sm font-bold text-gray-600">
                                            L.
                                        </span>
                                        <span className="text-sm font-semibold text-gray-500">
                                            {product ? product.PriceA : 0}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-row space-x-3">
                                    <label className="w-4/6 flex items-center space-x-3">
                                        <input type="radio" name="price" id="PriceB" value={product ? product.PriceB : 0} onChange={handleChangeRadio} className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
                                        <span className="text-sm font-medium text-gray-500">
                                            Precio B
                                        </span>
                                    </label>

                                    <div className="flex justify-between items-center w-2/6 py-1 px-2 bg-gray-50 rounded-md shadow-md border border-gray-200">
                                        <span className="text-sm font-bold text-gray-600">
                                            L.
                                        </span>
                                        <span className="text-sm font-semibold text-gray-500">
                                            {product ? product.PriceB : 0}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-row space-x-3">
                                    <label className="w-4/6 flex items-center space-x-3">
                                        <input type="radio" name="price" id="PriceC" value={product ? product.PriceC : 0} onChange={handleChangeRadio} className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
                                        <span className="text-sm font-medium text-gray-500">
                                            Precio C
                                        </span>
                                    </label>

                                    <div className="flex justify-between items-center w-2/6 py-1 px-2 bg-gray-50 rounded-md shadow-md border border-gray-200">
                                        <span className="text-sm font-bold text-gray-600">
                                            L.
                                        </span>
                                        <span className="text-sm font-semibold text-gray-500">
                                            {product ? product.PriceC : 0}
                                        </span>
                                    </div>
                                </div>
                                { data.enterPrice ? (
                                    <div className="space-y-3">
                                        <label className="flex items-center space-x-3">
                                            <input type="radio" name="price" id="Digit" value="digit" onChange={handleChangeRadio} className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
                                            <span className="text-sm font-medium text-gray-500">
                                                Digitar precio
                                            </span>
                                        </label>

                                        { showInputPrice ? (
                                            <div className="relative">
                                                <div className="absolute inset-y-0 px-3 flex items-center pointer-events-none border-r">
                                                    <span className="text-sm text-gray-500">
                                                        L.
                                                    </span>
                                                </div>

                                                <Cleave 
                                                    className="appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-100 focus:border-gray-300 text-sm text-right"
                                                    name="Price"
                                                    placeholder="Digitar precio"
                                                    options={{
                                                        numeral: true,
                                                        numeralThousandsGroupStyle: 'thousand',
                                                        numeralPositiveOnly: true,
                                                        numeralDecimalScale: 8
                                                    }} 
                                                    onChange={handleInputPrice}
                                                />
                                            </div>
                                        ) : (null)}

                                        {modalErrors["price"] && <ErrorView message={modalErrors["price"]} />}
                                    </div>
                                ) : (null)}
                            </div>

                            {modalErrors["selectedPrice"] && <ErrorView message={modalErrors["selectedPrice"]} />}
                        </div>
                    </div>
                )
        }
    }

    const confirmActionModal = () => {
        if (step === 1) {
            const modalErrors = validateStep1(productTemp)

            setModalErrors(modalErrors)

            if (!Object.keys(modalErrors).length) {
                setStep(2)
            } else {
                Alert({
                    action: "Error",
                    message: "Es necesario seleccionar un producto de la lista."
                })
            }
        }

        if (step === 2) {
            const modalErrors = validateStep2(productTemp)

            setModalErrors(modalErrors)

            if (!Object.keys(modalErrors).length) {
                setStep(3)
            } else {
                Alert({
                    action: "Error",
                    message: "Es necesario agregar la cantidad de producto."
                })
            }
        }

        if (step === 3) {
            const modalErrors = validateStep3(productTemp, pressRadio)

            setModalErrors(modalErrors)

            if (!Object.keys(modalErrors).length) {
                setOrder(prevState => ({
                    ...prevState,
                    products: prevState.products.concat(productTemp)
                }))

                setModalVisible(false)

                setStep(1)

                setProductTemp(constants.tempProduct)
                setShowInputPrice(false)
            } else {
                Alert({
                    action: "Error",
                    message: "Es necesario seleccionar el precio del producto."
                })
            }
        }
    }

    const previusActionModal = () => {
        if (step === 2) {
            setProductTemp(prevState => ({
                ...prevState,
                QuantityPurchased: 0
            }))

            setStep(1)
        }

        if (step === 3) {
            setProductTemp(prevState => ({
                ...prevState,
                Price: 0,
                Total: 0
            }))

            setShowInputPrice(false)

            setStep(2)
        }
    }
    
    const cancelActionModal = event => {
        return new Promise((resolve, reject) => {
            setProductTemp(constants.tempProduct)
            setPressRadio(constants.defaultRadio)
            setStep(1)
            setShowInputPrice(false)
            setErrors({})
            setModalErrors({})
    
            resolve(event)
        })
    }

    const handleDeleteRow = id => {
        setOrder(prevState => ({
            ...prevState,
            products: prevState.products.filter(item => item.ID != id)
        }))
    }

    const handleSubmit = event => {
        event.preventDefault()
    
        const errors = validateForm(order)
    
        setErrors(errors)
    
        if (!Object.keys(errors).length) {
            const formData = new FormData()

            const { paymentMethod, products, ...data } = order

            Object.entries(data).forEach(([key, value]) => {
                formData.append(key, value)
            })

            formData.append('products[]', JSON.stringify(products))

            axios.post('/api/transactions', formData)
                .then(response => {
                    if (response.status == 200) {
                        history.push(`/pedidos/${response.data.orderId}`)

                        Alert(defaults.create)
                    }
                })
                .catch(error => {
                    Alert(defaults.failedCreate)
                })
        } else {
            Alert({
                action: 'Error',
                message: "Es necesario agregar los datos requeridos."
            })
        }
    }

    let totalPedido = order.products.reduce((accum, product) => {
        return accum +  product.Total
    }, 0)

    return (
        <>
            <BreadCrumb
                links={[
                    { path: '/pedidos', name: 'Lista de pedidos' },
                    { path: '', name: 'Crear' }
                ]}
            />

            <div className="flex justify-between mb-4">
                <Title>
                    Pedido
                </Title>
                
                <button onClick={handleSubmit} className="align-bottom inline-flex items-center justify-center cursor-pointer font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-green-600 border border-transparent">
                    CREAR
                </button>
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

                            {errors["CustomerID"] && <ErrorView message={errors["CustomerID"]} />}
                        </div>

                        <div className="col-span-6 sm:col-span-3 space-y-2">
                            <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">
                                Forma de pago
                            </label>

                            <div className="block" id="paymentMethod">
                                <nav className="relative z-0 rounded-lg shadow flex divide-x divide-gray-200">
                                    <a onClick={() => handlePaymentMethod("CONTADO")} className={`${order.paymentMethod === "CONTADO" ? 'bg-gray-300 font-semibold text-gray-900' : 'bg-white text-gray-500'} cursor-pointer rounded-l-lg relative min-w-0 w-1/2 overflow-hidden py-2 px-4 text-sm font-medium text-center focus:z-10 focus:bg-gray-300 active:bg-gray-300`}>
                                        <span className="uppercase">
                                            contado
                                        </span>
                                        <span aria-hidden="true" className={`${order.paymentMethod === "CONTADO" ? 'bg-gray-500' : 'bg-transparent'} absolute inset-x-0 bottom-0 h-0.5`}></span>
                                    </a>

                                    <a onClick={() => handlePaymentMethod("CRÉDITO")} className={`${order.paymentMethod === "CRÉDITO" ? 'bg-gray-300 font-semibold text-gray-900' : 'bg-white text-gray-500'} cursor-pointer rounded-r-lg group relative min-w-0 w-1/2 overflow-hidden py-2 px-4 text-sm font-medium text-center focus:z-10 focus:bg-gray-300 active:bg-gray-300`}>
                                        <span className="uppercase">
                                            crédito
                                        </span>
                                        <span aria-hidden="true" className={`${order.paymentMethod === "CRÉDITO" ? 'bg-gray-500' : 'bg-transparent'} absolute inset-x-0 bottom-0 h-0.5`}></span>
                                    </a>
                                </nav>
                            </div>
                        </div>
                        
                        { order.paymentMethod === "CRÉDITO" ? (
                            <div className="col-span-6 space-y-2">
                                <div className="col-span-1 flex shadow-sm rounded-md">
                                    <div className="flex-shrink-0 flex items-center justify-center w-12 border-t border-l border-b border-gray-200 bg-white text-gray-700 text-sm font-medium rounded-l-md">
                                        L.
                                    </div>
                                    <div className="w-full py-2 px-4 flex flex-col items-end border border-gray-200 bg-white truncate rounded-r-md">
                                        <p className="text-sm uppercase text-gray-400 font-semibold">
                                            crédito disponible
                                        </p>
                                        <p className="font-bold text-gray-700">
                                            {optionSelected ? utils.numberFormat(optionSelected.available) : '0.00'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ) : (null)}

                        <hr className="col-span-6" />

                        <div className="col-span-6 space-y-2">
                            <div className="flex flex-row items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Productos
                                </label>

                                { order.products.length < 12 ? (
                                    <button type="button" onClick={() => setModalVisible(true)} className="inline-flex items-center uppercase px-3 py-2 shadow-xs text-xs font-semibold rounded-md text-gray-600 bg-gray-100 border border-gray-200 focus:outline-none">
                                        agregar
                                        <PlusIcon className="ml-2 -mr-0.5 h-4 w-4" />
                                    </button>
                                ) : (null)}
                            </div>

                            <div className={`${order.products.length > 0 ? 'overflow-y-auto h-auto' : ''} shadow-md rounded-md border border-gray-200`}>
                                <DataTable
                                    responsive={true}
                                    customStyles={styles.customStyle}
                                    loading={false}
                                    columns={constants.columns(handleDeleteRow)}
                                    noDataComponent={<WhithoutRecordView text="No hay datos disponibles" />}
                                    data={order.products}
                                />
                            </div>

                            {errors["products"] && <ErrorView message={errors["products"]} />}

                            <Modal 
                                step={step}
                                canSee={modalVisible}
                                bodyModal={modalViews()}
                                stepsDefault={constants.stepsModal}
                                setShow={setModalVisible}
                                nextAction={confirmActionModal}
                                previousAction={previusActionModal}
                                cancelAction={cancelActionModal}
                            />
                        </div>

                        <hr className="col-span-6" />

                        <div className="col-span-6 space-y-2">
                            <label htmlFor="total" className="block text-sm font-medium text-gray-700">
                                Total
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 px-3 flex items-center pointer-events-none border-r">
                                    <span className="text-sm font-bold text-gray-500">
                                        L.
                                    </span>
                                </div>
                            
                                <input type="text" name="total" id="total" value={utils.numberFormat(totalPedido)} placeholder="0.00" disabled className="text-right appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 text-sm" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrderCreate