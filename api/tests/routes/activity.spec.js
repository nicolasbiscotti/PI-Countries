/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Activity, conn, Country } = require("../../src/db.js");

const agent = session(app);
const activity = {
  name: "Sky",
  difficulty: "3",
  duration: 120,
  season: "Spring",
  countriesId: [1],
};
const country = {
  name: "Argentina",
  continent: "South America",
  flagURI: "https://flagcdn.com/ar.svg",
};

xdescribe("Activity routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() => {
    Country.sync({ force: true })
      .then(() => Country.create(country))
      .then(() => Activity.create(activity));
  });
  describe("POST /activity", () => {
    it("should get 200", () => agent.post("/activity").expect(200));
  });
});
