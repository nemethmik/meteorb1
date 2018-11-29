/* @flow */
import React from "react"
import {Link,NavLink} from "react-router-dom"
export const Navbar = ({navroutes}/*:NavRoutesProp*/) => (
  <nav className="nav-wrapper grey darken-3">
    <div className="container">
      <Link to="/" className="brand-logo">Mario Plan</Link>
      <SignedInLinks navroutes={navroutes}/>
      <SignedOutLinks navroutes={navroutes}/>
    </div>
  </nav>
)
const SignedInLinks = ({navroutes}/*:NavRoutesProp*/) => (
  <ul className="right">
   <li><NavLink to={navroutes.create}>New Project</NavLink></li>
   <li><NavLink to="/">Log Out</NavLink></li>
   <li><NavLink to="/" className="btn btn-floating pink lighten-1">JW</NavLink></li>
  </ul>
)
const SignedOutLinks = ({navroutes}/*:NavRoutesProp*/) => (
  <ul className="right">
   <li><NavLink to={navroutes.signup}>Signup</NavLink></li>
   <li><NavLink to={navroutes.signin}>Login</NavLink></li>
  </ul>
)

