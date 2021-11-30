import React from 'react'
import { UserGroupIcon, CollectionIcon, PencilAltIcon, UsersIcon, LogoutIcon } from '@heroicons/react/solid'
import { useHistory } from "react-router-dom"
import axios from "axios"

import { SettingCard } from './settingCard'
import { LogoutCard } from './LogoutCard'

const Dashboard = () => {
  const history = useHistory()
  const user = JSON.parse(localStorage.getItem('user'))

  const logout = (event) => {
    event.preventDefault()

    axios.post('api/logout').then(() => {
      localStorage.removeItem('user')
      history.push("/login")
    })
  }

  return (
    <div className="py-8 space-y-10">
      <div className="grid grid-cols-2 gap-4">
        <SettingCard canSee={true} title="Clientes" to="/clientes">
          <UserGroupIcon className="h-12 w-12 text-gray-600" />
        </SettingCard>

        <SettingCard canSee={true} title="Productos" to="/productos">
          <CollectionIcon className="h-12 w-12 text-gray-600" />
        </SettingCard>
        
        <SettingCard canSee={true} title="Pedidos" to="/pedidos">
          <PencilAltIcon className="h-12 w-12 text-gray-600" />
        </SettingCard>

        <SettingCard canSee={user.type_user} title="Usuarios" to="/usuarios">
          <UsersIcon className="h-12 w-12 text-gray-600" />
        </SettingCard>

        <LogoutCard key={5} id={5} canSee={true} title="Salir" onClick={logout}>
          <LogoutIcon className="h-12 w-12 text-gray-600" />
        </LogoutCard>
      </div>
    </div>
  )
}

export default Dashboard
