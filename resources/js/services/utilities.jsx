import axios from "axios"

import { AlertConfirm } from "../components/notifications/AlertConfirm"
import { Alert } from "../components/notifications/Alert"

export const handleDelete = (module, redirect, id) => {
    AlertConfirm({
        title: 'Eliminación',
        message: '¿Estás seguro de eliminar este registro?',
        acceptButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
        onConfirm: () => {
            axios.delete(`/api/${module}/${id}`)
                .then(response => {
                    if (response.status === 200) {
                        Alert({
                            action: 'Success',
                            message: "El registro ha sido eliminado."
                        })
                        
                        window.location.href = `/${redirect}`
                    }
                })
                .catch(error => {
                    Alert({
                        action: 'Error',
                        message: "El registro no ha podido ser eliminado."
                    })
                })
        }
    })
}

export const numberFormat = number => {
    return new Intl.NumberFormat('en-US', {
        style: 'decimal',
        maximumFractionDigits: 2,
        minimumFractionDigits: 2
    }).format(number)
}