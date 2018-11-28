/* @flow */
import assert from "assert"
import util from "util"
import B1Session from "../imports/api/b1session"
import B1SLServices from "../imports/api/b1slservices"
describe("B1SL_ActivityTests", function B1SL_ActivityTests () {
  const b1s = new B1SLServices(new B1Session("http://192.168.25.92:50001/b1s/v1/","manager4", "manager", "VERYSIMPLEBIKES"))
  it("AddNewActivityToEmployee3", async function AddNewActivityToEmployee3() {
    this.timeout(10000)
    try {
      const activityData/*:B1Activity*/ = {
        //Subject:-1, ActivityType: -1 /*General*/, Status: -2 /*NotStarted, -3=Completed*/,
        Notes:"A longer description of the preparation job for experimenting",
        //ActivityDate: "2018-12-06", ActivityTime: "08:08:08", //Activity creation date/time
        StartDate : "2018-12-07", //Automatically convert Dates and Times to strings in POST/PUT/PATCH
        StartTime : B1SLServices.currentDateToISOString(), //UTC 0 offset, not the local time :(
        Details : "A short description of the goal of the experiment " + B1SLServices.currentDateToISOString(),
        ActivityType: -1,
        ActivityProperty: "cn_Task",
        Priority: "pr_High",
        PersonalFlag: "tNO",
        DurationType:"du_Hours", Duration:4.5,
        HandledByEmployee : 3, //OCLG.AttendEmpl
      }
      const activityCreated = await b1s.createActivity(activityData)
      console.log("AddNewActivityToEmployee3:",activityCreated)
      assert.ok(activityCreated.ActivityCode && activityCreated.ActivityCode > 0,"Activity Code is expected to be greater than 0")
    } catch (e) {
      console.log("AddNewActivityToEmployee3:B1 Error",b1s.b1Error)
      assert.ok(false,"Error:" + e)
    }
  })
  it("QueryAllActivities", async function QueryAllActivities() {
    this.timeout(4000)
    try {
      const queryResponse/*:Array<B1Activity>*/ = await b1s.queryAsync("Activities?$select=ActivityCode,HandledByEmployee,Details")
      console.log("QueryAllActivities",queryResponse)
      assert.ok(Array.isArray(queryResponse),"Query Response is Not an Array")
      assert.ok(Array.isArray(queryResponse) && queryResponse.length > 0,"Query Response is an Empty Array")
      assert.ok(queryResponse[0].ActivityCode == 2,"First item code is expected to be 2")
    } catch(e) {
      assert.ok(false,"Error:" + e)
    }
  })
  it("SetActivityCompleted", async function SetActivityCompleted() {
    this.timeout(4000)
    try {
      //Get activity
      const activityCode = 39
      const activityQueried/*:B1Activity*/ = await b1s.getActivity(activityCode,"ActivityCode,Status,Details,Notes")
      console.log("SetActivityCompleted",activityQueried)
      assert.ok(activityQueried.ActivityCode && activityQueried.ActivityCode == activityCode,"Activity code is not " + activityCode)
      //Set activity status to -3 to complete
      //If you just simply want to concatenate activityQueried.Notes + " Completed on " you will have
      //Cannot add `activityQueried.Notes` and `" Completed on "` because undefined [1] is incompatible with string [2] from Flow
      //Here I use Short-Circuit Evaluation of the Logical Operator && (also available for ||)
      activityQueried.Notes = activityQueried.Notes && activityQueried.Notes + " Completed on " + B1SLServices.currentDateToISOString()
      activityQueried.Status = -3 // Completed
      const queryResponse = await b1s.updateActivity(activityCode, activityQueried)
      console.log("SetActivityCompleted",queryResponse)
    } catch(e) {
      assert.ok(false,"Error:" + e)
    }
  })
  it("DeleteActivity", async function DeleteActivity() {
    this.timeout(4000)
    try {
      const activityCode = 38
      const queryResponse = await b1s.deleteActivity(activityCode)
      console.log("DeleteActivity",queryResponse)
    } catch(e) {
      assert.ok(false,"Error:" + e)
    }
  })
})
