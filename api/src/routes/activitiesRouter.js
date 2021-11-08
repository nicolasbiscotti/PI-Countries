const { Router } = require("express");
const activitiesRouter = Router();
const { Activity } = require("../db");

module.exports = activitiesRouter;

activitiesRouter.post("/", (req, res) => {});
