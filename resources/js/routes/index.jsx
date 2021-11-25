import { lazy } from 'react'

const Dashboard = lazy(() => import('../views/home/Dashboard'))
const CustomerList = lazy(() => import('../views/customers/CustomerList'))
const ProductList = lazy(() => import('../views/products/ProductList'))
const OrderList = lazy(() => import('../views/orders/OrderList'))
const UserList = lazy(() => import('../views/users/UserList'))
const Page404 = lazy(() => import('../pages/404'))

const routes = [
  {
    path: '/',
    component: Dashboard
  },
  {
    path: '/inicio',
    component: Dashboard
  },
  {
    path: '/clientes',
    component: CustomerList
  },
  {
    path: '/productos',
    component: ProductList
  },
  {
    path: '/pedidos',
    component: OrderList
  },
  {
    path: '/usuarios',
    component: UserList
  },
  {
    path: '/404',
    component: Page404
  }
]

export default routes