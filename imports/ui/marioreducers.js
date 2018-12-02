/* @flow */
import {combineReducers} from "redux"
import {firestoreReducer} from "redux-firestore"
import {firebaseReducer} from "react-redux-firebase"
const authReducer = (state/*:AuthDetails*/ = {authError:null,auth:null},action/*:MarioAction*/)/*:AuthDetails*/ => {
  switch(action.type) {
    case "LOGIN_ERROR": return {...state, authError: "Login failed"}
    case "LOGIN_SUCCESS": return {...state, authError: null}
    case "SIGNOUT_SUCCESS": return state
    case "SIGNUP_SUCCESS": return {...state, authError: null}
    case "SIGNUP_ERROR": return {...state, authError: action.error.message}
    default: return state
  }
}
const projectReducer = (state/*:ProjectDocumentCollection*/ = {projects:{}},action/*:MarioAction*/)/*:ProjectDocumentCollection*/ => {
  switch(action.type) {
    case "CREATE_PROJECT": //Flow guarantees that this string is correct
      console.log("Project Created:",action.project)
      //console.log("Project Created:",action.error) //Wow, Flow would be able to detect this error, too; brilliant.
      return state
    case "CREATE_PROJECT_ERROR": //Flow guarantees that this string is correct
      console.log("Project Creation Error:",action.error)
      return state
    default:
      //console.log("What is this:",action.type)
      return state
    }
}
const reducerTable/*:RootReducersFunctionTable*/ = {
  auth: authReducer,
  marioProjectCollection: projectReducer, //returns ProjectDocumentCollection
  firestore: firestoreReducer,
  firebase: firebaseReducer, //For authentication
}
export const rootReducer = combineReducers(reducerTable)
// export const rootReducer = combineReducers({
//   auth: authReducer,
//   marioProjectCollection: projectReducer //returns MarioProjectCollection
// })