const request = require("supertest");
const app = require("../../../src");
const path = require("path");

describe("Authentication - Registration", () => {
  describe("POST /api/v1/auth/register", () => {
    it("should register a new user successfully", async () => {
      // GIVEN
      const imagePath = path.join(__dirname, "test-image.png");
      const userData = {
        firstName: "Jean",
        lastName: "Dupont",
        email: "jean.dupont@test.com",
        password: "motdepasse123",
        idUniversities: 1,
      };

      // WHEN
      const response = await request(app)
        .post("/api/v1/auth/register")
        .field("firstName", userData.firstName)
        .field("lastName", userData.lastName)
        .field("email", userData.email)
        .field("password", userData.password)
        .field("idUniversities", userData.idUniversities)
        .attach("image", imagePath);

      // THEN
      expect(response.status).toBe(201);
      expect(response.body.token).toBeDefined();
      expect(typeof response.body.token).toBe("string");
    });

    it("should reject registration with an already used email", async () => {
      // GIVEN - Premier utilisateur
      const email = "duplicate@test.com";
      const imagePath = path.join(__dirname, "test-image.png");

      await request(app)
        .post("/api/v1/auth/register")
        .field("firstName", "Test")
        .field("lastName", "User")
        .field("email", email)
        .field("password", "password")
        .field("idUniversities", 1)
        .attach("image", imagePath);

      // WHEN - Tentative avec le même email
      const response = await request(app)
        .post("/api/v1/auth/register")
        .field("firstName", "Other")
        .field("lastName", "User")
        .field("email", email)
        .field("password", "password")
        .field("idUniversities", 1)
        .attach("image", imagePath);

      // THEN
      expect(response.status).toBe(400);
    });
  });
});
