import React, { useEffect, useState } from "react"
import DataTable from 'react-data-table-component'
import axios from "axios"

import { BreadCrumb } from "../../components/BreadCrumbs/BreadCrumb"
import { Title } from "../../components/Typography/Title"
import { InputSearch } from "../../components/Fields/InputSearch"
import { Alert } from "../../components/notifications/Alert"
import { WhithoutRecordView } from "../../components/Typography/WhithoutRecordsView"

import * as constants from "../../constants/indexes/Customer"
import * as styles from "../../constants/TableStyles"

const CustomerList = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        axios.get('/api/customer')
        .then((res) => {
            setData(res.data.data)
        })
        .catch(error => {
            Alert({
                action: 'Error',
                message: "Error al obtener los datos de clientes."
            })
        })
    }, [])

    const handleSearch = (event) => {
        setLoading(true)

        axios.get(`/api/customer?FirstName[like]=%${event.target.value}%`)
        .then(res => {
            setData(res.data.data)
            setLoading(false)
        })
        .catch(error => {
            Alert({
                action: 'Error',
                message: "Error al realizar la busqueda."
            })
        })
    }

    return (
        <>
            <BreadCrumb 
                links={[
                    { path: '/inicio', name: 'Inicio' },
                    { path: '', name: 'Lista de clientes' }
                ]} 
            />

            <div className="mt-6 flex flex-col space-y-6 sm:flex-row sm:justify-between sm:items-center">
                <Title>
                    Clientes
                </Title>

                <InputSearch canSee={true} onChange={handleSearch} />
            </div>

            <div className="mt-8 shadow-md overflow-hidden rounded-xl">
                <DataTable
                    responsive={true}
                    customStyles={styles.customStyle}
                    defaultSortFieldId="firstName"
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

export default CustomerList