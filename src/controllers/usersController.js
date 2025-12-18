const usersService = require("../services/usersService");

const getUserSelfDetails = async (req, res) => {
  try {
    const userDetails = await usersService.getUserSelfDetails(req.auth.userId);
    res.status(200).json(userDetails);
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const updateUserDetails = async (req, res) => {
  const { firstName, lastName, email } = req.body;
  const userId = req.auth.userId;
  try {
    await usersService.updateUserDetails(userId, firstName, lastName, email);
    res.status(200).json({ ok: true });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getAllUsers = async (req, res) => {
  const role = req.auth.role;
  if (role !== "admin") {
    res.status(401).send({ status: "FAILED" });
  }
  try {
    const users = await usersService.getAllUsers();
    res.status(200).json({ data: users });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  getUserSelfDetails,
  updateUserDetails,
  getAllUsers,
};
