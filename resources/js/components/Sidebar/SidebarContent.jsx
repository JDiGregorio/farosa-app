import React from 'react'
import { LogoutIcon } from '@heroicons/react/solid'
import { NavLink, Route, useHistory } from 'react-router-dom'
import axios from 'axios'

import SidebarSubmenu from './SidebarSubmenu'

import routes from '../../routes/sidebar'

const SidebarContent = () => {
  const history = useHistory()

  const logout = () => {
    axios.post('api/logout').then(() => {
      localStorage.removeItem('user')
      history.push("/login")
    })
  }

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="py-4 text-gray-500">
        <a className="ml-6 text-lg font-bold text-gray-800" href="#">
          FAROSA
        </a>

        <ul className="mt-6">
          { routes.map((route) =>
            route.routes ? (
              <SidebarSubmenu route={route} key={route.name} />
            ) : (
              <li className="relative px-6 py-3" key={route.name}>
                <NavLink exact to={route.path} className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 uppercase" activeClassName="text-gray-800">
                  <Route path={route.path} exact={route.exact}>
                    <span className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg" aria-hidden="true"></span>
                  </Route>
                
                  <span className="ml-4">
                    {route.name}
                  </span>
                </NavLink>
              </li>
            )
          )}
        </ul>
      </div>

      <button onClick={logout} className="w-full flex justify-center items-center space-x-5 p-3 bg-gray-100 shadow-2xl">
        <span className="text-sm font-semibold text-gray-500 uppercase">
          Salir
        </span>
        <LogoutIcon className="h-6 w-6 text-gray-600" />
      </button>
    </div>
  )
}

export default SidebarContent
