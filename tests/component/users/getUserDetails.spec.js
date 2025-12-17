const request = require("supertest");
const app = require("../../../src");
const User = require("../../../src/models/User");
const bcrypt = require("bcrypt");

describe("User's details", () => {
    it("should get connected user details", async () => {
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
            .get("/api/v1/users/me/")
            .set("Authorization", `Bearer ${token}`)
        //THEN
        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
            id: 1,
            name: "User",
            firstName: "Test",
            email: "test@gmail.com",
            photoUrl: "http://localhost:3000/0753904652.png"
        })
    });
});
