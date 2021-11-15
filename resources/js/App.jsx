import React, { lazy } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import AccessibleNavigationAnnouncer from './components/AccessibleNavigationAnnouncer'

const Layout = lazy(() => import('./containers/Layout'))
const Login = lazy(() => import('./views/auth/Login'))

const App = () => {
  return (
    <>
      <Router>
        <AccessibleNavigationAnnouncer />
        <Switch>
          <Route path="/login" component={Login} />

          {/* Place new routes over this */}
          <Route path="/" component={Layout} />)

          {/* If you have an index page, you can remothis Redirect */}

        </Switch>
      </Router>
    </>
  )
}

export default App