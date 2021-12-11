import React, { useEffect, useState } from "react"
import DataTable from 'react-data-table-component'
import { Link } from "react-router-dom"
import axios from "axios"

import { BreadCrumb } from "../../components/BreadCrumbs/BreadCrumb"
import { Title } from "../../components/Typography/Title"
import { InputSearch } from "../../components/Fields/InputSearch"
import { Alert } from "../../components/notifications/Alert"
import { WhithoutRecordView } from "../../components/Typography/WhithoutRecordsView"

import * as constants from "../../constants/indexes/Order"
import * as styles from "../../constants/TableStyles"

const OrderList = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        axios.get('/api/transactions')
        .then((res) => {
            setData(res.data.data)
        })
        .catch(error => {
            Alert({
                action: 'Error',
                message: "Error al obtener los datos de pedidos."
            })
        })
    }, [])

    const handleSearch = (event) => {
        setLoading(true)

        axios.get(`/api/transactions?CustomerID[like]=%${event.target.value}%`)
        .then(res => {
            setData(res.data.data)
            setLoading(false)
        })
        .catch(error => {
            Alert({
                action: 'Error',
                message: "Error al realizar la busqueda en pedidos."
            })
        })
    }

    return (
        <>
            <BreadCrumb 
                links={[
                    { path: '/inicio', name: 'Inicio' },
                    { path: '', name: 'Lista de pedidos' }
                ]} 
            />

            <div className="mt-6 flex flex-col space-y-6 sm:flex-row sm:justify-between sm:items-center">
                <div className="flex sm:flex-col justify-between items-center sm:items-stretch">
                    <Title>
                        Pedidos
                    </Title>

                    <Link to="/pedidos/crear" className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-indigo-600 border border-transparent active:bg-indigo-600 hover:bg-indigo-700 focus:ring focus:ring-indigo-300">
                        CREAR
                    </Link>
                </div>

                <InputSearch canSee={true} onChange={handleSearch} />
            </div>

            <div className="mt-8 shadow-md overflow-hidden rounded-xl">
                <DataTable
                    responsive={true}
                    customStyles={styles.customStyle}
                    defaultSortFieldId="customerId"
                    loading={loading}
                    columns={constants.columns}
                    noDataComponent={<WhithoutRecordView />}
                    data={data}
                    pagination
                />
            </div>
        </>
    )
}

export default OrderList