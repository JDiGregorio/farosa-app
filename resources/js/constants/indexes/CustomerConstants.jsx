export const columns = [
    {
        name: 'Código',
        selector: row => row.AccountNumber,
        sortable: true
    },
    {
        name: 'Nombre',
        selector: row => row.FirstName,
        sortable: true
    }
]