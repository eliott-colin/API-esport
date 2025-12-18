const universitiesService = require("../services/universitiesService");

const getAllUniversities = async (req, res) => {
  try {
    const universities = await universitiesService.getAllUniversities();
    res.status(200).json(universities);
  } catch (error) {
    res.status(error?.status || 500).json({ message: error?.message || error });
  }
};

const getUniversityById = async (req, res) => {
  try {
    const university = await universitiesService.getUniversityById(req.params.id);
    if (!university) {
      return res.status(404).json({ message: "University not found" });
    }
    res.status(200).json(university);
  } catch (error) {
    res.status(error?.status || 500).json({ message: error?.message || error });
  }
};

module.exports = {
  getAllUniversities,
  getUniversityById,
};