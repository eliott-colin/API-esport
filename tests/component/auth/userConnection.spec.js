const request = require("supertest");
const app = require("../../../src");
const User = require("../../../src/models/User");
const bcrypt = require("bcrypt");

describe("User Connection", () => {
  it("should connect the user", async () => {
    //GIVEN
    const password = "test";
    await request(app)
        .post("/api/v1/auth/register")
        .set("content-type", "application/json")
        .send({
          firstName: "Test",
          lastName: "User",
          email: "test@gmail.com",
          photo: "0753904652",
          password: "test",
          idUniversities: 1
        });

    //WHEN
    const response = await request(app)
      .post("/api/v1/auth/login")
      .set("content-type", "application/json")
      .send({
        email: "test@gmail.com",
        password: "test",
      });
    //THEN
    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });
});
