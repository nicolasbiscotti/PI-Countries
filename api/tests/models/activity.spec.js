const { Activity, conn } = require("../../src/db.js");
const { expect } = require("chai");

describe("Activity model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );  
  describe("Validators", () => {
    beforeEach(() => Activity.sync({ force: true }));
    describe("name", () => {
      it("should throw an error if name is null", (done) => {
        Activity.create({})
          .then(() => done(new Error("It requires a valid name")))
          .catch(() => done());
      });
      it("should work when its a valid name", () => {
        Activity.create({
          name: "Sky",
          difficulty: 3,
          duration: 60,
          season: "Winter",
        })
          .then(() => Activity.findOne({ where: { difficulty: 3 } }))
          .then((activity) => {
            // console.log(activity);
            expect(activity.name).toEqual("SKy");
          });
      });
    });
  });
});