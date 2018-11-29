/*::
type MarioProjectDetails = {|
  id:string, 
  title:string, 
  content:string
|}
type MarioProjectCollection = {|
  projects: Array<MarioProjectDetails>
|}
type RootReducersDataTable = {| 
  auth: {},
  marioProjectCollection: MarioProjectCollection
|}
type RootReducersFunctionTable = {| 
  auth: ({},string)=>{},
  marioProjectCollection: (MarioProjectCollection,string)=>MarioProjectCollection
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
*/