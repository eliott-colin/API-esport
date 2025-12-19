const request = require("supertest");
const app = require("../../../src");
const User = require("../../../src/models/User");
const UserPermission = require("../../../src/models/UserPermission")
const Permission = require("../../../src/models/Permission")
const Team = require("../../../src/models/Team")

const bcrypt = require("bcrypt");

describe("Get a team by id", () => {
    it("should get one team", async () => {
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
        await Team.create({
            name: "TestTeam",
            dateCreate: new Date(),
        })
        //WHEN
        const response = await request(app)
            .get("/api/v1/teams/1")
            .set("Authorization", `Bearer ${token}`)
        //THEN
        expect(response.status).toBe(200);
        expect(response.body.data).toMatchObject({
            id: 1,
            name: "TestTeam",
        })
    });
});
