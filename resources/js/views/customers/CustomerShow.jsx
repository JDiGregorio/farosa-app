import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"

import { BreadCrumb } from "../../components/BreadCrumbs/BreadCrumb"
import { Alert } from "../../components/notifications/Alert"

import * as constants from "../../constants/Customer"

const CustomerShow = () => {
    const [customer, setCustomer] = useState(constants.customerShow)
    const { id } = useParams()

    useEffect(() => {
        axios.get(`/api/customer/${id}`)
        .then((response) => {
            if (response.status === 200) {
                setCustomer(response.data.data)
            }
        })
        .catch(error => {
            Alert({
                action: 'Error',
                message: "Error al obtener los datos del cliente."
            })
        })
    }, [])

    return (
        <>
            <BreadCrumb 
                links={[
                    { path: '/clientes', name: 'Lista de clientes' },
                    { path: '', name: 'Vista previa' }
                ]} 
            />

            <div className="my-6 grid grid-cols-1 gap-6">
                <div className="relative rounded-lg border border-gray-200 bg-white px-6 py-5 shadow-lg flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                    <div className="w-full flex justify-between">
                        <p className="text-sm font-semibold text-gray-700 truncate">
                            {customer.firstName}
                        </p>
                        <p className="text-sm font-medium text-gray-500 truncate">
                            {customer.accountNumber}
                        </p>
                    </div>
                </div>

                <div className="bg-white shadow-lg overflow-hidden border border-gray-200 rounded-lg">
                    <dl>
                        <div className="bg-gray-50 px-4 py-5 grid grid-cols-2 gap-4 px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Código
                            </dt>
                            <dd className="text-sm text-gray-900 text-right mt-0">
                                {customer.accountNumber}
                            </dd>
                        </div>
                        <div className="bg-white px-4 py-5 grid grid-cols-2 gap-4 px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Nombre
                            </dt>
                            <dd className="text-sm text-gray-900 text-right mt-0">
                                {customer.firstName}
                            </dd>
                        </div>
                    </dl>
                </div>

                <div className="bg-white shadow-lg overflow-hidden border border-gray-200 rounded-lg">
                    <dl>
                        <div className="bg-gray-50 px-4 py-5 grid grid-cols-2 gap-4 px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Cuenta por pagar
                            </dt>
                            <dd className="text-sm text-gray-900 text-right mt-0">
                                {customer.accountBalance}
                            </dd>
                        </div>
                        <div className="bg-white px-4 py-5 grid grid-cols-2 gap-4 px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Limite
                            </dt>
                            <dd className="text-sm text-gray-900 text-right mt-0">
                                {customer.creditLimit}
                            </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 grid grid-cols-2 gap-4 px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Disponible
                            </dt>
                            <dd className="text-sm text-gray-900 text-right mt-0">
                                {customer.available}
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </>
    )
}

export default CustomerShow