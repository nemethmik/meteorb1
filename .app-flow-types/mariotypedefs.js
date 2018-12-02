import firebase from "firebase/app"
/*::
type UserCredentials = {|
  email: string,
  password:string
|}
type UserDetails = {|
  firstName:string,
  lastName:string,
  initials:string
|}
type ProfileDetails = {|
  profile:UserDetails
|}
type UserCredentialsAndDetails = {|
  ...UserCredentials,
  ...UserDetails
|}

type ProjectDocument = {|
  id?:string, 
  title:string, 
  content:string,
  authorFirstName?:string,
  authorLastName?:string,
  authorId?:string,
  createdAt?:{toDate:()=>Date}|any
|}
//Here the field name, projects, is actually the Firestore collection name.
//This type is used in firestore.ordered 
type ProjectArrayCollection = {|
  projects: Array<ProjectDocument>
|}
//This is the indexer property style used in firestore.data
type ProjectDocumentDictionary = {|
  [id:string]:ProjectDocument
|}
//This just together with the collection name
type ProjectDocumentCollection = {|
  projects:ProjectDocumentDictionary
|}
type AuthUid = {|
  auth:{uid:string}
|}
type AuthDetails = {|
  authError: string|null,
  auth:{uid:string}|null
|}

type RootReducersDataTable = {| 
  auth: {},
  marioProjectCollection: ProjectDocumentCollection,
  firestore: {
    //The document id is included in the array element document
    ordered:ProjectArrayCollection, 
    //The document id is only available as the indexer property.
    data:ProjectDocumentCollection 
  },
  firebase: {
    ...AuthUid,
    ...ProfileDetails
  }
|}
type RootReducersFunctionTable = {| 
  auth: (AuthDetails,MarioAction)=>AuthDetails,
  marioProjectCollection: (ProjectDocumentCollection,MarioAction)=>ProjectDocumentCollection,
  firestore: (any)=>any,
  firebase: (any)=>any, //For authentication
|}
type NavRoutes = {|
  create:string;
  project:string;
  signin:string;
  signup:string;
|}
type NavRoutesProp = {|
  navroutes: NavRoutes
|}
//Map State To Prop Redux Action function object types
type SignUpAction = {|
  signUp:(UserCredentialsAndDetails)=>void
|}
type SignInAction = {|
  signIn:(UserCredentials)=>void
|}
type SignOutAction = {|
  signOut:()=>void
|}
type CreateProjectAction = {|
  createProject:(ProjectDocument)=>void
|}

type MarioAction =
  | {type: "SIGNOUT_SUCCESS"} 
  | {type: "LOGIN_SUCCESS"} 
  | {type: "SIGNUP_SUCCESS"}
  | {type: "SIGNOUT_ERROR", error: {message:string}}
  | {type: "SIGNUP_ERROR", error: {message:string}}
  | {type: "LOGIN_ERROR", error: {message:string}}
  | {type: "CREATE_PROJECT", project: ProjectDocument }
  | {type: "CREATE_PROJECT_ERROR", error: any };

type GetState = () => {firebase:{profile:any,auth:{uid:string}}}
type PromiseAction = Promise<any>;
type ThunkAction = (dispatch: Dispatch, getState: GetState, extra: FireBaseExtra) => any;
type Dispatch = (action: MarioAction | ThunkAction | PromiseAction | Array<MarioAction>) => any;
type CreateProjectProps = {|
  createProject:(ProjectDocument)=>((ProjectDocument)=>ProjectDocument)=>any
|}
type FireBaseExtra = {
  getFirebase: ()=>any,
  getFirestore: ()=>any
}
*/