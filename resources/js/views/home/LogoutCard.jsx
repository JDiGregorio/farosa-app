import React from "react"

export const LogoutCard = props => props.canSee ? (
    <a onClick={(event) => props.onClick(event)} className="col-start-2 cursor-pointer focus:outline-none">
        <div className="h-36 flex flex-col items-center justify-center space-y-2 bg-white shadow-2xl rounded-lg group focus-within:ring-2 focus-within:ring-inset focus-within:ring-gray-200">
            <div>
                <span className="rounded inline-flex ring-white">
                    {props.children}
                </span>
            </div>
            <div>
                <h3 className="text-sm font-semibold text-gray-400 uppercase">
                    {props.title}
                </h3>
            </div>
        </div>
    </a>
) : (null)