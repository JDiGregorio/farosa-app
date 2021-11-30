import React from "react"
import { SearchIcon } from "@heroicons/react/outline"

export const InputSearch = props => props.canSee ? (
    <div className="relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-gray-400" />
        </div>

        <input type="text" name="search" onChange={props.onChange} className="pl-10 h-10  block w-full shadow-sm sm:text-sm rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500" placeholder="Search..." />
    </div>
) : (null)