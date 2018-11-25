/* @flow */
import assert from "assert"
import util from "util"
import B1Session from "../imports/api/b1session"
import B1SLServices from "../imports/api/b1slservices"
describe("B1SL_QueryTestSeries", function B1SL_QueryTestSeries () {
  const b1s = new B1SLServices(new B1Session("http://192.168.25.92:50001/b1s/v1/","manager4", "manager", "VERYSIMPLEBIKES"))
  it("QueryItemsOfGroup101", async function QueryItemsOfGroup101() {
    this.timeout(4000)
    try {
      const queryResponse = await b1s.queryItemsOfGroupAsync("101")
      console.log("QueryItemsOfGroup101",queryResponse)
      assert.ok(Array.isArray(queryResponse),"Query Response is Not an Array")
      assert.ok(Array.isArray(queryResponse) && queryResponse.length > 0,"Query Response is an Empty Array")
      assert.ok(queryResponse[1].ItemCode == "OQA1","First item code is expected to be OQA1")
    } catch(e) {
      console.log("QueryItemsOfGroup101:Error",b1s.b1Error.message.value)
      assert.ok(false,"Didn't expect exception:" + e)
    }
  })
  it("QueryOpenPurchaseOrdersAll", async function QueryOpenPurchaseOrdersAll() {
    const queryResponse = await b1s.queryOpenPurchaseOrdersAsync(null,null)
    console.log("B1SLServices.queryOpenPurchaseOrdersAsync",queryResponse)
    assert.ok(Array.isArray(queryResponse),"Query Response is Not an Array")
    assert.ok(Array.isArray(queryResponse) && queryResponse.length > 0,"Query Response is an Empty Array")
    assert.ok(queryResponse[1].DocNum == 502,"First document number is expected to be 502")
  })
  it("ErrorHandlingForInvalidPropertyName", async function ErrorHandlingForInvalidPropertyName() {
    try {
      await b1s.queryAsync("Items?$select=ItemCodeX,ItemName")
      assert.ok(false,"Error was expected")
    } catch(e) {
      const expectedErrorCode = -1000 //Property ItemCodeX of Item is invalid
      assert.ok(b1s.b1Error.code == expectedErrorCode,"Error code was expected to be " + expectedErrorCode + " Received:" + util.inspect(b1s.b1Error))
    }
  })
  it("ErrorHandlingForInvalidDocStatusCode", async function ErrorHandlingForInvalidDocStatusCode() {
    this.timeout(4000)
    try {
      await b1s.queryAsync("PurchaseOrders?$filter=DocumentStatus eq 'bost_OpenX'")
      assert.ok(false,"Error was expected")
    } catch(e) {
      const expectedErrorCode = -1013 // Invalid item name bost_OpenX in Enum BoStatus The valid names are: bost_Open-O, bost_Close-C, bost_Paid-P, bost_Delivered-D
      assert.ok(b1s.b1Error.code == expectedErrorCode,"Error code was expected to be " + expectedErrorCode + " Received:" + util.inspect(b1s.b1Error))
    }
  })
})
