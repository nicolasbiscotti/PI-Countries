const { Router } = require("express");
const countriesRouter = Router();
const { Country, CountryActivity, Activity, Op } = require("../db");
const axios = require("axios");

module.exports = countriesRouter;

countriesRouter.get("/", async (req, res) => {
  const { name, page, step } = req.query;
  // to build the URL as requested by all the countries
  // or those that match a name
  // const resource = req.query.name ? `name/${req.query.name}` : "all";
  const resource = "all";
  const url = `https://restcountries.com/v3/${resource}`;

  // calculate the page they ask me
  const pagination = page ? getPagination(parseInt(step), parseInt(page)) : {};

  // SELECT * FROM countries WHERE name ILIKE '%name%';
  // or SELECT * FROM countries; if no req.query.name
  const nameWhereCluse = name
    ? { where: { name: { [Op.iLike]: `%${name}%` } } }
    : {};

  // required attributes
  const attributes = {
    attributes: ["id", "countryId", "name", "flagURI", "continent"],
  };

  const isLoaded = (await Country.findAll()).length;
  console.log(isLoaded);
  if (!isLoaded) {
    const countries = await axios(url);
    await Country.bulkCreate(toCountries(countries.data));
  }
  const { count, rows } = await Country.findAndCountAll({
    ...nameWhereCluse,
    ...pagination,
    ...attributes,
  });
  if (count) {
    res.json({
      rows,
      count,
      hasNext: hasNext(step, page, count),
      hasPrevious: hasPrevious(page),
    });
  } else {
    res.json({ msg: "no country found" });
  }
});

countriesRouter.get("/:countryId", async (req, res) => {
  const { countryId } = req.params;
  console.log(`ESTOY EN GET /:countryId: ${countryId}`);

  // estoy probando la view /countries/:countryId HAY QUE SACARLO
  const isLoaded = (await Country.findAll()).length;
  if (!isLoaded) {
    const url = `https://restcountries.com/v3/alpha/${countryId}`;
    const countries = await axios(url);
    res.json( toCountries(countries.data));
  } // SACARLO
  else {
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
  }
});

// pagination function
const getPagination = (step, page) => {
  let offset = page !== 0 ? page * step - 1 : 0;
  let limit = page !== 0 ? step : step - 1;
  return { offset, limit };
};
const hasNext = (step, page, total) => {
  pageAmount = Number.parseInt(total / step);
  return page < pageAmount ? true : false;
};
const hasPrevious = (page) => {
  return page > 0 ? true : false;
};

// map an array of cuontries object with full properties
// to one with some of those
const toCountries = (countries) => {
  return countries.map((country) => {
    return {
      countryId: country.cca3,
      name: country.name.common,
      flagURI: country.flags[0],
      continent: country.continents[0],
      capital: country.capital ? country.capital[0] : "non capital",
      subregion: country.subregion,
      area: country.area,
      population: country.population,
    };
  });
};
