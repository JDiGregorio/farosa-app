import React from "react"
import { Link } from "react-router-dom"
import { ChevronRightIcon } from '@heroicons/react/solid'

export const BreadCrumb = props => (
    <div className="my-4 flex items-center space-x-2">
        <Link to={props.links[0].path} className="text-sm text-gray-400 font-semibold">
            {props.links[0].name}
        </Link>
        
        <ChevronRightIcon className="h-3 w-3 text-gray-400" />

        { props.links[1].path != "" ? (
            <Link to={props.links[1].path} className={`text-sm  font-semibold ${props.links.length > 2 ? 'text-gray-400' : 'text-gray-500'}`}>
                {props.links[1].name}
            </Link>
        ) : (
            <h1 className="text-sm  font-semibold text-gray-500">
                {props.links[1].name}
            </h1>
        )}
        
        { props.links.length > 2 ? (
            <>
                <ChevronRightIcon className="h-3 w-3 text-gray-400" />

                <h1 className="text-sm text-gray-500 font-semibold">
                    {props.links[2].name}
                </h1>
            </>
        ) : (null)}
    </div>
)