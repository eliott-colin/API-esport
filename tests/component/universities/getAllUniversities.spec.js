const request = require("supertest");
const app = require("../../../src");

describe("Universities listing", () => {
  it("should return all universities", async () => {
    //GIVEN
    //WHEN
    const response = await request(app)
      .get("/api/v1/universities")
      .set("Authorization", `Bearer ${token}`)
 
    //THEN
    expect(response.status).toBe(201);
    expect(response.body.token).toBeDefined();
  });
});
