const Universities = require("../models/Universities");

const getAllUniversities = async () => {
  try {
    return await Universities.list();
    } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
    }
};

const getUniversityById = async (id) => {
    try {
    return await Universities.findById(id);
    } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
    }
};

module.exports = {
  getAllUniversities,
  getUniversityById,
};