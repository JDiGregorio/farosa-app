import React, { useEffect, useState } from "react"
import DataTable from 'react-data-table-component'
import { Link } from "react-router-dom"
import axios from "axios"

import { BreadCrumb } from "../../components/BreadCrumbs/BreadCrumb"
import { Title } from "../../components/Typography/Title"
import { InputSearch } from "../../components/Fields/InputSearch"

import * as constants from "../../constants/indexes/User"
import * as styles from "../../constants/TableStyles"

const UserList = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        axios.get('/api/users')
        .then((res) => {
            setData(res.data.data)
        })
        .catch(error => {
            console.log(error)
        })
    }, [])

    const handleSearch = (event) => {
        setLoading(true)

        axios.get(`/api/users?name[like]=%${event.target.value}%`)
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
                    { path: '', name: 'Lista de usuarios' }
                ]} 
            />

            <div className="mt-6 flex flex-col space-y-6 sm:flex-row sm:justify-between sm:items-center">
                <div className="flex sm:flex-col justify-between items-center sm:items-stretch">
                    <Title>
                        Usuarios
                    </Title>

                    <Link to="/usuarios/crear" className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-indigo-600 border border-transparent active:bg-indigo-600 hover:bg-indigo-700 focus:ring focus:ring-indigo-300">
                        CREAR
                    </Link>
                </div>

                <InputSearch canSee={true} onChange={handleSearch} />
            </div>

            <div className="mt-8 shadow-md overflow-hidden rounded-xl">
                <DataTable
                    responsive={true}
                    customStyles={styles.customStyle}
                    defaultSortFieldId="name"
                    loading={loading}
                    columns={constants.columns}
                    data={data}
                    pagination
                />
            </div>
        </>
    )
}

export default UserList