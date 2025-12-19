const Universities = require("../models/Universities");

const getAllUniversities = async () => {
  try {
    return await Universities.findAll();
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const getUniversityById = async (id) => {
  try {
    const university = await Universities.findById(id);
    if (!university) {
      throw { status: 404, message: "Université non trouvée" };
    }
    return university;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

module.exports = {
  getAllUniversities,
  getUniversityById,
};
