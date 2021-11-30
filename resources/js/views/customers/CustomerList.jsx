import axios from "axios";
import React, { useEffect, useState } from "react"
import DataTable from 'react-data-table-component';
import custumerTableConstant from "../../constants/tables/custumerTableConstant";
import customStyles from "../../constants/dataTableStyles";
import PageTitle from "../../components/Typography/PageTitle"
import { SearchInputList } from "../../components/Fields/SearchInputList"

const CustomerList = () => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [filterButttons, setFiltetButtons] = useState(false)

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

                <SearchInputList canSee={true} onChange={handleSearch} />
                {filterButttons && (
                    <>
                        <button onClick={() => { }} aria-haspopup="true" className="ml-2 shadow mr-2 align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-indigo-600 border border-transparent active:bg-indigo-600 hover:bg-indigo-700 focus:ring focus:ring-indigo-300"  >
                            <TrashIcon className="h-6 w-6" />
                        </button>

                    </>
                )}
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