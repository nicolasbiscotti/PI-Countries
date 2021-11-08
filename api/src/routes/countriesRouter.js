const { Router } = require("express");
const countriesRouter = Router();
const { Country } = require("../db");

module.exports = countriesRouter;

countriesRouter.get("/", (req, res) => {
  countryFunctions.find().then((countries) => res.json(countries));
});

countriesRouter.post("/", (req, res) => {
  const country = req.body;
  countryFunctions.insert(country).then((newCountry) => {
    res.json(newCountry);
  });
});

const countryFunctions = {
  find: () => {
    return Country.findAll();
  },
  insert: (country) => {
    return Country.create(country);
  },
};
