const request = require("supertest");
const app = require("../../../src");
const User = require("../../../src/models/User");
const { createAdminUser, createNormalUser } = require("../../utils/testHelpers");

describe("Utilisateurs - Mise à jour par Admin", () => {
  describe("PATCH /api/v1/users/:id", () => {
    it("devrait mettre à jour un utilisateur par son ID (admin)", async () => {
      // GIVEN
      const { user: targetUser } = await createNormalUser({
        name: "Ancien",
        firstname: "Prénom",
        email: "ancien@test.com",
      });
      const { token } = await createAdminUser();

      const updatedData = {
        firstName: "Nouveau",
        lastName: "NomModifié",
        email: "nouveau@test.com",
      };

      // WHEN
      const response = await request(app)
        .patch(`/api/v1/users/${targetUser.id_user}`)
        .set("Authorization", `Bearer ${token}`)
        .send(updatedData);

      // THEN
      expect(response.status).toBe(200);
      expect(response.body.ok).toBe(true);

      const userResult = await User.findById(targetUser.id_user);
      expect(userResult.firstname).toBe(updatedData.firstName);
      expect(userResult.name).toBe(updatedData.lastName);
      expect(userResult.email).toBe(updatedData.email);
    });

    it("should reject update if user is not admin", async () => {
      // GIVEN
      const { user: targetUser } = await createNormalUser();
      const { token } = await createNormalUser();

      // WHEN
      const response = await request(app)
        .patch(`/api/v1/users/${targetUser.id_user}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          firstName: "Test",
          lastName: "Test",
          email: "test@test.com",
        });

      // THEN
      expect(response.status).toBe(403);
    });

    it("should return 404 for non-existent user", async () => {
      // GIVEN
      const { token } = await createAdminUser();

      // WHEN
      const response = await request(app)
        .patch("/api/v1/users/999999")
        .set("Authorization", `Bearer ${token}`)
        .send({
          firstName: "Test",
          lastName: "Test",
          email: "test@test.com",
        });

      // THEN
      expect(response.status).toBe(404);
    });
  });
});
