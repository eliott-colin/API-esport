const request = require("supertest");
const app = require("../../../src");
const User = require("../../../src/models/User");
const { createNormalUser } = require("../../utils/testHelpers");

describe("Users - Profile Update", () => {
  describe("PATCH /api/v1/users/me", () => {
    it("should update authenticated user information", async () => {
      // GIVEN
      const { user, token } = await createNormalUser({
        firstname: "Ancien",
        name: "Nom",
        email: "ancien@test.com",
      });

      const updatedData = {
        firstName: "Nouveau",
        lastName: "Prénom",
        email: "nouveau@test.com",
      };

      // WHEN
      const response = await request(app)
        .patch("/api/v1/users/me")
        .set("Authorization", `Bearer ${token}`)
        .send(updatedData);

      // THEN
      expect(response.status).toBe(200);
      expect(response.body.ok).toBe(true);

      const userResult = await User.findById(user.id_user);
      expect(userResult.firstname).toBe(updatedData.firstName);
      expect(userResult.name).toBe(updatedData.lastName);
      expect(userResult.email).toBe(updatedData.email);
    });

    it("should reject update without authentication", async () => {
      // WHEN
      const response = await request(app)
        .patch("/api/v1/users/me")
        .send({
          firstName: "Test",
          lastName: "Test",
          email: "test@test.com",
        });

      // THEN
      expect(response.status).toBe(401);
    });
  });
});
