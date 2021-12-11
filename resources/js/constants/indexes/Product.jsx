import { Link } from "react-router-dom"
import { EyeIcon } from "@heroicons/react/outline"

export const columns = [
    {
        name: 'Código',
        selector: row => row.itemLookupCode,
        sortable: false
    },
    {
        name: 'Descripción',
        selector: row => row.description,
        sortable: true
    },
    {
        name: 'Stock',
        selector: row => row.quantity,
        sortable: false
    },
    {
        name: 'Acciones',
        id: 'acciones',
        sortable: false,
        cell: (row, index, column, id) => {
            return (
                <div className="flex justify-center items-center">
                    <Link to={`/productos/${row.id}`} className="align-bottom inline-flex items-center justify-center cursor-pointer px-3 py-1 rounded-md focus:outline-none active:bg-transparent">
                        <EyeIcon className="w-5 h-5 text-gray-500" aria-hidden="true" />
                    </Link>
                </div>
            )
        } 
    }
]