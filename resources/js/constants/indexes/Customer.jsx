import { EyeIcon } from "@heroicons/react/outline"
import { Link } from "react-router-dom"

export const columns = [
    {
        name: 'Código',
        selector: row => row.accountNumber,
        sortable: true
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
                    {
                        <Link to={`/clientes/${row.id}`} className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-3 py-1 rounded-md text-sm text-gray-600 focus:outline-none border border-transparent active:bg-transparent hover:bg-gray-100 focus:ring focus:ring-indigo-300">
                            <EyeIcon className="w-5 h-5" aria-hidden="true" />
                        </Link>
                    }
                </div>
            )
        } 
    }
]