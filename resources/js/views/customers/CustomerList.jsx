import React, { useEffect, useState } from "react"
import DataTable from 'react-data-table-component'
import axios from "axios"

import { BreadCrumb } from "../../components/BreadCrumbs/BreadCrumb"
import { Title } from "../../components/Typography/Title"
import { InputSearch } from "../../components/Fields/InputSearch"

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
            console.log(error)
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
            console.log(error)
        })
    }

    const handlePerRowsChange = (currentRowsPerPage, currentPage) => {
        setLoading(true)

        axios.get(`/api/customer?page=${currentPage}&perpage=${currentRowsPerPage}`)
        .then(res => {
            setData(res.data.data)
            setLoading(false)
        })
        .catch(error => {
            console.log(error)
        })
    }

    const handleSort = (column, sortDirection) => {
        setLoading(true)

        axios.get(`/api/customer?page=${actualPage}&f_params[orderBy][field]=${column.name}&f_params[orderBy][type]=${sortDirection}`)
        .then(res => {
            setData(res.data.data)
            setLoading(false)
        })
        .catch(error => {
            console.log(error)
        })
    }

    const handlePageChange = (page) => {
        setLoading(true)
        setActualPage(page)

        axios.get(`/api/customer?page=${page}`)
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
                    loading={loading}
                    columns={constants.columns}
                    data={data}
                    pagination
                    paginationServer
                    sortServer
                    paginationTotalRows={10}
                    handleSearch={handleSearch}
                    onSort={handleSort}
                    onChangeRowsPerPage={handlePerRowsChange}
                    onChangePage={handlePageChange}
                />
            </div>
        </>
    )
}

export default CustomerList