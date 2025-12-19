const request = require("supertest");
const app = require("../../../src");
const { createAdminUser, createNormalUser } = require("../../utils/testHelpers");

describe("Utilisateurs - Détails par ID (Admin)", () => {
  describe("GET /api/v1/users/:id", () => {
    it("devrait récupérer un utilisateur par son ID (admin)", async () => {
      // GIVEN
      const { user: targetUser } = await createNormalUser({
        name: "Target",
        firstname: "User",
        email: "target@test.com",
      });
      const { token } = await createAdminUser();

      // WHEN
      const response = await request(app)
        .get(`/api/v1/users/${targetUser.id_user}`)
        .set("Authorization", `Bearer ${token}`);

      // THEN
      expect(response.status).toBe(200);
      expect(response.body.data).toMatchObject({
        id: targetUser.id_user,
        firstName: "User",
        lastName: "Target",
        email: "target@test.com",
      });
    });

    it("should reject access for non-admin user", async () => {
      // GIVEN
      const { token } = await createNormalUser();

      // WHEN
      const response = await request(app)
        .get("/api/v1/users/1")
        .set("Authorization", `Bearer ${token}`);

      // THEN
      expect(response.status).toBe(403);
    });

    it("should return 404 for non-existent user", async () => {
      // GIVEN
      const { token } = await createAdminUser();

      // WHEN
      const response = await request(app)
        .get("/api/v1/users/999999")
        .set("Authorization", `Bearer ${token}`);

      // THEN
      expect(response.status).toBe(404);
    });
  });
});
