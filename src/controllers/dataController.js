const activityService = require("../services/activityService");

const dataUpdated = async (req, res) => {
  try {
    activityService.dataUpdated();
    res.json({ message: "Succesfully alerted for data updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load activities data" });
  }
};

module.exports = {
  dataUpdated
};
