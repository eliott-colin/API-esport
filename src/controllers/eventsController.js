const eventsService = require("../services/eventsService");

const getAllEvents = async (req, res) => {
  try {
    const events = await eventsService.getAllEvents();
    res.status(200).json({data: events});
  } catch (error) {
    res.status(error?.status || 500).json({ message: error?.message || error });
  }
};

const getEventById = async (req, res) => {
  try {
    const eventId = req.params.id;
    const event = await eventsService.getEventById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({ data: event });
  } catch (error) {
    res.status(error?.status || 500).json({ message: error?.message || error });
  }
};

module.exports = {
  getAllEvents,
  getEventById,
};