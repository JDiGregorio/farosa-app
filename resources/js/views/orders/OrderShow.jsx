import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import DataTable from 'react-data-table-component'
import axios from "axios"
import moment from "moment"

import { BreadCrumb } from "../../components/BreadCrumbs/BreadCrumb"
import { Alert } from "../../components/notifications/Alert"
import { WhithoutRecordView } from "../../components/Typography/WhithoutRecordsView"

import * as utils from "../../services/utilities"
import * as constants from "../../constants/Order"
import * as styles from "../../constants/TableStyles"

const OrderShow = () => {
    const [order, setOrder] = useState(constants.orderShow)
    const { id } = useParams()

    useEffect(() => {
        axios.get(`/api/transactions/${id}`)
        .then((response) => {
            if (response.status === 200) {
                setOrder(response.data.data)
            }
        })
        .catch(error => {
            Alert({
                action: 'Error',
                message: "Error al obtener los datos del pedido."
            })
        })
    }, [])

    const paymentMethod = order.holdComment ? order.holdComment.split("/")[2] : null

    let totalPedido = order.products.reduce((accum, product) => {
        let total = product.QuantityPurchased * product.Price
        return accum + total
    }, 0)

    return (
        <>
            <BreadCrumb 
                links={[
                    { path: '/pedidos', name: 'Lista de pedidos' },
                    { path: '', name: 'Vista previa' }
                ]} 
            />

            <div className="my-6 grid grid-cols-1 gap-6">
                <div className="relative rounded-lg border border-gray-200 bg-white px-6 py-5 shadow-lg flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                    <div className="w-full flex justify-between">
                        <p className="text-sm font-semibold text-gray-700 truncate">
                            {order.customer}
                        </p>
                    </div>
                </div>

                <div className="bg-white shadow-lg overflow-hidden border border-gray-200 rounded-lg">
                    <dl>
                        <div className="bg-gray-50 px-4 py-5 grid grid-cols-2 gap-4 px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Cliente
                            </dt>
                            <dd className="text-sm text-gray-900 text-right mt-0">
                                {order.customer}
                            </dd>
                        </div>
                        <div className="bg-white px-4 py-5 grid grid-cols-2 gap-4 px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Fecha
                            </dt>
                            <dd className="text-sm text-gray-900 text-right mt-0">
                                {moment(order.date).format("d/m/Y")}
                            </dd>
                        </div>
                    </dl>
                </div>

                <div className="bg-white shadow-lg overflow-hidden border border-gray-200 rounded-lg">
                    <dl>
                        <div className="bg-gray-50 px-4 py-5 grid grid-cols-2 gap-4 px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Forma de pago
                            </dt>
                            <dd className="text-sm text-gray-900 text-right mt-0">
                                {paymentMethod ? paymentMethod : "-"}
                            </dd>
                        </div>
                        { paymentMethod && paymentMethod === "CRÉDITO" ? (
                            <div className="bg-white px-4 py-5 grid grid-cols-2 gap-4 px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    Crédito disponible
                                </dt>
                                <dd className="text-sm text-gray-900 text-right mt-0">
                                    L. {utils.numberFormat(order.available)}
                                </dd>
                            </div>
                        ) : (null)}
                    </dl>
                </div>

                <div className="relative">
                    <label className="text-sm text-gray-500 font-semibold">
                        Productos
                    </label>
                </div>

                <div className="overflow-y-auto h-auto bg-white shadow-lg border border-gray-200 rounded-lg">
                    <DataTable
                        responsive={true}
                        customStyles={styles.customStyle}
                        loading={false}
                        fixedHeader={true}
                        persistTableHead={true}
                        columns={constants.columnsProductView}
                        data={order.products}
                        noDataComponent={<WhithoutRecordView text="No hay datos disponibles" />}
                    />
                </div>

                <div className="bg-white shadow-lg overflow-hidden border border-gray-200 rounded-lg">
                    <dl>
                        <div className="bg-white px-4 py-5 grid grid-cols-2 gap-4 px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Total
                            </dt>
                            <dd className="text-sm text-gray-900 text-right mt-0">
                                L. {utils.numberFormat(totalPedido)}
                            </dd>
                        </div>
                    </dl>
                </div>

                <div className="bg-white shadow-lg overflow-hidden border border-gray-200 rounded-lg">
                    <dl>
                        <div className="bg-white px-4 py-5 grid grid-cols-2 gap-4 px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Detalle de pedido
                            </dt>
                            <dd className="text-sm text-gray-900 col-span-2 mt-0">
                                L. {order.holdComment}
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </>
    )
}

export default OrderShow