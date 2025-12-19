const User = require("../models/User");

const getUserSelfDetails = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw { status: 404, message: "Utilisateur non trouvé" };
    }
    return {
      id: user.id_user,
      name: user.name,
      firstName: user.firstname,
      email: user.email,
      photoUrl: user.photo ? `http://localhost:3000/${user.photo}.png` : null,
    };
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const updateUserDetails = async (userId, firstName, lastName, email) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw { status: 404, message: "Utilisateur non trouvé" };
    }
    await User.update(userId, {
      firstname: firstName,
      name: lastName,
      email: email,
    });
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const getAllUsers = async () => {
  try {
    const result = await User.findAll();
    return result.map((user) => ({
      id: user.id_user,
      firstName: user.firstname,
      lastName: user.name,
      email: user.email,
      photoUrl: user.photo ? `http://localhost:3000/${user.photo}.png` : null,
    }));
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const getUserById = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw { status: 404, message: "Utilisateur non trouvé" };
    }
    return {
      id: user.id_user,
      firstName: user.firstname,
      lastName: user.name,
      email: user.email,
      photoUrl: user.photo ? `http://localhost:3000/${user.photo}.png` : null,
    };
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const deleteUser = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw { status: 404, message: "Utilisateur non trouvé" };
    }
    await User.remove(userId);
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

module.exports = {
  getUserSelfDetails,
  updateUserDetails,
  getAllUsers,
  getUserById,
  deleteUser,
};
