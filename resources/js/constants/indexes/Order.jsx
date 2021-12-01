import { Link } from "react-router-dom"
import { EyeIcon } from "@heroicons/react/outline"
import { Button } from "@windmill/react-ui"

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
                    <Link to={`/productos/${row.id}`} className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-3 py-1 rounded-md text-sm text-gray-600 focus:outline-none border border-transparent active:bg-transparent hover:bg-gray-100 focus:ring focus:ring-indigo-300">
                        <EyeIcon className="w-5 h-5" aria-hidden="true" />
                    </Link>

                    <Button onClick={() => console.log(row.id)} layout="link" className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-3 py-1 rounded-md text-sm text-gray-600 dark:text-gray-400 focus:outline-none border border-transparent active:bg-transparent hover:bg-gray-100 focus:ring focus:ring-indigo-300 dark:focus:ring-indigo-800 dark:hover:bg-gray-500 dark:hover:text-gray-300 dark:hover:bg-opacity-10">
                        <TrashIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                </div>
            )
        } 
    }
]