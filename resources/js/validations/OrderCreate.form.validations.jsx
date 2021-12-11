export const validateForm = values => {
    const errors = {}

    if (!values.CustomerID) {
        errors.CustomerID = "Es necesario seleccionar el cliente."
    }

    if (values.products.length === 0) {
        errors.products = "Es necesario agregar productos."
    }

    return errors
}

export const validateToggle = values => {
    
    if (values.CustomerID) {
        return true
    }

    return false
}

export const validateStep1 = values => {
    const errors = {}

    if (!values.ID && values.Description === "") {
        errors.selectedProduct = "Es necesario seleccionar un producto de la lista."
    }

    return errors
}

export const validateStep2 = values => {
    const errors = {}

    if (values.QuantityPurchased === "" || values.QuantityPurchased === 0) {
        errors.QuantityPurchased = "Es necesario agregar la cantidad de producto."
    }

    return errors
}

export const validateStep3 = (values, radios) => {
    const errors = {}

    let selecciono = Object.entries(radios).map(([key, value]) => {
        return value
    })

    if (!selecciono.includes(true)) {
        errors.selectedPrice = "Es necesario seleccionar el precio del producto."
    }

    if (values.Price === 0 && radios.Digit) {
        errors.price = "Es necesario digitar el precio del producto."
    }

    return errors
}