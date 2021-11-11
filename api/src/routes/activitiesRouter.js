const { Router } = require("express");
const activitiesRouter = Router();
const { Activity, Op, Country } = require("../db");

module.exports = activitiesRouter;

activitiesRouter.post("/", async (req, res) => {
  const { name, difficulty, duration, season, countriesId } = req.body;
  const newActivity = await Activity.create({
    name,
    difficulty,
    duration,
    season,
  });
  const countries = await Country.findAll({
    where: { id: { [Op.in]: countriesId } },
  });
  // addCountries --> agrega paises sin borrar los existentes
  // setCountries --> borra los existentes y agrega los que pasamos
  res.json(await newActivity.addCountries(countries));
});
