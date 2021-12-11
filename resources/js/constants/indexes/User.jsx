import { Link } from "react-router-dom"
import { PencilAltIcon, TrashIcon } from "@heroicons/react/outline"

import { handleDelete } from "../../services/utilities"

export const columns = [
    {
        name: 'Nombre',
        selector: row => row.name,
        sortable: true
    },
    {
        name: 'Usuario',
        selector: row => row.username,
        sortable: false
    },
    {
        name: 'Acciones',
        id: 'acciones',
        sortable: false,
        cell: (row, index, column, id) => {
            return (
                <div className="flex justify-center items-center">
                    <Link to={`/usuarios/${row.id}/editar`} className="align-bottom inline-flex items-center justify-center cursor-pointer px-3 py-1 rounded-md focus:outline-none active:bg-transparent">
                        <PencilAltIcon className="w-5 h-5 text-gray-500" aria-hidden="true" />
                    </Link>

                    <button onClick={() => handleDelete("users", "usuarios", row.id)} layout="link" className="align-bottom inline-flex items-center justify-center cursor-pointer px-3 py-1 rounded-md focus:outline-none active:bg-transparent">
                        <TrashIcon className="w-5 h-5 text-red-800" aria-hidden="true" />
                    </button>
                </div>
            )
        } 
    }
]