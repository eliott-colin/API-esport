const request = require("supertest");
const app = require("../../../src");

describe("User Register", () => {
  it("should register the new user", async () => {
    //GIVEN
    //WHEN
    const response = await request(app)
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
    //THEN
      console.log(response)
    expect(response.status).toBe(201);
    expect(response.body.token).toBeDefined();
  });
});
