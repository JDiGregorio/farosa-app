import React, { useContext } from 'react'
import { MenuIcon } from '@heroicons/react/outline'
import { PlusCircleIcon } from '@heroicons/react/solid'
import { useLocation, Link } from "react-router-dom"

import { SidebarContext } from '../context/SidebarContext'

const Header = () => {
  const { toggleSidebar } = useContext(SidebarContext)
  const location = useLocation()

  const canSee = location.pathname != "/pedidos/crear" && location.pathname != "/pedidos"

  return (
    <header className="z-40 py-4 bg-white shadow-bottom border-b">
      <div className="container flex items-center justify-between sm:justify-end h-full px-6 mx-auto text-purple-600">
        <button onClick={toggleSidebar} className="p-1 mr-5 -ml-1 rounded-md lg:hidden focus:outline-none focus:shadow-outline-purple" aria-label="Menu">
          <MenuIcon className="w-6 h-6" aria-hidden="true" />
        </button>

        { canSee &&
          <ul className="flex justify-end items-center flex-shrink-0 space-x-6">
            <li className="flex">
              <Link to="/pedidos/crear" className="rounded-md focus:outline-none focus:shadow-outline-purple">
                <PlusCircleIcon className="w-8 h-8 text-green-500" aria-hidden="true" />
              </Link>
            </li>
          </ul>
        }
      </div>
    </header>
  )
}

export default Header