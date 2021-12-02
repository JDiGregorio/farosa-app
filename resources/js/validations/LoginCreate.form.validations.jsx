export const validateForm = values => {
    const errors = {}

    if (values.username === "") {
        errors.username = "Es necesario agregar el nombre de usuario."
    }

    if (values.password === "") {
        errors.password = "Es necesario agregar la contraseña."
    }

    return errors
}