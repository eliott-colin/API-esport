const Events = require("../models/Events");

const getAllEvents = async () => {
  try {
    return await Events.list();
    } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
    }
};

module.exports = {
  getAllEvents,
};