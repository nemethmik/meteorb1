/* @flow */
import React, {Component} from "react"
import {connect} from "react-redux"
const Notifications = () => (
  <div><p>Notifications</p></div>
)
const ProjectSummary = ({project}) => (
  <div className="card z-depth-0 project-summary">
    <div className="card-content grey-text text-darken-3">
      <span className="card-title">{project.title}</span>
      <p>Posted by Jim Wenham</p>
      <p className="grey-text">Dec 6, 2018</p>
    </div>  
  </div>
)
const ProjectList = ({projects}) => (
  <div className="project-list section">
    {projects && projects.map(p => {
      return (<ProjectSummary project={p} key={p.id} />)
    })}
  </div>
)
class DashboardComponent extends Component/*::<MarioProjectCollection,{}>*/ {
  render() {
    console.log(this.props)
    const {projects} = this.props
    return (
      <div className="dashboard container">
        <div className="row">
          <div className="col s12 m6">
            <ProjectList projects={projects}/>
          </div>
          <div className="col s12 m5 offset-m1"></div>
            <Notifications/>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state/*:RootReducersDataTable*/)/*:MarioProjectCollection*/ => {
  //return {projects: state.marioProjectCollection.projects}
  return state.marioProjectCollection
}
export const Dashboard = connect(mapStateToProps)(DashboardComponent)
