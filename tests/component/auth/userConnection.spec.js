const request = require("supertest");
const app = require("../../../src");
const { createNormalUser } = require("../../utils/testHelpers");

describe("Authentification - Connexion", () => {
  describe("POST /api/v1/auth/login", () => {
    it("devrait connecter un utilisateur avec des identifiants valides", async () => {
      // GIVEN - Créer un utilisateur
      const email = "login.test@test.com";
      const password = "password123";
      await createNormalUser({ email, password });

      // WHEN
      const response = await request(app)
        .post("/api/v1/auth/login")
        .send({ email, password });

      // THEN
      expect(response.status).toBe(200);
      expect(response.body.token).toBeDefined();
      expect(typeof response.body.token).toBe("string");
    });

    it("should reject login with non-existent email", async () => {
      // WHEN
      const response = await request(app)
        .post("/api/v1/auth/login")
        .send({
          email: "inexistant@test.com",
          password: "password123",
        });

      // THEN
      expect(response.status).toBe(401);
      expect(response.body.data.error).toBeDefined();
    });

    it("should reject login with wrong password", async () => {
      // GIVEN
      const email = "wrong.password@test.com";
      await createNormalUser({ email, password: "correctpassword" });

      // WHEN
      const response = await request(app)
        .post("/api/v1/auth/login")
        .send({
          email,
          password: "wrongpassword",
        });

      // THEN
      expect(response.status).toBe(401);
      expect(response.body.data.error).toBeDefined();
    });
  });
});
