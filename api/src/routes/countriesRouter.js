const { Router } = require("express");
const countriesRouter = Router();
const { Country, CountryActivity } = require("../db");
const fetch = require("node-fetch");

module.exports = countriesRouter;

countriesRouter.get("/", (req, res) => {
  fetch("https://restcountries.com/v3/all")
    .then((res) => res.json())
    .then((data) =>
      // data --> [{arg}, {peru}, ...]
      data.map((country) =>
        Country.create({
          name: country.name.common,
          continent: country.continents[0],
          flagURI: country.flags[0],
        })
      )
    )
    .then((promisifyCountries) =>
      // promisifyCountries --> [ promesa, promesa, .... ]
      Promise.all(promisifyCountries)
    )
    .then(() => Country.findAll())
    .then((countries) => res.json(countries));
});

countriesRouter.post("/", (req, res) => {
  const country = req.body;
  countryFunctions.insert(country).then((newCountry) => {
    res.json(newCountry);
  });
});
