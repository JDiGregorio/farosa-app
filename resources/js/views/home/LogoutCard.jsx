import React from "react"

export const LogoutCard = props => props.canSee ? (
    <div className="h-36 flex flex-col items-center justify-center space-y-2 bg-white shadow-2xl rounded-lg group focus-within:ring-2 focus-within:ring-inset focus-within:ring-gray-200">
        <div>
            <span className="rounded inline-flex ring-white">
                {props.children}
            </span>
        </div>
        <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase">
                <a onClick={(event) => props.onClick(event)} className="focus:outline-none">
                    <span className="absolute inset-0" aria-hidden="true"></span>
                    {props.title}
                </a>
            </h3>
        </div>
    </div>
) : (null)