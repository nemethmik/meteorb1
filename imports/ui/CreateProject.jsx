/* @flow */
import React, {Component} from "react"
export class CreateProject extends Component/*:: <{},{|title:string,content:string|}>*/ {
  state = {
    title: "",
    content:"",
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
          <h5 className="grey-text text-darken-3">Create Project</h5>
          <div className="input-field">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" onChange={this.handleChange}/> 
          </div>
          <div className="input-field">
            <label htmlFor="content">Content</label>
            <textarea id="content" className="materialize-textarea" onChange={this.handleChange} ></textarea>
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">Create Project</button>
          </div>
        </form>
      </div>
    );
  }
}
