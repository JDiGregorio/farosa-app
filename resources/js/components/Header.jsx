import React, { useContext } from 'react'
import { MenuIcon, LogoutIcon } from '@heroicons/react/outline'
import { useHistory } from "react-router-dom"
import axios from 'axios'

import { SidebarContext } from '../context/SidebarContext'

function Header() {
  const { toggleSidebar } = useContext(SidebarContext)
  const history = useHistory()

  const logout = () => {
    axios.post('api/logout').then(() => {
      localStorage.removeItem('user')
      history.push("/login")
    })
  }

  return (
    <header className="z-40 py-4 bg-white shadow-bottom dark:bg-gray-800">
      <div className="container flex items-center justify-between sm:justify-end h-full px-6 mx-auto text-purple-600 dark:text-purple-300">
        <button onClick={toggleSidebar} className="p-1 mr-5 -ml-1 rounded-md lg:hidden focus:outline-none focus:shadow-outline-purple" aria-label="Menu">
          <MenuIcon className="w-6 h-6" aria-hidden="true" />
        </button>

        {/*<ul className="flex justify-end items-center flex-shrink-0 space-x-6">
          <li className="flex">
            <button className="rounded-md focus:outline-none focus:shadow-outline-purple" onClick={logout} aria-label="Toggle logout">
              <LogoutIcon className="w-5 h-5" aria-hidden="true" />
            </button>
          </li>
        </ul>*/}
      </div>
    </header>
  )
}

export default Header
