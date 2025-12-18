const request = require("supertest");
const app = require("../../../src");
const bcrypt = require("bcrypt");
const User = require("../../../src/models/User");
const Permission = require("../../../src/models/Permission");
const UserPermission = require("../../../src/models/UserPermission");

describe("Universities listing", () => {
  it("should return all universities", async () => {
    //GIVEN
    const password = "test";
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name: "User",
            firstname: "Test",
            email: "test@gmail.com",
            photo: "0753904652",
            password: hashedPassword,
            Id_universities: 1
        });
      const role = await Permission.findByName("user")
      await UserPermission.create({id_user: user.id_user, Id_roles: role.Id_roles})
        const responseToken = await request(app)
            .post("/api/v1/auth/login")
            .set("content-type", "application/json")
            .send({
                email: "test@gmail.com",
                password: "test",
            });
        const token= responseToken.body.token
    //WHEN
    const response = await request(app)
      .get("/api/v1/universities/list")
      .set("Authorization", `Bearer ${token}`)
 
    //THEN
    expect(response.status).toBe(200);
    expect(response.body.data[0]).toMatchObject({
    Id_universities: 1,
        name: 'Montaigne',
        Id_cities: 1
    });
  });
});
