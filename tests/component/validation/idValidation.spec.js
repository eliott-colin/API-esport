const request = require("supertest");
const app = require("../../../src");
const User = require("../../../src/models/User");
const bcrypt = require("bcrypt");
const Permission = require("../../../src/models/Permission");
const UserPermission = require("../../../src/models/UserPermission");

describe("ID Validation Tests", () => {
  let token;

  beforeAll(async () => {
    // Create admin user for tests
    const hashedPassword = await bcrypt.hash("test", 10);
    const user = await User.create({
      name: "Admin",
      firstname: "Test",
      email: "admin@test.com",
      photo: null,
      password: hashedPassword,
      Id_universities: 1,
    });
    const adminRole = await Permission.findByName("admin");
    await UserPermission.create({
      id_user: user.id_user,
      Id_roles: adminRole.Id_roles,
    });

    const responseToken = await request(app)
      .post("/api/v1/auth/login")
      .set("content-type", "application/json")
      .send({
        email: "admin@test.com",
        password: "test",
      });
    token = responseToken.body.token;
  });

  describe("Invalid ID formats", () => {
    it("should return 400 for non-numeric ID in users route", async () => {
      const response = await request(app)
        .get("/api/v1/users/abc")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(400);
    });

    it("should return 400 for negative ID in teams route", async () => {
      const response = await request(app)
        .get("/api/v1/teams/-1")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(400);
    });

    it("should return 400 for decimal ID in events route", async () => {
      const response = await request(app)
        .get("/api/v1/events/1.5")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(400);
    });

    it("should return 400 for zero ID in universities route", async () => {
      const response = await request(app)
        .get("/api/v1/universities/0")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(400);
    });
  });

  describe("Resource not found (404)", () => {
    it("should return 404 for non-existent user", async () => {
      const response = await request(app)
        .get("/api/v1/users/999999")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(404);
      expect(response.body.data.error).toContain("non trouvé");
    });

    it("should return 404 for non-existent team", async () => {
      const response = await request(app)
        .get("/api/v1/teams/999999")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(404);
      expect(response.body.data.error).toContain("non trouvée");
    });

    it("should return 404 for non-existent event", async () => {
      const response = await request(app)
        .get("/api/v1/events/999999")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(404);
      expect(response.body.data.error).toContain("non trouvé");
    });

    it("should return 404 for non-existent university", async () => {
      const response = await request(app)
        .get("/api/v1/universities/999999")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(404);
      expect(response.body.data.error).toContain("non trouvée");
    });
  });

  describe("DELETE operations on non-existent resources", () => {
    it("should return 404 when deleting non-existent user", async () => {
      const response = await request(app)
        .delete("/api/v1/users/999999")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(404);
    });

    it("should return 404 when deleting non-existent team", async () => {
      const response = await request(app)
        .delete("/api/v1/teams/999999")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(404);
    });
  });

  describe("UPDATE operations on non-existent resources", () => {
    it("should return 404 when updating non-existent user", async () => {
      const response = await request(app)
        .patch("/api/v1/users/999999")
        .set("Authorization", `Bearer ${token}`)
        .send({
          firstName: "Test",
          lastName: "User",
          email: "test@test.com",
        });

      expect(response.status).toBe(404);
    });

    it("should return 404 when updating non-existent team", async () => {
      const response = await request(app)
        .patch("/api/v1/teams/999999")
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "Test Team",
        });

      expect(response.status).toBe(404);
    });
  });
});

