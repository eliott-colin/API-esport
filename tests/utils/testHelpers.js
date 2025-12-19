const request = require("supertest");
const app = require("../../src");
const User = require("../../src/models/User");
const Permission = require("../../src/models/Permission");
const UserPermission = require("../../src/models/UserPermission");
const bcrypt = require("bcrypt");

/**
 * Crée un utilisateur avec un rôle spécifique
 * @param {string} role - 'user' ou 'admin'
 * @param {object} userData - Données optionnelles de l'utilisateur
 * @returns {Promise<{user, token}>}
 */
async function createUserWithRole(role = "user", userData = {}) {
  const defaultData = {
    name: "User",
    firstname: "Test",
    email: `test-${Date.now()}@gmail.com`,
    photo: "test-photo",
    password: "test123",
    Id_universities: 1,
  };

  const data = { ...defaultData, ...userData };
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await User.create({
    name: data.name,
    firstname: data.firstname,
    email: data.email,
    photo: data.photo,
    password: hashedPassword,
    Id_universities: data.Id_universities,
  });

  const roleData = await Permission.findByName(role);
  await UserPermission.create({
    id_user: user.id_user,
    Id_roles: roleData.Id_roles,
  });

  const token = await getAuthToken(data.email, data.password);

  return { user, token };
}

/**
 * Obtient un token d'authentification
 * @param {string} email
 * @param {string} password
 * @returns {Promise<string>}
 */
async function getAuthToken(email, password) {
  const response = await request(app)
    .post("/api/v1/auth/login")
    .send({ email, password });

  return response.body.token;
}

/**
 * Crée un utilisateur admin et retourne le token
 * @returns {Promise<{user, token}>}
 */
async function createAdminUser(userData = {}) {
  return createUserWithRole("admin", userData);
}

/**
 * Crée un utilisateur normal et retourne le token
 * @returns {Promise<{user, token}>}
 */
async function createNormalUser(userData = {}) {
  return createUserWithRole("user", userData);
}

module.exports = {
  createUserWithRole,
  getAuthToken,
  createAdminUser,
  createNormalUser,
};

