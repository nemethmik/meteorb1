/* @flow */
import React, {Component} from "react"
export class SignUp extends Component/*:: <{},{|email:string,password:string,firstName:string,lastName:string|}>*/ {
  state = {
    email: "",
    password:"",
    firstName:"",
    lastName:""
  }
  handleChange = (e/*:SyntheticEvent<HTMLInputElement>*/) => {
    this.setState({[e.currentTarget.id]:e.currentTarget.value})
  }
  handleSubmit = (e/*:SyntheticEvent<>*/) => {
    e.preventDefault()
    console.log(this.state)
  }
  render() {
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
          </div>
        </form>
      </div>
    );
  }
}