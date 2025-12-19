const request = require("supertest");
const app = require("../../../src");
const { createNormalUser } = require("../../utils/testHelpers");

describe("Universities - List", () => {
  describe("GET /api/v1/universities", () => {
    it("should retrieve all universities list", async () => {
      // GIVEN
      const { token } = await createNormalUser();

      // WHEN
      const response = await request(app)
        .get("/api/v1/universities")
        .set("Authorization", `Bearer ${token}`);

      // THEN
      expect(response.status).toBe(200);
      expect(response.body.data).toBeDefined();
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data.length).toBeGreaterThan(0);
      expect(response.body.data[0]).toHaveProperty("Id_universities");
      expect(response.body.data[0]).toHaveProperty("name");
    });

    it("should reject request without authentication", async () => {
      // WHEN
      const response = await request(app).get("/api/v1/universities");

      // THEN
      expect(response.status).toBe(401);
    });
  });
});
