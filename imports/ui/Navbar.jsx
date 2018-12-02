/* @flow */
import React from "react"
import {Link,NavLink} from "react-router-dom"
import {connect} from "react-redux"
import {signOut} from "./marioactions"
/*::
type NavbarProps = {|
  ...NavRoutesProp,
  ...AuthUid,
  ...ProfileDetails
|}
*/
const NavbarComponent = ({navroutes,auth,profile}/*:NavbarProps*/) => (
  <nav className="nav-wrapper grey darken-3">
    <div className="container">
      <Link to="/" className="brand-logo">Mario Plan</Link>
      {auth && auth.uid ? <SignedInLinks navroutes={navroutes} profile={profile}/>
      : <SignedOutLinks navroutes={navroutes}/>}
    </div>
  </nav>
)
/*::
type SignedInLinksProps = {|
  ...NavRoutesProp,
  ...AuthUid,
  ...ProfileDetails,
  ...SignOutAction
|}
*/
const SignedInLinksComponent = ({navroutes,signOut,profile}/*:SignedInLinksProps*/) => (
  <ul className="right">
   <li><NavLink to={navroutes.create}>New Project</NavLink></li>
   <li><a onClick={signOut} to="/">Log Out</a></li>
   <li><NavLink to="/" className="btn btn-floating pink lighten-1">{profile && profile.initials}</NavLink></li>
  </ul>
)
const mapDispatchToProps = (dispatch/*:Dispatch*/)/*:SignOutAction*/ => {
  return {signOut: ()=>dispatch(signOut())}
}
const SignedInLinks = connect(null,mapDispatchToProps)(SignedInLinksComponent)

const SignedOutLinks = ({navroutes}/*:NavRoutesProp*/) => (
  <ul className="right">
   <li><NavLink to={navroutes.signup}>Signup</NavLink></li>
   <li><NavLink to={navroutes.signin}>Login</NavLink></li>
  </ul>
)
/*::
type NavbarStateToProps = {
  ...AuthUid,
  ...ProfileDetails
}
*/
const mapStateToProps = (state/*:RootReducersDataTable*/)/*NavbarStateToProps*/ => {
  //console.log("Navbar",state)
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  }
}
export const Navbar = connect(mapStateToProps)(NavbarComponent)
