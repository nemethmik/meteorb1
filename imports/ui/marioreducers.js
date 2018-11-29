/* @flow */
import {combineReducers} from "redux"
const authReducer = (state/*:{}*/ = {},action/*:string*/)/*:{}*/ => {
  return state
}
const projectsState/*:MarioProjectCollection*/ = {
  projects: [
    {id:"1", title:"Design a practical SCRUM methodology", content:"Details of project 1"},
    {id:"2", title:"Project 2 title", content:"Details of project 2"},
    {id:"3", title:"Project 3 title", content:"Details of project 3"},
    {id:"4", title:"Large scale modernizations of farms", content:"Details of project 4"},
  ]
}
const projectReducer = (state/*:MarioProjectCollection*/ = projectsState,action/*:string*/)/*:MarioProjectCollection*/ => {
  return state
}
const reducerTable/*:RootReducersFunctionTable*/ = {
  auth: authReducer,
  marioProjectCollection: projectReducer //returns MarioProjectCollection
}
export const rootReducer = combineReducers(reducerTable)
// export const rootReducer = combineReducers({
//   auth: authReducer,
//   marioProjectCollection: projectReducer //returns MarioProjectCollection
// })