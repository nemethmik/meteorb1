/* @flow */
import React, {Component} from "react"
import {connect} from "react-redux"
import {Redirect} from "react-router-dom"
import {signUp} from "./marioactions"
/*::
type SignUpProps = {|
  ...AuthDetails,
  ...SignUpAction
|}
*/
class SignUpComponent extends Component/*::<SignUpProps,UserCredentialsAndDetails>*/ {
  state = {
    email: "",
    password:"",
    firstName:"",
    lastName:"",
    initials:""
  }
  handleChange = (e/*:SyntheticEvent<HTMLInputElement>*/) => {
    this.setState({[e.currentTarget.id]:e.currentTarget.value})
  }
  handleSubmit = (e/*:SyntheticEvent<>*/) => {
    e.preventDefault()
    this.props.signUp(this.state)
  }
  render() {
    const {auth,authError} = this.props
    if(auth && auth.uid) return <Redirect to="/"/> //Should be replaced with the navroutes
      return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
          <h5 className="grey-text text-darken-3">Sign Up</h5>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" onChange={this.handleChange}/> 
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" onChange={this.handleChange}/> 
          </div>
          <div className="input-field">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" onChange={this.handleChange}/> 
          </div>
          <div className="input-field">
            <label htmlFor="firstName">First Name</label>
            <input type="text" id="firstName" onChange={this.handleChange}/> 
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">Sign Up</button>
            <div className="red-text center"><p>{authError}</p></div>
          </div>
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state)/*:AuthDetails*/ => {
  return {
    auth:state.firebase.auth,
    authError:state.auth.authError
  }
}
const mapDispatchToProps = (dispatch)/*:SignUpAction*/ => ({
  signUp:(newUser/*:UserCredentialsAndDetails*/)=>dispatch(signUp(newUser))
})
export const SignUp = connect(mapStateToProps, mapDispatchToProps)(SignUpComponent)