import React, { useEffect, useState } from "react"
import DataTable from 'react-data-table-component'
import axios from "axios"

import { BreadCrumb } from "../../components/BreadCrumbs/BreadCrumb"
import { Title } from "../../components/Typography/Title"
import { InputSearch } from "../../components/Fields/InputSearch"

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
            console.log(error)
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
            console.log(error)
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
                <Title>
                    Pedidos
                </Title>

                <InputSearch canSee={true} onChange={handleSearch} />
            </div>

            <div className="mt-8 shadow-md overflow-hidden rounded-xl">
                <DataTable
                    responsive={true}
                    customStyles={styles.customStyle}
                    defaultSortFieldId="customerId"
                    loading={loading}
                    columns={constants.columns}
                    data={data}
                    pagination
                />
            </div>
        </>
    )
}

export default OrderList