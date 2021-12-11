import { Link } from "react-router-dom"
import { EyeIcon, TrashIcon } from "@heroicons/react/outline"

import { handleDelete } from "../../services/utilities"

export const columns = [
    {
        name: 'Cliente',
        selector: row => row.customerId,
        sortable: false
    },
    {
        name: 'Comentario',
        selector: row => row.holdComment,
        sortable: true
    },
    {
        name: 'Acciones',
        id: 'acciones',
        sortable: false,
        cell: (row, index, column, id) => {
            return (
                <div className="flex justify-center items-center">
                    <Link to={`/pedidos/${row.id}`} className="align-bottom inline-flex items-center justify-center cursor-pointer px-3 py-1 rounded-md focus:outline-none active:bg-transparent">
                        <EyeIcon className="w-5 h-5" aria-hidden="true" />
                    </Link>

                    <button onClick={() => handleDelete("transactions", "pedidos", row.id)} layout="link" className="align-bottom inline-flex items-center justify-center cursor-pointer px-3 py-1 rounded-md focus:outline-none active:bg-transparent">
                        <TrashIcon className="w-5 h-5" aria-hidden="true" />
                    </button>
                </div>
            )
        } 
    }
]