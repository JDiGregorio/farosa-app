import React, { useEffect, useState } from "react"
import DataTable from 'react-data-table-component'
import axios from "axios"

import { BreadCrumb } from "../../components/BreadCrumbs/BreadCrumb"
import { Title } from "../../components/Typography/Title"
import { InputSearch } from "../../components/Fields/InputSearch"
import { Alert } from "../../components/notifications/Alert"
import { WhithoutRecordView } from "../../components/Typography/WhithoutRecordsView"

import * as constants from "../../constants/indexes/Product"
import * as styles from "../../constants/TableStyles"

const ProductList = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        axios.get('/api/items')
        .then((res) => {
            setData(res.data.data)
        })
        .catch(error => {
            Alert({
                action: 'Error',
                message: "Error al obtener los datos de productos."
            })
        })
    }, [])

    const handleSearch = (event) => {
        setLoading(true)

        axios.get(`/api/items?Description[like]=%${event.target.value}%`)
        .then(res => {
            console.log(res.data.data)
            setData(res.data.data)
            setLoading(false)
        })
        .catch(error => {
            Alert({
                action: 'Error',
                message: "Error al realizar la busqueda de productos."
            })
        })
    }

    return (
        <>
            <BreadCrumb 
                links={[
                    { path: '/inicio', name: 'Inicio' },
                    { path: '', name: 'Lista de productos' }
                ]} 
            />

            <div className="mt-6 flex flex-col space-y-6 sm:flex-row sm:justify-between sm:items-center">
                <Title>
                    Productos
                </Title>

                <InputSearch canSee={true} onChange={handleSearch} />
            </div>

            <div className="mt-8 shadow-md overflow-hidden rounded-xl">
                <DataTable
                    responsive={true}
                    customStyles={styles.customStyle}
                    defaultSortFieldId="description"
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

export default ProductList