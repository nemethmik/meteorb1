/* @flow */
export const PROJECTSCOLLECTION = "projects" 
export const USERSCOLLECTION = "users" 
//The createProject function is not allowed to be async, it must hide all async behaviors from the caller
export const createProject = (project/*:ProjectDocument*/)/*:ThunkAction */ => {
  return async (dispatch,getState,{getFirebase,getFirestore}/*:FireBaseExtra*/) => {
    //If you want to use await this function must be declared async
    const profile = getState().firebase.profile
    const authorId = getState().firebase.auth.uid
    const prjDoc/*:ProjectDocument*/ = {
      ...project,
      authorFirstName:profile.firstName,
      authorLastName:profile.lastName,
      authorId: authorId,
      createdAt:new Date(),
    }
    // This is an old school Promise.then.catch style implementation
    // const firestore/*:{collection:(string)=>{add:(any)=>Promise<any>}}*/ = getFirestore()
    // firestore.collection(PROJECTSCOLLECTION).add(prjDoc).then(()=>{
    //   dispatch({type:"CREATE_PROJECT",project})
    // }).catch(error => {dispatch({type:"CREATE_PROJECT_ERROR",error})})
    // This is the newer, easier to read await implementation
    try {
      //If the collection doesn't exist, FireStore creates one automatically.
      //When you delete all documents from a collection, it is automatically deleted from FireStore.
      //When you get any errors from Flow about unexpected identifier after await,
      //double check if the innermost function is declared async.
      await getFirestore().collection(PROJECTSCOLLECTION).add(prjDoc)
      dispatch({type:"CREATE_PROJECT",project})
    } catch(error) {dispatch({type:"CREATE_PROJECT_ERROR",error})}
  }
}
export const signIn = (credentials/*:UserCredentials*/)/*:ThunkAction */ => {
  return async (dispatch,getState,{getFirebase}/*:FireBaseExtra*/) => {
    try {
      await getFirebase().auth().signInWithEmailAndPassword(credentials.email,credentials.password)
      dispatch({type:"LOGIN_SUCCESS"})
    } catch(error) {dispatch({type:"LOGIN_ERROR",error})}
 }
}
export const signOut = ()/*:ThunkAction */ => {
  return async (dispatch,getState,{getFirebase}/*:FireBaseExtra*/) => {
    try {
      await getFirebase().auth().signOut()
      dispatch({type:"SIGNOUT_SUCCESS"})
    } catch(error) {dispatch({type:"SIGNOUT_ERROR",error})}
 }
}
export const signUp = (newUser/*:UserCredentialsAndDetails*/)/*:ThunkAction */ => {
  return async (dispatch,getState,{getFirebase,getFirestore}/*:FireBaseExtra*/) => {
    try {
      const fbResponse = await getFirebase().auth().createUserWithEmailAndPassword(newUser.email,newUser.password)
      const userDetails/*:UserDetails*/ = {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        initials: newUser.firstName[0] + newUser.lastName[0]
      }
      const fsResponse = await getFirestore().collection(USERSCOLLECTION).doc(fbResponse.user.uid).set(userDetails)
      dispatch({type:"SIGNUP_SUCCESS"})
    } catch(error) {dispatch({type:"SIGNUP_ERROR",error})}
 }
}