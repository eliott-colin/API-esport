const Events = require("../models/Events");

const getAllEvents = async () => {
  try {
    return await Events.findAll();
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const getEventById = async (id) => {
  try {
    const event = await Events.findById(id);
    if (!event) {
      throw { status: 404, message: "Événement non trouvé" };
    }
    return event;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

module.exports = {
  getAllEvents,
  getEventById,
};