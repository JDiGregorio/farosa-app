import { TrashIcon } from "@heroicons/react/outline"

export const data = {
    customers: [],
    products: [],
    enterPrice: false
}

export const initialOrder = {
    SalesRepID: null,
    CustomerID: null,
    paymentMethod: "CONTADO",
    HoldComment: "",
    products: []
}

export const tempProduct = { 
    ID: null,
    Description: "",
    QuantityPurchased: 0,
    Price: 0,
    Total: 0
}

export const stepsModal = {
    1: {
        step: 1,
        title: "seleccionar producto",
        instructions: "Debe seleccionar un producto del listado.",
        canSeePrevious: false,
        canSeeNext: true,
        previousTitle: "Anterior",
        nextTitle: "Siguiente"
    },
    2: {
        step: 2,
        title: "ingresar cantidad",
        instructions: "Debe ingresar la cantidad del producto.",
        canSeePrevious: true,
        canSeeNext: true,
        previousTitle: "Anterior",
        nextTitle: "Siguiente"
    },
    3: {
        step: 3,
        title: "seleccionar precio",
        instructions: "Debe seleccionar el precio del producto.",
        canSeePrevious: true,
        canSeeNext: true,
        previousTitle: "Anterior",
        nextTitle: "Finalizar"
    }
}

export const defaultRadio = {
    Digit: false,
    Price: false,
    PriceA: false,
    PriceB: false,
    PriceC: false
}

export const columns = handleDeleteRow => [
    {
        name: 'Descripción',
        selector: row => row.Description,
        sortable: false
    },
    {
        name: 'Qty',
        selector: row => row.QuantityPurchased,
        sortable: false
    },
    {
        name: 'Precio u.',
        selector: row => row.Price,
        sortable: false
    },
    {
        name: 'Total',
        selector: row => row.Total,
        sortable: false
    },
    {
        name: 'Acciones',
        id: 'acciones',
        sortable: false,
        cell: (row, index, column, id) => {
            return (
                <div className="flex justify-center items-center">
                    <button onClick={() => handleDeleteRow(row.ID)} className="align-bottom inline-flex items-center justify-center cursor-pointer px-3 py-1 rounded-md focus:outline-none active:bg-transparent">
                        <TrashIcon className="w-5 h-5 text-red-800" aria-hidden="true" />
                    </button>
                </div>
            )
        } 
    }
]

export const columnsProduct = [
    {
        name: 'Descripción',
        selector: row => row.Description,
        sortable: false,
        width: '60%'
    },
    {
        name: 'Código',
        selector: row => row.ItemLookupCode,
        sortable: false,
        width: '40%'
    }
]

export const orderShow = {
    customer: "",
    date: "",
    holdComment: null,
    available: 0.00,
    products: []
}

export const columnsProductView = [
    {
        name: 'Descripción',
        selector: row => row.Description,
        sortable: false
    },
    {
        name: 'Qty',
        selector: row => row.QuantityPurchased,
        sortable: false
    },
    {
        name: 'Precio',
        selector: row => row.Price,
        sortable: false
    },
    {
        name: 'Total',
        selector: row => (row.QuantityPurchased * row.Price),
        sortable: false
    },
]