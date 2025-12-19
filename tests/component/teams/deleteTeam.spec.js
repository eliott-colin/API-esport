const request = require("supertest");
const app = require("../../../src");
const User = require("../../../src/models/User");
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const Permission = require("../../../src/models/Permission");
const UserPermission = require("../../../src/models/UserPermission");
const Team = require("../../../src/models/Team")

describe("Delete team", () => {
    it("should remove team from db", async () => {
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
        const role = await Permission.findByName("admin")
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
            name: "User TO",
            dateCreate: new Date()
        });
        //WHEN
        const response = await request(app)
            .delete("/api/v1/teams/1")
            .set("Authorization", `Bearer ${token}`)
        //THEN
        expect(response.status).toBe(200);
        const testResult = await Team.findById(1)
        expect(testResult).toBeNull()
    });
});
