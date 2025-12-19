const request = require("supertest");
const app = require("../../../src");
const Team = require("../../../src/models/Team");
const { createNormalUser } = require("../../utils/testHelpers");

describe("Équipes - Liste", () => {
  describe("GET /api/v1/teams", () => {
    it("devrait récupérer la liste de toutes les équipes", async () => {
      // GIVEN
      await Team.create({ name: "Équipe Alpha", dateCreate: new Date() });
      await Team.create({ name: "Équipe Beta", dateCreate: new Date() });
      const { token } = await createNormalUser();

      // WHEN
      const response = await request(app)
        .get("/api/v1/teams")
        .set("Authorization", `Bearer ${token}`);

      // THEN
      expect(response.status).toBe(200);
      expect(response.body.data).toBeDefined();
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data.length).toBeGreaterThanOrEqual(2);
    });

    it("should reject request without authentication", async () => {
      // WHEN
      const response = await request(app).get("/api/v1/teams");

      // THEN
      expect(response.status).toBe(401);
    });
  });
});
