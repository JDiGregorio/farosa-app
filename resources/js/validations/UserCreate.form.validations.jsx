export const validateForm = values => {
    const errors = {}

    if (values.name === "") {
        errors.name = "Es necesario agregar el nombre."
    }

    if (values.username === "") {
        errors.username = "Es necesario agregar el usuario."
    }

    if (values.email === "") {
        errors.email = "Es necesario agregar el correo electrónico."
    }

    if (!values.hasOwnProperty('id')) {
        if (values.password === "") {
            errors.password = "Es necesario agregar la contraseña."
        }
    }

    return errors
}