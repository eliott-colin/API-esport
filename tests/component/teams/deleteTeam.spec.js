const request = require("supertest");
const app = require("../../../src");
const Team = require("../../../src/models/Team");
const { createNormalUser } = require("../../utils/testHelpers");

describe("Équipes - Suppression", () => {
  describe("DELETE /api/v1/teams/:id", () => {
    it("devrait supprimer une équipe de la base de données", async () => {
      // GIVEN
      const team = await Team.create({
        name: "Équipe à supprimer",
        dateCreate: new Date(),
      });
      const { token } = await createNormalUser();

      // WHEN
      const response = await request(app)
        .delete(`/api/v1/teams/${team.Id_teams}`)
        .set("Authorization", `Bearer ${token}`);

      // THEN
      expect(response.status).toBe(204);
      const testResult = await Team.findById(team.Id_teams);
      expect(testResult).toBeNull();
    });

    it("devrait retourner 404 pour une équipe inexistante", async () => {
      // GIVEN
      const { token } = await createNormalUser();

      // WHEN
      const response = await request(app)
        .delete("/api/v1/teams/999999")
        .set("Authorization", `Bearer ${token}`);

      // THEN
      expect(response.status).toBe(404);
    });

    it("should reject request without authentication", async () => {
      // WHEN
      const response = await request(app).delete("/api/v1/teams/1");

      // THEN
      expect(response.status).toBe(401);
    });
  });
});
