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
  await newActivity.addCountries(countries); // analizar si va este awaite
  res.json({ msn: "relashioshep concreted" });
});
