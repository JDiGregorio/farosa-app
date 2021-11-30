import React from "react"
import { Link } from "react-router-dom"

export const SettingCard = props => props.canSee ? (
    <Link to={props.to} className="focus:outline-none">
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
    </Link>
) : (null)