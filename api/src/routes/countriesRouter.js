const { Router } = require("express");
const countriesRouter = Router();
const { Country, CountryActivity, Activity } = require("../db");
const fetch = require("node-fetch");

module.exports = countriesRouter;

countriesRouter.get("/", (req, res) => {
  // const name = req.query.name ? `name/${req.query.name}` : all;

  if (req.query.name) {
    fetch(`https://restcountries.com/v3/name/${req.query.name}`)
      .then((res) => res.json())
      // data --> [{arg}, {peru}, ...]
      .then((data) => {
        if (data instanceof Array) {
          res.json(toShortCountries(data));
        } else {
          res.status(data.status).json({ msg: "no country found" });
        }
      });
  } else {
    fetch("https://restcountries.com/v3/all")
      .then((res) => res.json())
      // data --> [{arg}, {peru}, ...]
      .then((data) => countriesPersist(data))
      .then((promisifyCountries) =>
        // promisifyCountries --> [ promesa, promesa, .... ]
        Promise.all(promisifyCountries)
      )
      .then(() =>
        Country.findAll({
          attributes: ["countryId", "name", "flagURI", "continent"],
        })
      )
      .then((countries) => res.json(countries));
  }
});

countriesRouter.get("/:countryId", async (req, res) => {
  const { countryId } = req.params;
  console.log(`ESTOY EN GET /:countryId: ${countryId}`);
  const country = await Country.findOne({
    where: { id: countryId },
  });
  const activities = await country.getActivities();
  const countryActivities = {
    codigo: country.countryId,
    name: country.name,
    flagURI: country.flagURI,
    continent: country.continent,
    activities,
  };
  res.json(countryActivities);
});

// map an array of cuontries object to an array of promises that
// persist countries
const countriesPersist = (countries) => {
  return countries.map((country) =>
    Country.create({
      countryId: country.cca3,
      name: country.name.common,
      flagURI: country.flags[0],
      continent: country.continents[0],
      capital: country.capital ? country.capital[0] : "non capital",
      subregion: country.subregion,
      area: country.area,
      population: country.population,
    })
  );
};
const toShortCountries = (countries) => {
  return countries.map((country) => {
    return {
      countryId: country.cca3,
      name: country.name.common,
      flagURI: country.flags[0],
      continent: country.continents[0],
    };
  });
};
