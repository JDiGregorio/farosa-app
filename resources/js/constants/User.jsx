export const initialUser = {
    name: "",
    username: "",
    email: "",
    password: "",
    SalesRep_id: null,
    type_user: false,
    enter_price: false
}

export const create = {
    action: "Success",
    message: "El elemento ha sido añadido de manera correcta."
}

export const edit = {
    action: "Success",
    message: "El elemento ha sido modificado de manera correcta."
}

export const failedCreate = {
    action: "Error",
    message: "Ha ocurrido un error. No se pudo añadir el elemento."
}

export const failedEdit = {
    action: "Error",
    message: "Ha ocurrido un error. No se pudo modificar el elemento."
}