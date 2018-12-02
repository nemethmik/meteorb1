/* @flow */
import React, {Component} from "react"
import {connect} from "react-redux"
import {Redirect} from "react-router-dom"
import {signIn} from "./marioactions"
/*::
type SignInProps = {|
  ...AuthDetails,
  ...SignInAction
|}
*/
class SignInComponent extends Component/*::<SignInProps,UserCredentials>*/ {
  state = {
    email: "",
    password:""
  }
  handleChange = (e/*:SyntheticEvent<HTMLInputElement>*/) => {
    this.setState({[e.currentTarget.id]:e.currentTarget.value})
  }
  handleSubmit = (e/*:SyntheticEvent<>*/) => {
    e.preventDefault()
    this.props.signIn(this.state)
  }
  render() {
    const {authError,auth} = this.props
    if(auth && auth.uid) return <Redirect to="/"/> //Back to the dashboard
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
          <h5 className="grey-text text-darken-3">Sign In</h5>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" onChange={this.handleChange}/> 
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" onChange={this.handleChange}/> 
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">Login</button>
            <div className="red-text center">{authError && <p>{authError}</p>}</div>
          </div>
        </form>
      </div>
    )
  }
}
const mapDispatchToProps = (dispatch/*:Dispatch*/)/*:SignInAction*/ => ({
  signIn:(credentials/*:UserCredentials*/)=>dispatch(signIn(credentials))
})
const mapStateToProps = (state)/*:AuthDetails*/ => {
  return {
    authError: state.auth.authError,
    auth:state.firebase.auth
  }
}
export const SignIn = connect(mapStateToProps, mapDispatchToProps)(SignInComponent)