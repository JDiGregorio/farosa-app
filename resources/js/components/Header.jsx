import React, { useContext } from 'react'
import { MenuIcon } from '@heroicons/react/outline'
import { PlusIcon } from '@heroicons/react/solid'
import { useLocation, useParams, Link } from "react-router-dom"

import { SidebarContext } from '../context/SidebarContext'
import * as constants from "../constants/Default"

const Header = () => {
  const { toggleSidebar } = useContext(SidebarContext)
  const location = useLocation()

  const path = constants.paths[location.pathname] ?? null 

  return (
    <header className="z-40 py-4 bg-white shadow-bottom border-b">
      <div className="container flex items-center justify-between h-full px-4 mx-auto">
        <div className="flex items-center">
          <button onClick={toggleSidebar} className="p-1 mr-5 -ml-1 rounded-md lg:hidden focus:outline-none" aria-label="Menu">
            <MenuIcon className="w-6 h-6 text-gray-600" aria-hidden="true" />
          </button>

          <h1 className="text-lg font-bold text-gray-500">
            FAROSA
          </h1>
        </div>

        { path && path.canSee ? (
          <ul className="flex justify-end items-center flex-shrink-0 space-x-6">
            <li className="flex">
              <Link to={path.to} className="flex items-center space-x-3 py-2 px-3 pl-4 bg-orange-400 border border-orange-400 rounded-full shadow-lg focus:outline-none">
                <span className="text-sm font-medium text-white uppercase">
                  {path.text}
                </span>
                <PlusIcon className="w-5 h-5 text-white" aria-hidden="true" />
              </Link>
            </li>
          </ul>
        ) : (null)}
      </div>
    </header>
  )
}

export default Header