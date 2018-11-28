/* @flow */
import {Meteor} from "meteor/meteor"
import {HTTP} from "meteor/http"
import util from "util"
import B1Session from "./b1session" //This is important for Flow
export default class B1SLServices {
  b1session/*:B1Session*/
  queryUrl/*:string*/
  queryResponse/*:{}*/
  b1Error/*:B1Error*/
  static NOERROR = {code:0,message:{lang:"en-us",value:"NO ERROR"}}
  constructor(b1session/*:B1Session*/) {
      this.b1session = b1session
      this.queryUrl = ""
      this.queryResponse = {}
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
  queryAsync = async (queryString/*:string*/,getByID/*:boolean*/ = false) => {
    if(this.b1session.isSessionExpired()) await this.loginAsync()
    this.queryUrl = this.b1session.serverUrl + queryString
    this.queryResponse = await this.callAsync("GET", this.queryUrl,{data:{}})
    this.b1Error = B1SLServices.NOERROR  
    if(this.queryResponse.statusCode == 200) {
      return getByID ? this.queryResponse.data : this.queryResponse.data.value
    } else {
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
  createAsync = async (entityName/*:string*/,entityData/*:{}*/) => {
    if(this.b1session.isSessionExpired()) await this.loginAsync()
    this.queryUrl = this.b1session.serverUrl + entityName
    this.queryResponse = await this.postAsync(this.queryUrl,{data:entityData})
    this.b1Error = B1SLServices.NOERROR  
    if(this.queryResponse.statusCode == 201) return this.queryResponse.data
    else {
      if(this.queryResponse.data && this.queryResponse.data.error) {
        this.b1Error = this.queryResponse.data.error
      }
      throw new Error(util.inspect(this.b1Error ? this.b1Error : this.queryResponse))
    }
  }
  updateAsync = async (entityName/*:string*/,entityData/*:{}*/) => {
    if(this.b1session.isSessionExpired()) await this.loginAsync()
    this.queryUrl = this.b1session.serverUrl + entityName
    this.queryResponse = await this.callAsync("PATCH",this.queryUrl,{data:entityData})
    this.b1Error = B1SLServices.NOERROR  
    if(this.queryResponse.statusCode == 204) return this.queryResponse
    else {
      if(this.queryResponse.data && this.queryResponse.data.error) {
        this.b1Error = this.queryResponse.data.error
      }
      throw new Error(util.inspect(this.b1Error ? this.b1Error : this.queryResponse))
    }
  }
  deleteAsync = async (entityName/*:string*/,errorWhenDoesntExist/*:boolean*/ = false) => {
    if(this.b1session.isSessionExpired()) await this.loginAsync()
    this.queryUrl = this.b1session.serverUrl + entityName
    this.queryResponse = await this.callAsync("DELETE",this.queryUrl,{data:{}})
    this.b1Error = B1SLServices.NOERROR  
    if(this.queryResponse.statusCode == 204) return this.queryResponse
    else {
      if(this.queryResponse.data && this.queryResponse.data.error) {
        this.b1Error = this.queryResponse.data.error
      }
      let throwError = true;
      if(this.b1Error.code == -2028 && !errorWhenDoesntExist) {
        console.log("deleteAsync:" + this.queryUrl,this.b1Error.message)
        throwError = false;
      }
      if(throwError) throw new Error(util.inspect(this.b1Error ? this.b1Error : this.queryResponse))
    }
  }
  createActivity = async (activityData/*:B1Activity*/)/*:Promise<B1Activity>*/ => await this.createAsync("Activities", activityData)
  updateActivity = async (activityCode/*:number*/, activityData/*:B1Activity*/) => {
    if(activityData.ActivityCode && activityData.ActivityCode != activityCode) {
      throw new Error("The activityCode (" + activityCode + ") parameter is different from the activityData.ActivityCode (" + activityData.ActivityCode + "). Set activityData.ActivityCode to 0 before calling update.")
    }
    return await this.updateAsync("Activities(" + activityCode + ")", activityData)
  }
  deleteActivity = async (activityCode/*:number*/,errorWhenDoesntExist/*:boolean*/ = false) => await this.deleteAsync("Activities(" + activityCode + ")",errorWhenDoesntExist)
  getActivity = async (activityCode/*:number*/,fields/*:string*/)/*:Promise<B1Activity>*/ => {
    return await this.queryAsync("Activities(" + activityCode + ")"
      + (fields ? "?$select=" + fields : ""),true)
  }
  /* 
  The Date.toISOString is perfectly fine both for Date and SAP B1 Time fields. 
  Time fields use only the time part of the Date object. 
  However, toISOString makes a GMT 0-offset date-time, 
  and constructs the date-time string from that value. 
  So this utility simply performs a counter action to get a local off-set corrected time. 
  */
  static currentDateToISOString()/*:string*/{
    const currentDateTime = new Date()
    currentDateTime.setMinutes(currentDateTime.getMinutes() - currentDateTime.getTimezoneOffset()) 
    return currentDateTime.toISOString()
  }   
}
