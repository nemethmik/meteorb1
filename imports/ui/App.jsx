/* @flow */
import React from "react"
import {createStore} from "redux"
import {Provider} from "react-redux"
import {BrowserRouter,Switch,Route} from "react-router-dom"
//Application module imports
import {rootReducer} from "/imports/ui/marioreducers"
import {Navbar} from "./Navbar"
import {Dashboard} from "./Dashboard"
import {ProjectDetails} from "./ProjectDetails"
import {SignIn} from "./SignIn"
import {SignUp} from "./SignUp"
import {CreateProject} from "./CreateProject"

const store = createStore(rootReducer)
export const App = ({navroutes}/*:NavRoutesProp*/) => (
  <Provider store={store}>
    <BrowserRouter>
      <div className="App">
        <Navbar navroutes={navroutes}/>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path={navroutes.project + "/:id"} component={ProjectDetails} />
          <Route path={navroutes.signin} component={SignIn} />
          <Route path={navroutes.signup} component={SignUp} />
          <Route path={navroutes.create} component={CreateProject} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
)
App.defaultProps = {
  navroutes:{
    create:"/create",
    project:"/project",
    signin:"/signin",
    signup:"/signup"
  }
}