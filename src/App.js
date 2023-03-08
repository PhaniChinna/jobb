import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import LoginPage from './components/LoginRoute'
import HomePage from './components/HomeRoute'
import JobPage from './components/JobRoute'
import JobItemDetails from './components/JobItemDetailsRoute'
import ProtectedPage from './components/ProtectedRoute'
import NotFoundPage from './components/NotFoundRoute'

import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={LoginPage} />
      <ProtectedPage exact path="/" component={HomePage} />
      <ProtectedPage exact path="/jobs" component={JobPage} />
      <ProtectedPage exact path="/jobs/:id" component={JobItemDetails} />
      <Route path="/not-found" component={NotFoundPage} />
      <Redirect to="/not-found" />
    </Switch>
  </BrowserRouter>
)

export default App
