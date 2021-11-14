import React, { lazy, useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect, useHistory } from 'react-router-dom'

import AccessibleNavigationAnnouncer from './components/AccessibleNavigationAnnouncer'
const Layout = lazy(() => import('./containers/Layout'))
const Login = lazy(() => import('./views/auth/Login'))
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'))

const App = () => {
  
 
  return (
    <>
      <Router>
        <AccessibleNavigationAnnouncer />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/forgot-password" component={ForgotPassword} />

          {/* Place new routes over this */}
          <Route path="/" component={Layout} />)

          {/* If you have an index page, you can remothis Redirect */}

        </Switch>
      </Router>
    </>
  )
}

export default App