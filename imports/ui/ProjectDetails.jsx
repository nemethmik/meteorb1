/* @flow */
import React from "react"
import {connect} from "react-redux"
import {Redirect} from "react-router-dom"
import firebase from "firebase/app" //only for the toISODateString utility function
import {firestoreConnect} from "react-redux-firebase" 
import moment from "moment" //Import without curly braces
import {compose} from "redux"
import {PROJECTSCOLLECTION} from "./marioactions"
function toISODateString(d/*:any*/)/*string*/ {
  if(d instanceof Date) return (d/*:Date*/).toISOString()
  else if(d instanceof firebase.firestore.Timestamp) return d.toDate().toISOString()
  else return (d.toString())
}
/*::
type ProjectDetailsProps = {|
  ...AuthUid,
  project:ProjectDocument,
  match:{params:{id:string}} //We still need this
|}
*/
const ProjectDetailsComponent = (props/*:ProjectDetailsProps*/) => {
  const id = props.match.params.id //We don't need this any more, it's there, but we don't use it
  const {project,auth} = props
  if(!auth.uid) return <Redirect to="/signin"/> //Should be replaced with the navroutes
  if(project) {
    return (
      <div className="container section project-details">
        <div className="card z-depth-0">
          <div className="card-content">
            <span className="card-title">{project.title}</span>
            <p>{project.content}</p>
          </div>
          <div className="card-action grey lighten-4 grey-text">
            <div>Posted by {project.authorFirstName} {project.authorLastName}</div>
            <div>{toISODateString(project.createdAt)}
            {project.createdAt && " (" + moment(project.createdAt.toDate()).calendar() + ")"}</div>
          </div>
        </div>
      </div>  
    )
  } else {
    return (
      <div className="container center">
        <p>Loading projects...</p>
      </div>
    )
  }
}
/*::
type ProjectDetailsStateToProps = {|
  ...AuthUid,
  project:ProjectDocument,
|}
*/
const mapStateToProps = (state/*:RootReducersDataTable*/,ownProps/*:ProjectDetailsProps*/)/*:ProjectDetailsStateToProps*/ => {
  //console.log("ProjectDetails.mapStateToProps",state)
  const id = ownProps.match.params.id
  const allProjects/*:ProjectDocumentDictionary*/ = state.firestore.data.projects
  const project = allProjects && allProjects[id]
  console.log("ProjectDetails.mapStateToProps:project",project)
  return {
    project,
    auth:state.firebase.auth
  }
}
export const ProjectDetails = compose(
  connect(mapStateToProps),
  firestoreConnect([{collection:PROJECTSCOLLECTION}])
)(ProjectDetailsComponent)
