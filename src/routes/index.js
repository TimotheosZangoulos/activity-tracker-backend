const express = require("express");
const router = express.Router();

const activityRoutes = require("./activityRoutes");
const dataRoutes = require("./dataRoutes");

router.use("/activities", activityRoutes);
router.use("/data", dataRoutes);

module.exports = router;
