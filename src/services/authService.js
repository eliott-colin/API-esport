const bcrypt = require("bcrypt");
const User = require("../models/User");
const UserPermission = require("../models/UserPermission");
const Permission = require("../models/Permission");
const jwt = require("jsonwebtoken");
const userRegistration = async (
  firstName,
  lastName,
  email,
  photo,
  password,
  idUniversities,
) => {
  try {
    const userExisted = await User.findByEmail(email);
    if (userExisted.length > 0) {
      throw {
        status: 400,
        message:
          "If an account already exists for this email, try signing in or resetting your password.",
      };
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name: lastName,
      firstname: firstName,
      email: email,
      photo: photo,
      password: hashedPassword,
      Id_universities: idUniversities,
    });
    const userPermissionDetails = await UserPermission.create({
      id_user: user.id_user,
      Id_roles: 1,
    });
    const role = await Permission.findById(userPermissionDetails.Id_roles);
    const userAfterCreate = await User.findByEmail(email);
    return jwt.sign(
      {
        userId: userAfterCreate.id,
        name: userAfterCreate.nom,
        role: role.name,
      },
      process.env.JWT_KEY,
      {
        expiresIn: "60m",
      },
    );
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const userConnection = async (email, password) => {
  try {
    const user = await User.findByEmail(email);
    const userPermissionDetails = await UserPermission.findByUserId(
      user[0].id_user,
    );
    const role = await Permission.findById(userPermissionDetails[0].Id_roles);
    if (user.length < 0) {
      throw {
        status: 401,
        error: "Authentication failed, user does not exist!",
      };
    }
    const passwordMatch = await bcrypt.compare(password, user[0].password);
    if (!passwordMatch) {
      throw { status: 401, error: "Authentication failed, wrong password!" };
    }
    return jwt.sign(
      { userId: user[0].id_user, name: user[0].name, role: role.name },
      process.env.JWT_KEY,
      {
        expiresIn: "60m",
      },
    );
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

module.exports = {
  userRegistration,
  userConnection,
};
