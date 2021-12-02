import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"

import { BreadCrumb } from "../../components/BreadCrumbs/BreadCrumb"
import { Alert } from "../../components/notifications/Alert"

import * as constants from "../../constants/Product"

const ProductShow = () => {
    const [item, setItem] = useState(constants.productShow)
    const { id } = useParams()

    useEffect(() => {
        axios.get(`/api/items/${id}`)
        .then((response) => {
            if (response.status === 200) {
                setItem(response.data.data)
            }
        })
        .catch(error => {
            Alert({
                action: 'Error',
                message: "Error al obtener los datos del producto."
            })
        })
    }, [])

    return (
        <>
            <BreadCrumb 
                links={[
                    { path: '/productos', name: 'Productos' },
                    { path: '', name: 'Vista previa' }
                ]} 
            />

            <div className="my-6 grid grid-cols-1 gap-6">
                <div className="relative rounded-lg border border-gray-200 bg-white px-6 py-5 shadow-lg flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                    <div className="w-full flex flex-col">
                        <p className="text-sm font-semibold text-gray-700 truncate">
                            {item.description}
                        </p>
                        <p className="text-sm font-medium text-gray-500 truncate">
                            {item.itemLookupCode}
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
                                {item.itemLookupCode}
                            </dd>
                        </div>
                        <div className="bg-white px-4 py-5 grid grid-cols-2 gap-4 px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Descripción
                            </dt>
                            <dd className="text-sm text-gray-900 col-span-2 mt-0">
                                {item.description}
                            </dd>
                        </div>
                    </dl>
                </div>

                <div className="bg-white shadow-lg overflow-hidden border border-gray-200 rounded-lg">
                    <dl>
                        <div className="bg-gray-50 px-4 py-5 grid grid-cols-2 gap-4 px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Precio Principal
                            </dt>
                            <dd className="text-sm text-gray-900 text-right mt-0">
                                {item.price}
                            </dd>
                        </div>
                        <div className="bg-white px-4 py-5 grid grid-cols-2 gap-4 px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Precio A
                            </dt>
                            <dd className="text-sm text-gray-900 text-right mt-0">
                                {item.priceA}
                            </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 grid grid-cols-2 gap-4 px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Precio B
                            </dt>
                            <dd className="text-sm text-gray-900 text-right mt-0">
                                {item.priceB}
                            </dd>
                        </div>
                        <div className="bg-white px-4 py-5 grid grid-cols-2 gap-4 px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Precio C
                            </dt>
                            <dd className="text-sm text-gray-900 text-right mt-0">
                                {item.priceC}
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </>
    )
}

export default ProductShow