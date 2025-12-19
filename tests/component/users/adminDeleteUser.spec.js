const request = require("supertest");
const app = require("../../../src");
const User = require("../../../src/models/User");
const UserPermission = require("../../../src/models/UserPermission");
const prisma = require("../../../src/v1/prisma");
const { createAdminUser, createNormalUser } = require("../../utils/testHelpers");

describe("Utilisateurs - Suppression par Admin", () => {
  describe("DELETE /api/v1/users/:id", () => {
    it("devrait supprimer un utilisateur de la base de données (admin)", async () => {
      // GIVEN
      const { user: targetUser } = await createNormalUser({
        email: "todelete@test.com",
      });
      const { token } = await createAdminUser();

      // Supprimer les permissions d'abord (contrainte FK)
      await prisma.userPermissions.deleteMany({
        where: { id_user: targetUser.id_user },
      });

      // WHEN
      const response = await request(app)
        .delete(`/api/v1/users/${targetUser.id_user}`)
        .set("Authorization", `Bearer ${token}`);

      // THEN
      expect(response.status).toBe(204);
      const userResult = await User.findById(targetUser.id_user);
      expect(userResult).toBeNull();
    });

    it("should reject deletion if user is not admin", async () => {
      // GIVEN
      const { user: targetUser } = await createNormalUser();
      const { token } = await createNormalUser();

      // WHEN
      const response = await request(app)
        .delete(`/api/v1/users/${targetUser.id_user}`)
        .set("Authorization", `Bearer ${token}`);

      // THEN
      expect(response.status).toBe(403);
    });

    it("should return 404 for non-existent user", async () => {
      // GIVEN
      const { token } = await createAdminUser();

      // WHEN
      const response = await request(app)
        .delete("/api/v1/users/999999")
        .set("Authorization", `Bearer ${token}`);

      // THEN
      expect(response.status).toBe(404);
    });
  });
});
