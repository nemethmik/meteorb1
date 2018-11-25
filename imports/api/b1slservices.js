/* @flow */
import {Meteor} from "meteor/meteor"
import {HTTP} from "meteor/http"
import util from "util"
import B1Session from "./b1session" //This is important for Flow
export default class B1SLServices {
  b1session/*:B1Session*/
  queryUrl/*:?string*/
  queryResponse/*:?{}*/
  b1Error/*:B1Error*/
  static NOERROR = {code:0,message:{lang:"en-us",value:"NO ERROR"}}
  constructor(b1session/*:B1Session*/) {
      this.b1session = b1session
      this.queryUrl = null
      this.queryResponse = null
      this.b1Error = B1SLServices.NOERROR
  }
  callAsync = async (method/*:HTTPCommands*/, url/*:string*/, options/*:HTTPOptions*/) => {
    if(Meteor.isClient) options.beforeSend = function(xhr) {xhr.withCredentials = true}
    else options.headers = {Cookie: this.b1session.b1Cookies}
    return new Promise(function promiseCallback(resolveCallback, rejectCallback) {
      HTTP.call(method, url, options, function httpCallback(error, response) {
        if(response) resolveCallback(response)
        else if(error) rejectCallback(error)
      })
    })
  }
  postAsync = async (url/*:string*/, options/*:HTTPOptions*/) => this.callAsync("POST",url, options)
  loginAsync = async () => {
    const loginResponse = await this.postAsync(this.b1session.serverUrl + "Login",{
      data:{UserName: this.b1session.userName, Password: this.b1session.password, CompanyDB: this.b1session.companyDB}
    })
    if(loginResponse.statusCode == 200) {
      //loginResponse.headers["set-cookie"] is empty in a browser (client)
      this.b1session.setLoggedIn(loginResponse.headers["set-cookie"], loginResponse.data.SessionTimeout)
      console.log("B1SLServices.loginAsync:",(Meteor.isClient ? "CLIENT:" : "SERVER:"),loginResponse.data)
    } else {
      throw new Error(util.inspect(loginResponse.data ? loginResponse.data : loginResponse))
    }
    return this.b1session
  }
  queryAsync = async (queryString/*:string*/) => {
    if(this.b1session.isSessionExpired()) await this.loginAsync()
    this.queryUrl = this.b1session.serverUrl + queryString
    this.queryResponse = await this.callAsync("GET", this.queryUrl,{data:{}})
    this.b1Error = B1SLServices.NOERROR  
    if(this.queryResponse.statusCode == 200) return this.queryResponse.data.value
    else {
      if(this.queryResponse.data && this.queryResponse.data.error) {
        this.b1Error = this.queryResponse.data.error
      }
      throw new Error(util.inspect(this.b1Error ? this.b1Error : this.queryResponse))
    }
  }
  queryItemsOfGroupAsync = async (itemGroupCode/*:string*/)/*:Promise<Array<B1Item>>*/ => {
    return await this.queryAsync("Items?$select=ItemCode,ItemName"
    + "&$filter=ItemsGroupCode eq " + itemGroupCode)
  }
  queryOpenPurchaseOrdersAsync = async (supplierCode/*:?string*/,warehouseCode/*:?string*/)/*:Promise<Array<B1Document>>*/ => {
  return await this.queryAsync("PurchaseOrders?$select=DocNum,CardName&$filter=DocumentStatus eq 'bost_Open'")
  }
}
