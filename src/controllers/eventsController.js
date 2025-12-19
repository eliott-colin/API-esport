const eventsService = require("../services/eventsService");

const getAllEvents = async (req, res) => {
  try {
    const events = await eventsService.getAllEvents();
    res.status(200).json({ data: events });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getEventById = async (req, res) => {
  try {
    const eventId = req.params.id;
    const event = await eventsService.getEventById(eventId);
    res.status(200).json({ data: event });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  getAllEvents,
  getEventById,
};