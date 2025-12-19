const request = require("supertest");
const app = require("../../../src");
const { createNormalUser } = require("../../utils/testHelpers");

describe("Users - Personal Profile", () => {
  describe("GET /api/v1/users/me", () => {
    it("should retrieve authenticated user information", async () => {
      // GIVEN
      const userData = {
        name: "Dubois",
        firstname: "Pierre",
        email: "pierre.dubois@test.com",
        photo: "photo-test",
        password: "password123",
      };
      const { user, token } = await createNormalUser(userData);

      // WHEN
      const response = await request(app)
        .get("/api/v1/users/me")
        .set("Authorization", `Bearer ${token}`);

      // THEN
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        id: user.id_user,
        name: userData.name,
        firstName: userData.firstname,
        email: userData.email,
      });
      expect(response.body.photoUrl).toBeDefined();
    });

    it("should reject request without authentication token", async () => {
      // WHEN
      const response = await request(app).get("/api/v1/users/me");

      // THEN
      expect(response.status).toBe(401);
    });
  });
});
