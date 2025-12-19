const eventsService = require("../services/eventsService");

const getAllEvents = async (req, res) => {
  try {
    const events = await eventsService.getAllEvents();
    res.status(200).json({data: events});
  } catch (error) {
    res.status(error?.status || 500).json({ message: error?.message || error });
  }
};

module.exports = {
  getAllEvents,
};