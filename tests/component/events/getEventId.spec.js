const request = require("supertest");
const app = require("../../../src");
const Events = require("../../../src/models/Events");
const { createNormalUser } = require("../../utils/testHelpers");

describe("Événements - Détails par ID", () => {
  describe("GET /api/v1/events/:id", () => {
    it("devrait récupérer un événement par son ID", async () => {
      // GIVEN
      const event = await Events.create({
        name: "Tournoi Test",
        eventDate: new Date("2025-12-19T10:22:28Z"),
        description: "Description du tournoi",
        maxTeam: 16,
        leaderboardType: "actif",
        Id_eventGames: 1,
      });
      const { token } = await createNormalUser();

      // WHEN
      const response = await request(app)
        .get(`/api/v1/events/${event.Id_event}`)
        .set("Authorization", `Bearer ${token}`);

      // THEN
      expect(response.status).toBe(200);
      expect(response.body.data).toMatchObject({
        Id_event: event.Id_event,
        name: "Tournoi Test",
        description: "Description du tournoi",
        maxTeam: 16,
        leaderboardType: "actif",
        Id_eventGames: 1,
      });
    });

    it("devrait retourner 404 pour un événement inexistant", async () => {
      // GIVEN
      const { token } = await createNormalUser();

      // WHEN
      const response = await request(app)
        .get("/api/v1/events/999999")
        .set("Authorization", `Bearer ${token}`);

      // THEN
      expect(response.status).toBe(404);
    });

    it("should reject request without authentication", async () => {
      // WHEN
      const response = await request(app).get("/api/v1/events/1");

      // THEN
      expect(response.status).toBe(401);
    });
  });
});
