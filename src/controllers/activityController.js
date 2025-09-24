const activityService = require("../services/activityService");

const getActivities = async (req, res) => {
  try {
    const data = await activityService.getActivitiesData();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load activities data" });
  }
};

module.exports = {
  getActivities
};
