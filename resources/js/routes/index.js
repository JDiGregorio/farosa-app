import { lazy } from 'react'

const Dashboard = lazy(() => import('../views/home/Dashboard'))
const Page404 = lazy(() => import('../pages/404'))

const routes = [
  {
    path: '/dashboard',
    component: Dashboard
  },
  {
    path: '/404',
    component: Page404
  }
]

export default routes