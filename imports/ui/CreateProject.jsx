/* @flow */
import React, {Component} from "react"
import {connect} from "react-redux"
import {Redirect} from "react-router-dom"
import {createProject} from "./marioactions"
/*::
type CreateProjectProps = {
  ...CreateProjectAction,
  ...AuthUid,
  history:{push:(string)=>void}
}
*/
class CreateProjectComponent extends Component/*::<CreateProjectProps,ProjectDocument>*/ {
  state = {
    //id is defined optional and not required here
    title: "",
    content:""
  }
  handleChange = (e/*:SyntheticEvent<HTMLInputElement>*/) => {
    this.setState({[e.currentTarget.id]:e.currentTarget.value})
  }
  handleSubmit = (e/*:SyntheticEvent<>*/) => {
    e.preventDefault()
    //console.log(this.state)
    this.props.createProject(this.state)
    this.props.history.push("/") //We don't need to use the Redirect component here.
  }
  render() {
    const {auth} = this.props
    if(!(auth && auth.uid)) return <Redirect to="/signin"/> //Should be replaced with the navroutes
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
const mapDispatchToProps = (dispatch/*:Dispatch*/)/*:CreateProjectAction*/ => ({
    createProject:(project/*:ProjectDocument*/)=>dispatch(createProject(project))
})
const mapStateToProps = (state) => {return {auth:state.firebase.auth}}
export const CreateProject = connect(mapStateToProps, mapDispatchToProps)(CreateProjectComponent)