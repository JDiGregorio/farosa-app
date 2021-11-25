import React, { useContext, Suspense, useEffect, useState, lazy } from 'react'
import { Switch, Route, Redirect, useLocation, useHistory } from 'react-router-dom'

import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import Main from './Main'
import ThemedSuspense from '../components/ThemedSuspense'
import { SidebarContext } from '../context/SidebarContext'

const Page404 = lazy(() => import('../pages/404'))

import routes from '../routes'

const Layout = () => {
  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext)
  let location = useLocation()

  const [user] = useState(localStorage.getItem("user") ? localStorage.getItem("user") : null)
  const history = useHistory()

  console.log(routes)

  useEffect(() => {
    if (user) {
      history.push("/inicio")
    } else {
      history.push("/login")
    }
  },[user])

  useEffect(() => {
    closeSidebar()
  }, [location])

  return (
    <div className={`flex h-screen bg-gray-50 dark:bg-gray-900 ${isSidebarOpen && 'overflow-hidden'}`}>
      <Sidebar />

      <div className="flex flex-col flex-1 w-full">
        <Header />

        <Main>
          <Suspense fallback={<ThemedSuspense />}>
            <Switch>
              { routes.map((route, index) => {
                return route.component ? (
                  <Route
                    key={index}
                    exact={true}
                    path={`${route.path}`}
                    render={(props) => <route.component {...props} />}
                  />
                ) : (null)
              })}
              <Redirect exact from="/" to="/inicio" />
              <Route component={Page404} />
            </Switch>
          </Suspense>
        </Main>
      </div>
    </div>
  )
}

export default Layout
