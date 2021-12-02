import { AlertConfirm } from "../components/notifications/AlertConfirm"
import axios from "axios"

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