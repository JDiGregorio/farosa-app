import React from "react"

export const ErrorView = props => (
    <div>
        <p className="mt-2 text-xs text-red-600">
            {props.message}
        </p>
    </div>
)