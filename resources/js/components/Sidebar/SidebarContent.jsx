import React from 'react'
import { LogoutIcon } from '@heroicons/react/solid'
import { NavLink, Route, useHistory } from 'react-router-dom'
import axios from 'axios'

import routes from '../../routes/sidebar'

const SidebarContent = () => {
  const history = useHistory()
  const user = JSON.parse(localStorage.getItem('user'))

  const logout = () => {
    axios.post('api/logout')
    .then(() => {
      localStorage.removeItem('user')
      history.push("/login")
    })
  }

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="space-y-2">
        <div className="mt-3.5 flex items-center justify-center space-x-3">
          <div className="w-9 h-9 relative flex justify-center items-center rounded-full bg-orange-400 text-lg text-white uppercase">
            {user &&  user.name.charAt(0)}
          </div>
          <h1 className="text-md font-bold text-gray-500 uppercase">
            {user && user.name}
          </h1>
        </div>

        <hr />

        <ul>
          {routes(user).map(route => (
            <div key={route.name}>
              { route.canSee ? (
                <li className="relative px-6 py-3" key={route.name}>
                  <NavLink exact to={route.path} className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 uppercase" activeClassName="text-gray-800">
                    <Route path={route.path} exact={route.exact}>
                      <span className="absolute inset-y-0 left-0 w-1 bg-orange-500 rounded-tr-lg rounded-br-lg" aria-hidden="true"></span>
                    </Route>
                  
                    <span className="ml-4 text-gray-500">
                      {route.name}
                    </span>
                  </NavLink>
                </li>
              ) : (null)}
            </div>
          ))}
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