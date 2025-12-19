const request = require("supertest");
const app = require("../../../src");
const { createAdminUser, createNormalUser } = require("../../utils/testHelpers");

describe("Users - List (Admin)", () => {
  describe("GET /api/v1/users", () => {
    it("should retrieve all users list (admin)", async () => {
      // GIVEN
      await createNormalUser({ name: "User1", firstname: "Test1" });
      await createNormalUser({ name: "User2", firstname: "Test2" });
      const { token } = await createAdminUser();

      // WHEN
      const response = await request(app)
        .get("/api/v1/users")
        .set("Authorization", `Bearer ${token}`);

      // THEN
      expect(response.status).toBe(200);
      expect(response.body.data).toBeDefined();
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data.length).toBeGreaterThanOrEqual(3);
    });

    it("should reject access for non-admin user", async () => {
      // GIVEN
      const { token } = await createNormalUser();

      // WHEN
      const response = await request(app)
        .get("/api/v1/users")
        .set("Authorization", `Bearer ${token}`);

      // THEN
      expect(response.status).toBe(403);
    });

    it("should reject request without authentication", async () => {
      // WHEN
      const response = await request(app).get("/api/v1/users");

      // THEN
      expect(response.status).toBe(401);
    });
  });
});
