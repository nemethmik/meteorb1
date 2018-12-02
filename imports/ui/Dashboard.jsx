/* @flow */
import React, {Component} from "react"
import {Link,Redirect} from "react-router-dom"
import {connect} from "react-redux"
import {firestoreConnect} from "react-redux-firebase" 
import {compose} from "redux"
import moment from "moment" //Import without curly braces
import {PROJECTSCOLLECTION} from "./marioactions"
// Adding FireBase reference in a UI component is a no-no; later I'll factor this out.
const Notifications = () => (
  <div><p>Notifications</p></div>
)
const ProjectSummary = ({project}/*:{project:ProjectDocument}*/) => (
  <div className="card z-depth-0 project-summary">
    <div className="card-content grey-text text-darken-3">
      <span className="card-title">{project.title}</span>
      <p>Posted by {project.authorFirstName} {project.authorLastName}</p>
      <p className="grey-text">{project.createdAt && moment(project.createdAt.toDate()).calendar()}</p>
    </div>  
  </div>
)
/*::
type ProjectLinkProps = {|
...ProjectArrayCollection,
...NavRoutesProp
|}
*/
const ProjectList = ({projects,navroutes}/*:ProjectLinkProps*/) => (
  <div className="project-list section">
    {projects && projects.map(p => {
      const id/*:string*/ = p.id ? p.id : "OHOH"
      return (
        <Link to={navroutes.project + "/" + id} key={id}> 
          <ProjectSummary project={p} key={id}/>
        </Link>)
    })}
  </div>
)
/*::
type DashboardProps = {|
  ...ProjectArrayCollection,
  ...NavRoutesProp,
  ...AuthUid,
|}
*/
class DashboardComponent extends Component/*::<DashboardProps,{}>*/ {
  render() {
    console.log(this.props)
    const {projects,navroutes,auth} = this.props
    if(auth.uid) {
      return (
        <div className="dashboard container">
          <div className="row">
            <div className="col s12 m6">
              <ProjectList projects={projects} navroutes={navroutes}/>
            </div>
            <div className="col s12 m5 offset-m1"></div>
              <Notifications/>
          </div>
        </div>
      )
    } else return <Redirect to={navroutes.signin}/>
  }
}
/*::
type DashboardStateToProps = {|
...ProjectArrayCollection,  
...AuthUid
|}
*/
const mapStateToProps = (state/*:RootReducersDataTable*/)/*:DashboardStateToProps*/ => {
  return {
    projects: state.firestore.ordered.projects, 
    auth:state.firebase.auth
  }
}
export const Dashboard = compose(
  connect(mapStateToProps),
  firestoreConnect([{collection:PROJECTSCOLLECTION}])
)(DashboardComponent)
