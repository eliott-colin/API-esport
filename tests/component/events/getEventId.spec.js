const request = require("supertest");
const app = require("../../../src");
const User = require("../../../src/models/User");
const UserPermission = require("../../../src/models/UserPermission")
const Permission = require("../../../src/models/Permission")
const Events = require("../../../src/models/Events");

const bcrypt = require("bcrypt");

describe("Get an event by id", () => {
    it("should get one event", async () => {
        //GIVEN
        const password = "test";
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            name: "User Test",
            firstname: "Test right",
            email: "testuser@gmail.com",
            photo: "0753904651",
            password: hashedPassword,
            Id_universities: 1
        });
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
         await Events.create({
            name: "test",
            eventDate: new Date("2025-12-19T10:22:28Z"),
            description: "test",
            maxTeam: 2,
            leaderboardType: "actif",
            Id_eventGames: 1
        });
        //WHEN
        const response = await request(app)
            .get("/api/v1/events/1")
            .set("Authorization", `Bearer ${token}`)
        //THEN
        expect(response.status).toBe(200);
        expect(response.body.data).toMatchObject({
            Id_event: 1,
            name: "test",
            description: "test",
            maxTeam: 2,
            leaderboardType: "actif",
            Id_eventGames: 1
        })
    });
});
