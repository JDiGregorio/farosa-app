import { Link } from "react-router-dom"
import { EyeIcon } from "@heroicons/react/outline"

export const columns = [
    {
        name: 'Código',
        selector: row => row.accountNumber,
        sortable: false
    },
    {
        name: 'Nombre',
        selector: row => row.firstName,
        sortable: true
    },
    {
        name: 'Acciones',
        id: 'acciones',
        sortable: false,
        cell: (row, index, column, id) => {
            return (
                <div className="flex justify-center items-center">
                    <Link to={`/clientes/${row.id}`} className="align-bottom inline-flex items-center justify-center cursor-pointer px-3 py-1 rounded-md focus:outline-none active:bg-transparent">
                        <EyeIcon className="w-5 h-5" aria-hidden="true" />
                    </Link>
                </div>
            )
        } 
    }
]