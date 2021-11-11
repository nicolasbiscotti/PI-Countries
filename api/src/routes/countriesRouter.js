const { Router } = require("express");
const countriesRouter = Router();
const { Country, CountryActivity, Activity } = require("../db");
const fetch = require("node-fetch");

module.exports = countriesRouter;

countriesRouter.get("/", (req, res) => {
  const resource = req.query.name ? `name/${req.query.name}` : "all";
  const url = `https://restcountries.com/v3/${resource}`;

  console.log(url);
  // utilizaando la funcion axuliar pagination
  // calulo la pagina que me estan pidiendo
  const page = req.query.page
    ? pagination(parseInt(req.query.step), parseInt(req.query.page))
    : {};

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
          ...page,
          attributes: ["countryId", "name", "flagURI", "continent"],
        })
      )
      .then((countries) => res.json(countries));
  }
});

countriesRouter.get("/:countryId", async (req, res) => {
  const { countryId } = req.params;
  console.log(`ESTOY EN GET /:countryId: ${countryId}`);
  res.json(
    await Country.findOne({
      where: { id: countryId },
      // de esta manera no trae la tabla intermedia otra vez..
      include: [
        {
          model: Activity,
          through: {
            attributes: [],
          },
        },
      ],
    })
  );
});

// pagination function
const pagination = (step, page) => {
  let offset = page !== 0 ? page * step - 1 : 0;
  let limit = page !== 0 ? step : step - 1;
  return { offset, limit };
};

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
