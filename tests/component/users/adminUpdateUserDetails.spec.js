const request = require("supertest");
const app = require("../../../src");
const User = require("../../../src/models/User");
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const Permission = require("../../../src/models/Permission");
const UserPermission = require("../../../src/models/UserPermission");
const prisma = new PrismaClient();

describe("Admin user details update", () => {
    it("should update user details by id", async () => {
        //GIVEN
        const password = "test";
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            name: "User 1",
            firstname: "Test 1",
            email: "test1@gmail.com",
            photo: "0753904652",
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
        //WHEN
        const response = await request(app)
            .patch("/api/v1/users/1")
            .set("Authorization", `Bearer ${token}`)
            .set("content-type", "application/json")
            .send({
                firstName: "Lol",
                lastName: "User0",
                email: "test12@gmail.com"
            })
        //THEN
        expect(response.status).toBe(200);
        const userResult = await User.findById(1)
        expect(userResult.firstname).toBe("Lol")
    });
    it("should not update user details if not admin", async () => {
        //GIVEN
        const password = "test";
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            name: "User 1",
            firstname: "Test 1",
            email: "test1@gmail.com",
            photo: "0753904652",
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
        //WHEN
        const response = await request(app)
            .patch("/api/v1/users/1")
            .set("Authorization", `Bearer ${token}`)
            .set("content-type", "application/json")
            .send({
                firstName: "Lol",
                lastName: "User0",
                email: "test12@gmail.com"
            })
        //THEN
        expect(response.status).toBe(401);
    });
});
