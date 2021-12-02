const routes = user => {
  return [
    {
      canSee: true,
      path: '/inicio',
      icon: 'HomeIcon',
      name: 'Inicio'
    },
    {
      canSee: true,
      path: '/clientes',
      icon: 'UserGroupIcon',
      name: 'Clientes'
    },
    {
      canSee: true,
      path: '/productos',
      icon: 'CollectionIcon',
      name: 'Productos'
    },
    {
      canSee: true,
      path: '/pedidos',
      icon: 'PencilAltIcon',
      name: 'Pedidos'
    },
    {
      canSee: user.type_user,
      path: '/usuarios',
      icon: 'UsersIcon',
      name: 'Usuarios'
    }
  ]
}

export default routes