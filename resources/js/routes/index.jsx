import { lazy } from 'react'

const Dashboard = lazy(() => import('../views/home/Dashboard'))
const CustomerList = lazy(() => import('../views/customers/CustomerList'))
const CustomerShow = lazy(() => import('../views/customers/CustomerShow'))
const ProductList = lazy(() => import('../views/products/ProductList'))
const ProductShow = lazy(() => import('../views/products/ProductShow'))
const OrderList = lazy(() => import('../views/orders/OrderList'))
const OrderCreate = lazy(() => import('../views/orders/OrderCreate'))
const OrderShow = lazy(() => import('../views/orders/OrderShow'))
const UserList = lazy(() => import('../views/users/UserList'))
const UserCreate = lazy(() => import('../views/users/UserCreate'))
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
    path: '/clientes/:id',
    component: CustomerShow
  },
  {
    path: '/productos',
    component: ProductList
  },
  {
    path: '/productos/:id',
    component: ProductShow
  },
  {
    path: '/pedidos',
    component: OrderList
  },
  {
    path: '/pedidos/crear',
    component: OrderCreate
  },
  {
    path: '/pedidos/:id',
    component: OrderShow
  },
  {
    path: '/usuarios',
    component: UserList
  },
  {
    path: '/usuarios/crear',
    component: UserCreate
  },
  {
    path: '/usuarios/:id/editar',
    component: UserCreate
  },
  {
    path: '/404',
    component: Page404
  }
]

export default routes