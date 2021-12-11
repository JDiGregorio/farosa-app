import React from "react"

export const WhithoutRecordView = props => (
    <div className="p-4">
        <h1 className="text-sm uppercase text-gray-400 font-medium">
            { props.text ? props.text : 'no hay registros para mostrar'}
        </h1>
    </div>
)