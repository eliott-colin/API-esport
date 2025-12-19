const authService = require("../services/authService");

const userRegistration = async (req, res) => {
  const { firstName, lastName, email, photo, password, idUniversities } =
    req.body;
  const imagePath = req.file.path;
  try {
    const userRegistration = await authService.userRegistration(
      firstName,
      lastName,
      email,
      imagePath,
      password,
      idUniversities,
    );
    res.status(201).json({ token: userRegistration });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const userConnection = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userConnection = await authService.userConnection(email, password);
    res.status(200).json({ token: userConnection });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  userRegistration,
  userConnection,
};
