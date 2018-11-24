/* @flow */
export default class B1Session{
  serverUrl/*:string*/
  userName/*:string*/
  password/*:string*/
  companyDB/*:string*/
  b1Cookies/*:?string*/
  sessionTimeoutMinutes/*:number*/
  loginTime/*: Date*/
  constructor(serverUrl/*:string*/, userName/*:string*/, password/*:string*/, companyDB/*:string*/) {
    this.serverUrl = serverUrl
    this.userName = userName
    this.password = password
    this.companyDB = companyDB
    this.b1Cookies = null
    this.sessionTimeoutMinutes = 0
    this.loginTime = new Date(0)
  }
  isSessionExpired = () => (Date.now() - this.loginTime.getTime()) >= (this.sessionTimeoutMinutes * 60 * 1000)
  setLoggedIn(b1Cookies/*:?string*/,sessionTimeoutMinutes/*:number*/) {
    this.b1Cookies = b1Cookies
    this.sessionTimeoutMinutes = sessionTimeoutMinutes
    this.loginTime = new Date()
  }
}