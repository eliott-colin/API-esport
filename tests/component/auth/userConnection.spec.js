const request = require("supertest");
const app = require("../../../src");
const User = require("../../../src/models/User");
const bcrypt = require("bcrypt");

describe("User Connection", () => {
  it("should connect the user", async () => {
    //GIVEN
    const password = "test";
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      name: "User",
      firstname: "Test",
      email: "test@gmail.com",
      photo: "0753904652",
      password: hashedPassword,
      Id_universities: 1
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
