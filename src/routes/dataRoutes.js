const express = require("express");
const router = express.Router();
const dataController = require("../controllers/dataController");

router.post("/updated", dataController.dataUpdated);

module.exports = router;
