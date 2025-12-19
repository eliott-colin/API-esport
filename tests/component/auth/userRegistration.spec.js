const request = require("supertest");
const app = require("../../../src");
const path = require("path");

describe("User Register", () => {
  it("should register the new user", async () => {
    //GIVEN
    const imagePath = path.join(__dirname, "test-image.png");

    //WHEN
    const response = await request(app)
      .post("/api/v1/auth/register")
      .field("firstName", "Test")
      .field("lastName", "User")
      .field("email", "test@gmail.com")
      .field("password", "test")
      .field("idUniversities", 1)
      .attach("image", imagePath);

    //THEN
    expect(response.status).toBe(201);
    expect(response.body.token).toBeDefined();
  });
});
