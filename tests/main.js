/* @flow */
/* Remember to set the meteor.testModule in package.json to run tests/main.js
or any other test module.  
  "meteor": {
    ...,
    "testModule": "tests/b1logintestset.js"
    "testModule": "tests/main.js"
  },
For more information see https://github.com/meteor/meteor/pull/9714
*/
import assert from "assert";
import {Meteor} from "meteor/meteor"
describe("meteorb1", function () {
  it("package.json has correct name", async function () {
    const { name } = await import("../package.json");
    assert.strictEqual(name, "meteorb1");
  });

  if (Meteor.isClient) {
    it("client is not server", function () {
      assert.strictEqual(Meteor.isServer, false);
    });
  }

  if (Meteor.isServer) {
    it("server is not client", function () {
      assert.strictEqual(Meteor.isClient, false);
    });
  }
});
