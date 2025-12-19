const request = require("supertest");
const app = require("../../../src");
const Team = require("../../../src/models/Team");
const { createNormalUser } = require("../../utils/testHelpers");

describe("Équipes - Mise à jour", () => {
  describe("PATCH /api/v1/teams/:id", () => {
    it("devrait mettre à jour les détails d'une équipe", async () => {
      // GIVEN
      const team = await Team.create({
        name: "Ancien Nom",
        dateCreate: new Date(),
      });
      const { token } = await createNormalUser();

      const updatedData = { name: "Nouveau Nom" };

      // WHEN
      const response = await request(app)
        .patch(`/api/v1/teams/${team.Id_teams}`)
        .set("Authorization", `Bearer ${token}`)
        .send(updatedData);

      // THEN
      expect(response.status).toBe(200);
      expect(response.body.ok).toBe(true);

      const teamResult = await Team.findById(team.Id_teams);
      expect(teamResult.name).toBe(updatedData.name);
    });

    it("devrait retourner 404 pour une équipe inexistante", async () => {
      // GIVEN
      const { token } = await createNormalUser();

      // WHEN
      const response = await request(app)
        .patch("/api/v1/teams/999999")
        .set("Authorization", `Bearer ${token}`)
        .send({ name: "Test" });

      // THEN
      expect(response.status).toBe(404);
    });

    it("should reject request without authentication", async () => {
      // WHEN
      const response = await request(app)
        .patch("/api/v1/teams/1")
        .send({ name: "Test" });

      // THEN
      expect(response.status).toBe(401);
    });
  });
});
