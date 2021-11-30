import { Button } from "@windmill/react-ui"
import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";
const endpoint = 'order'
const custumerTableConstant = [
    {
        name: 'ID',
        selector: row => row.ID,
        sortable: true
    },
    {
        name: 'FirstName',
        selector: row => row.FirstName,
        sortable: true
    },

    {
        name: 'CustomText2',
        selector: row => row.CustomText2,
        sortable: true
    },
    {
        name: 'disponible',
        selector: row => row.disponible,
        sortable: true
    },
    {
        name: 'Acciones',
        id: 'acciones',
        cell: (row, index, column, id) => {
            return (
                <div className="flex justify-center items-center">
                    {
                        <Link to={`/customer/${row.id}/show`} className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-3 py-1 rounded-md text-sm text-gray-600 dark:text-gray-400 focus:outline-none border border-transparent active:bg-transparent hover:bg-gray-100 focus:ring focus:ring-indigo-300 dark:focus:ring-indigo-800 dark:hover:bg-gray-500 dark:hover:text-gray-300 dark:hover:bg-opacity-10">
                            <EyeIcon className="w-5 h-5" aria-hidden="true" />
                        </Link>
                    }

                    {
                        <Button onClick={() => { }} layout="link" className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-3 py-1 rounded-md text-sm text-gray-600 dark:text-gray-400 focus:outline-none border border-transparent active:bg-transparent hover:bg-gray-100 focus:ring focus:ring-indigo-300 dark:focus:ring-indigo-800 dark:hover:bg-gray-500 dark:hover:text-gray-300 dark:hover:bg-opacity-10">
                            <TrashIcon className="w-5 h-5" aria-hidden="true" />
                        </Button>
                    }
                </div>
            )
        },
        sortable: false
    }

]

export default custumerTableConstant