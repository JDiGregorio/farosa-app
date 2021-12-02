import React from "react"

export const ErrorView = props => (
    <div>
        <p className="mt-2 text-sm text-red-600">
            {props.message}
        </p>
    </div>
)