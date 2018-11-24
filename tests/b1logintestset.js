/* @flow */
import assert from "assert";
import {Meteor} from "meteor/meteor"
import util from "util"
import B1Session from "../imports/api/b1session"
import B1SLServices from "../imports/api/b1slservices"
describe("B1SL_LoginTestSeries", function() {
  const ipAddress = "http://192.168.25.92:50001"
  const url = "/b1s/v1/"
  const user = "manager4"
  const pwd ="manager"
  const companyDB ="VERYSIMPLEBIKES"
  it("SuccessfulLogin", async function SuccessfulLogin () {//Don't use done with async/await
    const b1s = new B1SLServices(new B1Session(ipAddress + url,user, pwd, companyDB))
    try {
      const session/*:B1Session*/ = await b1s.loginAsync()
      console.log("SuccessfulLogin:Session Details:",session)
    } catch(error) {
      assert.ok(false,"SuccessfulLogin:Login Exception is Not Expected:" + util.inspect(error))
    }
    assert.ok(b1s.b1session.sessionTimeoutMinutes > 0,"SuccessfulLogin:Session Timeout is Expected to be greater than 0, actual value is " + b1s.b1session.sessionTimeoutMinutes)
  })
  it("LoginAttemptWithInvalidUser", async function LoginAttemptWithInvalidUser () {
    const b1s = new B1SLServices(new B1Session(ipAddress + url,"krikszkraksz", pwd, companyDB))
    try {
      await b1s.loginAsync()
      assert.ok(false,"LoginAttemptWithInvalidUser:Login Exception was expected")
    } catch(error) {
      //In case you want to analyse the response details
      //console.log("LoginAttemptWithInvalidUser:Error Details",error)
    }
  })
  it("LoginAttemptWithInvalidURL", async function LoginAttemptWithInvalidURL () {
    const b1s = new B1SLServices(new B1Session(ipAddress + url + "krikszkraksz",user, pwd, companyDB))
    try {
      await b1s.loginAsync()
      assert.ok(false,"LoginAttemptWithInvalidURL:Login Exception was expected")
    } catch(error) {
      //console.log("LoginAttemptWithInvalidURL:Error Details",error)
    }
  })
  it("LoginAttemptWithInvalidCompanyDB", async function LoginAttemptWithInvalidCompanyDB () {
    const b1s = new B1SLServices(new B1Session(ipAddress + url,user, pwd, "krikszkraksz"))
    try {
      await b1s.loginAsync()
      assert.ok(false,"LoginAttemptWithInvalidURL:Login Exception was expected")
    } catch(error) {
      // console.log("LoginAttemptWithInvalidCompanyDB:Error Details",error)
    }
  })
  it("LoginAttemptWithInvalidPassword", async function LoginAttemptWithInvalidPassword () {
    const b1s = new B1SLServices(new B1Session(ipAddress + url,user, "krikszkraksz", companyDB))
    try {
      await b1s.loginAsync()
      assert.ok(false,"LoginAttemptWithInvalidURL:Login Exception was expected")
    } catch(error) {
      // console.log("LoginAttemptWithInvalidPassword:Error Details",error)
    }
  })
  it("LoginAttemptWithFaultyIPAddress", async function LoginAttemptWithFaultyIPAddress () {
    this.timeout(30000) //If IP address is invalid we need 30 seconds
    const b1s = new B1SLServices(new B1Session("http://192.168.250.92:50001" + url,user, pwd, companyDB))
    try {
      const session/*:B1Session*/ = await b1s.loginAsync()
      assert.ok(false,"LoginAttemptWithInvalidURL:Login Exception was expected")
    } catch(error) {
      // console.log("LoginAttemptWithFaultyIPAddress:Error Details",error)
    }
  })
})
