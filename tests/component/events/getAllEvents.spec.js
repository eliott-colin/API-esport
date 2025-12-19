const request = require("supertest");
const app = require("../../../src");
const Events = require("../../../src/models/Events");
const { createNormalUser } = require("../../utils/testHelpers");

describe("Événements - Liste", () => {
  describe("GET /api/v1/events", () => {
    it("devrait récupérer la liste de tous les événements", async () => {
      // GIVEN
      await Events.create({
        name: "Tournoi LoL",
        eventDate: new Date("2025-12-19T10:22:28Z"),
        description: "Tournoi League of Legends",
        maxTeam: 16,
        leaderboardType: "actif",
        Id_eventGames: 1,
      });
      await Events.create({
        name: "Tournoi CS",
        eventDate: new Date("2025-12-20T14:00:00Z"),
        description: "Tournoi Counter-Strike",
        maxTeam: 8,
        leaderboardType: "actif",
        Id_eventGames: 1,
      });
      const { token } = await createNormalUser();

      // WHEN
      const response = await request(app)
        .get("/api/v1/events")
        .set("Authorization", `Bearer ${token}`);

      // THEN
      expect(response.status).toBe(200);
      expect(response.body.data).toBeDefined();
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data.length).toBeGreaterThanOrEqual(2);
    });

    it("should reject request without authentication", async () => {
      // WHEN
      const response = await request(app).get("/api/v1/events");

      // THEN
      expect(response.status).toBe(401);
    });
  });
});
