/* @flow */
import React from "react"
import {BrowserRouter,Switch,Route} from "react-router-dom"
import {Navbar} from "./Navbar"
import {Dashboard} from "./Dashboard"
import {ProjectDetails} from "./ProjectDetails"
import {SignIn} from "./SignIn"
import {SignUp} from "./SignUp"
import {CreateProject} from "./CreateProject"
//When the Dashboard is rendered, we pass navroutes from App;
//Dashboard will receive automatically its data from the firebase reducer.
export const App = ({navroutes}/*:NavRoutesProp*/) => (
  <BrowserRouter>
    <div className="App">
      <Navbar navroutes={navroutes}/>
      <Switch>
        <Route exact path="/" render={
          (props) => <Dashboard navroutes={navroutes}/>
        }/>
        <Route path={navroutes.project + "/:id"} component={ProjectDetails} />
        <Route path={navroutes.signin} component={SignIn} />
        <Route path={navroutes.signup} component={SignUp} />
        <Route path={navroutes.create} component={CreateProject} />
      </Switch>
    </div>
  </BrowserRouter>
)
App.defaultProps = {
  navroutes:{
    create:"/create",
    project:"/project",
    signin:"/signin",
    signup:"/signup"
  }
}