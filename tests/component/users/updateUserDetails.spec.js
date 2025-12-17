const request = require("supertest");
const app = require("../../../src");
const User = require("../../../src/models/User");
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

describe("User's details update", () => {
    it("should update connected user details", async () => {
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
            .patch("/api/v1/users/me")
            .set("Authorization", `Bearer ${token}`)
            .set("content-type", "application/json")
            .send({
                firstName: "Lol",
                lastName: "User",
                email: "test@gmail.com"
            })
        //THEN
        expect(response.status).toBe(200);
        const user = await User.findById(1)
        expect(user.firstname).toBe("Lol")
    });
});
