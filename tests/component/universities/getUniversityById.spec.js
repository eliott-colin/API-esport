const request = require("supertest");
const app = require("../../../src");
const { createNormalUser } = require("../../utils/testHelpers");

describe("Universités - Détails par ID", () => {
  describe("GET /api/v1/universities/:id", () => {
    it("devrait récupérer une université par son ID", async () => {
      // GIVEN
      const { token } = await createNormalUser();

      // WHEN
      const response = await request(app)
        .get("/api/v1/universities/1")
        .set("Authorization", `Bearer ${token}`);

      // THEN
      expect(response.status).toBe(200);
      expect(response.body.data).toBeDefined();
      expect(response.body.data).toHaveProperty("Id_universities");
      expect(response.body.data).toHaveProperty("name");
    });

    it("should return 404 for non-existent university", async () => {
      // GIVEN
      const { token } = await createNormalUser();

      // WHEN
      const response = await request(app)
        .get("/api/v1/universities/999999")
        .set("Authorization", `Bearer ${token}`);

      // THEN
      expect(response.status).toBe(404);
    });

    it("should reject request without authentication", async () => {
      // WHEN
      const response = await request(app).get("/api/v1/universities/1");

      // THEN
      expect(response.status).toBe(401);
    });
  });
});

