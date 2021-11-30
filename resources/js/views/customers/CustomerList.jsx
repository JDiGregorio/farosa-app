import axios from "axios";
import React, { useEffect, useState } from "react"
import DataTable from 'react-data-table-component';
import custumerTableConstant from "../../constants/tables/custumerTableConstant";
import customStyles from "../../constants/dataTableStyles";
import  PageTitle  from "../../components/Typography/PageTitle"

const CustomerList = () => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        axios.get('/api/customer').then((res) => {
            setData(res.data.data)
        })
    })

    const handlePerRowsChange = (currentRowsPerPage, currentPage) => {
        setLoading(true)
        axios.get(`${endpoint}?page=${currentPage}&perpage=${currentRowsPerPage}`).then(res => {
            setData(res.data.data)
            setLoading(false)
        })
    }

    const handleSearch = (event) => {
        setLoading(true)
        axios.get(`${endpoint}?name[like]=%${event.target.value}%`).then(res => {
            setData(res.data.data)
            setLoading(false)
        })
    }

    const handleSort = (column, sortDirection) => {
        setLoading(true)
        axios.get(`${endpoint}?page=${actualPage}&f_params[orderBy][field]=${column.name}&f_params[orderBy][type]=${sortDirection}`).then(res => {
            setData(res.data.data)
            setLoading(false)
        })
    }

    const handlePageChange = (page) => {
        setLoading(true)
        setActualPage(page)
        axios.get(`${endpoint}?page=${page}`).then(res => {
            setData(res.data.data)
            setLoading(false)
        })
    }

    return (
        <div className="mt-8">
            <div className="flex justify-between items-center">
                <PageTitle>
                    Customers
                </PageTitle>
            </div>
            <div className="shadow-md overflow-hidden rounded-xl mt-8">
                <DataTable
                    columns={custumerTableConstant}
                    data={data}
                    pagination
                    loading={loading}
                    customStyles={customStyles}
                    paginationServer
                    selectableRows
                    sortServer
                    handleSearch={handleSearch}
                    onSort={handleSort}
                    paginationTotalRows={10}
                    onChangeRowsPerPage={handlePerRowsChange}
                    onChangePage={handlePageChange}
                />
            </div>
        </div>
    )
}

export default CustomerList